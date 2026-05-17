<p align="center">
  🌐 <a href="../README.md">English</a> | <strong>Tiếng Việt</strong> | <a href="README.ja.md">日本語</a>
</p>

---

<p align="center">
  <img src="../public/logo-cute.svg" width="80" alt="MilkTea Iku Logo" />
</p>

<h1 align="center">MilkTea Iku</h1>

<p align="center">
  <strong>Nền Tảng Thương Mại Điện Tử Trà Sữa Cao Cấp</strong>
</p>

<p align="center">
  <a href="#tính-năng">Tính Năng</a> •
  <a href="#công-nghệ">Công Nghệ</a> •
  <a href="#cài-đặt">Cài Đặt</a> •
  <a href="#triển-khai">Triển Khai</a>
</p>

<p align="center">
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" alt="Docker" />
  <a href="https://milktea-iku.vercel.app"><img src="https://img.shields.io/badge/Vercel-Live-000?logo=vercel" alt="Vercel" /></a>
</p>

---

## Tổng Quan

MilkTea Iku là nền tảng thương mại điện tử trà sữa đầy đủ tính năng với tùy chỉnh đồ uống, theo dõi đơn hàng và quản lý admin. Xây dựng bằng công nghệ web hiện đại, tối ưu hiệu suất và trải nghiệm đặt hàng cao cấp.

**Demo trực tuyến:** [milktea-iku.vercel.app](https://milktea-iku.vercel.app)

---

## Tính Năng

### Trải Nghiệm Khách Hàng
- **Danh mục sản phẩm** — Duyệt theo danh mục, tìm kiếm, lọc theo giá
- **Tùy chỉnh đồ uống** — Size, mức đường, mức đá, topping
- **Giỏ hàng** — Lưu trữ persistent với Zustand
- **Thanh toán** — Form nhiều bước với validation Zod
- **Theo dõi đơn hàng** — Cập nhật trạng thái giao hàng real-time
- **Wishlist & Đánh giá** — Lưu yêu thích, đọc review

### Bảng Điều Khiển Admin
- **Thống kê doanh thu** — Biểu đồ, thống kê ngày/tuần/tháng
- **Quản lý đơn hàng** — Cập nhật trạng thái, lọc, tìm kiếm
- **CRUD sản phẩm** — Thêm, sửa, xóa sản phẩm
- **Hệ thống mã giảm giá** — Tạo và quản lý khuyến mãi

### Tính Năng Kỹ Thuật
- **Dark Mode** — Hỗ trợ theme tối toàn bộ trang
- **PWA** — Hỗ trợ offline, cài đặt trên mobile
- **SEO** — JSON-LD, sitemap động, OG images
- **Accessibility** — Skip links, ARIA labels, keyboard navigation
- **Rate Limiting** — Giới hạn request theo IP
- **Security Headers** — HSTS, CSP, X-Frame-Options

---

## Công Nghệ

| Lớp | Công Nghệ |
|-----|-----------|
| Framework | Next.js 14 (App Router) |
| Ngôn ngữ | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 |
| Database | Prisma 5.14 + SQLite |
| State | Zustand 4.5 |
| Animation | Framer Motion 11 |
| Testing | Playwright |
| Deployment | Vercel + Docker |

---

## Cài Đặt

```bash
# Clone repository
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku

# Cài đặt dependencies
npm ci --legacy-peer-deps

# Thiết lập môi trường
cp .env.example .env

# Thiết lập database
npx prisma generate
npx prisma db push
npm run db:seed

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

---

## Triển Khai

### Vercel

Dự án tự động deploy lên Vercel khi push vào `main`.

### Docker

```bash
# Sử dụng Docker Compose
docker compose up -d

# Hoặc pull từ Docker Hub
docker pull nguyenson1710/milktea-iku-backend:v1.0.0
docker pull nguyenson1710/milktea-iku-frontend:v1.0.0
```

| Service | Image | Port |
|---------|-------|------|
| Backend | `nguyenson1710/milktea-iku-backend` | 3000 |
| Frontend | `nguyenson1710/milktea-iku-frontend` | 80 |

---

## Giấy Phép

[MIT](../LICENSE) © 2026 [Nguyễn Sơn](https://github.com/JasonTM17)

---

## Lưu Ý

> Đây là **dự án học tập** được xây dựng với mục đích giáo dục.
> Mọi ý kiến đóng góp, góp ý và phản hồi đều được hoan nghênh!
>
> **Tác giả:** Nguyễn Sơn — [jasonbmt06@gmail.com](mailto:jasonbmt06@gmail.com)
>
> Nếu bạn có ý tưởng hoặc phản hồi, vui lòng mở [issue](https://github.com/JasonTM17/MilkTea_Iku/issues) hoặc liên hệ qua email.

---

<p align="center">
  Made with ☕ by <a href="https://github.com/JasonTM17">Nguyễn Sơn</a>
</p>
