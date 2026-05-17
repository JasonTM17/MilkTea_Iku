# Review Evidence — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (`jasonbmt06@gmail.com`)

---

> **30-second reviewer brief**
>
> Every claim in the README is backed by a reproducible command in this file. Metrics (36 pages, 24 API routes, 94 components, 35 spec files, 6 workflows) are counted directly from the filesystem — not estimated. Build output, security posture, CI/CD hardening (SHA-pinned actions, least-privilege permissions), and accessibility evidence are all documented with exact file references and verification commands. Run any command below to independently confirm a claim without trusting the maintainer.

---

Tài liệu này cung cấp **bằng chứng có thể kiểm tra được** cho mọi claim trong [`README.md`](../README.md). Mỗi entry kèm theo lệnh để reviewer chạy lại độc lập.

---

## Mục lục

1. [Repo metrics — đo trực tiếp](#1-repo-metrics)
2. [Build & verification gates](#2-build--verification-gates)
3. [Test inventory](#3-test-inventory)
4. [Security posture](#4-security-posture)
5. [Accessibility & dark mode](#5-accessibility--dark-mode)
6. [CI/CD evidence](#6-cicd-evidence)
7. [Documentation suite](#7-documentation-suite)

---

## 1. Repo metrics

Mọi con số trong README được tính trực tiếp từ filesystem:

| Metric | Value | Reproduce |
|---|---|---|
| Pages (App Router) | 36 | `find src/app -name page.tsx \| wc -l` |
| API routes | 24 | `find src/app/api -name route.ts \| wc -l` |
| React components | 94 | `find frontend/components -name "*.tsx" \| wc -l` |
| shadcn/ui primitives | 12 | `ls frontend/components/ui \| wc -l` |
| Playwright spec files | 35 | `find tests -name "*.spec.ts" \| wc -l` |
| GitHub Actions workflows | 6 | `ls .github/workflows \| wc -l` |
| Docs files (Markdown) | 18+ | `ls docs/*.md \| wc -l` |

---

## 2. Build & verification gates

Mọi gate phải xanh trước khi merge `main`.

### TypeScript — strict, zero errors

```bash
npx tsc --noEmit
```

Chạy trong CI job `lint` ([`.github/workflows/ci.yml`](../.github/workflows/ci.yml)). Last green: 2026-05-17.

### ESLint — zero warnings

```bash
npm run lint
```

Output reviewer expects:

```
✔ No ESLint warnings or errors
```

### Production build

```bash
npm run build
```

Chỉ số quan sát được trên build cuối (2026-05-17):

| Metric | Value |
|---|---|
| Total static pages | ~35 |
| Total dynamic pages | ~15 |
| First-load shared JS | 87.4 kB |
| Middleware bundle | 27.3 kB |
| Build exit code | 0 |

Reproduce:
```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
npm ci --legacy-peer-deps
cp .env.example .env.local
npx prisma generate --schema=backend/prisma/schema.prisma
npm run db:push
npm run build
```

---

## 3. Test inventory

35 spec files trong `tests/`, phân theo lớp:

| Folder | Mục đích |
|---|---|
| `tests/e2e/` | End-to-end user journeys (homepage, menu, checkout, contact, dark mode, mobile, navigation, …) |
| `tests/api/` | HTTP contract tests (admin, advanced, chatbot, endpoints, extended, health, orders, products, rate-limit) |
| `tests/accessibility/` | A11y assertions: alt text, aria-label, focus-visible |
| `tests/visual/` | Snapshot regression |
| `tests/performance/` | Lighthouse budget |
| `tests/security/` | Header presence, auth gates |
| `tests/seo/` | Meta tags |
| `tests/helpers/` | Shared utilities |
| `tests/fixtures/` | Test data |

Run:
```bash
npx playwright install --with-deps
npx playwright test
```

---

## 4. Security posture

### 4.1 Secret hygiene

| Check | Command | Expected |
|---|---|---|
| No tracked `.env` | `git ls-files \| grep -E "^\\.env$\|\\.env\\.local"` | empty |
| No tracked dev DB | `git ls-files \| grep -E "\\.db$\|\\.sqlite"` | empty |
| No hardcoded admin credentials | `grep -rn "milktea-iku-2026\|milktea-iku-admin-token-2026" --include="*.{ts,tsx,json,yml,yaml,md}" \| grep -v node_modules \| grep -v SECURITY_NOTICE` | empty |

Audit log của các credential rotations: [`SECURITY_NOTICE.md`](../SECURITY_NOTICE.md).

### 4.2 Auth implementation

- File: [`backend/lib/auth.ts`](../backend/lib/auth.ts)
- Pattern: HTTP Basic + Bearer token
- Compare: `crypto.timingSafeEqual` (constant-time, không phải `===`)
- Password storage: optional `ADMIN_PASSWORD_HASH` (scrypt) — xem [`backend/lib/password.ts`](../backend/lib/password.ts)
- Generator: `node scripts/generate-admin-hash.mjs`

### 4.3 Defense in depth

| Endpoint | Guard |
|---|---|
| `/api/admin/*` | `isAuthorized()` ở mỗi route + middleware ở edge |
| `/api/orders` GET | `isAuthorized()` (chống PII enumeration) |
| `/api/orders/tracking` | Rate limit 10/60s + redact address + require phone+orderId |
| `/api/coupons/validate` | Rate limit 15/60s |
| `/api/orders` POST | Rate limit 5/60s + Zod validation + server-side price recompute |
| `/api/contact` POST | Rate limit + Zod + sanitize |
| `/api/newsletter` POST | Rate limit + Zod + unique email |
| `/api/chatbot` POST | Rate limit + HTTPS allowlist + private IP block + 8s timeout |
| `/api/wishlist` (any) | Returns HTTP 410 (disabled until user auth) |

### 4.4 Server-side price recomputation

Code tại [`src/app/api/orders/route.ts`](../src/app/api/orders/route.ts) dòng 82–105 — server **bỏ qua** `subtotal` từ client, query `Product.basePrice` và `Topping.price` từ DB, tính lại `total` mới insert.

### 4.5 Security headers

- [`src/middleware.ts`](../src/middleware.ts) — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [`vercel.json`](../vercel.json) — HSTS, Permissions-Policy

Verify deployed:
```bash
curl -I https://milktea-iku.vercel.app/
```

### 4.6 Automated scans

| Workflow | Tool | File |
|---|---|---|
| CodeQL (SAST) | GitHub CodeQL — `security-extended,security-and-quality` | [`.github/workflows/codeql.yml`](../.github/workflows/codeql.yml) |
| npm audit (deps) | `npm audit --omit=dev --audit-level=high` | [`.github/workflows/security.yml`](../.github/workflows/security.yml) |
| Gitleaks (secret scan) | `gitleaks/gitleaks-action@v2.3.6` (pinned SHA) | same |
| Trivy (filesystem) | `aquasecurity/trivy-action@0.20.0` (pinned SHA) | same |
| Dependabot | npm + github-actions + docker, weekly | [`.github/dependabot.yml`](../.github/dependabot.yml) |

---

## 5. Accessibility & dark mode

| Concern | Evidence |
|---|---|
| Skip link | [`frontend/components/SkipLink.tsx`](../frontend/components/SkipLink.tsx) |
| Focus rings | `focus-visible:ring-2 focus-visible:ring-brand-500` ở mọi interactive component |
| Touch targets | `min-w-11 min-h-11` (44 px) — xem [`frontend/components/QuantitySelector.tsx`](../frontend/components/QuantitySelector.tsx), `WishlistButton.tsx`, `ImageGallery.tsx` |
| Aria-labels | Mọi icon-only button có `aria-label` (CartDrawer, Header, MobileNav, Modal, ImageGallery, ShareButton…) |
| Dark mode tokens | CSS variables trong [`src/app/globals.css`](../src/app/globals.css), color mapping trong [`tailwind.config.ts`](../tailwind.config.ts) |
| WCAG AA contrast | Body text uplifted from `text-gray-400` (2.85:1) sang `text-gray-500 dark:text-gray-400` (4.5:1+) — sweep 35+ files |
| Mobile no-overflow | `<html className="overflow-x-hidden">` + `<main className="overflow-x-clip">` + Hero floating badges `hidden sm:block` |
| Image fallback | [`frontend/components/SafeImage.tsx`](../frontend/components/SafeImage.tsx) — inline SVG placeholder khi src null/error |

---

## 6. CI/CD evidence

### 6.1 Workflows

| Workflow | Trigger | Purpose |
|---|---|---|
| `ci.yml` | push/PR `main` | lint → typecheck → build → docker push |
| `deploy.yml` | push `main` | Vercel CLI deploy + post-deploy health check |
| `docker-publish.yml` | tag `v*` | GHCR + Docker Hub publish, provenance + SBOM |
| `release.yml` | tag `v*` | GitHub Release với auto-generated notes |
| `codeql.yml` | push/PR/weekly | SAST với extended queries |
| `security.yml` | push/PR/weekly | npm audit + Gitleaks + Trivy |

### 6.2 Workflow hardening

Mọi `uses:` được pin về commit SHA + comment tag (anti supply-chain attack):

```yaml
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
- uses: actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8 # v4.0.2
- uses: docker/setup-buildx-action@f95db51fddba0c2d1ec667646a06c2ce06100226 # v3.0.0
- uses: docker/login-action@343f7c4344506bcbf9b4de18042ae17996df046d # v3.0.0
- uses: docker/build-push-action@4a13e500e55cf31b7a5d59a38ab2040ab0f42f56 # v5.1.0
- uses: github/codeql-action/init@012739e5082ff0c22ca6d6ab32e07c36df03c4a4 # v3.22.12
```

Mỗi workflow declare `permissions:` ở mức tối thiểu (mặc định `contents: read`).

### 6.3 Secrets reference

CI tham chiếu secrets qua `${{ secrets.X }}`, không hardcode. Required secrets (set ở Settings → Secrets → Actions):

| Secret | Purpose |
|---|---|
| `VERCEL_TOKEN` | Vercel CLI deploy |
| `VERCEL_ORG_ID` | Vercel project link |
| `VERCEL_PROJECT_ID` | Vercel project link |
| `DOCKERHUB_USERNAME` | Docker Hub publish (optional — workflow no-ops if missing) |
| `DOCKERHUB_TOKEN` | Docker Hub publish (optional) |
| `GITHUB_TOKEN` | Auto-provided by Actions |

---

## 7. Documentation suite

`docs/` chứa tài liệu reviewer-first; cấu trúc do bản thân maintainer tự chuẩn hoá theo style của các repo cá nhân khác (Language_App, DevHire_Cloud_Spring_Microservices):

| Doc | Mục đích |
|---|---|
| [`docs/INDEX.md`](INDEX.md) | Master index của tất cả docs |
| [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) | System diagram (Mermaid) + layered table + folder tree |
| [`docs/DEPLOYMENT.md`](DEPLOYMENT.md) | Vercel/Docker matrix, env vars, CI/CD, rollback |
| [`docs/api.md`](api.md) | Reference cho 24 endpoint với example payloads |
| [`docs/HONEST_SCOPE.md`](HONEST_SCOPE.md) | What is / what is NOT |
| [`docs/REVIEW_EVIDENCE.md`](REVIEW_EVIDENCE.md) | (this file) |
| [`docs/UI_UX_GUIDELINES.md`](UI_UX_GUIDELINES.md) | Design rules, animations, forms |
| [`docs/DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) | Color/spacing/typography tokens |
| [`docs/DARK_MODE.md`](DARK_MODE.md) | Dark variant rules + WCAG AA |
| [`docs/ACCESSIBILITY.md`](ACCESSIBILITY.md) | A11y standards |
| [`docs/MOBILE_RESPONSIVE.md`](MOBILE_RESPONSIVE.md) | Mobile-first patterns |
| [`docs/COMPONENT_RULES.md`](COMPONENT_RULES.md) | Server vs Client, Image rules |
| [`docs/CONTRIBUTING_UI.md`](CONTRIBUTING_UI.md) | Branch/PR rules |
| [`docs/TESTING.md`](TESTING.md) | Playwright strategy |
| [`docs/UI_AUDIT_REPORT.md`](UI_AUDIT_REPORT.md) | Latest UI/UX audit |
| [`PRODUCTION_CHECKLIST.md`](../PRODUCTION_CHECKLIST.md) | Manual gates trước go-live |
| [`SECURITY.md`](../SECURITY.md) | Disclosure policy |
| [`SECURITY_NOTICE.md`](../SECURITY_NOTICE.md) | Credential rotation log |

---

## Sign-off

If you can run the commands above and observe the listed outputs, the README claims are reproducible without trusting the maintainer.

If any command fails or any number disagrees, please open an issue at <https://github.com/JasonTM17/MilkTea_Iku/issues>.
