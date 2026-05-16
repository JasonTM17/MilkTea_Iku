<p align="center">
  <img src="public/logo.svg" alt="MilkTea Iku" width="180" />
</p>

<h1 align="center">✿ MilkTea Iku ✿</h1>

<p align="center">
  <strong>:bubble_tea: Premium Milk Tea E-Commerce Platform :sparkles:</strong><br/>
  <sub>Nền tảng thương mại điện tử trà sữa cao cấp • プレミアムミルクティーECプラットフォーム</sub>
</p>

<p align="center">
  <a href="#english">English</a> •
  <a href="#tiếng-việt">Tiếng Việt</a> •
  <a href="#日本語">日本語</a>
</p>

<p align="center">
  <a href="https://milktea-iku.vercel.app">
    <img src="https://img.shields.io/badge/✨_Demo-Live-ff69b4?style=for-the-badge" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Prisma-5.14-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Playwright-Testing-45ba63?style=for-the-badge&logo=playwright" alt="Playwright" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker" alt="Docker" />
  <img src="https://img.shields.io/github/license/JasonTM17/MilkTea_Iku?style=for-the-badge" alt="License" />
</p>

<p align="center">~ ✿ ~ ✿ ~ ✿ ~</p>

---

## :tea: English

### :star2: Overview

MilkTea Iku is a production-ready, full-stack e-commerce platform for a premium milk tea brand. Built with Next.js 14 App Router, it delivers a fast, accessible, and visually polished experience with 40+ components, 20+ pages, and comprehensive test coverage.

### :sparkles: Key Features

<p align="center">
  <img src="https://img.shields.io/badge/🛒_Shopping-Cart-ff69b4?style=for-the-badge" alt="Shopping" />
  <img src="https://img.shields.io/badge/📝_Content-Blog_&_Events-f9a8d4?style=for-the-badge" alt="Content" />
  <img src="https://img.shields.io/badge/🛠️_Admin-Dashboard-c084fc?style=for-the-badge" alt="Admin" />
  <img src="https://img.shields.io/badge/🌙_Dark-Mode-9b59b6?style=for-the-badge" alt="Dark Mode" />
  <img src="https://img.shields.io/badge/📱_PWA-Ready-fb923c?style=for-the-badge" alt="PWA" />
  <img src="https://img.shields.io/badge/🔒_REST-API-34d399?style=for-the-badge" alt="REST API" />
  <img src="https://img.shields.io/badge/🧪_Playwright-Tested-60a5fa?style=for-the-badge" alt="Tested" />
  <img src="https://img.shields.io/badge/♿_A11y-Accessible-fbbf24?style=for-the-badge" alt="Accessible" />
</p>

| Category | Features |
|----------|----------|
| :shopping_cart: **Shopping** | Product catalog, drink customization, cart, checkout, order tracking |
| :pencil: **Content** | Blog, recipes, events, loyalty program, gift cards, franchise info |
| :wrench: **Admin** | Dashboard, order management, coupon CRUD, revenue analytics |
| :crescent_moon: **UX** | Dark mode, PWA, responsive design, animations, accessibility |
| :lock: **Backend** | REST API (12+ endpoints), rate limiting, validation, security headers |
| :test_tube: **Quality** | 20+ Playwright test suites, TypeScript strict mode, Docker ready |

### :rocket: Tech Stack

```
Frontend:  Next.js 14 • TypeScript • Tailwind CSS • Framer Motion • Zustand
Backend:   Next.js API Routes • Prisma ORM • SQLite • Zod validation
Testing:   Playwright (E2E, API, Visual, A11y, Performance)
DevOps:    Docker • Vercel • GitHub Actions
```

### :zap: Quick Start

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
npm install
cp .env.example .env
npx prisma generate && npx prisma db push && npm run db:seed
npm run dev
```

### :whale: Deployment

```bash
# Docker
docker compose up -d

# Vercel
vercel deploy --prod
```

### :book: API Reference

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

<p align="center">~ ✿ ~ ✿ ~ ✿ ~</p>

---

## :bubble_tea: Tiếng Việt

### :star2: Tổng quan

MilkTea Iku là nền tảng thương mại điện tử full-stack cho thương hiệu trà sữa cao cấp. Xây dựng trên Next.js 14 App Router, mang đến trải nghiệm nhanh, dễ tiếp cận và thiết kế tinh tế với hơn 40 component, 20+ trang và bộ test toàn diện.

### :sparkles: Tính năng chính

<p align="center">
  <img src="https://img.shields.io/badge/🛒_Mua_sắm-Giỏ_hàng-ff69b4?style=for-the-badge" alt="Mua sắm" />
  <img src="https://img.shields.io/badge/📝_Nội_dung-Blog_&_Sự_kiện-f9a8d4?style=for-the-badge" alt="Nội dung" />
  <img src="https://img.shields.io/badge/🛠️_Quản_trị-Dashboard-c084fc?style=for-the-badge" alt="Quản trị" />
  <img src="https://img.shields.io/badge/🌙_Dark-Mode-9b59b6?style=for-the-badge" alt="Dark Mode" />
  <img src="https://img.shields.io/badge/📱_PWA-Ready-fb923c?style=for-the-badge" alt="PWA" />
  <img src="https://img.shields.io/badge/🔒_REST-API-34d399?style=for-the-badge" alt="REST API" />
</p>

| Danh mục | Tính năng |
|----------|-----------|
| :shopping_cart: **Mua sắm** | Danh mục sản phẩm, tuỳ chỉnh đồ uống, giỏ hàng, thanh toán, theo dõi đơn |
| :pencil: **Nội dung** | Blog, công thức, sự kiện, chương trình thành viên, thẻ quà tặng, nhượng quyền |
| :wrench: **Quản trị** | Dashboard, quản lý đơn hàng, mã giảm giá, phân tích doanh thu |
| :crescent_moon: **Trải nghiệm** | Dark mode, PWA, responsive, animation, accessibility |
| :lock: **Backend** | REST API (12+ endpoint), rate limiting, validation, security headers |
| :test_tube: **Chất lượng** | 20+ bộ test Playwright, TypeScript strict, Docker ready |

### :zap: Cài đặt nhanh

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
npm install
cp .env.example .env
npx prisma generate && npx prisma db push && npm run db:seed
npm run dev
```

### :whale: Triển khai

```bash
# Docker
docker compose up -d

# Vercel
vercel deploy --prod
```

### :file_folder: Cấu trúc dự án

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

<p align="center">~ ✿ ~ ✿ ~ ✿ ~</p>

---

## :cherry_blossom: 日本語

### :star2: 概要

MilkTea Ikuは、プレミアムミルクティーブランド向けのプロダクションレディなフルスタックECプラットフォームです。Next.js 14 App Routerで構築され、40以上のコンポーネント、20以上のページ、包括的なテストカバレッジにより、高速でアクセシブルな洗練された体験を提供します。

### :sparkles: 主な機能

<p align="center">
  <img src="https://img.shields.io/badge/🛒_ショッピング-カート-ff69b4?style=for-the-badge" alt="ショッピング" />
  <img src="https://img.shields.io/badge/📝_コンテンツ-ブログ_&_イベント-f9a8d4?style=for-the-badge" alt="コンテンツ" />
  <img src="https://img.shields.io/badge/🛠️_管理-ダッシュボード-c084fc?style=for-the-badge" alt="管理" />
  <img src="https://img.shields.io/badge/🌙_ダーク-モード-9b59b6?style=for-the-badge" alt="ダークモード" />
  <img src="https://img.shields.io/badge/📱_PWA-対応-fb923c?style=for-the-badge" alt="PWA" />
  <img src="https://img.shields.io/badge/🔒_REST-API-34d399?style=for-the-badge" alt="REST API" />
</p>

| カテゴリ | 機能 |
|---------|------|
| :shopping_cart: **ショッピング** | 商品カタログ、ドリンクカスタマイズ、カート、チェックアウト、注文追跡 |
| :pencil: **コンテンツ** | ブログ、レシピ、イベント、ロイヤルティプログラム、ギフトカード、フランチャイズ |
| :wrench: **管理** | ダッシュボード、注文管理、クーポンCRUD、売上分析 |
| :crescent_moon: **UX** | ダークモード、PWA、レスポンシブ、アニメーション、アクセシビリティ |
| :lock: **バックエンド** | REST API（12+エンドポイント）、レート制限、バリデーション、セキュリティヘッダー |
| :test_tube: **品質** | 20以上のPlaywrightテストスイート、TypeScript strictモード、Docker対応 |

### :zap: クイックスタート

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
npm install
cp .env.example .env
npx prisma generate && npx prisma db push && npm run db:seed
npm run dev
```

### :whale: デプロイ

```bash
# Docker
docker compose up -d

# Vercel
vercel deploy --prod
```

### :file_folder: プロジェクト構成

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

<p align="center">~ ✿ ~ ✿ ~ ✿ ~</p>

---

## :framed_picture: Screenshots / Ảnh chụp màn hình / スクリーンショット

| Homepage | Menu | Dark Mode |
|:---:|:---:|:---:|
| ![Homepage](https://milktea-iku.vercel.app/api/og) | ![Menu](https://milktea-iku.vercel.app/api/og) | ![Dark](https://milktea-iku.vercel.app/api/og) |

<p align="center">~ ✿ ~ ✿ ~ ✿ ~</p>

---

## :art: Logo Variants / Biến thể Logo / ロゴバリアント

| Main | Mascot | Cute |
|:---:|:---:|:---:|
| <img src="public/logo.svg" width="80"/> | <img src="public/logo-mascot.svg" width="80"/> | <img src="public/logo-cute.svg" width="80"/> |

<p align="center">~ ✿ ~ ✿ ~ ✿ ~</p>

---

## :building_construction: Architecture

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

## :hammer_and_wrench: Scripts

| Command | Description | 説明 | Mô tả |
|---------|-------------|------|-------|
| `npm run dev` | Start dev server | 開発サーバー起動 | Khởi động server dev |
| `npm run build` | Production build | プロダクションビルド | Build production |
| `npm run start` | Start production | プロダクション起動 | Chạy production |
| `npm run lint` | Run ESLint | ESLint実行 | Chạy ESLint |
| `npm run db:push` | Push DB schema | DBスキーマ反映 | Đẩy schema DB |
| `npm run db:seed` | Seed database | DBシードデータ投入 | Seed dữ liệu |

## :test_tube: Testing

```bash
# Install browsers / ブラウザインストール / Cài đặt trình duyệt
npx playwright install

# Run all tests / 全テスト実行 / Chạy tất cả test
npx playwright test

# UI mode / UIモード / Chế độ UI
npx playwright test --ui
```

## :handshake: Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## :scroll: License

[MIT](LICENSE) © 2026 Nguyen Son

## :bust_in_silhouette: Author

**Nguyễn Sơn** ([@JasonTM17](https://github.com/JasonTM17))

<p align="center">~ ✿ ~ ✿ ~ ✿ ~</p>

---

<p align="center">
  :heart: Made with care in Vietnam 🇻🇳 :heart:<br/>
  <sub>ベトナムで心を込めて作りました • Được tạo với tâm huyết tại Việt Nam</sub>
</p>
