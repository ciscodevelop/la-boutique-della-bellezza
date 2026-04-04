# PR_GUIDELINES.md — Come Revisionare una Pull Request

---

## Prima di Approvare

Rispondere **sì** a tutti questi punti:

- [ ] Il codice fa esattamente quello che descrive il titolo della PR?
- [ ] Nessuna modifica fuori scope (refactor non richiesti, file non correlati)?
- [ ] TypeScript senza `any` non giustificato?
- [ ] Nessun valore hardcoded che dovrebbe essere una costante?
- [ ] Nessuna logica business dentro componenti React?
- [ ] Se tocca denaro → tutti i punti di `FINANCIAL_RULES.md` rispettati?

---

## Checklist per Tipo di Modifica

### Modifiche Finanziarie (ALTA PRIORITÀ)

> Applicare per qualsiasi modifica a `src/lib/payments/`, `src/models/LedgerEntry.ts`,
> `src/models/ProductPurchase.ts`, `src/app/api/stripe/`.

- [ ] `amountTotalCents` non viene mai aggiornato direttamente (solo via ledger)
- [ ] Ogni nuovo movimento crea una `LedgerEntry`
- [ ] Gli eventi Stripe usano `stripeEventId` per idempotenza
- [ ] Operazioni multi-step usano `withLedgerTransaction`
- [ ] Firma webhook verificata con `STRIPE_WEBHOOK_SECRET`
- [ ] Test di deduplicazione presenti o aggiornati
- [ ] `src/app/api/stripe/webhook/route.test.ts` passa verde

### Modifiche API (`src/app/api/`)

- [ ] Input validati (Zod o validazione esplicita) prima di qualsiasi operazione
- [ ] Errori gestiti con codici HTTP appropriati e messaggio strutturato
- [ ] Route protette controllano autenticazione/ruolo
- [ ] Nessuna logica di business inline nella route — delega a `src/lib/`

### Modifiche al Database (Modelli Mongoose)

- [ ] Nuovi indici documentati e giustificati
- [ ] Cambiamenti allo schema backward compatible (nessun campo required senza default su dati esistenti)
- [ ] Nessuna migration implicita che rompe dati in produzione
- [ ] Per aggiornamenti batch: script in `src/scripts/` con idempotenza verificata

### Modifiche UI (`src/components/`, `src/app/*/page.tsx`)

- [ ] Nessuna logica di business dentro il componente
- [ ] Client Components usati solo dove strettamente necessario
- [ ] Nessuna fetch ridondante che poteva stare in un Server Component
- [ ] Componenti nuovi < 100 righe quando possibile; se più lunghi, motivato o estratto

### Modifiche Admin (`src/app/admin/`, `src/app/super-admin/`)

- [ ] Protezione ruolo presente (solo admin/super-admin può accedere)
- [ ] Dati sensibili non esposti lato client
- [ ] Operazioni distruttive richiedono conferma esplicita

---

## Formato della PR

### Titolo

```
[Area] Breve descrizione dell'intervento
```

Esempi validi:

- `[Ledger] Aggiunge deduplicazione per eventi charge.refunded`
- `[Admin] Estrae tab Rimborsi in componente separato`
- `[Checkout] Fix importo saldo su pagamento rateale`

### Descrizione (corpo)

```
## Cosa fa questa PR
Breve spiegazione del cambiamento.

## Perché
Motivazione tecnica o di prodotto.

## Cosa ho verificato
- [ ] Test eseguiti localmente
- [ ] Nessun errore TypeScript
- [ ] Nessuna regressione evidente
```

---

## Revisione del Codice: Come Comunicare

| Tipo di commento | Come scriverlo                                 |
| ---------------- | ---------------------------------------------- |
| Blocca la PR     | `⛔ BLOCCA: ...` — va risolto prima del merge  |
| Suggerimento     | `💡 Suggerimento: ...` — l'autore può valutare |
| Domanda          | `❓ ...` — chiarimento, non blocca             |
| Nit (stile)      | `nit: ...` — opzionale, non blocca             |

Non approvare se ci sono commenti `⛔ BLOCCA` non risolti.

---

## Scope e Dimensione delle PR

- PR ideale: **una funzionalità, un fix, o un refactor**.
- PR grandi (> 400 righe modified) vanno suddivise se possibile.
- Se il repo è già "dirty" (molte modifiche non committate), la PR deve toccare il **perimetro minimo** necessario.

---

## Anti-Pattern che Bloccano la PR

| Anti-pattern                               | Perché è un problema                    |
| ------------------------------------------ | --------------------------------------- |
| `amountTotalCents` aggiornato direttamente | Bypassa il ledger, corrompe audit trail |
| Webhook non idempotente                    | Doppio addebito in caso di retry Stripe |
| `any` senza commento di giustificazione    | Nasconde errori a compile time          |
| Business logic in componente React         | Non testabile, non riusabile            |
| Valori numerici magic inline               | Fragile, impossibile da cercare         |
| `console.log` dimenticato in produzione    | Rumore nei log, potenziale leak di dati |
| Import ciclici tra `lib/` e `app/`         | Rompe il grafo delle dipendenze         |
| Variabili d'ambiente hardcodate            | Sicurezza e portabilità                 |

---

## Comandi Utili Prima di Fare Review

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Test webhook (critico per PR finanziarie)
npx jest "webhook/route.test" --no-coverage

# Tutti i test
npm test
```

---

## Merge Strategy

- Merge **solo se tutti i check passano** (lint, type check, test)
- Preferire **Squash and Merge** per mantenere la history pulita
- Non fare force push su branch condivisi
