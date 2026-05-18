<p align="center">
  <strong>English</strong>
  &nbsp;·&nbsp;
  <a href="docs/README.vi.md">Tiếng Việt</a>
  &nbsp;·&nbsp;
  <a href="docs/README.ja.md">日本語</a>
</p>

<p align="center">
  <img src="public/logo-cute.svg" width="80" alt="MilkTea Iku logo" />
</p>

<h1 align="center">MilkTea Iku</h1>

<p align="center">
  <strong>Full-stack milk tea e-commerce — Next.js 14 · TypeScript · Prisma · Docker</strong>
</p>

<p align="center">
  <a href="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/ci.yml">
    <img src="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
  <a href="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/codeql.yml">
    <img src="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/codeql.yml/badge.svg" alt="CodeQL" />
  </a>
  <a href="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/security.yml">
    <img src="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/security.yml/badge.svg" alt="Security" />
  </a>
  <a href="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/deploy.yml">
    <img src="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/deploy.yml/badge.svg" alt="Deploy" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2-000000?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-5.14-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <a href="https://milktea-iku.vercel.app">
    <img src="https://img.shields.io/badge/Vercel-Live-000000?logo=vercel&logoColor=white" alt="Vercel" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" />
  </a>
</p>

---

## 30-Second Brief

MilkTea Iku is a production-shaped e-commerce storefront for a premium milk tea brand. It covers the full customer journey — browsing, customising drinks, checkout, and order tracking — plus an admin dashboard for order and coupon management.

> **📚 Learning project** — This is a personal learning portfolio by Nguyễn Sơn. The codebase is intentionally production-shaped (real auth, real validation, real CI/CD, real docs) so it can serve as a reference for full-stack patterns, but it is not a commercial deployment. See [`docs/HONEST_SCOPE.md`](docs/HONEST_SCOPE.md) for what is and isn't covered.

|              |                                                                                    |
| ------------ | ---------------------------------------------------------------------------------- |
| **Live URL** | [milktea-iku.vercel.app](https://milktea-iku.vercel.app)                           |
| **Status**   | Deployed on Vercel · portfolio / reference implementation                          |
| **Stack**    | Next.js 14 App Router, TypeScript, Prisma, SQLite (dev) / Postgres (prod)          |
| **Tests**    | 35 Playwright spec files — e2e, API, accessibility, visual, performance, SEO       |
| **CI/CD**    | 6 GitHub Actions workflows (ci, deploy, docker-publish, codeql, security, release) |

---

## Demo

<p align="center">
  <img src="docs/screenshots/demo-homepage.gif" alt="Homepage demo" width="900" />
  <br />
  <em>Live tour of the homepage — hero, featured products, and store locator.</em>
</p>

## Screenshots

### Desktop

<table>
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/homepage.png" alt="Homepage — light mode" />
      <br /><sub><b>Homepage</b> · Light mode</sub>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/dark-mode.png" alt="Homepage — dark mode" />
      <br /><sub><b>Homepage</b> · Dark mode</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/menu.png" alt="Menu catalogue" />
      <br /><sub><b>Menu</b> · Product browsing with filters</sub>
    </td>
    <td align="center">
      <img src="docs/screenshots/stores.png" alt="Store locator" />
      <br /><sub><b>Stores</b> · 6 locations across HCM and Hà Nội</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/screenshots/checkout.png" alt="Checkout flow" />
      <br /><sub><b>Checkout</b> · Order placement and payment</sub>
    </td>
    <td align="center">
      <img src="docs/screenshots/menu-dark.png" alt="Menu dark mode" />
      <br /><sub><b>Menu</b> · Dark mode browsing</sub>
    </td>
  </tr>
</table>

### Mobile

<table>
  <tr>
    <td width="33%" align="center">
      <img src="docs/screenshots/mobile.png" alt="Mobile light" width="280" />
      <br /><sub><b>Light mode</b></sub>
    </td>
    <td width="33%" align="center">
      <img src="docs/screenshots/mobile-dark.png" alt="Mobile dark" width="280" />
      <br /><sub><b>Dark mode</b></sub>
    </td>
    <td width="33%" align="center">
      <img src="docs/screenshots/demo-mobile.gif" alt="Mobile flow" width="280" />
      <br /><sub><b>Interaction demo</b></sub>
    </td>
  </tr>
</table>

### Interactions

<table>
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/demo-menu.gif" alt="Menu browsing demo" />
      <br /><sub><b>Menu browsing</b> · Filters, hover states, product cards</sub>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/demo-dark-toggle.gif" alt="Dark mode toggle" />
      <br /><sub><b>Theme toggle</b> · Smooth dark mode transition</sub>
    </td>
  </tr>
</table>

---

## Features

**Customer**

- Menu browsing with category filter, full-text search, and sort
- Drink customiser — size, sugar level, ice level, multi-topping selection
- Cart with persistent state (Zustand + localStorage)
- Multi-step checkout with Zod validation and server-side price recompute
- Coupon application with rate-limited validation
- Order tracking by phone number and order ID
- Loyalty tiers and rewards programme
- Wishlist

**Platform**

- Admin dashboard — order management, status transitions, coupon CRUD, aggregate stats
- Light / dark theme via `next-themes` (WCAG AA contrast)
- Fully responsive, mobile-first design
- Multi-language support (English · Tiếng Việt · 日本語)
- OpenAPI 3.0 spec at `/api/docs`
- PWA manifest and service-worker scaffold

---

## Tech Stack

| Layer         | Choice                                                  |
| ------------- | ------------------------------------------------------- |
| Framework     | Next.js 14.2 (App Router, Server Components, streaming) |
| Language      | TypeScript 5.4                                          |
| Styling       | Tailwind CSS 3.4 + shadcn/ui                            |
| Animations    | Framer Motion 11                                        |
| Theming       | next-themes                                             |
| Validation    | Zod 3.23                                                |
| State         | Zustand 4.5                                             |
| ORM / DB      | Prisma 5.14 — SQLite (dev) · Postgres (prod)            |
| Auth          | HTTP Basic + Bearer token, scrypt-hashed passwords      |
| Rate limiting | Per-IP sliding window (in-memory)                       |
| Icons         | lucide-react                                            |
| Testing       | Playwright 1.60                                         |
| CI/CD         | GitHub Actions                                          |
| Hosting       | Vercel (primary) · Docker Hub                           |

---

## Quick Start

### Local development

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku

npm install --legacy-peer-deps

cp .env.example .env.local
# Edit .env.local — see Environment Variables below

npx prisma generate --schema=backend/prisma/schema.prisma
npm run db:push
npm run db:seed

npm run dev
# → http://localhost:3000
```

### Docker (self-hosted)

```bash
cp .env.example .env.local
# Edit .env.local with your values

docker compose up -d
# → http://localhost:3000
```

### Useful scripts

| Command                                | Purpose                        |
| -------------------------------------- | ------------------------------ |
| `npm run dev`                          | Start dev server               |
| `npm run build`                        | Production build               |
| `npm run lint`                         | ESLint + Next lint             |
| `npx tsc --noEmit`                     | Type check                     |
| `npx playwright test`                  | Full test suite                |
| `npm run db:push`                      | Push schema to SQLite          |
| `npm run db:seed`                      | Seed reference data            |
| `npm run db:studio`                    | Open Prisma Studio             |
| `node scripts/generate-admin-hash.mjs` | Generate `ADMIN_PASSWORD_HASH` |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable              | Required | Description                                                |
| --------------------- | -------- | ---------------------------------------------------------- |
| `DATABASE_URL`        | Yes      | SQLite path for dev; Postgres URL for prod                 |
| `ADMIN_USERNAME`      | Yes      | Username for `/admin` HTTP Basic Auth                      |
| `ADMIN_PASSWORD`      | Dev only | Plaintext password (ignored when hash is set)              |
| `ADMIN_PASSWORD_HASH` | Prod     | scrypt hash — generate with `generate-admin-hash.mjs`      |
| `ADMIN_API_TOKEN`     | Yes      | Bearer token for programmatic admin access                 |
| `N8N_WEBHOOK_URL`     | Optional | n8n chatbot webhook URL                                    |
| `N8N_HOSTNAMES`       | Optional | SSRF allowlist for n8n hostnames                           |
| `N8N_USER`            | Optional | n8n basic auth user (docker-compose only)                  |
| `N8N_PASSWORD`        | Optional | n8n basic auth password (docker-compose only)              |
| `E2E_BASE_URL`        | CI only  | Base URL for Playwright (default: `http://localhost:3000`) |

---

## Architecture

Full architecture overview, project layout, and data-flow diagrams: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

Additional documentation:

| Document         | Link                                                   |
| ---------------- | ------------------------------------------------------ |
| API reference    | [`docs/api.md`](docs/api.md)                           |
| Deployment guide | [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)             |
| Testing strategy | [`docs/TESTING.md`](docs/TESTING.md)                   |
| UI/UX guidelines | [`docs/UI_UX_GUIDELINES.md`](docs/UI_UX_GUIDELINES.md) |
| Security posture | [`SECURITY.md`](SECURITY.md)                           |
| Honest scope     | [`docs/HONEST_SCOPE.md`](docs/HONEST_SCOPE.md)         |

---

## Deployment

### Vercel (primary)

Push to `main` — the [`deploy.yml`](.github/workflows/deploy.yml) workflow builds and deploys automatically.

For production, set all environment variables in the Vercel dashboard and switch `DATABASE_URL` to a Postgres connection string.

### Docker

```bash
docker compose up -d          # start backend + frontend + n8n
docker compose down           # stop
docker compose logs -f        # stream logs
```

Tagged releases publish images to Docker Hub via [`docker-publish.yml`](.github/workflows/docker-publish.yml).

Full reference: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## Author

**Nguyễn Sơn** — [github.com/JasonTM17](https://github.com/JasonTM17) · [jasonbmt06@gmail.com](mailto:jasonbmt06@gmail.com)

---

## License

[MIT](LICENSE) © 2026 Nguyễn Sơn

---

<p align="center">Made with ☕ in Saigon</p>
