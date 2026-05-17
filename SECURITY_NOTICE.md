# Security Notice — Credential Rotation Required

> **Audience**: maintainers and self-hosters
> **Last updated**: 2026-05-17

## Background

Trước commit `dc8d7fd`, repo có vài giá trị placeholder dev-only được hardcode trong `playwright.config.ts` và một số file docs (cụ thể là `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_API_TOKEN`). Các giá trị này đã bị thay thế bằng `process.env.X ?? "change-me-in-production"`.

Vì repo public, **bất kỳ giá trị nào đã từng commit phải được coi là compromised** và rotate trước khi đưa lên production. Audit log cuối doc liệt kê các action đã thực hiện.

## Action items (bắt buộc trước khi go-live)

1. **Đổi toàn bộ admin credentials** trong môi trường production:
   - Generate `ADMIN_PASSWORD` mạnh: `openssl rand -base64 32`
   - Generate `ADMIN_API_TOKEN` ngẫu nhiên: `openssl rand -base64 48`
   - Cập nhật vào secret store (Vercel env, GitHub Actions secrets, AWS Secrets Manager...)
   - Xác nhận **không** giá trị nào trùng với git history.

2. **Không commit `.env`/`.env.local`** — đã có trong `.gitignore`. Dùng `.env.example` như template duy nhất được track.

3. **CI/CD**:
   - GitHub Actions: Settings → Secrets and variables → Actions → thêm các secret tương ứng
   - Vercel: Project → Settings → Environment Variables → set ở scope `Production` và `Preview`
   - Reference các secret trong workflow qua `${{ secrets.ADMIN_PASSWORD }}`, không hardcode

4. **Database**:
   - File `backend/prisma/dev.db` đã được untrack khỏi git
   - Production phải dùng managed DB (PostgreSQL/MySQL trên Vercel Postgres, Neon, Supabase, PlanetScale...)
   - `DATABASE_URL` phải set qua secret store, không commit

5. **docker-compose**: file `docker-compose.yml` dùng `${VAR:?required}` syntax — Docker sẽ fail nếu env var không set, không có default cứng nào còn lại.

## Local development setup

```bash
# 1. Copy template
cp .env.example .env.local

# 2. Generate strong dev secrets (recommended)
echo "ADMIN_PASSWORD=$(openssl rand -base64 24)" >> .env.local
echo "ADMIN_API_TOKEN=$(openssl rand -base64 32)" >> .env.local

# 3. Run dev
npm run dev
```

## Reporting security issues

See [SECURITY.md](./SECURITY.md) for the disclosure process.

## Audit log

| Date | Action |
|---|---|
| 2026-05-17 | Removed hardcoded credentials from `playwright.config.ts`, `vercel.json`, 3 test files, `docs/TESTING.md` |
| 2026-05-17 | Removed default fallback creds from `docker-compose.yml` (now `:?required` syntax) |
| 2026-05-17 | Added `isAuthorized()` guard to `/api/admin/orders/[id]` PATCH |
| 2026-05-17 | Replaced plain `===` credential comparison with `timingSafeEqual` |
| 2026-05-17 | Untracked `backend/prisma/dev.db` from git |
| 2026-05-17 | Hardened `.gitignore` to block dev DBs, .env files, agent tooling artifacts, root-level screenshots |
