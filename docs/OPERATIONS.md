# Operations Runbook — MilkTea Iku

> Author: Nguyễn Sơn (jasonbmt06@gmail.com)
> Last updated: 2026-05-17

---

> **30-second reviewer brief**
>
> Operational runbook for MilkTea Iku. Primary deployment is Vercel (auto-deploy on push to `main`); secondary is Docker Compose for self-hosted. Health check endpoint: `GET /api/health`. Rollback via `vercel promote <deployment-url>` or Docker image tag pin. No external observability stack — monitoring is Vercel dashboard + GitHub Actions status. Database is SQLite (demo); backup is a file copy. Common incidents: rate limit false positives (restart resets state), admin 401 (check env vars), chatbot silent failure (check N8N_WEBHOOK_URL).

---

## Table of Contents

1. [Deployment](#1-deployment)
2. [Rollback](#2-rollback)
3. [Production health checks](#3-production-health-checks)
4. [Logs and monitoring](#4-logs-and-monitoring)
5. [Backup and restore](#5-backup-and-restore)
6. [Common incidents and resolutions](#6-common-incidents-and-resolutions)
7. [Alerts setup](#7-alerts-setup)
8. [Environment variables reference](#8-environment-variables-reference)

---

## 1. Deployment

Full deployment documentation is in [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md). Quick reference below.

### Vercel (primary — recommended)

Auto-deploys on every push to `main` via `.github/workflows/deploy.yml`.

```bash
# Manual deploy (requires Vercel CLI)
npm install -g vercel
vercel login
vercel --prod
```

Pipeline: `vercel pull --environment=production` → `vercel build --prod` → `vercel deploy --prebuilt --prod`

Live URL: [milktea-iku.vercel.app](https://milktea-iku.vercel.app)

### Docker Compose (self-hosted)

```bash
# First-time setup
git clone https://github.com/JasonTM17/MilkTea_Iku.git
cd MilkTea_Iku
cp .env.example .env
# Edit .env with real values

# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

Services started: `backend` (port 3000), `frontend` / Nginx (port 80), `n8n` (port 5678, optional).

### Pre-deploy checklist

- [ ] `ADMIN_PASSWORD` and `ADMIN_API_TOKEN` are not default values
- [ ] `DATABASE_URL` points to production database (not SQLite for multi-instance)
- [ ] All GitHub Secrets are set: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`
- [ ] Health check passes: `curl https://milktea-iku.vercel.app/api/health`

---

## 2. Rollback

### Vercel rollback

```bash
# List recent deployments
vercel ls

# Promote a previous deployment to production
vercel promote <deployment-url>
```

Or via Vercel Dashboard: **Deployments** → select a previous deployment → **Promote to Production**.

Rollback is instant — Vercel switches the production alias to the selected deployment without a rebuild.

### Docker rollback

```bash
# Pull a specific tagged image
docker pull nguyenson1710/milktea-iku-backend:v1.0.0
docker pull nguyenson1710/milktea-iku-frontend:v1.0.0

# Edit docker-compose.yml to pin the image tag
# image: nguyenson1710/milktea-iku-backend:v1.0.0

# Restart with pinned version
docker compose up -d
```

Available tags: `latest`, semver tags (e.g. `v1.0.0`), and SHA-based tags. Check [Docker Hub](https://hub.docker.com/u/nguyenson1710) or [GHCR](https://github.com/JasonTM17/MilkTea_Iku/pkgs/container/milktea-iku-backend) for available tags.

### Git rollback (last resort)

```bash
# Revert the last commit and push to trigger a new deploy
git revert HEAD
git push origin main
```

Do not use `git reset --hard` on `main` — it rewrites history and breaks CI.

---

## 3. Production health checks

### Primary health endpoint

```bash
curl https://milktea-iku.vercel.app/api/health
```

Expected response (HTTP 200):

```json
{
  "status": "healthy",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "uptime": 3600.5,
  "database": "connected",
  "productCount": 24
}
```

Unhealthy response (HTTP 503):

```json
{
  "status": "unhealthy",
  "database": "disconnected"
}
```

### Smoke test checklist

Run after every deploy to confirm critical paths work:

| Check | Command / URL | Expected |
|-------|--------------|----------|
| Health endpoint | `GET /api/health` | `200 { status: "healthy" }` |
| Homepage loads | `GET /` | `200`, HTML with product content |
| Product list API | `GET /api/products` | `200 { success: true, data: [...] }` |
| Admin auth guard | `GET /api/admin/stats` (no auth) | `401` |
| Security headers | `curl -I <url>` | `X-Frame-Options`, `X-Content-Type-Options` present |
| Rate limit active | 6× `POST /api/newsletter` in 60s | 6th request returns `429` |

### Docker health check

The backend container has a built-in health check:

```bash
# Check container health status
docker inspect milktea-iku-backend --format='{{.State.Health.Status}}'
# Expected: healthy
```

---

## 4. Logs and monitoring

### Vercel logs

```bash
# Stream runtime logs (requires Vercel CLI)
vercel logs --follow

# View logs for a specific deployment
vercel logs <deployment-url>
```

Or via Vercel Dashboard: **Deployments** → select deployment → **Functions** tab → select a function → view logs.

### Docker logs

```bash
# All services
docker compose logs -f

# Backend only
docker compose logs -f backend

# Last 100 lines
docker compose logs --tail=100 backend
```

### Application log format

`backend/lib/logger.ts` outputs structured JSON to stdout:

```json
{
  "level": "info",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "message": "Order created",
  "context": { "orderId": "abc123", "total": 85000 }
}
```

Log levels: `info`, `warn`, `error`. No remote logging service is configured (see `docs/HONEST_SCOPE.md`).

### GitHub Actions status

CI/CD pipeline status: [github.com/JasonTM17/MilkTea_Iku/actions](https://github.com/JasonTM17/MilkTea_Iku/actions)

| Workflow | Trigger | What it checks |
|----------|---------|----------------|
| `ci.yml` | Push / PR to `main` | Lint, typecheck, build, Docker push |
| `deploy.yml` | Push to `main` | Vercel production deploy |
| `security.yml` | Push / PR to `main` | Gitleaks, Trivy, npm audit |
| `codeql.yml` | Push / PR to `main` | CodeQL static analysis |

---

## 5. Backup and restore

### SQLite (development / demo)

The SQLite database file is at `D:\MilkTea_Iku\backend\prisma\dev.db` (gitignored).

**Backup:**

```bash
# Simple file copy
cp D:\MilkTea_Iku\backend\prisma\dev.db D:\MilkTea_Iku\backend\prisma\dev.db.backup-$(date +%Y%m%d)

# Or use SQLite's online backup
sqlite3 D:\MilkTea_Iku\backend\prisma\dev.db ".backup 'dev.db.backup'"
```

**Restore:**

```bash
# Stop the application first, then replace the file
docker compose down
cp dev.db.backup D:\MilkTea_Iku\backend\prisma\dev.db
docker compose up -d
```

### PostgreSQL (production)

When migrated to PostgreSQL (see `PRODUCTION_CHECKLIST.md §2`):

```bash
# Backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20260517.sql
```

For managed databases (Neon, Supabase, PlanetScale), use the provider's built-in backup and point-in-time recovery features.

### Prisma schema backup

The schema is version-controlled at `D:\MilkTea_Iku\backend\prisma\schema.prisma`. No separate backup needed — git history is the source of truth.

**Re-seed from scratch:**

```bash
# Drop and recreate (development only)
npx prisma db push --force-reset --schema=backend/prisma/schema.prisma
npm run db:seed
```

---

## 6. Common incidents and resolutions

### Incident: Admin dashboard returns 401

**Symptoms:** Accessing `/admin` or `/api/admin/*` returns 401 even with correct credentials.

**Diagnosis:**

```bash
# Check env vars are set
vercel env ls
# or
echo $ADMIN_USERNAME
echo $ADMIN_PASSWORD
```

**Resolution:**

1. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in Vercel environment variables (Production scope).
2. If using `ADMIN_PASSWORD_HASH`, verify the hash was generated with `node scripts/generate-admin-hash.mjs`.
3. Redeploy after updating env vars: `vercel --prod`.

---

### Incident: Rate limit false positives (legitimate requests getting 429)

**Symptoms:** Normal users receiving `429 Too Many Requests`.

**Root cause:** Rate limiter uses in-memory sliding window — state is per-instance and resets on restart. Under Vercel's serverless model, each function invocation may be a new instance.

**Resolution:**

- Short-term: Restart the service to clear rate limit state.
- Long-term: Migrate to Redis-backed rate limiting (see `PRODUCTION_CHECKLIST.md §4`).

---

### Incident: Chatbot returns fallback message / no response

**Symptoms:** Chatbot widget shows generic fallback instead of n8n response.

**Diagnosis:**

```bash
# Test the chatbot API directly
curl -X POST https://milktea-iku.vercel.app/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'
```

**Resolution:**

1. Check `N8N_WEBHOOK_URL` is set and points to a running n8n instance.
2. Verify the n8n webhook URL is HTTPS and not a private IP (SSRF protection will block it).
3. Check n8n service is running: `docker compose ps n8n`.
4. If n8n is down, the chatbot falls back gracefully — no action needed for demo use.

---

### Incident: Build fails in CI

**Symptoms:** `ci.yml` workflow fails on lint, typecheck, or build step.

**Diagnosis:** Check the failing step in GitHub Actions logs.

| Failing step | Common cause | Fix |
|-------------|-------------|-----|
| `lint` | ESLint error in new code | Fix the lint error locally: `npm run lint` |
| `typecheck` | TypeScript error | Fix locally: `npx tsc --noEmit` |
| `build` | Next.js build error | Fix locally: `npm run build` |
| `docker` | Docker Hub credentials expired | Rotate `DOCKERHUB_TOKEN` in GitHub Secrets |

---

### Incident: Database connection error in health check

**Symptoms:** `/api/health` returns `{ "status": "unhealthy", "database": "disconnected" }`.

**Resolution:**

1. Check `DATABASE_URL` is set correctly.
2. For SQLite: verify the file exists at the path specified in `DATABASE_URL`.
3. For PostgreSQL: verify the database server is reachable and credentials are valid.
4. Run `npx prisma db push --schema=backend/prisma/schema.prisma` to ensure schema is applied.

---

### Incident: Docker container exits immediately

**Symptoms:** `docker compose up -d` starts but `docker compose ps` shows container as `exited`.

**Diagnosis:**

```bash
docker compose logs backend
```

**Common causes:**

| Error in logs | Fix |
|--------------|-----|
| `DATABASE_URL is required` | Set `DATABASE_URL` in `.env` |
| `ADMIN_PASSWORD is required` | Set `ADMIN_PASSWORD` in `.env` |
| `Cannot find module` | Rebuild image: `docker compose build --no-cache` |
| `EADDRINUSE: port 3000` | Another process is using port 3000 |

---

## 7. Alerts setup

No automated alerting is configured (see `docs/HONEST_SCOPE.md`). Manual monitoring options:

### Vercel deployment notifications

In Vercel Dashboard: **Settings** → **Notifications** → enable email alerts for failed deployments.

### GitHub Actions notifications

GitHub sends email notifications for failed workflow runs by default. Ensure your GitHub notification settings are configured at [github.com/settings/notifications](https://github.com/settings/notifications).

### Uptime monitoring (optional, not configured)

For production use, consider:

| Service | Free tier | Setup |
|---------|-----------|-------|
| [UptimeRobot](https://uptimerobot.com) | 50 monitors, 5-min interval | Add `GET /api/health` monitor |
| [Better Uptime](https://betteruptime.com) | 10 monitors | Add `GET /api/health` monitor |
| Vercel Analytics | Built-in | Enable in Vercel Dashboard |

---

## 8. Environment variables reference

Full reference for all environment variables. See `.env.example` at `D:\MilkTea_Iku\.env.example` for the template.

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./backend/prisma/dev.db` (dev) or `postgresql://user:pass@host:5432/db` (prod) |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password (plaintext) | Generate: `openssl rand -base64 32` |

### Optional

| Variable | Description | Default behavior if unset |
|----------|-------------|--------------------------|
| `ADMIN_PASSWORD_HASH` | Scrypt hash of admin password (replaces `ADMIN_PASSWORD`) | Falls back to plaintext `ADMIN_PASSWORD` comparison |
| `ADMIN_API_TOKEN` | Bearer token for admin API (alternative to Basic Auth) | Bearer auth disabled; only Basic Auth works |
| `N8N_WEBHOOK_URL` | n8n webhook URL for chatbot | Chatbot returns static fallback message |
| `NODE_ENV` | Runtime environment | `development` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | Telemetry enabled |

### CI/CD secrets (GitHub Actions)

| Secret | Used by | Description |
|--------|---------|-------------|
| `VERCEL_TOKEN` | `deploy.yml` | Vercel API token |
| `VERCEL_ORG_ID` | `deploy.yml` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | `deploy.yml` | Vercel project ID |
| `DOCKERHUB_USERNAME` | `ci.yml` | Docker Hub username |
| `DOCKERHUB_TOKEN` | `ci.yml` | Docker Hub access token |

---

## Related

- [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md) — Full deployment guide
- [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — System architecture
- [`SECURITY.md`](../SECURITY.md) — Vulnerability disclosure policy
- [`SECURITY_NOTICE.md`](../SECURITY_NOTICE.md) — Credential rotation audit log
- [`PRODUCTION_CHECKLIST.md`](../PRODUCTION_CHECKLIST.md) — Pre-launch gate
