# ARCHITECTURE.md — Visione del Sistema

## Stack Tecnologico

| Layer      | Tecnologia                                 |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 16.2 — App Router                  |
| UI         | React 19, Tailwind CSS 4, Framer Motion    |
| Linguaggio | TypeScript strict                          |
| Database   | MongoDB 6 via Mongoose 9                   |
| Auth       | NextAuth v5 beta + `@auth/mongodb-adapter` |
| Pagamenti  | Stripe SDK 21                              |
| AI         | `@ai-sdk/google`                           |
| Email      | Nodemailer                                 |
| Charts     | Recharts                                   |
| Testing    | Jest 30 + ts-jest + Testing Library        |

---

## Struttura delle Cartelle

```
src/
  app/              ← Next.js App Router: pagine, layout, route API
  components/       ← Componenti React (solo UI, nessuna logica business)
  lib/              ← Business logic, helpers, client DB/Stripe/Auth
    payments/       ← Sistema ledger (CRITICO – vedere FINANCIAL_RULES.md)
  models/           ← Schema Mongoose: source of truth per la struttura dati
  types/            ← Tipi TypeScript condivisi
  scripts/          ← Script CLI per seed, backfill, migrazioni
```

---

## Domini Applicativi

### 1. Catalogo

Prodotti educativi (corsi, prodotti, certificazioni, percorsi) gestiti via:

- `src/models/Course.ts`
- `src/models/Product.ts`
- `src/app/corsi/`, `src/app/prodotti/`, `src/app/percorsi/`

### 2. Acquisti e Pagamenti

Tutto il flusso di acquisto passa per:

- `src/app/carrello/` → `src/app/checkout/` → Stripe Checkout Session
- Webhook: `src/app/api/stripe/webhook/route.ts`
- Modello acquisto: `src/models/ProductPurchase.ts` (`CoursePurchase`)
- Riconciliazione: `src/lib/payments/reconciliation.ts`

**Ledger immutabile come source of truth** — vedere `FINANCIAL_RULES.md`.

### 3. Finanza / Control Room

Area admin riservata all'analisi finanziaria:

- `src/app/admin/vendite/page.tsx` ← orchestratore tab
- Tab separate: `IncassiTab`, `RimborsiTab`, `RiconciliazioneTab`, `AnomalieTab`, `AuditTrailTab`
- Tipi condivisi: `control-room-types.ts`
- UI condivisa: `control-room-ui.tsx`

### 4. Autenticazione e Ruoli

- NextAuth v5 via `src/lib/auth.ts`
- Adapter MongoDB — sessioni su DB
- Ruoli principali: `super-admin`, `admin`, `publisher`, `editor`, `student`
- Protezione a livello di middleware e server action

### 5. AI Advisor

Assistente AI integrato:

- `src/app/api/ai-advisor/`
- `src/components/ai-advisor/`
- Conoscenza indicizzata: `src/models/Knowledge.ts`, `src/models/KnowledgeSuggestion.ts`

### 6. Segreteria e Consulenza

- `src/app/segreteria/` ← area studente
- `src/app/api/consulenza/` ← gestione richieste
- `src/models/Consulenza.ts`

### 7. Admin

- `src/app/admin/` ← area gestione operativa
- `src/app/super-admin/` ← area globale (solo super-admin)
- Chart widget configurabili: `src/models/AdminChartWidget.ts`

---

## Flusso di una Transazione

```
Utente → Carrello → Checkout (Next.js)
       → Stripe Checkout Session creata
       → Redirect su Stripe
       → Pagamento completato
       → Stripe invia webhook a /api/stripe/webhook
       → webhook handler crea LedgerEntry (CREDIT)
       → CoursePurchase.amountTotalCents aggiornato dal ledger
       → Accesso ai contenuti sbloccato
```

---

## Route API Principali

| Path                  | Scopo                                   |
| --------------------- | --------------------------------------- |
| `/api/stripe/webhook` | Ricezione eventi Stripe (idempotente)   |
| `/api/checkout/*`     | Creazione sessioni di pagamento         |
| `/api/auth/*`         | NextAuth endpoints                      |
| `/api/cron/*`         | Job schedulati (riconciliazione, alert) |
| `/api/admin/*`        | Operazioni amministrative               |
| `/api/ai-advisor/*`   | Chat AI + conoscenza                    |
| `/api/consulenza/*`   | Richieste di consulenza                 |

---

## Modelli Mongoose Chiave

| Modello              | File                           | Ruolo                               |
| -------------------- | ------------------------------ | ----------------------------------- |
| `LedgerEntry`        | `models/LedgerEntry.ts`        | Source of truth finanziaria         |
| `CoursePurchase`     | `models/ProductPurchase.ts`    | Acquisto (dati derivati dal ledger) |
| `StripeWebhookEvent` | `models/StripeWebhookEvent.ts` | Audit eventi Stripe                 |
| `Course`             | `models/Course.ts`             | Prodotto educativo principale       |
| `Product`            | `models/Product.ts`            | Prodotto generico                   |
| `ContentUser`        | `models/ContentUser.ts`        | Utente piattaforma                  |

---

## Principi Architetturali

1. **Immutabilità** — LedgerEntry non si aggiorna mai dopo la creazione.
2. **Separazione dei layer** — UI non contiene business logic; `lib/` non importa da `app/`.
3. **Idempotenza** — ogni operazione Stripe usa `stripeEventId` come chiave di deduplicazione.
4. **Graceful fallback** — transazioni MongoDB con fallback per ambienti single-node (dev locale).
5. **Server-first** — preferire Server Components e server actions; Client Components solo dove necessario.
6. **Scope ridotto** — ogni modifica tocca il perimetro minimo richiesto, specialmente con repo dirty.

---

## Ambienti

| Variabile               | Uso                      |
| ----------------------- | ------------------------ |
| `MONGODB_URI`           | Connessione MongoDB      |
| `AUTH_SECRET`           | Chiave sessioni NextAuth |
| `STRIPE_SECRET_KEY`     | Stripe API               |
| `STRIPE_WEBHOOK_SECRET` | Verifica firma webhook   |
| `NEXT_PUBLIC_APP_URL`   | Base URL pubblica        |

Tutte le variabili vanno in `.env.local` (non committare mai `.env.local`).
