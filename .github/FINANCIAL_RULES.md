# FINANCIAL_RULES.md — Regole per la Logica Finanziaria

> Queste regole sono **non negoziabili**. Qualsiasi PR che le violi non va approvata.

---

## Principio Fondamentale

`LedgerEntry` è la **unica source of truth** per i saldi finanziari.

Il campo `CoursePurchase.amountTotalCents` è un **valore derivato (cache)**.  
Viene ricalcolato dai movimenti del ledger. **Mai aggiornarlo direttamente.**

---

## Il Modello LedgerEntry

File: `src/models/LedgerEntry.ts`

```
LedgerEntry
  purchaseId    → ref a CoursePurchase
  type          → "CREDIT" | "DEBIT"
  amountCents   → sempre positivo, in centesimi (min: 1)
  source        → "STRIPE" | "REFUND" | "MANUAL" | "RECONCILIATION"
  stripeEventId → sparse unique (garanzia idempotenza)
  stripeSessionId
  note
  createdAt     → immutabile
```

### Regola: Le entry non si modificano mai

Una volta creata, una `LedgerEntry` è **append-only**.  
Non usare `updateOne`, `findByIdAndUpdate` o `.save()` su un documento esistente.

Per correggere un errore: creare una entry compensatoria (DEBIT per annullare un CREDIT errato).

---

## Funzioni Autorizzate

Tutte le operazioni finanziarie **devono** passare da `src/lib/payments/ledger.ts`.

| Funzione                                         | Quando usarla                                |
| ------------------------------------------------ | -------------------------------------------- |
| `createLedgerCredit(input)`                      | Pagamento ricevuto                           |
| `createLedgerDebit(input)`                       | Rimborso / storno                            |
| `getOrderBalance(purchaseId)`                    | Calcolo saldo corrente                       |
| `updatePurchaseFromLedger(purchaseId, session?)` | Sincronizza cache su CoursePurchase          |
| `withLedgerTransaction(fn)`                      | Avvolge operazioni multi-step in transazione |
| `getDashboardLedgerStats()`                      | KPI aggregati per admin                      |

**Non creare nuove funzioni finanziarie fuori da questo modulo** senza review.

---

## Idempotenza dei Webhook Stripe

File: `src/app/api/stripe/webhook/route.ts`

Ogni evento Stripe è processato **al massimo una volta** grazie a `stripeEventId`:

- schema: `stripeEventId: { type: String, sparse: true, unique: true }`
- se un evento è già presente nel DB → ritorna 200 senza duplicare

```ts
// Pattern corretto
const existing = await LedgerEntry.findOne({ stripeEventId: event.id });
if (existing) return NextResponse.json({ received: true }); // idempotente
```

**Non rimuovere questo check.** Non aggiungere logica che bypassa questa verifica.

---

## Transazioni MongoDB

Usare sempre `withLedgerTransaction` per operazioni che toccano più documenti:

```ts
await withLedgerTransaction(async (session) => {
  await createLedgerCredit({ ... }, session);
  await updatePurchaseFromLedger(purchaseId, session);
});
```

In ambienti single-node (dev) il fallback è graceful: le operazioni vengono eseguite senza transazione grazie all'idempotenza del ledger.

**Non disabilitare o bypassare `withLedgerTransaction`.**

---

## Guardie (ledger-guard)

File: `src/lib/payments/ledger-guard.ts`

### `assertLedgerBalance(purchaseId, cachedAmountCents)`

Verifica che il valore cached non diverga dal saldo reale.  
In production: lancia eccezione se discrepante. In dev: warn.

### `assertNoDirectAmountUpdate(updateData, callerName)`

Blocca esplicitamente aggiornamenti diretti a `amountTotalCents`.  
Usarla in qualsiasi funzione che riceve `updateData` generico.

---

## Tipi di Operazione

| Tipo                        | Source                               | Quando                       |
| --------------------------- | ------------------------------------ | ---------------------------- |
| `CREDIT` + `STRIPE`         | webhook `checkout.session.completed` | Pagamento completo           |
| `CREDIT` + `STRIPE`         | webhook saldo di deposito            | Pagamento saldo dopo acconto |
| `DEBIT` + `REFUND`          | webhook `charge.refunded`            | Rimborso emesso da Stripe    |
| `CREDIT` + `MANUAL`         | amministratore                       | Correzione manuale (raro)    |
| `CREDIT` + `RECONCILIATION` | cron di riconciliazione              | Re-allineamento automatico   |

---

## Riconciliazione

File: `src/lib/payments/reconciliation.ts`

Agisce su acquisti recenti (ultimi 30 giorni) con Stripe Checkout Session:

- confronta lo stato su Stripe con quello su DB
- aggiorna solo se lo stato locale risulta non allineato
- trigger: `GET /api/cron/reconciliation` (endpoint cron-only)

**Non invocare la riconciliazione in modo sincrono da API user-facing.**

---

## Alert Operazionali

File: `src/lib/payments/ops-alert.ts`

Usare `notifyPaymentsOpsAlert` per segnalare anomalie finanziarie critiche (discrepanze, errori di riconciliazione).  
Non bloccare il flusso utente per un alert fallito.

---

## Cosa è Vietato

| Vietato                                                               | Perché                  |
| --------------------------------------------------------------------- | ----------------------- |
| `CoursePurchase.updateOne({ amountTotalCents: x })`                   | Bypassa il ledger       |
| `LedgerEntry.updateOne(...)`                                          | Viola immutabilità      |
| `LedgerEntry.deleteOne(...)`                                          | Distrugge audit trail   |
| Creare entry senza `stripeEventId` per eventi Stripe                  | Perde idempotenza       |
| Calcolare totali sommando manualmente fuori da `getOrderBalance`      | Fonte di verità diverge |
| Processare webhook senza verificare firma con `STRIPE_WEBHOOK_SECRET` | Vulnerabilità sicurezza |

---

## Gestione Rimborsi Parziali

Un rimborso parziale crea **una sola entry DEBIT** con l'importo effettivo rimborsato.  
Il saldo netto si calcola sempre come:

```
saldoNetto = SUM(CREDIT.amountCents) - SUM(DEBIT.amountCents)
```

Lo status derivato in `getOrderBalance` è:

- `PAID` → netto == fullAmountCents
- `PARTIALLY_PAID` → 0 < netto < fullAmountCents
- `REFUNDED` → netto == 0

---

## Sviluppo e Test

- I test per la logica finanziaria si trovano in `src/app/api/stripe/webhook/route.test.ts`
- Eseguire: `npx jest "webhook/route.test" --no-coverage`
- I test devono coprire: CREDIT su saldo, deduplicazione evento, importi edge case
- Qualsiasi nuova funzione finanziaria richiede almeno un test di deduplicazione
