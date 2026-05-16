<p align="center">
  🌐 <strong>English</strong> | <a href="docs/README.vi.md">Tiếng Việt</a> | <a href="docs/README.ja.md">日本語</a>
</p>

---

<p align="center">
  <img src="public/logo-cute.svg" width="80" alt="MilkTea Iku Logo" />
</p>

<h1 align="center">MilkTea Iku</h1>

<p align="center">
  <strong>Premium Milk Tea E-Commerce Platform</strong><br/>
  Nền tảng thương mại điện tử trà sữa cao cấp
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" alt="Docker" />
  <img src="https://github.com/JasonTM17/MilkTea_Iku/actions/workflows/ci.yml/badge.svg" alt="CI" />
  <a href="https://milktea-iku.vercel.app"><img src="https://img.shields.io/badge/Vercel-Live-000?logo=vercel" alt="Vercel" /></a>
</p>

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/homepage.png" alt="Homepage" width="720"/>
  <br/><em>Homepage with hero section and bestsellers</em>
</p>

<table>
  <tr>
    <td><img src="docs/screenshots/homepage.png" alt="Homepage" width="400"/></td>
    <td><img src="docs/screenshots/menu.png" alt="Menu" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><em>Homepage with promotions</em></td>
    <td align="center"><em>Product catalog with category filter</em></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/dark-mode.png" alt="Dark Mode" width="400"/></td>
    <td><img src="docs/screenshots/mobile.png" alt="Mobile View" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><em>Dark mode support</em></td>
    <td align="center"><em>Responsive mobile design</em></td>
  </tr>
</table>

---

## Overview

MilkTea Iku is a full-featured milk tea e-commerce platform with drink customization, order tracking, and admin management. Built with modern web technologies for performance, accessibility, and a premium ordering experience.

### Key Highlights

| Metric | Value |
|--------|-------|
| Pages | 20+ |
| Components | 40+ |
| API Endpoints | 12+ |
| Test Suites | 20+ |
| Lighthouse Score | 90+ |

---

## Features

### Customer Experience
- **Product Catalog** — Browse by category, search, filter by price/popularity
- **Drink Customization** — Size, sugar level, ice level, toppings selection
- **Shopping Cart** — Persistent state with Zustand, quantity management
- **Checkout Flow** — Multi-step form with Zod validation
- **Order Tracking** — Real-time delivery progress with status updates
- **Wishlist & Reviews** — Save favorites, read customer reviews

### Admin Dashboard
- **Revenue Analytics** — Charts, daily/weekly/monthly stats
- **Order Management** — Status updates, filtering, search
- **Product CRUD** — Add, edit, remove products and categories
- **Coupon System** — Create and manage promotional codes

### Technical Features
- **Dark Mode** — Full theme support across all pages
- **PWA** — Offline support, installable on mobile
- **SEO** — JSON-LD structured data, dynamic sitemap, OG images
- **Accessibility** — Skip links, ARIA labels, keyboard navigation
- **Rate Limiting** — IP-based sliding window on sensitive endpoints
- **Security Headers** — HSTS, CSP, X-Frame-Options, XSS protection

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 |
| Database | Prisma 5.14 + SQLite |
| State | Zustand 4.5 |
| Animation | Framer Motion 11 |
| Validation | Zod 3.23 |
| Icons | Lucide React |
| Testing | Playwright |
| Deployment | Vercel + Docker |

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.0.0 |
| npm | >= 9.0.0 |

### Installation

```bash
# Clone the repository
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku

# Install dependencies
npm ci --legacy-peer-deps

# Set up environment
cp .env.example .env

# Set up database
npx prisma generate
npx prisma db push
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # RESTful API routes
│   ├── admin/             # Admin dashboard
│   ├── menu/              # Product catalog
│   ├── checkout/          # Checkout flow
│   └── ...                # 20+ pages
├── components/            # 40+ React components
├── lib/                   # Utilities, validators, Prisma
└── store/                 # Zustand state management
prisma/
├── schema.prisma          # Database schema
└── seed.ts               # Sample data
tests/
├── e2e/                  # End-to-end tests
├── api/                  # API integration tests
├── visual/               # Visual regression
└── accessibility/        # a11y tests
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List products (filter, search, paginate) |
| `GET` | `/api/products/[slug]` | Product detail |
| `GET` | `/api/categories` | List categories |
| `GET` | `/api/toppings` | List toppings |
| `POST` | `/api/orders` | Create order |
| `GET` | `/api/orders/tracking` | Track order by phone |
| `GET` | `/api/search` | Full-text search |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/newsletter` | Subscribe to newsletter |
| `GET` | `/api/health` | Health check |
| `GET/PATCH` | `/api/admin/orders` | Admin order management |
| `GET` | `/api/admin/stats` | Dashboard statistics |

---

## Deployment

### Vercel (Recommended)

The project auto-deploys to Vercel on push to `main`.

**Live:** [milktea-iku.vercel.app](https://milktea-iku.vercel.app)

### Docker

```bash
# Using Docker Compose
docker compose up -d

# Or pull from Docker Hub
docker pull nguyenson1710/milktea-iku-backend:v1.0.0
docker pull nguyenson1710/milktea-iku-frontend:v1.0.0
```

| Service | Image | Port | Size |
|---------|-------|------|------|
| Backend | `nguyenson1710/milktea-iku-backend` | 3000 | 349 MB |
| Frontend | `nguyenson1710/milktea-iku-frontend` | 80 | 96 MB |

---

## Testing

```bash
# Run all tests
npx playwright test

# Run specific suites
npx playwright test tests/e2e/
npx playwright test tests/api/

# Run with UI mode
npx playwright test --ui
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) © 2026 [Nguyễn Sơn](https://github.com/JasonTM17)

---

<p align="center">
  Made with ☕ by <a href="https://github.com/JasonTM17">Nguyễn Sơn</a>
</p>
