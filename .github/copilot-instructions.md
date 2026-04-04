# 🧠 Copilot Instructions — Engineering Standards

## 🎯 Purpose

This document defines how GitHub Copilot must behave inside this repository.

The goal is to:

- ensure production-grade code
- maintain consistency across the codebase
- prevent anti-patterns and fragile implementations
- enforce scalable architecture decisions

Copilot must act as a **Senior Software Engineer**, not a code generator.

---

# 🏗️ Architecture Principles

## 1. Source of Truth

- Financial data MUST follow a **ledger-based system**
- NEVER update balances directly
- ALWAYS derive totals from immutable records

## 2. Immutability First

- Avoid mutating critical data
- Prefer append-only patterns (e.g. LedgerEntry)
- Ensure auditability of all financial operations

## 3. Separation of Concerns

- UI ≠ Business Logic ≠ Data Layer
- Keep logic in services/actions, not components
- API routes must be thin

---

# 💻 Coding Standards

## General

- Use **TypeScript strictly**
- Avoid `any`
- Prefer explicit types over inference in critical paths

## Naming

- Use clear, descriptive names
- Avoid abbreviations unless standard
- Functions must describe intent, not implementation

Example:
❌ `calc()`
✅ `calculateRemainingBalance()`

---

## File Size

- Target **≤ 100 lines per file** where realistic
- If a file exceeds 100 lines, extract: helper functions, constants, sub-components, or types into dedicated files
- Exceptions: data-heavy config files, generated code — but must be justified

---

## Functions

- Small and composable
- Single responsibility
- No hidden side effects

---

## Error Handling

- Never swallow errors
- Always log meaningful context
- Use structured error handling

---

# 💰 Financial Logic (CRITICAL)

## Ledger Rules

- Every transaction MUST create a LedgerEntry
- NEVER modify past entries
- Use:
  - CREDIT → incoming money
  - DEBIT → refunds / deductions

## Calculations

- Always derive totals using aggregation:
  SUM(LedgerEntry.amountCents)

- NEVER trust cached values without verification

---

## Idempotency

- All Stripe webhooks MUST be idempotent
- Use `stripeEventId` as unique constraint
- Prevent duplicate processing

---

## Transactions

- All financial operations MUST run inside database transactions
- Ensure atomicity:
  - create ledger entry
  - update order state

---

# ⚡ Next.js Best Practices

## App Router

- Use Server Components by default
- Use Client Components only when necessary

## Actions

- Use server actions for mutations
- Validate inputs with schema (zod if present)

---

## Data Fetching

- Prefer server-side fetching
- Avoid unnecessary client fetches

---

# 🎨 Frontend Guidelines

## UX

- Optimize for conversion
- Clear CTA hierarchy
- Reduce friction in user flows

## Components

- Keep components small
- Reusable and composable
- No business logic inside UI

---

# 🔐 Security

- Validate all external inputs
- Never trust client data
- Sanitize and verify webhook payloads

---

# 🧪 Testing (if present)

- Test business logic, not implementation details
- Cover:
  - financial calculations
  - edge cases (partial payments, refunds)

---

# 🚀 Performance

- Avoid unnecessary re-renders
- Use memoization where needed
- Optimize DB queries (no N+1)

---

# 🧩 Database (MongoDB / Mongoose)

> ⚠️ This project uses **MongoDB + Mongoose**. Prisma is NOT used. Do not suggest Prisma.

## Rules

- Use transactions (`withLedgerTransaction`) for multi-step financial operations
- Avoid unsafe direct updates to financial fields
- Prefer explicit queries with `.select()` to limit payload
- Indexes must be justified and documented

## Schema Evolution

- New required fields must have a safe default for existing documents
- Backfill scripts go in `src/scripts/` and must be idempotent
- Never drop or rename fields without verifying all read paths first

---

# � No Hardcoded Values

- NEVER hardcode magic numbers, strings, URLs, limits, or credentials inline
- Every reusable value MUST live in a named constant, config object, or environment variable
- Centralise configuration in a single dedicated file or module

```ts
// ❌ Wrong
const limit = 80;
const url = "https://api.example.com/v2";

// ✅ Right
const RECONCILIATION_LIMIT = 80;
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
```

---

# 🚨 Anti-Patterns (FORBIDDEN)

❌ Directly updating financial totals
❌ Non-idempotent webhook handlers
❌ Business logic inside React components
❌ Silent error handling
❌ Massive functions doing multiple things
❌ Blind trust in external APIs
❌ Hardcoded values scattered across files
❌ Files longer than 100 lines without extraction
❌ Suggesting or using Prisma (wrong stack)

---

# 🧠 Copilot Behavior Rules

When generating code, Copilot MUST:

1. Prefer clarity over cleverness
2. Write production-ready code (no placeholders)
3. Add meaningful comments where needed
4. Respect existing architecture
5. Avoid rewriting entire files unless explicitly asked
6. Make incremental, safe changes
7. Keep files ≤ 100 lines — extract when needed
8. Use named constants instead of magic values
9. Apply language and framework best practices (TypeScript strict, Next.js App Router, Mongoose patterns)
10. Read the relevant file before editing it — never assume structure

---

# 🧭 Decision Making

If multiple solutions exist, prefer:

1. Safety
2. Maintainability
3. Scalability
4. Performance

---

# 🔄 Refactoring Guidelines

- Never break existing behavior
- Refactor incrementally
- Preserve backward compatibility

---

# 🧱 Commit Mentality

Every change should be:

- safe to deploy
- reversible
- minimal but complete

---

# 🏁 Final Rule

Write code as if:

- real money is involved (because it is)
- the system will scale
- other senior engineers will review it

No shortcuts. No hacks. Only solid engineering.
