# Performance — MilkTea Iku

> Author: Nguyễn Sơn (jasonbmt06@gmail.com)
> Last updated: 2026-05-17

---

> **30-second reviewer brief**
>
> Performance targets follow Core Web Vitals thresholds: LCP < 2.5s, FID/INP < 100ms, CLS < 0.1. The app uses Next.js Image Optimization (WebP/AVIF), static asset immutable caching, and `force-dynamic` on all Prisma-backed API routes to avoid stale data. No Redis cache or CDN beyond Vercel Edge Network. Known slow paths: admin dashboard (no pagination on order list), product search (full-table scan on SQLite). Bundle size is not formally gated in CI — `npm run analyze` is available for manual inspection.

---

## Table of Contents

1. [Performance budget](#1-performance-budget)
2. [Bundle size targets](#2-bundle-size-targets)
3. [Image optimization strategy](#3-image-optimization-strategy)
4. [Caching strategy](#4-caching-strategy)
5. [How to measure performance](#5-how-to-measure-performance)
6. [Known slow paths](#6-known-slow-paths)
7. [Rendering strategy](#7-rendering-strategy)

---

## 1. Performance budget

Targets follow [Google Core Web Vitals](https://web.dev/vitals/) thresholds for "Good" rating.

| Metric | Target | "Needs Improvement" range | What it measures |
|--------|--------|--------------------------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s – 4.0s | Load time of the largest visible element |
| FID (First Input Delay) | < 100ms | 100ms – 300ms | Responsiveness to first user interaction |
| INP (Interaction to Next Paint) | < 200ms | 200ms – 500ms | Responsiveness across all interactions |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 – 0.25 | Visual stability (no unexpected layout shifts) |
| TTFB (Time to First Byte) | < 800ms | 800ms – 1800ms | Server response time |
| FCP (First Contentful Paint) | < 1.8s | 1.8s – 3.0s | Time until first content is painted |
| Speed Index | < 3.4s | — | How quickly content is visually populated |
| Total Blocking Time | < 200ms | — | Main thread blocking during load |

### Current status

These targets are aspirational for the demo deployment. The app has not been formally load-tested. Vercel's Singapore region (`sin1`) adds latency for users outside Southeast Asia. Lighthouse CI runs on every PR via `.github/workflows/lighthouse.yml` — audits are informational (`continue-on-error: true`), not blocking.

---

## 2. Bundle size targets

| Bundle | Target | Notes |
|--------|--------|-------|
| First Load JS (shared) | < 100 KB gzipped | Includes React, Next.js runtime |
| Per-page JS | < 50 KB gzipped | Page-specific code |
| Total initial payload | < 200 KB gzipped | HTML + CSS + critical JS |

No formal CI gate enforces these yet. They are reference targets.

### Checking current bundle size

```bash
# Build and view per-route sizes in terminal output
npm run build
# Review the "Route (app)" table — look at "First Load JS" column

# Interactive treemap (client + server bundles)
npm run analyze
# Opens browser with @next/bundle-analyzer treemap
```

### Major dependencies and their sizes

| Library | Approx. size (gzipped) | Notes |
|---------|------------------------|-------|
| React 18 + React DOM | ~45 KB | Core framework |
| Next.js runtime | ~30 KB | Routing, hydration |
| Framer Motion 11 | ~30 KB | Animations — largest optional dep |
| Zustand 4.5 | ~3 KB | Cart and wishlist state |
| Tailwind CSS (purged) | ~10–20 KB | Only used classes included |

`optimizePackageImports` is configured in `next.config.mjs` for `lucide-react` and `framer-motion` to enable tree-shaking.

---

## 3. Image optimization strategy

All images go through Next.js Image Optimization (`next/image`).

### What `next/image` does automatically

- Converts to WebP or AVIF based on browser support (`formats: ['image/avif', 'image/webp']` in `next.config.mjs`)
- Lazy loads images below the fold (`loading="lazy"` by default)
- Prevents layout shift via explicit `width` and `height` props
- Serves correctly sized images via `sizes` prop (responsive srcset)
- Caches optimized images on Vercel's CDN

### Image sources

| Source | Usage | Notes |
|--------|-------|-------|
| Unsplash (remote) | Product images, hero backgrounds | Configured in `next.config.mjs` `remotePatterns` |
| `/public/` (local) | Icons, logos, static assets | Served directly, no optimization needed |

### Configuration

`D:\MilkTea_Iku\next.config.mjs` — `remotePatterns` allows Unsplash images:

```js
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'plus.unsplash.com' },
  ],
}
```

### Best practices applied

- Hero images use `priority={true}` to preload (avoids LCP penalty)
- `ProductImage` component (`D:\MilkTea_Iku\frontend\components\ProductImage.tsx`) handles fallback on error

### Known gap

No dedicated image CDN beyond Vercel's built-in optimization. For high-traffic production use, Cloudinary or Imgix would reduce origin load.

---

## 4. Caching strategy

### Static assets

| Asset type | Cache-Control | TTL |
|-----------|--------------|-----|
| `/_next/static/*` (JS, CSS) | `public, max-age=31536000, immutable` | 1 year |
| `/public/*` (images, icons) | `public, max-age=2592000` | 30 days |
| Optimized images (`/_next/image`) | `public, max-age=60, s-maxage=2592000` | 30 days on CDN |

Content-hashed filenames (`_next/static/chunks/abc123.js`) make immutable caching safe — the hash changes when content changes.

### API routes

All API routes that query Prisma use `export const dynamic = "force-dynamic"` to opt out of Next.js caching. This ensures product lists, order data, and admin stats are always fresh.

### No Redis / no ISR currently

The app does not use:
- **ISR (Incremental Static Regeneration)** — product data uses `force-dynamic` for simplicity
- **Redis cache** — rate limiter is in-memory; no distributed cache layer
- **Edge caching for API responses** — all API routes are dynamic

For a production deployment with real traffic, ISR on the product catalog pages (`revalidate: 60`) would be the highest-impact caching improvement. See `docs/ROADMAP.md §3.4`.

### Vercel Edge Network

Static assets and optimized images are automatically served from Vercel's global CDN. No additional configuration needed.

---

## 5. How to measure performance

### Lighthouse CI (automated)

Runs on every PR via `.github/workflows/lighthouse.yml`:
- Builds the app and starts a local server
- Runs Lighthouse against `/` and `/menu`
- Uploads full report as GitHub Actions artifact (retained 30 days)
- Informational only — does not block PRs

### Lighthouse CLI (local)

```bash
# Install
npm install -g @lhci/cli

# Run against local dev server
npm run build && npm run start &
lhci autorun --collect.url=http://localhost:3000

# Or use the global Lighthouse CLI directly
npm install -g lighthouse
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

### Chrome DevTools

**F12** → **Lighthouse** tab → **Analyze page load**. Fastest option for ad-hoc checks.

### WebPageTest

For detailed waterfall analysis and real-device testing:

1. Go to [webpagetest.org](https://www.webpagetest.org)
2. Enter `https://milktea-iku.vercel.app`
3. Select test location closest to target users (Singapore for this deployment)
4. Review waterfall, Core Web Vitals, and filmstrip

### Vercel Analytics

Enable in Vercel Dashboard: **Analytics** tab → **Enable**. Provides real-user Core Web Vitals data from actual visitors (requires traffic).

### Bundle analysis

```bash
npm run analyze
# Opens @next/bundle-analyzer treemap in browser
```

---

## 6. Known slow paths

Honest assessment of areas that need work before high-traffic production use.

| Path | Issue | Severity | Fix |
|------|-------|----------|-----|
| `GET /api/products` | Full table scan, no pagination | Medium | Add cursor-based pagination; PostgreSQL with indexes |
| `GET /api/admin/orders` | Returns all orders, no pagination | Medium | Add `limit`/`offset` params |
| Admin dashboard (`/admin`) | Fetches all orders on load | Medium | Server-side pagination in `AdminDashboard.tsx` |
| Product search (`/api/search`) | SQLite `LIKE` query, no full-text index | Medium | PostgreSQL `pg_trgm` or Algolia for production |
| All API routes | `force-dynamic` disables route caching | Low | Add ISR with `revalidate` for read-heavy routes |
| Framer Motion | ~30 KB bundle contribution | Low | Replace with CSS transitions if bundle size is a constraint |
| Rate limiter | In-memory, resets on restart | Low | Upstash Redis for persistent rate limiting |

---

## 7. Rendering strategy

| Page | Strategy | Reason |
|------|----------|--------|
| Homepage (`/`) | Server Component, `force-dynamic` | Fresh product data on every request |
| Menu (`/menu`) | Server Component, `force-dynamic` | Product availability changes |
| Product detail (`/menu/[id]`) | Server Component, `force-dynamic` | Stock and pricing |
| Checkout (`/checkout`) | Client Component | Interactive multi-step form |
| Admin dashboard (`/admin`) | Client Component + Server fetch | Real-time order data |
| Static pages (`/about`, `/contact`) | Server Component | No dynamic data |
| Order tracking (`/tracking`) | Client Component | User-driven lookup |

Server Components are used for data-fetching pages to avoid client-side waterfalls. Client Components are used only where interactivity is required (cart, forms, dark mode toggle).

---

## Related

- [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — Caching strategy details (§7)
- [`docs/HONEST_SCOPE.md`](./HONEST_SCOPE.md) — What is and is not production-ready
- [`docs/ROADMAP.md`](./ROADMAP.md) — Planned performance improvements (ISR, Redis, pagination)
