# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-16

### Added

#### Core Features
- Full product catalog with category filtering and search
- Drink customization (size, sugar, ice, toppings)
- Shopping cart with persistent state (Zustand)
- Complete checkout flow with form validation
- Order tracking with delivery progress steps
- Admin dashboard with revenue stats and order management

#### Pages (20+)
- Homepage with hero, bestsellers, testimonials, newsletter
- Menu with category filter and product detail pages
- Checkout with multi-step form
- About, Contact, FAQ, Stores
- Blog, Recipes, Events
- Loyalty program with membership tiers
- Gift cards, Franchise, Careers
- Privacy policy, Terms of service, Delivery info
- Notifications preferences
- Custom 404 and error pages

#### UI/UX
- Dark mode support across all pages and components
- Mobile-first responsive design with bottom navigation
- 40+ reusable components (FAQ, StoreLocator, CustomerReviews, etc.)
- Framer Motion animations throughout
- Glass-morphism and gradient design elements
- Custom SVG icons (no emoji placeholders)
- Skip links and accessibility features

#### Backend & API
- RESTful API with 12+ endpoints
- Prisma ORM with SQLite database
- Rate limiting (sliding window)
- Input validation with Zod schemas
- Structured logging
- Security headers (CSP, XSS, CORS)
- Health check endpoint

#### Testing
- 20+ Playwright test suites
- E2E tests for all major flows
- API integration tests
- Visual regression tests
- Accessibility tests
- Performance tests
- Mobile-specific tests
- SEO meta tag tests

#### Performance & SEO
- Image optimization (AVIF/WebP, lazy loading)
- Dynamic sitemap with product pages
- JSON-LD structured data (Restaurant schema)
- Open Graph meta tags
- PWA manifest with shortcuts
- Code splitting and package optimization

#### DevOps
- Docker containerization with multi-stage build
- Docker Compose for local deployment
- CI-specific Playwright config
- Vercel deployment ready

### Technical Details
- Next.js 14 (App Router) with TypeScript 5.4
- Tailwind CSS 3.4 with custom design tokens
- Prisma 5.14 with SQLite
- Zustand for state management
- Framer Motion for animations
- Lucide React for icons
- Zod for validation

## [0.1.0] - 2026-05-15

### Added
- Initial project setup with Next.js 14
- Basic page structure and routing
- Prisma schema with Product, Category, Order models
- Tailwind CSS configuration with brand colors
- Basic components (Header, Footer, Hero)
