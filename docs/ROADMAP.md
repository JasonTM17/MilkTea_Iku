# Roadmap — MilkTea Iku

> Author: Nguyễn Sơn (jasonbmt06@gmail.com)
> Last updated: 2026-05-17

---

> **30-second reviewer brief**
>
> Personal project roadmap — grounded, not aspirational marketing. Short term (1–3 months): migrate database to PostgreSQL, add user authentication, wire email service. Medium term (3–6 months): payment integration, persistent wishlist, admin product CRUD, observability. Long term: mobile app consideration, i18n, real-time order updates. All items are "nice to have" — this is a portfolio project, not a commercial product. Items are ordered by value-to-effort ratio, not by deadline.

---

## Table of Contents

1. [Short term — 1 to 3 months](#1-short-term--1-to-3-months)
2. [Medium term — 3 to 6 months](#2-medium-term--3-to-6-months)
3. [Long term — 6+ months](#3-long-term--6-months)
4. [Intentionally out of scope](#4-intentionally-out-of-scope)
5. [Status of known gaps](#5-status-of-known-gaps)

---

## 1. Short term — 1 to 3 months

These are the highest-priority gaps between the current demo state and a production-ready deployment. Each item has a clear implementation path already documented in the codebase.

### 1.1 Migrate database to PostgreSQL

**Why:** SQLite is single-writer and not suitable for multi-instance deployments. The schema and migration script are already prepared.

**What exists:**
- `D:\MilkTea_Iku\backend\prisma\schema.postgres.prisma` — Postgres-ready schema with indexes
- `D:\MilkTea_Iku\scripts\migrate-to-postgres.sh` — one-shot migration script

**Steps:**
1. Provision a managed PostgreSQL instance (Neon, Supabase, or Vercel Postgres)
2. Run `scripts/migrate-to-postgres.sh`
3. Update `DATABASE_URL` in Vercel environment variables
4. Switch rate limiter to Redis-backed (Upstash KV) — see item 1.3

**Effort:** Low — infrastructure work, no new code needed.

---

### 1.2 Wire email service

**Why:** Contact form submissions and newsletter subscriptions currently only persist to the database. No emails are sent.

**What exists:** The database models (`Contact`, `NewsletterSubscriber`) and API routes are complete. Only the email-sending step is missing.

**Plan:**
- Use [Resend](https://resend.com) (simple API, generous free tier) or SendGrid
- Add `RESEND_API_KEY` environment variable
- Update `src/app/api/contact/route.ts` to send confirmation email
- Update `src/app/api/newsletter/route.ts` to send welcome email

**Effort:** Low — 1–2 days of work.

---

### 1.3 Redis-backed rate limiting

**Why:** Current in-memory rate limiter resets on every server restart and does not work correctly under Vercel's serverless model (each function invocation may be a new instance).

**Plan:**
- Use [Upstash Redis](https://upstash.com) (serverless-compatible, free tier available)
- Replace `backend/lib/rate-limit.ts` sliding window with `@upstash/ratelimit`
- Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` env vars

**Effort:** Low — drop-in replacement for the rate limiter.

---

### 1.4 User authentication

**Why:** Guest checkout works for demo, but persistent wishlist, order history per user, and admin product management all require user accounts.

**Plan:**
- Use [Clerk](https://clerk.com) (Vercel Marketplace integration, free tier) or NextAuth.js
- Add user ID to `Order` model in Prisma schema
- Re-enable `/api/wishlist` (currently HTTP 410) with user-scoped persistence
- Add "My Orders" page with order history per authenticated user

**Effort:** Medium — 1–2 weeks. Requires schema migration and auth middleware changes.

---

## 2. Medium term — 3 to 6 months

These items depend on short-term work being complete (especially user auth and PostgreSQL).

### 2.1 Payment integration

**Why:** The checkout flow currently persists orders to the database but does not process payment. This is the most visible gap for a real e-commerce demo.

**Plan:**
- Integrate [Stripe](https://stripe.com) for international cards or [VNPay](https://vnpay.vn) for Vietnamese market
- Add `paymentStatus` and `paymentIntentId` fields to `Order` model
- Implement webhook handler for payment confirmation
- Update order status flow: `pending` → `paid` → `preparing` → `delivered`

**Note:** Payment integration requires PCI DSS compliance considerations. For a portfolio demo, Stripe's test mode is sufficient to demonstrate the integration.

**Effort:** Medium — 1–2 weeks for Stripe test mode integration.

---

### 2.2 Admin product CRUD

**Why:** Currently, products can only be read via API. Creating, updating, and deleting products requires direct database access. This limits the admin dashboard's usefulness.

**What exists:** Admin order management (read + status update) is already implemented at `src/app/admin/`.

**Plan:**
- Add `POST /api/admin/products` — create product
- Add `PATCH /api/admin/products/[id]` — update product (name, price, availability, image)
- Add `DELETE /api/admin/products/[id]` — soft delete (set `isAvailable: false`)
- Add product management UI to admin dashboard

**Effort:** Medium — 3–5 days.

---

### 2.3 Observability

**Why:** Currently only structured JSON logs to stdout. No error tracking, no performance monitoring, no alerting.

**Plan:**
- Add [Sentry](https://sentry.io) for error tracking (free tier, Next.js SDK)
- Add [Logtail](https://betterstack.com/logtail) or [Axiom](https://axiom.co) for log aggregation
- Set up uptime monitoring with UptimeRobot or Better Uptime on `/api/health`

**Effort:** Low — 1 day for Sentry setup, 1 day for log aggregation.

---

### 2.4 API pagination

**Why:** `GET /api/products` and `GET /api/admin/orders` return all records. This will be slow as data grows.

**Plan:**
- Add `page` and `limit` query params to product list and order list endpoints
- Return `meta: { total, page, limit, totalPages }` (already in `paginatedResponse` helper)
- Update admin dashboard to use paginated order list

**Effort:** Low — 1–2 days.

---

### 2.5 Bundle size optimization

**Why:** Framer Motion (~30 KB gzipped) is used for animations that could be replaced with CSS transitions. No formal bundle size gate in CI.

**Plan:**
- Add `@next/bundle-analyzer` to dev dependencies
- Add bundle size check to CI (fail if shared JS > 150 KB gzipped)
- Evaluate replacing Framer Motion with CSS animations for non-critical transitions

**Effort:** Low — 1 day.

---

## 3. Long term — 6+ months

These are exploratory ideas, not committed plans. They depend on the project growing beyond a portfolio demo.

### 3.1 Internationalization (i18n)

The UI is currently Vietnamese-only. README has English, Vietnamese, and Japanese versions, but UI strings are not internationalized.

**Approach:** Next.js built-in i18n routing + `next-intl` library. Would require extracting all UI strings to translation files.

**Effort:** High — affects every component.

---

### 3.2 Real-time order updates

Currently, the admin order list requires a manual page refresh to see new orders. Order status updates are not pushed to customers.

**Approach:** Server-Sent Events (SSE) via a Next.js Route Handler, or WebSocket via a separate service. Vercel supports SSE natively.

**Effort:** Medium — 1 week.

---

### 3.3 Mobile app

The web app is mobile-responsive and has a PWA manifest. A native mobile app is not planned but could be built with React Native sharing the same API layer.

**Approach:** React Native + Expo, consuming the existing REST API. No shared code with the web frontend beyond types.

**Effort:** High — separate project.

---

### 3.4 ISR for product catalog

Replace `force-dynamic` on product list pages with ISR (`revalidate: 60`) to reduce database load and improve response times for read-heavy pages.

**Approach:** Add `export const revalidate = 60` to product list Server Components. Add on-demand revalidation trigger when products are updated via admin API.

**Effort:** Low — but requires admin product CRUD (item 2.2) to be complete first.

---

### 3.5 Multi-region deployment

Currently deployed to Vercel Singapore (`sin1`) only. For users in other regions, latency is higher.

**Approach:** Vercel automatically serves static assets globally. For dynamic routes, Vercel's fluid compute handles regional routing. No action needed unless latency becomes a measured problem.

**Effort:** Low (Vercel handles it) — but requires PostgreSQL migration first (SQLite cannot be multi-region).

---

## 4. Intentionally out of scope

These items are explicitly not planned, for the reasons stated.

| Item | Reason |
|------|--------|
| GDPR/HIPAA compliance | No real user data, no commercial operation |
| Canary deploys / feature flags | Overkill for a single-developer portfolio project |
| Kubernetes / ECS | Docker Compose is sufficient for self-hosted demo |
| Microservices architecture | Monorepo Next.js is the right fit for this scale |
| Load testing (k6/locust) | No real traffic to optimize for |
| Multi-tenant SaaS | Not the project's purpose |

---

## 5. Status of known gaps

Cross-reference with `PRODUCTION_CHECKLIST.md` and `docs/HONEST_SCOPE.md`.

| Gap | Priority | Blocking on | Status |
|-----|----------|-------------|--------|
| PostgreSQL migration | High | Nothing | Ready to execute — schema + script exist |
| Email service | High | Nothing | Ready to wire — API routes exist |
| Redis rate limiting | High | Nothing | Ready to swap — interface is clean |
| User authentication | High | Nothing | Design decision needed (Clerk vs NextAuth) |
| Payment integration | Medium | User auth | Depends on user accounts |
| Admin product CRUD | Medium | Nothing | API design straightforward |
| Observability (Sentry) | Medium | Nothing | 1-day task |
| API pagination | Medium | Nothing | Helper already exists |
| Bundle size gate | Low | Nothing | Dev tooling only |
| i18n | Low | Nothing | High effort, low portfolio value |
| Real-time updates | Low | Nothing | Nice to have |

---

## Related

- [`docs/HONEST_SCOPE.md`](./HONEST_SCOPE.md) — Current state vs aspirational state
- [`PRODUCTION_CHECKLIST.md`](../PRODUCTION_CHECKLIST.md) — Gate items before go-live
- [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md) — How to deploy changes
- [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — System design context
