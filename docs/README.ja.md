<p align="center">
  🌐 <a href="../README.md">English</a> | <a href="README.vi.md">Tiếng Việt</a> | <strong>日本語</strong>
</p>

---

<p align="center">
  <img src="../public/logo-cute.svg" width="80" alt="MilkTea Iku Logo" />
</p>

<h1 align="center">MilkTea Iku</h1>

<p align="center">
  <strong>プレミアムミルクティーECプラットフォーム</strong>
</p>

<p align="center">
  <a href="#機能">機能</a> •
  <a href="#技術スタック">技術スタック</a> •
  <a href="#セットアップ">セットアップ</a> •
  <a href="#デプロイ">デプロイ</a>
</p>

<p align="center">
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" alt="Docker" />
  <a href="https://milktea-iku.vercel.app"><img src="https://img.shields.io/badge/Vercel-Live-000?logo=vercel" alt="Vercel" /></a>
</p>

---

## 概要

MilkTea Ikuは、ドリンクカスタマイズ、注文追跡、管理ダッシュボードを備えたフル機能のミルクティーECプラットフォームです。最新のWeb技術で構築され、パフォーマンスとプレミアムな注文体験を最適化しています。

**ライブデモ:** [milktea-iku.vercel.app](https://milktea-iku.vercel.app)

---

## 機能

### カスタマー体験
- **商品カタログ** — カテゴリ別閲覧、検索、価格フィルター
- **ドリンクカスタマイズ** — サイズ、甘さ、氷、トッピング選択
- **ショッピングカート** — Zustandによる永続的な状態管理
- **チェックアウト** — Zodバリデーション付きマルチステップフォーム
- **注文追跡** — リアルタイム配送状況更新
- **ウィッシュリスト＆レビュー** — お気に入り保存、レビュー閲覧

### 管理ダッシュボード
- **売上分析** — チャート、日次/週次/月次統計
- **注文管理** — ステータス更新、フィルター、検索
- **商品CRUD** — 商品とカテゴリの追加・編集・削除
- **クーポンシステム** — プロモーションコードの作成と管理

### 技術的特徴
- **ダークモード** — 全ページ対応テーマサポート
- **PWA** — オフラインサポート、モバイルインストール可能
- **SEO** — JSON-LD構造化データ、動的サイトマップ、OG画像
- **アクセシビリティ** — スキップリンク、ARIAラベル、キーボードナビゲーション
- **レート制限** — IPベースのスライディングウィンドウ
- **セキュリティヘッダー** — HSTS、CSP、X-Frame-Options

---

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フレームワーク | Next.js 14 (App Router) |
| 言語 | TypeScript 5.4 |
| スタイリング | Tailwind CSS 3.4 |
| データベース | Prisma 5.14 + SQLite |
| 状態管理 | Zustand 4.5 |
| アニメーション | Framer Motion 11 |
| テスト | Playwright |
| デプロイ | Vercel + Docker |

---

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku

# 依存関係をインストール
npm ci --legacy-peer-deps

# 環境設定
cp .env.example .env

# データベースセットアップ
npx prisma generate
npx prisma db push
npm run db:seed

# 開発サーバーを起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認。

---

## デプロイ

### Vercel

`main`ブランチへのプッシュで自動デプロイされます。

### Docker

```bash
# Docker Composeを使用
docker compose up -d

# Docker Hubからプル
docker pull nguyenson1710/milktea-iku-backend:v1.0.0
docker pull nguyenson1710/milktea-iku-frontend:v1.0.0
```

| サービス | イメージ | ポート |
|---------|---------|--------|
| バックエンド | `nguyenson1710/milktea-iku-backend` | 3000 |
| フロントエンド | `nguyenson1710/milktea-iku-frontend` | 80 |

---

## ライセンス

[MIT](../LICENSE) © 2026 [Nguyễn Sơn](https://github.com/JasonTM17)

---

## 注意事項

> これは教育目的で構築された**学習プロジェクト**です。
> フィードバック、提案、貢献を歓迎します！
>
> **著者:** Nguyễn Sơn — [jasonbmt06@gmail.com](mailto:jasonbmt06@gmail.com)
>
> アイデアやフィードバックがあれば、[issue](https://github.com/JasonTM17/MilkTea_Iku/issues)を作成するか、メールでご連絡ください。

---

<p align="center">
  Made with ☕ by <a href="https://github.com/JasonTM17">Nguyễn Sơn</a>
</p>
