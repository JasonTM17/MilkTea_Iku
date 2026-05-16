<p align="center">
  <img src="public/logo.svg" alt="MilkTea Iku" width="180" />
</p>

<h1 align="center">MilkTea Iku</h1>

<p align="center">
  <strong>Premium Milk Tea E-Commerce Platform</strong><br/>
  <sub>Nền tảng thương mại điện tử trà sữa cao cấp • プレミアムミルクティーECプラットフォーム</sub>
</p>

<p align="center">
  <a href="#english">English</a> •
  <a href="#tiếng-việt">Tiếng Việt</a> •
  <a href="#日本語">日本語</a>
</p>

<p align="center">
  <a href="https://milktea-iku.vercel.app">
    <img src="https://img.shields.io/badge/Demo-Live-brightgreen?style=flat-square" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-5.14-2D3748?style=flat-square&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Playwright-Testing-45ba63?style=flat-square&logo=playwright" alt="Playwright" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker" alt="Docker" />
  <img src="https://img.shields.io/github/license/JasonTM17/MilkTea_Iku?style=flat-square" alt="License" />
</p>

---

## English

### Overview

MilkTea Iku is a production-ready, full-stack e-commerce platform for a premium milk tea brand. Built with Next.js 14 App Router, it delivers a fast, accessible, and visually polished experience with 40+ components, 20+ pages, and comprehensive test coverage.

### Key Features

| Category | Features |
|----------|----------|
| **Shopping** | Product catalog, drink customization, cart, checkout, order tracking |
| **Content** | Blog, recipes, events, loyalty program, gift cards, franchise info |
| **Admin** | Dashboard, order management, coupon CRUD, revenue analytics |
| **UX** | Dark mode, PWA, responsive design, animations, accessibility |
| **Backend** | REST API (12+ endpoints), rate limiting, validation, security headers |
| **Quality** | 20+ Playwright test suites, TypeScript strict mode, Docker ready |

### Tech Stack

```
Frontend:  Next.js 14 • TypeScript • Tailwind CSS • Framer Motion • Zustand
Backend:   Next.js API Routes • Prisma ORM • SQLite • Zod validation
Testing:   Playwright (E2E, API, Visual, A11y, Performance)
DevOps:    Docker • Vercel • GitHub Actions
```

### Quick Start

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
npm install
cp .env.example .env
npx prisma generate && npx prisma db push && npm run db:seed
npm run dev
```

### Deployment

```bash
# Docker
docker compose up -d

# Vercel
vercel deploy --prod
```

### API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (paginated) |
| GET | `/api/search?q=` | Search products |
| GET | `/api/categories` | List categories |
| POST | `/api/orders` | Create order |
| PATCH | `/api/orders/[id]/status` | Update order status |
| GET | `/api/products/[slug]/reviews` | Product reviews |
| GET | `/api/products/recommendations` | Recommendations |
| POST | `/api/contact` | Contact form |
| POST | `/api/newsletter` | Subscribe |
| GET | `/api/admin/stats` | Dashboard stats |
| GET/POST | `/api/admin/coupons` | Coupon management |
| GET | `/api/health` | Health check |

---

## Tiếng Việt

### Tổng quan

MilkTea Iku là nền tảng thương mại điện tử full-stack cho thương hiệu trà sữa cao cấp. Xây dựng trên Next.js 14 App Router, mang đến trải nghiệm nhanh, dễ tiếp cận và thiết kế tinh tế với hơn 40 component, 20+ trang và bộ test toàn diện.

### Tính năng chính

| Danh mục | Tính năng |
|----------|-----------|
| **Mua sắm** | Danh mục sản phẩm, tuỳ chỉnh đồ uống, giỏ hàng, thanh toán, theo dõi đơn |
| **Nội dung** | Blog, công thức, sự kiện, chương trình thành viên, thẻ quà tặng, nhượng quyền |
| **Quản trị** | Dashboard, quản lý đơn hàng, mã giảm giá, phân tích doanh thu |
| **Trải nghiệm** | Dark mode, PWA, responsive, animation, accessibility |
| **Backend** | REST API (12+ endpoint), rate limiting, validation, security headers |
| **Chất lượng** | 20+ bộ test Playwright, TypeScript strict, Docker ready |

### Cài đặt nhanh

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
npm install
cp .env.example .env
npx prisma generate && npx prisma db push && npm run db:seed
npm run dev
```

### Triển khai

```bash
# Docker
docker compose up -d

# Vercel
vercel deploy --prod
```

### Cấu trúc dự án

```
src/
├── app/          # Trang và API routes (Next.js App Router)
├── components/   # 40+ UI components tái sử dụng
├── hooks/        # Custom React hooks
├── lib/          # Utilities, validators, helpers
└── stores/       # Zustand state management
tests/            # Playwright test suites
prisma/           # Database schema và seed data
```

---

## 日本語

### 概要

MilkTea Ikuは、プレミアムミルクティーブランド向けのプロダクションレディなフルスタックECプラットフォームです。Next.js 14 App Routerで構築され、40以上のコンポーネント、20以上のページ、包括的なテストカバレッジにより、高速でアクセシブルな洗練された体験を提供します。

### 主な機能

| カテゴリ | 機能 |
|---------|------|
| **ショッピング** | 商品カタログ、ドリンクカスタマイズ、カート、チェックアウト、注文追跡 |
| **コンテンツ** | ブログ、レシピ、イベント、ロイヤルティプログラム、ギフトカード、フランチャイズ |
| **管理** | ダッシュボード、注文管理、クーポンCRUD、売上分析 |
| **UX** | ダークモード、PWA、レスポンシブ、アニメーション、アクセシビリティ |
| **バックエンド** | REST API（12+エンドポイント）、レート制限、バリデーション、セキュリティヘッダー |
| **品質** | 20以上のPlaywrightテストスイート、TypeScript strictモード、Docker対応 |

### 技術スタック

```
フロントエンド:  Next.js 14 • TypeScript • Tailwind CSS • Framer Motion • Zustand
バックエンド:    Next.js API Routes • Prisma ORM • SQLite • Zodバリデーション
テスト:         Playwright（E2E、API、ビジュアル、A11y、パフォーマンス）
DevOps:        Docker • Vercel • GitHub Actions
```

### クイックスタート

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
npm install
cp .env.example .env
npx prisma generate && npx prisma db push && npm run db:seed
npm run dev
```

### デプロイ

```bash
# Docker
docker compose up -d

# Vercel
vercel deploy --prod
```

### プロジェクト構成

```
src/
├── app/          # ページとAPIルート（Next.js App Router）
├── components/   # 40以上の再利用可能なUIコンポーネント
├── hooks/        # カスタムReactフック
├── lib/          # ユーティリティ、バリデーター、ヘルパー
└── stores/       # Zustandステート管理
tests/            # Playwrightテストスイート
prisma/           # データベーススキーマとシードデータ
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                       │
├─────────────────────────────────────────────────────────┤
│  Next.js 14 App Router                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Pages   │  │Components│  │  Stores  │              │
│  │ (20+)    │  │  (40+)   │  │(Zustand) │              │
│  └──────────┘  └──────────┘  └──────────┘              │
├─────────────────────────────────────────────────────────┤
│  API Layer                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Routes  │  │Middleware│  │   Rate   │              │
│  │ (12+)    │  │(Security)│  │ Limiter  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Prisma  │  │  SQLite  │  │   Zod    │              │
│  │   ORM    │  │    DB    │  │Validators│              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

## Scripts

| Command | Description | 説明 | Mô tả |
|---------|-------------|------|-------|
| `npm run dev` | Start dev server | 開発サーバー起動 | Khởi động server dev |
| `npm run build` | Production build | プロダクションビルド | Build production |
| `npm run start` | Start production | プロダクション起動 | Chạy production |
| `npm run lint` | Run ESLint | ESLint実行 | Chạy ESLint |
| `npm run db:push` | Push DB schema | DBスキーマ反映 | Đẩy schema DB |
| `npm run db:seed` | Seed database | DBシードデータ投入 | Seed dữ liệu |

## Testing

```bash
# Install browsers / ブラウザインストール / Cài đặt trình duyệt
npx playwright install

# Run all tests / 全テスト実行 / Chạy tất cả test
npx playwright test

# UI mode / UIモード / Chế độ UI
npx playwright test --ui
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE) © 2026 Nguyen Son

## Author

**Nguyễn Sơn** ([@JasonTM17](https://github.com/JasonTM17))

---

<p align="center">
  Made with care in Vietnam 🇻🇳<br/>
  <sub>ベトナムで心を込めて作りました • Được tạo với tâm huyết tại Việt Nam</sub>
</p>
