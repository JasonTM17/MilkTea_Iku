# Honest Scope — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (`jasonbmt06@gmail.com`)

---

> **30-second reviewer brief**
>
> This document is the authoritative, unmarketed description of what MilkTea Iku is and is not. It is updated each release to reflect actual state — not aspirational state. Key honest facts: **this is a personal learning / portfolio project** by Nguyễn Sơn (not a commercial product), database is SQLite (not production Postgres), no payment processing, no email delivery, no user accounts, no external observability, no pen-test. What IS production-shaped: CI/CD, security scanning, rate limiting, server-side price recomputation, timing-safe auth, Zod validation, Docker multi-stage builds, and 35 Playwright spec files.

---

Tài liệu này mô tả thẳng thắn dự án MilkTea Iku **LÀ GÌ** và **KHÔNG PHẢI LÀ GÌ**. Mục đích là cung cấp cho reviewer (recruiter, kỹ sư khác, hoặc bản thân tương lai) một bản đánh giá ổn định, không bị marketing copy làm sai lệch kỳ vọng.

README có thể được "đẹp hoá" qua nhiều lần update. File này được giữ ngắn, cập nhật mỗi release để phản ánh trạng thái thật.

---

## Mục lục

1. [Đây là gì](#1-đây-là-gì)
2. [Đây không phải là gì](#2-đây-không-phải-là-gì)
3. [Production-shaped — cái gì đã có](#3-production-shaped--cái-gì-đã-có)
4. [Còn thiếu có chủ ý](#4-còn-thiếu-có-chủ-ý-intentionally-missing)
5. [Cách xác minh từng claim](#5-cách-xác-minh-từng-claim)
6. [Status matrix theo PRODUCTION_CHECKLIST](#6-status-matrix)

---

## 1. Đây là gì

MilkTea Iku là **dự án portfolio full-stack cá nhân** (learning + portfolio project) được Nguyễn Sơn xây dựng để:

- Thực hành kiến trúc Next.js 14 App Router end-to-end (server components, route handlers, middleware, streaming).
- Trình bày kỹ năng full-stack: API design (24 routes), database modeling (Prisma 5.14), CI/CD (6 workflows), Docker (multi-stage), testing (35 spec files Playwright).
- Làm artifact hồ sơ ứng tuyển — kèm theo bản đánh giá ngang hàng (`docs/REVIEW_EVIDENCE.md`) để reviewer có thể xác minh từng tuyên bố mà không cần tin README.

Repo có infrastructure live (Vercel + Docker Hub), có security workflows (CodeQL, Gitleaks, Trivy, Dependabot), nhưng **chưa có người dùng thật và không phục vụ traffic thương mại**.

---

## 2. Đây không phải là gì

| Tuyên bố KHÔNG đưa ra                            | Lý do                                                                                                                                                                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SaaS thương mại đang chạy production             | Không có khách hàng trả phí, không có SLA, không có on-call.                                                                                                                                                             |
| Đã được pen-test bởi bên thứ ba                  | Chỉ có CodeQL + Trivy + npm audit (`.github/workflows/security.yml`). Chưa có pen-test thủ công.                                                                                                                         |
| HA hoặc multi-region                             | Vercel deploy region `sin1` (Singapore) duy nhất, không có failover.                                                                                                                                                     |
| Tích hợp thanh toán thật (Stripe / VNPay / MoMo) | Checkout flow chỉ persist đơn vào DB. Không xử lý payment.                                                                                                                                                               |
| Email transactional thật                         | Contact form và newsletter chỉ persist; chưa wire lên Resend/SendGrid/SES.                                                                                                                                               |
| Database production-ready ở trạng thái hiện tại  | Active schema (`backend/prisma/schema.prisma`) đang dùng SQLite. Postgres-ready schema có sẵn ở `backend/prisma/schema.postgres.prisma` và script chuyển đổi `scripts/migrate-to-postgres.sh`, nhưng chưa được activate. |
| Wishlist persistent theo user                    | API `/api/wishlist` đã DISABLE (HTTP 410) sau security audit 2026-05-17. Wishlist client-side chỉ trong localStorage qua zustand. Sẽ mở lại sau khi có user auth.                                                        |
| Observability stack                              | Chỉ có structured JSON logger (`backend/lib/logger.ts`). Chưa có Sentry, Datadog, OpenTelemetry. Tracked trong `PRODUCTION_CHECKLIST.md` §5.                                                                             |
| Canary deploys / blue-green                      | Vercel auto-deploy thẳng từ `main`. Có `concurrency` group nhưng không có canary.                                                                                                                                        |
| Feature flags                                    | Không có. Mọi thay đổi đều ship trực tiếp.                                                                                                                                                                               |
| Load testing chính thức                          | Rate limiting có (in-memory sliding window) nhưng chưa load-test bằng k6/locust/wrk.                                                                                                                                     |
| Internationalization (i18n) đầy đủ ở UI          | UI primary tiếng Việt; README có 3 ngôn ngữ (en/vi/ja) nhưng chuỗi UI chưa i18n.                                                                                                                                         |
| Tuân thủ GDPR/HIPAA/SOC 2                        | Chưa có DPIA, chưa có DPO, chưa có audit chính thức.                                                                                                                                                                     |
| Khả năng scale ngang                             | SQLite single-file single-writer; cần migrate Postgres + Redis-backed rate limit (xem `PRODUCTION_CHECKLIST.md` §2 §4).                                                                                                  |
| Uptime 99.9%+                                    | Vercel free-tier không có SLA chính thức.                                                                                                                                                                                |

---

## 3. Production-shaped — cái gì đã có

Những thứ sau được implement theo chuẩn production và **có thể xác minh trong code**:

| Thành phần                        | Vị trí                                                             | Ghi chú                                                                               |
| --------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Monorepo TypeScript               | `package.json`, `tsconfig.json`                                    | strict mode, paths aliases                                                            |
| CI/CD pipeline                    | `.github/workflows/ci.yml`                                         | lint → typecheck → build → docker push                                                |
| Vercel auto-deploy                | `.github/workflows/deploy.yml`                                     | concurrency group, smoke test sau deploy                                              |
| Multi-stage Docker                | `Dockerfile.backend`, `Dockerfile.frontend`                        | + `docker-compose.yml` cho self-host                                                  |
| Container registry (release tags) | `.github/workflows/docker-publish.yml`                             | provenance + SBOM                                                                     |
| Security scanning                 | `.github/workflows/codeql.yml`, `.github/workflows/security.yml`   | CodeQL extended queries + Gitleaks + Trivy fs                                         |
| Dependabot                        | `.github/dependabot.yml`                                           | npm + github-actions + docker, weekly                                                 |
| Security headers                  | `src/middleware.ts`, `vercel.json`                                 | HSTS, CSP, X-Frame-Options, Permissions-Policy                                        |
| Rate limiting per-IP              | `backend/lib/rate-limit.ts`                                        | sliding window 60s; in-memory (xem `PRODUCTION_CHECKLIST.md` §4 để chuyển sang Redis) |
| Server-side price recompute       | `src/app/api/orders/route.ts` dòng 82–105                          | chống tampering total từ client                                                       |
| Admin auth — basic + bearer       | `backend/lib/auth.ts`                                              | `timingSafeEqual` compare + scrypt hash support                                       |
| Scrypt password hashing           | `backend/lib/password.ts`                                          | optional `ADMIN_PASSWORD_HASH` thay cho plaintext                                     |
| Input validation                  | Zod schemas trong mỗi POST endpoint                                | reject invalid với 400 + field errors                                                 |
| SSRF protection (chatbot)         | `src/app/api/chatbot/route.ts`                                     | HTTPS only, block private IPs, hostname allowlist, 8s timeout                         |
| Order tracking PII redaction      | `src/app/api/orders/tracking/route.ts`                             | redact address, require phone+orderId                                                 |
| OpenAPI 3.0 docs                  | `src/app/api/docs/route.ts`                                        | self-describing API surface                                                           |
| Health check                      | `src/app/api/health/route.ts`                                      | dùng cho liveness probe                                                               |
| Playwright suite                  | `tests/` 35 spec files                                             | e2e + api + a11y + visual + perf + seo                                                |
| Prisma schema (Postgres-ready)    | `backend/prisma/schema.postgres.prisma`                            | indexes trên hot lookups                                                              |
| One-shot migration script         | `scripts/migrate-to-postgres.sh`                                   | backup + activate + push                                                              |
| Reviewer-first docs               | `docs/INDEX.md`, `docs/REVIEW_EVIDENCE.md`, `docs/HONEST_SCOPE.md` | đây                                                                                   |

---

## 4. Còn thiếu có chủ ý (intentionally missing)

Những thứ sau **không có** và đây là quyết định có chủ ý — không phải bỏ sót:

- **Payment gateway** — không cần cho mục đích demo; thêm sẽ yêu cầu PCI DSS compliance.
- **Email service** — không cần cho demo; production cần Resend/SendGrid/SES.
- **User authentication** — guest checkout mặc định; thêm sẽ yêu cầu NextAuth/Clerk + persistent wishlist.
- **Persistent wishlist** — đã disable HTTP 410 sau audit; sẽ mở lại sau khi có user auth.
- **External observability** — chỉ JSON log; production cần Sentry + Logtail/Axiom.
- **Database migration history** — dùng `prisma db push` thay vì `prisma migrate`; production cần `migrate deploy` (đã ghi trong `PRODUCTION_CHECKLIST.md` §2).
- **Admin product CRUD qua API** — hiện chỉ có read + order status update. Tạo/sửa/xóa product chưa expose qua API.
- **Canary / feature flags** — không có. Mọi thay đổi deploy thẳng.
- **CDN cho images** — Images dùng Unsplash + Next.js Image Optimization, chưa có CDN riêng.
- **Real-time updates** — không có WebSocket/SSE; admin order list yêu cầu refresh.

---

## 5. Cách xác minh từng claim

Reviewer có thể xác minh mọi claim trong README mà không cần chạy code:

| Claim trong README               | Cách xác minh                                                              |
| -------------------------------- | -------------------------------------------------------------------------- |
| "36 pages"                       | `find src/app -name page.tsx \| wc -l`                                     |
| "24 API routes"                  | `find src/app/api -name route.ts \| wc -l`                                 |
| "94 components"                  | `find frontend/components -name "*.tsx" \| wc -l`                          |
| "35 Playwright spec files"       | `find tests -name "*.spec.ts" \| wc -l`                                    |
| "6 GitHub Actions workflows"     | `ls .github/workflows`                                                     |
| "CI/CD pipeline"                 | Xem `.github/workflows/ci.yml` — 3 jobs: lint, build, docker               |
| "CodeQL active"                  | `.github/workflows/codeql.yml` + tab Security trên GitHub                  |
| "Docker Ready"                   | `docker compose up -d` từ root directory                                   |
| "Security headers"               | `curl -I https://milktea-iku.vercel.app`                                   |
| "Rate limiting"                  | Gửi 6+ POST `/api/newsletter` trong 60s — request thứ 6 trả 429            |
| "Server-side price recalc"       | `src/app/api/orders/route.ts` dòng 82–105                                  |
| "Health check"                   | `curl https://milktea-iku.vercel.app/api/health`                           |
| "OpenAPI docs"                   | `curl https://milktea-iku.vercel.app/api/docs`                             |
| "Admin auth guard"               | `curl https://milktea-iku.vercel.app/api/admin/stats` → 401                |
| "Wishlist API disabled (410)"    | `curl https://milktea-iku.vercel.app/api/wishlist` → 410                   |
| "Scrypt password hashing"        | Xem `backend/lib/password.ts`                                              |
| "Timing-safe credential compare" | `backend/lib/auth.ts` dùng `timingSafeEqual`                               |
| "SSRF protection chatbot"        | `src/app/api/chatbot/route.ts` `isAllowedWebhook()`                        |
| "Postgres-ready"                 | `backend/prisma/schema.postgres.prisma` + `scripts/migrate-to-postgres.sh` |

---

## 6. Status matrix

Đối chiếu hiện trạng với `PRODUCTION_CHECKLIST.md` (gate trước khi go-live thật):

| Checklist section              | State                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| §1 Secrets & rotation          | Code path sẵn sàng (`scripts/generate-admin-hash.mjs`). Vercel/GitHub secrets cần được rotate thủ công. |
| §2 Database (managed Postgres) | Schema + migration script ready. Chưa active trên server.                                               |
| §3 Dependency posture          | Dependabot active. Next.js bump cần manual upgrade.                                                     |
| §4 Rate limit ngoài bộ nhớ     | Code dùng in-memory; cần Upstash KV/Redis.                                                              |
| §5 Observability               | Chưa wire Sentry.                                                                                       |
| §6 CI/CD hardening             | Workflows pin SHA + least privilege + security scans — DONE.                                            |
| §7 Custom domain               | Tuỳ chọn.                                                                                               |
| §8 Email                       | Chưa wire.                                                                                              |
| §9 Backup/DR                   | Tuỳ DB provider.                                                                                        |
| §10 Pre-launch verification    | `lint` + `tsc` + `build` PASS — DONE.                                                                   |

---

## Liên quan

- [`README.md`](../README.md) — Cổng vào dự án
- [`PRODUCTION_CHECKLIST.md`](../PRODUCTION_CHECKLIST.md) — Gate trước go-live
- [`docs/REVIEW_EVIDENCE.md`](./REVIEW_EVIDENCE.md) — Bằng chứng cho reviewer
- [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — Sơ đồ hệ thống
- [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md) — Hướng dẫn triển khai
- [`SECURITY_NOTICE.md`](../SECURITY_NOTICE.md) — Audit log credentials
