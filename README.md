<p align="center">
  <img src="public/logo.svg" alt="MilkTea Iku" width="200" />
</p>

<h1 align="center">MilkTea Iku</h1>

<p align="center">
  <strong>Premium Milk Tea E-Commerce Platform</strong>
</p>

<p align="center">
  <a href="https://milktea-iku.vercel.app">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#architecture">Architecture</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-5.14-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Playwright-E2E-45ba63?logo=playwright" alt="Playwright" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" alt="Docker" />
</p>

---

## Overview

MilkTea Iku is a full-featured, production-ready e-commerce platform for a premium milk tea brand. Built with modern web technologies, it delivers a fast, accessible, and visually polished experience across all devices.

## Features

### Customer-Facing
- **Product Catalog** — Browse by category, search, filter, and view detailed product pages
- **Drink Customization** — Choose size, sugar level, ice level, and toppings
- **Shopping Cart** — Persistent cart with real-time updates via Zustand
- **Order Tracking** — Real-time order status with delivery progress
- **Dark Mode** — Full dark theme support across all pages
- **PWA** — Installable progressive web app with offline support
- **Responsive** — Mobile-first design with bottom navigation

### Business Features
- **Admin Dashboard** — Revenue stats, order management, product CRUD
- **Coupon System** — Create and validate discount codes
- **Newsletter** — Email subscription management
- **Loyalty Program** — Points-based membership tiers (Silver, Gold, Diamond)
- **Gift Cards** — Digital gift card purchase and delivery
- **Store Locator** — Multi-location store information
- **Franchise** — Franchise inquiry and information

### Technical
- **SEO Optimized** — Dynamic sitemap, JSON-LD structured data, Open Graph
- **Accessibility** — Skip links, ARIA labels, keyboard navigation, contrast compliance
- **Performance** — Image optimization (AVIF/WebP), lazy loading, code splitting
- **Security** — Rate limiting, input sanitization, security headers, CSRF protection
- **Testing** — 20+ Playwright test suites (E2E, API, visual regression, accessibility)
- **Docker** — Production-ready containerization with health checks

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 |
| Database | SQLite + Prisma ORM |
| State | Zustand |
| Animation | Framer Motion |
| Icons | Lucide React |
| Testing | Playwright |
| Deployment | Vercel / Docker |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## Testing

```bash
# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run specific test suite
npx playwright test tests/e2e/homepage.spec.ts

# Run with UI mode
npx playwright test --ui

# Run API tests only
npx playwright test tests/api/
```

### Test Coverage

- **E2E Tests** — Homepage, menu, cart, checkout, navigation, dark mode, mobile
- **API Tests** — Products, orders, health, search, recommendations, rate limiting
- **Visual Regression** — Screenshot comparison for homepage, menu, mobile, dark mode
- **Accessibility** — Heading hierarchy, alt text, keyboard nav, ARIA labels
- **Performance** — Load time, DOM size, lazy loading, viewport meta
- **SEO** — Meta tags, Open Graph, lang attribute, structured data

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JasonTM17/MilkTea_Iku)

### Docker

```bash
# Build and run with Docker Compose
docker compose up -d

# Or build manually
docker build -t milktea-iku .
docker run -p 3000:3000 milktea-iku
```

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── admin/         # Admin endpoints (stats, coupons)
│   │   ├── orders/        # Order CRUD + status updates
│   │   ├── products/      # Products, reviews, recommendations
│   │   ├── search/        # Product search
│   │   └── health/        # Health check
│   ├── menu/              # Product catalog
│   ├── checkout/          # Checkout flow
│   ├── blog/              # Blog articles
│   ├── loyalty/           # Rewards program
│   └── ...                # 15+ more pages
├── components/            # Reusable UI components (40+)
│   ├── ui/               # Base UI primitives
│   └── icons/            # Custom SVG icons
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, validators, API helpers
└── stores/               # Zustand state stores
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with pagination |
| GET | `/api/products/recommendations` | Get product recommendations |
| GET | `/api/categories` | List categories |
| GET | `/api/search?q=` | Search products |
| POST | `/api/orders` | Create order |
| PATCH | `/api/orders/[id]/status` | Update order status |
| GET | `/api/products/[slug]/reviews` | Get product reviews |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/health` | Health check |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET/POST | `/api/admin/coupons` | Coupon management |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Author

**Nguyen Son** ([@JasonTM17](https://github.com/JasonTM17))

---

<p align="center">
  Made with care in Vietnam
</p>
