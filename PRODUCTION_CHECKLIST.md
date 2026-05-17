# Production Readiness Checklist

> **Audience:** Maintainers preparing to take MilkTea Iku from learning project to a deployment that handles real traffic.
> **Last updated:** 2026-05-17
> **Author:** Nguyễn Sơn (`jasonbmt06@gmail.com`)

This checklist is the single source of truth for the work that must be done **outside the codebase** before MilkTea Iku is fit for real users. The repository contains the code-level changes; this document tracks the operational steps the maintainer must perform on Vercel, GitHub, registries and DNS.

---

## How to use this document

1. Work top-to-bottom. Each section is a hard gate — do not skip.
2. Tick each box as you complete the step. Save the file with your tick marks once done.
3. When all blocking sections are complete, you may flip the project from "portfolio / staging" to "production-eligible" in `docs/HONEST_SCOPE.md`.

Severity legend:

| Tag | Meaning |
|---|---|
| `[BLOCKING]` | Must complete before any production traffic. |
| `[STRONGLY-RECOMMENDED]` | Required to remove a HIGH-severity finding from `docs/UI_AUDIT_REPORT.md` or `SECURITY_NOTICE.md`. |
| `[OPS-HYGIENE]` | Reduces operational risk; complete before opening to a wider audience. |

---

## 1. Secrets & credential rotation `[BLOCKING]`

The repository was public during early development; assume any value committed before commit `dc8d7fd` is compromised.

- [ ] Generate a new `ADMIN_USERNAME` (anything other than `admin`).
- [ ] Generate a new `ADMIN_PASSWORD` of at least 24 characters: `openssl rand -base64 24`.
- [ ] Generate `ADMIN_PASSWORD_HASH` using `node scripts/generate-admin-hash.mjs` and prefer this to plaintext.
- [ ] Generate a new `ADMIN_API_TOKEN` of at least 48 characters: `openssl rand -base64 48`.
- [ ] Generate a new `N8N_PASSWORD` if the n8n service is exposed.
- [ ] Push the new values to Vercel: **Project → Settings → Environment Variables**, scoped to *Production* and *Preview* separately.
- [ ] Push the new values to GitHub: **Settings → Secrets and variables → Actions** for `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`.
- [ ] Trigger a fresh Vercel deploy and a `Deploy to Vercel` GitHub Actions run; verify both succeed.
- [ ] Update `SECURITY_NOTICE.md` audit log with the rotation date.

## 2. Database migration to managed Postgres `[BLOCKING]`

SQLite cannot survive Vercel Functions cold starts; data is lost between invocations. The repo ships a Postgres-ready schema in `backend/prisma/schema.postgres.prisma`.

- [ ] Choose a managed Postgres: Vercel Postgres, Neon, Supabase, or RDS.
- [ ] Provision the database and obtain the `postgresql://...` connection string.
- [ ] Set `DATABASE_URL` in Vercel (Production + Preview) to the connection string.
- [ ] On a clean working tree, run `bash scripts/migrate-to-postgres.sh` locally pointed at the new database.
- [ ] Re-seed reference data: `npm run db:seed`.
- [ ] Commit the regenerated `backend/prisma/schema.prisma` (now Postgres) and any generated `migrations/` folder.
- [ ] Verify reads/writes from production: `curl https://milktea-iku.vercel.app/api/health`, place a test order, confirm it persists across requests.

## 3. Dependency posture `[BLOCKING]`

`docs/REVIEW_EVIDENCE.md` and the security audit flagged Next.js 14.2.0 with multiple HIGH advisories.

- [ ] Bump `next` to a supported patched line (target: latest 14.x patched, or 15.x if no breaking changes for the App Router routes used).
- [ ] Run `npm audit fix` and then `npm audit --omit=dev --audit-level=high` — must report zero high/critical advisories.
- [ ] Re-run `npm run build` and `npm run lint` — both must pass.
- [ ] Re-run the Playwright suite locally against the dev server.
- [ ] Confirm Dependabot is active: `.github/dependabot.yml` is present; check **Insights → Dependency graph → Dependabot** in GitHub.

## 4. Rate limiting backed by external state `[STRONGLY-RECOMMENDED]`

The current limiter in `backend/lib/rate-limit.ts` uses an in-memory `Map`, which does not work across Vercel function invocations.

- [ ] Provision Upstash Redis or Vercel KV.
- [ ] Add `KV_URL` (and `KV_REST_API_TOKEN` if Upstash) to Vercel env vars.
- [ ] Replace the in-memory limiter with `@upstash/ratelimit` (sliding-window, Redis-backed).
- [ ] Re-test `/api/orders`, `/api/contact`, `/api/coupons/validate`, `/api/orders/tracking`, `/api/chatbot` — verify 429 is returned after the configured threshold.

## 5. Observability `[STRONGLY-RECOMMENDED]`

There is no error tracking or distributed tracing yet.

- [ ] Add Sentry to both client and server bundles. Set `SENTRY_DSN` in Vercel env vars.
- [ ] Add structured logs to a managed sink — Vercel Logs, Logtail, or Axiom.
- [ ] Add an uptime check against `/api/health` (Better Uptime, UptimeRobot, or Pingdom).
- [ ] Set up an alert channel (email, Slack, Discord) and a runbook entry for on-call response.

## 6. CI/CD hardening `[OPS-HYGIENE]`

The workflows in `.github/workflows/` were updated in 2026-05-17 to pin actions and enforce least privilege; verify the rest.

- [ ] All `uses:` references in `.github/workflows/*.yml` are pinned to a commit SHA with a tag comment (already applied).
- [ ] Each workflow declares `permissions:` at the workflow or job level (already applied).
- [ ] Branch protection on `main`: require PRs, require CI to pass, require code review, no force-push.
- [ ] Enable **GitHub Advanced Security → CodeQL** results in the Security tab (`codeql.yml` workflow already shipped).
- [ ] Enable **Secret scanning** and **Push protection** in repo Settings → Code security and analysis.
- [ ] Confirm `gitleaks` and `trivy` workflows in `.github/workflows/security.yml` run green on `main`.

## 7. Domain & TLS `[BLOCKING for custom domain]`

If you intend to serve traffic on a custom domain rather than `*.vercel.app`:

- [ ] Buy/transfer the domain and add it in Vercel → Domains.
- [ ] Set DNS records as instructed by Vercel; verify via `dig +short <your-domain>`.
- [ ] Wait for the certificate to be issued; test `https://<your-domain>` with a clean cache.
- [ ] Add `https://<your-domain>` to `CSP` policy values in `src/middleware.ts` if you load assets from elsewhere.
- [ ] Update `metadataBase` in `src/app/layout.tsx` to the production URL.
- [ ] Update canonical/Open Graph URLs in any hard-coded references.

## 8. Email & notifications `[BLOCKING for orders]`

The contact form and newsletter currently persist to DB only. There is no transactional email yet.

- [ ] Sign up for Resend, Postmark, SendGrid, or SES.
- [ ] Set the API key in Vercel env vars.
- [ ] Implement and wire a transactional email service in `backend/lib/email.ts`.
- [ ] Send order-confirmation and contact-form-receipt emails.
- [ ] Verify SPF/DKIM/DMARC records on the sending domain.

## 9. Backups & disaster recovery `[OPS-HYGIENE]`

- [ ] Enable point-in-time recovery on the managed Postgres (Vercel Postgres has 7-day PITR by default; verify).
- [ ] Schedule a daily logical backup (`pg_dump`) into S3-compatible object storage.
- [ ] Document the restore procedure — including the exact `pg_restore` invocation — in `docs/DEPLOYMENT.md` § Recovery.

## 10. Pre-launch verification `[BLOCKING]`

Run the final gate before flipping `HONEST_SCOPE.md` from "demo" to "production-eligible".

- [ ] `npm run lint` — zero warnings, zero errors.
- [ ] `npx tsc --noEmit` — zero errors.
- [ ] `npm run build` — succeeds with no warnings about missing env vars.
- [ ] `npx playwright test` — full suite green against staging.
- [ ] Lighthouse on Vercel preview ≥ 90 in Performance, Accessibility, Best Practices, SEO.
- [ ] Manual smoke: order flow → confirmation → admin sees the order.
- [ ] Manual smoke: contact form → admin newsletter list shows submission.
- [ ] Manual smoke: dark/light theme toggle persists across reloads.
- [ ] All boxes in `docs/UI_AUDIT_REPORT.md` are either resolved or explicitly tracked in a follow-up issue.

---

## Sign-off

When every blocking box above is checked:

- [ ] Update `docs/HONEST_SCOPE.md` to reflect the new posture.
- [ ] Tag a release (`git tag v1.0.0 && git push --tags`) — the `release.yml` workflow will publish images and notes.
- [ ] Announce the production launch in the project README footer.

---

## Related

- [`SECURITY_NOTICE.md`](SECURITY_NOTICE.md) — credential rotation and disclosure history
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — deploy targets and env reference
- [`docs/HONEST_SCOPE.md`](docs/HONEST_SCOPE.md) — declared scope vs. real capability
- [`docs/REVIEW_EVIDENCE.md`](docs/REVIEW_EVIDENCE.md) — verifiable claims with file pointers
