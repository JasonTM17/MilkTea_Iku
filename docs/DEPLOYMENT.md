# Deployment — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

> **30-second reviewer brief**
>
> Two deployment paths: Vercel (recommended, auto-deploys on push to `main`) and Docker Compose (self-hosted, backend + Nginx frontend + optional n8n). Docker images are published to both Docker Hub (`nguyenson1710/milktea-iku-*`) and GHCR (`ghcr.io/jasontm17/milktea-iku-*`) on version tags. The only required env vars are `DATABASE_URL`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`. Health check endpoint: `GET /api/health`. **Do not use default credentials in production.**

---

## Mục lục

1. [Deployment matrix](#1-deployment-matrix)
2. [Vercel (khuyến nghị)](#2-vercel-khuyến-nghị)
3. [Docker Compose](#3-docker-compose)
4. [Environment variables](#4-environment-variables)
5. [Database migration](#5-database-migration)
6. [Health check](#6-health-check)
7. [CI/CD workflows](#7-cicd-workflows)
8. [Rollback](#8-rollback)
9. [Production checklist](#9-production-checklist)

---

## 1. Deployment matrix

| Phương thức | Môi trường | Trạng thái | Ghi chú |
|-------------|-----------|------------|---------|
| Vercel | Production | Hoạt động | Auto-deploy khi push `main` |
| Docker Compose | Self-hosted / VPS | Hoạt động | backend + frontend + n8n |
| Docker Hub | Image registry | Hoạt động | `nguyenson1710/milktea-iku-*` |
| GHCR | Image registry | Hoạt động | `ghcr.io/jasontm17/milktea-iku-*` — publish khi tag `v*` |
| Manual VPS | Self-hosted | Không có script riêng | Dùng Docker Compose |

---

## 2. Vercel (khuyến nghị)

**Live:** [milktea-iku.vercel.app](https://milktea-iku.vercel.app)

### Deploy tự động

Push lên branch `main` kích hoạt `.github/workflows/deploy.yml`:

```
push main → vercel pull (env) → vercel build --prod → vercel deploy --prebuilt --prod
```

### Deploy thủ công

```bash
# Cài Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project (lần đầu)
vercel link

# Deploy production
vercel --prod
```

### Cấu hình Vercel

File `vercel.json` tại root:

- `framework`: `nextjs`
- `buildCommand`: `bash scripts/vercel-build.sh`
- `installCommand`: `npm ci --legacy-peer-deps`
- `regions`: `["sin1"]` (Singapore)
- Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS

### Secrets cần thiết trong Vercel Dashboard

| Secret | Mô tả |
|--------|-------|
| `VERCEL_TOKEN` | Vercel API token (cho CI) |
| `VERCEL_ORG_ID` | Organization ID |
| `VERCEL_PROJECT_ID` | Project ID |

---

## 3. Docker Compose

### Khởi động

```bash
# Clone repo
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku

# Tạo file .env (xem mục 4)
cp .env.example .env

# Build và khởi động
docker compose up -d

# Xem logs
docker compose logs -f

# Dừng
docker compose down
```

### Services

| Service | Image | Port | Mô tả |
|---------|-------|------|-------|
| `backend` | `Dockerfile.backend` | `3000` | Next.js standalone (SSR + API routes) |
| `frontend` | `Dockerfile.frontend` | `80` | Nginx reverse proxy + static assets |
| `n8n` | `n8nio/n8n:latest` | `5678` | Chatbot automation (optional) |

### Volumes

| Volume | Mount | Mô tả |
|--------|-------|-------|
| `db-data` | `/app/backend/prisma` | SQLite database persistence |
| `n8n-data` | `/home/node/.n8n` | n8n workflows và config |

### Dockerfile.backend

Multi-stage build:
1. `builder` (node:20-alpine): `npm ci` → `prisma generate` → `npm run build`
2. `runner` (node:20-alpine): Copy `.next/standalone`, static files, Prisma binaries. Chạy với user `nextjs` (non-root). Health check: `GET /api/health`.

### Dockerfile.frontend

Multi-stage build:
1. `builder` (node:20-alpine): Build Next.js để lấy static assets
2. `runner` (nginx:alpine): Serve `public/` và `_next/static/` qua Nginx. Proxy `/api/*` và SSR requests đến backend:3000.

### Pull từ registry

```bash
# Docker Hub
docker pull nguyenson1710/milktea-iku-backend:latest
docker pull nguyenson1710/milktea-iku-frontend:latest

# GHCR (tagged releases)
docker pull ghcr.io/jasontm17/milktea-iku-backend:v1.0.0
docker pull ghcr.io/jasontm17/milktea-iku-frontend:v1.0.0
```

| Image | Registry | Size |
|-------|----------|------|
| `milktea-iku-backend` | Docker Hub / GHCR | ~349 MB |
| `milktea-iku-frontend` | Docker Hub / GHCR | ~96 MB |

---

## 4. Environment variables

### Bắt buộc

| Biến | Required | Default | Mô tả |
|------|----------|---------|-------|
| `DATABASE_URL` | Có | — | SQLite: `file:./backend/prisma/dev.db`. Production: PostgreSQL/MySQL URL |
| `ADMIN_USERNAME` | Có | `admin` | Username đăng nhập admin |
| `ADMIN_PASSWORD` | Có | `iku-admin-2026` | Password đăng nhập admin. **Đổi ngay khi deploy.** |

### Tùy chọn

| Biến | Required | Default | Mô tả |
|------|----------|---------|-------|
| `ADMIN_API_TOKEN` | Không | — | Bearer token cho admin API (thay thế Basic Auth) |
| `N8N_WEBHOOK_URL` | Không | — | URL webhook n8n cho chatbot. Nếu không set, chatbot dùng fallback message. |
| `NODE_ENV` | Không | `development` | `production` trong Docker/Vercel |
| `NEXT_TELEMETRY_DISABLED` | Không | — | Set `1` để tắt Next.js telemetry |

### Tạo file .env

```bash
cp .env.example .env
# Chỉnh sửa .env với giá trị thực tế
```

Nội dung `.env.example`:

```env
DATABASE_URL=file:./backend/prisma/dev.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me-in-production
ADMIN_API_TOKEN=
N8N_WEBHOOK_URL=
```

---

## 5. Database migration

### Development (SQLite)

```bash
# Generate Prisma client
npx prisma generate --schema=backend/prisma/schema.prisma

# Push schema lên DB (tạo tables, không có migration history)
npm run db:push

# Seed dữ liệu mẫu
npm run db:seed

# Mở Prisma Studio (GUI)
npm run db:studio
```

### Production

SQLite không phù hợp cho production multi-instance. Khuyến nghị migrate sang PostgreSQL hoặc MySQL:

1. Đổi `provider` trong `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // hoặc "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. Cập nhật `DATABASE_URL` trong env:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/milktea_iku
   ```

3. Chạy migration:
   ```bash
   npx prisma migrate deploy --schema=backend/prisma/schema.prisma
   ```

**Lưu ý:** Dự án hiện dùng `prisma db push` (không có migration files). Khi chuyển sang production, nên chuyển sang `prisma migrate` để có migration history.

---

## 6. Health check

Endpoint: `GET /api/health`

```bash
curl https://milktea-iku.vercel.app/api/health
```

Response khi healthy (200):

```json
{
  "status": "healthy",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "uptime": 3600.5,
  "database": "connected",
  "productCount": 24
}
```

Response khi unhealthy (503):

```json
{
  "status": "unhealthy",
  "database": "disconnected"
}
```

Docker health check (trong `Dockerfile.backend`):

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1
```

---

## 7. CI/CD workflows

### ci.yml — Lint, typecheck, build, Docker push

Trigger: push hoặc PR lên `main`

```
lint (ESLint + tsc --noEmit)
  └── build (npm run build)
        └── docker (build + push backend + frontend images)
              [chỉ chạy khi push main, không chạy trên PR]
```

Secrets cần thiết:

| Secret | Mô tả |
|--------|-------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |

### deploy.yml — Vercel production deploy

Trigger: push lên `main`

```
vercel pull --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

Secrets cần thiết: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### docker-publish.yml — GHCR publish

Trigger: push tag `v*` hoặc `workflow_dispatch`

Publish images lên `ghcr.io/jasontm17/milktea-iku-backend` và `ghcr.io/jasontm17/milktea-iku-frontend` với tags: semver, `major.minor`, SHA, `latest`.

### release.yml — GitHub Release

Trigger: push tag `v*`

Tự động tạo GitHub Release với changelog từ git log kể từ tag trước.

---

## 8. Rollback

### Vercel

```bash
# Xem danh sách deployments
vercel ls

# Promote deployment cũ lên production
vercel promote <deployment-url>
```

Hoặc qua Vercel Dashboard: Deployments → chọn deployment cũ → Promote to Production.

### Docker

```bash
# Pull image theo tag cụ thể
docker pull nguyenson1710/milktea-iku-backend:v1.0.0

# Cập nhật docker-compose.yml để dùng tag cụ thể
# Sau đó restart
docker compose up -d
```

---

## 9. Production checklist

Trước khi deploy lên production thật:

- [ ] Đổi `ADMIN_PASSWORD` và `ADMIN_API_TOKEN` — không dùng giá trị mặc định
- [ ] Migrate database từ SQLite sang PostgreSQL hoặc MySQL
- [ ] Cấu hình `DATABASE_URL` trỏ đến production DB
- [ ] Set `N8N_WEBHOOK_URL` nếu muốn chatbot hoạt động
- [ ] Cấu hình tất cả GitHub Secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- [ ] Verify health check: `curl /api/health` trả về `"status": "healthy"`
- [ ] Chạy `npx playwright test` và đảm bảo tất cả tests pass
- [ ] Kiểm tra security headers: `curl -I <production-url>`
- [ ] Xác nhận admin route trả về 401 khi không có auth: `curl /api/admin/stats`
- [ ] Tích hợp email service nếu cần gửi xác nhận đơn hàng

---

## Liên quan

- [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — Kiến trúc hệ thống
- [`docs/HONEST_SCOPE.md`](./HONEST_SCOPE.md) — Giới hạn thực tế (SQLite, no email, no payment)
- [`SECURITY_NOTICE.md`](../SECURITY_NOTICE.md) — Hướng dẫn xoay vòng credentials
