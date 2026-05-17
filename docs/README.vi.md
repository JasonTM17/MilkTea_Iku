<p align="center">
  <a href="../README.md">English</a>
  &nbsp;·&nbsp;
  <strong>Tiếng Việt</strong>
  &nbsp;·&nbsp;
  <a href="README.ja.md">日本語</a>
</p>

<p align="center">
  <img src="../public/logo-cute.svg" width="80" alt="MilkTea Iku logo" />
</p>

<h1 align="center">MilkTea Iku</h1>

<p align="center">
  <strong>Thương mại điện tử trà sữa full-stack — Next.js 14 · TypeScript · Prisma · Docker</strong>
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
  <a href="../LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" />
  </a>
</p>

---

## Tóm tắt nhanh

MilkTea Iku là storefront thương mại điện tử cho thương hiệu trà sữa cao cấp, bao phủ toàn bộ hành trình khách hàng — từ duyệt menu, tùy chỉnh đồ uống, thanh toán đến theo dõi đơn hàng — cùng bảng điều khiển admin để quản lý đơn hàng và mã giảm giá.

|                   |                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| **URL trực tiếp** | [milktea-iku.vercel.app](https://milktea-iku.vercel.app)                           |
| **Trạng thái**    | Đã deploy trên Vercel · dự án portfolio / tham khảo                                |
| **Stack**         | Next.js 14 App Router, TypeScript, Prisma, SQLite (dev) / Postgres (prod)          |
| **Tests**         | 35 file Playwright spec — e2e, API, accessibility, visual, performance, SEO        |
| **CI/CD**         | 6 GitHub Actions workflows (ci, deploy, docker-publish, codeql, security, release) |

---

## Demo

<p align="center">
  <img src="screenshots/demo-homepage.gif" alt="Homepage demo" width="900" />
  <br />
  <em>Khám phá trang chủ — hero, sản phẩm nổi bật và tìm cửa hàng.</em>
</p>

## Ảnh chụp màn hình

### Desktop

<table>
  <tr>
    <td width="50%" align="center">
      <img src="screenshots/homepage.png" alt="Homepage — light mode" />
      <br /><sub><b>Trang chủ</b> · Giao diện sáng</sub>
    </td>
    <td width="50%" align="center">
      <img src="screenshots/dark-mode.png" alt="Homepage — dark mode" />
      <br /><sub><b>Trang chủ</b> · Giao diện tối</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="screenshots/menu.png" alt="Menu catalogue" />
      <br /><sub><b>Menu</b> · Duyệt sản phẩm với bộ lọc</sub>
    </td>
    <td align="center">
      <img src="screenshots/stores.png" alt="Store locator" />
      <br /><sub><b>Cửa hàng</b> · 6 địa điểm tại TP.HCM và Hà Nội</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="screenshots/checkout.png" alt="Checkout flow" />
      <br /><sub><b>Thanh toán</b> · Đặt hàng và thanh toán</sub>
    </td>
    <td align="center">
      <img src="screenshots/menu-dark.png" alt="Menu dark mode" />
      <br /><sub><b>Menu</b> · Duyệt giao diện tối</sub>
    </td>
  </tr>
</table>

### Mobile

<table>
  <tr>
    <td width="33%" align="center">
      <img src="screenshots/mobile.png" alt="Mobile light" width="280" />
      <br /><sub><b>Giao diện sáng</b></sub>
    </td>
    <td width="33%" align="center">
      <img src="screenshots/mobile-dark.png" alt="Mobile dark" width="280" />
      <br /><sub><b>Giao diện tối</b></sub>
    </td>
    <td width="33%" align="center">
      <img src="screenshots/demo-mobile.gif" alt="Mobile flow" width="280" />
      <br /><sub><b>Demo tương tác</b></sub>
    </td>
  </tr>
</table>

### Tương tác

<table>
  <tr>
    <td width="50%" align="center">
      <img src="screenshots/demo-menu.gif" alt="Menu browsing demo" />
      <br /><sub><b>Duyệt menu</b> · Bộ lọc, hover, thẻ sản phẩm</sub>
    </td>
    <td width="50%" align="center">
      <img src="screenshots/demo-dark-toggle.gif" alt="Dark mode toggle" />
      <br /><sub><b>Chuyển giao diện</b> · Chuyển đổi dark mode mượt mà</sub>
    </td>
  </tr>
</table>

---

## Tính năng

**Khách hàng**

- Duyệt menu với bộ lọc danh mục, tìm kiếm toàn văn và sắp xếp
- Tùy chỉnh đồ uống — size, mức đường, mức đá, chọn nhiều topping
- Giỏ hàng với trạng thái lưu trữ (Zustand + localStorage)
- Thanh toán nhiều bước với validation Zod và tính lại giá phía server
- Áp dụng mã giảm giá với validation có giới hạn tốc độ
- Theo dõi đơn hàng bằng số điện thoại và mã đơn
- Chương trình tích điểm và phần thưởng theo hạng thành viên
- Danh sách yêu thích

**Nền tảng**

- Bảng điều khiển admin — quản lý đơn hàng, chuyển trạng thái, CRUD mã giảm giá, thống kê tổng hợp
- Giao diện sáng/tối qua `next-themes` (độ tương phản WCAG AA)
- Thiết kế responsive hoàn toàn, ưu tiên mobile
- Hỗ trợ đa ngôn ngữ (English · Tiếng Việt · 日本語)
- Đặc tả OpenAPI 3.0 tại `/api/docs`
- PWA manifest và service-worker scaffold

---

## Công nghệ

| Lớp           | Lựa chọn                                                |
| ------------- | ------------------------------------------------------- |
| Framework     | Next.js 14.2 (App Router, Server Components, streaming) |
| Ngôn ngữ      | TypeScript 5.4                                          |
| Styling       | Tailwind CSS 3.4 + shadcn/ui                            |
| Animation     | Framer Motion 11                                        |
| Theming       | next-themes                                             |
| Validation    | Zod 3.23                                                |
| State         | Zustand 4.5                                             |
| ORM / DB      | Prisma 5.14 — SQLite (dev) · Postgres (prod)            |
| Auth          | HTTP Basic + Bearer token, mật khẩu hash bằng scrypt    |
| Rate limiting | Sliding window theo IP (in-memory)                      |
| Icons         | lucide-react                                            |
| Testing       | Playwright 1.60                                         |
| CI/CD         | GitHub Actions                                          |
| Hosting       | Vercel (chính) · Docker Hub                             |

---

## Bắt đầu nhanh

### Phát triển local

```bash
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku

npm install --legacy-peer-deps

cp .env.example .env.local
# Chỉnh sửa .env.local — xem phần Biến môi trường bên dưới

npx prisma generate --schema=backend/prisma/schema.prisma
npm run db:push
npm run db:seed

npm run dev
# → http://localhost:3000
```

### Docker (tự host)

```bash
cp .env.example .env.local
# Điền các giá trị vào .env.local

docker compose up -d
# → http://localhost:3000
```

### Các lệnh hữu ích

| Lệnh                                   | Mục đích                  |
| -------------------------------------- | ------------------------- |
| `npm run dev`                          | Khởi động dev server      |
| `npm run build`                        | Build production          |
| `npm run lint`                         | ESLint + Next lint        |
| `npx tsc --noEmit`                     | Kiểm tra kiểu dữ liệu     |
| `npx playwright test`                  | Chạy toàn bộ test suite   |
| `npm run db:push`                      | Đẩy schema lên SQLite     |
| `npm run db:seed`                      | Seed dữ liệu mẫu          |
| `npm run db:studio`                    | Mở Prisma Studio          |
| `node scripts/generate-admin-hash.mjs` | Tạo `ADMIN_PASSWORD_HASH` |

---

## Biến môi trường

Sao chép `.env.example` thành `.env.local` và điền các giá trị.

| Biến                  | Bắt buộc | Mô tả                                                       |
| --------------------- | -------- | ----------------------------------------------------------- |
| `DATABASE_URL`        | Có       | Đường dẫn SQLite cho dev; URL Postgres cho prod             |
| `ADMIN_USERNAME`      | Có       | Tên đăng nhập cho HTTP Basic Auth tại `/admin`              |
| `ADMIN_PASSWORD`      | Chỉ dev  | Mật khẩu plaintext (bỏ qua khi đã có hash)                  |
| `ADMIN_PASSWORD_HASH` | Prod     | Hash scrypt — tạo bằng `generate-admin-hash.mjs`            |
| `ADMIN_API_TOKEN`     | Có       | Bearer token cho truy cập admin qua API                     |
| `N8N_WEBHOOK_URL`     | Tùy chọn | URL webhook n8n cho chatbot                                 |
| `N8N_HOSTNAMES`       | Tùy chọn | Danh sách hostname được phép cho n8n (chống SSRF)           |
| `N8N_USER`            | Tùy chọn | Tên đăng nhập basic auth n8n (chỉ docker-compose)           |
| `N8N_PASSWORD`        | Tùy chọn | Mật khẩu basic auth n8n (chỉ docker-compose)                |
| `E2E_BASE_URL`        | Chỉ CI   | Base URL cho Playwright (mặc định: `http://localhost:3000`) |

---

## Kiến trúc

Tổng quan kiến trúc đầy đủ, cấu trúc dự án và sơ đồ luồng dữ liệu: [`docs/ARCHITECTURE.md`](ARCHITECTURE.md).

Tài liệu bổ sung:

| Tài liệu             | Liên kết                                          |
| -------------------- | ------------------------------------------------- |
| Tham chiếu API       | [`docs/api.md`](api.md)                           |
| Hướng dẫn triển khai | [`docs/DEPLOYMENT.md`](DEPLOYMENT.md)             |
| Chiến lược testing   | [`docs/TESTING.md`](TESTING.md)                   |
| Hướng dẫn UI/UX      | [`docs/UI_UX_GUIDELINES.md`](UI_UX_GUIDELINES.md) |
| Bảo mật              | [`SECURITY.md`](../SECURITY.md)                   |
| Phạm vi thực tế      | [`docs/HONEST_SCOPE.md`](HONEST_SCOPE.md)         |

---

## Triển khai

### Vercel (chính)

Push lên `main` — workflow [`deploy.yml`](../.github/workflows/deploy.yml) sẽ tự động build và deploy.

Với môi trường production, cấu hình tất cả biến môi trường trong Vercel dashboard và chuyển `DATABASE_URL` sang chuỗi kết nối Postgres.

### Docker

```bash
docker compose up -d          # khởi động backend + frontend + n8n
docker compose down           # dừng
docker compose logs -f        # xem log realtime
```

Các bản release được tag sẽ tự động publish image lên Docker Hub qua [`docker-publish.yml`](../.github/workflows/docker-publish.yml).

Tham khảo đầy đủ: [`docs/DEPLOYMENT.md`](DEPLOYMENT.md).

---

## Tác giả

**Nguyễn Sơn** — [github.com/JasonTM17](https://github.com/JasonTM17) · [jasonbmt06@gmail.com](mailto:jasonbmt06@gmail.com)

---

## Giấy phép

[MIT](../LICENSE) © 2026 Nguyễn Sơn

---

<p align="center">Made with ☕ tại Sài Gòn</p>
