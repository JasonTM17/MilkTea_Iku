# Security Policy — MilkTea Iku

> Author: Nguyễn Sơn (jasonbmt06@gmail.com)
> Last updated: 2026-05-17

---

> **30-second reviewer brief**
>
> Vulnerability disclosure policy for MilkTea Iku. Report security issues privately via GitHub Security Advisories or email — do not open public issues for vulnerabilities. Acknowledgment within 48 hours, triage within 7 days, fix target within 30 days for confirmed issues. Scope covers the Next.js application, API routes, authentication, and Docker configuration. Out of scope: Vercel platform, n8n service, social engineering, and DoS against the demo deployment.

---

## Supported Versions

Only the latest commit on `main` is actively maintained. This is a personal portfolio project with a single deployment.

| Version | Supported |
|---------|-----------|
| `main` (latest) | Yes |
| Any prior tagged release | No — upgrade to `main` |

---

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

### Option 1 — GitHub Private Security Advisory (preferred)

1. Go to [github.com/JasonTM17/MilkTea_Iku/security/advisories/new](https://github.com/JasonTM17/MilkTea_Iku/security/advisories/new)
2. Fill in the advisory form with as much detail as possible
3. Submit — only the repository owner can see the report

### Option 2 — Email

Send a report to **jasonbmt06@gmail.com** with subject line:

```
[SECURITY] MilkTea Iku — <brief description>
```

Include in your report:
- Description of the vulnerability
- Steps to reproduce (proof-of-concept if available)
- Affected component (API route, middleware, Docker config, etc.)
- Potential impact assessment
- Suggested fix if you have one

### Response timeline

| Stage | Timeline |
|-------|----------|
| Acknowledgment | Within 48 hours |
| Initial triage | Within 7 days |
| Status update | Within 14 days |
| Fix target (confirmed issues) | Within 30 days |
| Public disclosure | After fix is deployed, coordinated with reporter |

If you do not receive acknowledgment within 48 hours, follow up via email.

---

## Scope

### In scope

| Area | Examples |
|------|---------|
| Next.js API routes (`src/app/api/*`) | Authentication bypass, injection, IDOR, price tampering |
| Admin authentication (`src/middleware.ts`, `backend/lib/auth.ts`) | Credential bypass, timing attacks |
| Input validation (Zod schemas) | Bypass leading to injection or unexpected behavior |
| Rate limiting (`backend/lib/rate-limit.ts`) | Bypass allowing abuse |
| SSRF protection (`src/app/api/chatbot/route.ts`) | Bypass of webhook allowlist |
| Docker configuration (`Dockerfile.backend`, `docker-compose.yml`) | Privilege escalation, secret exposure |
| Security headers (`vercel.json`, `src/middleware.ts`) | Missing or misconfigured headers |
| Dependency vulnerabilities | Critical/High CVEs in `package.json` dependencies |

### Out of scope

| Area | Reason |
|------|--------|
| Vercel platform infrastructure | Third-party — report to Vercel |
| n8n service | Third-party — report to n8n |
| GitHub Actions infrastructure | Third-party — report to GitHub |
| Denial-of-service against the live demo | Demo deployment, no SLA |
| Social engineering | Out of scope for code-level security policy |
| Missing `Secure` flag on cookies | No cookies are set by this application |
| Self-XSS | Requires user to attack themselves |
| Theoretical vulnerabilities without proof of concept | Low signal-to-noise |

### Known limitations (not vulnerabilities)

The following are documented design decisions, not security issues:

| Limitation | Reference |
|-----------|-----------|
| SQLite single-writer (demo only) | `docs/HONEST_SCOPE.md` |
| In-memory rate limiting (resets on restart) | `PRODUCTION_CHECKLIST.md §4` |
| No user authentication (guest checkout by design) | `docs/ARCHITECTURE.md §6` |
| Wishlist API disabled (HTTP 410) pending user auth | `docs/HONEST_SCOPE.md` |

---

## Security Controls Already in Place

| Control | Location |
|---------|----------|
| Timing-safe credential comparison | `D:\MilkTea_Iku\backend\lib\auth.ts` |
| Scrypt password hashing support | `D:\MilkTea_Iku\backend\lib\password.ts` |
| Server-side price recomputation | `D:\MilkTea_Iku\src\app\api\orders\route.ts` lines 82–105 |
| SSRF protection on chatbot webhook | `D:\MilkTea_Iku\src\app\api\chatbot\route.ts` |
| Rate limiting per-IP (sliding window) | `D:\MilkTea_Iku\backend\lib\rate-limit.ts` |
| Security headers (HSTS, CSP, X-Frame-Options) | `D:\MilkTea_Iku\vercel.json`, `D:\MilkTea_Iku\src\middleware.ts` |
| Zod input validation on all POST endpoints | Each API route handler |
| Order tracking PII redaction | `D:\MilkTea_Iku\src\app\api\orders\tracking\route.ts` |
| CodeQL static analysis | `D:\MilkTea_Iku\.github\workflows\codeql.yml` |
| Secret scanning (Gitleaks) | `D:\MilkTea_Iku\.github\workflows\security.yml` |
| Container vulnerability scanning (Trivy) | `D:\MilkTea_Iku\.github\workflows\security.yml` |
| Dependabot automated dependency updates | `D:\MilkTea_Iku\.github\dependabot.yml` |

---

## Recognition Policy

This is a personal portfolio project with no bug bounty program. Reporters of valid, confirmed vulnerabilities will be credited in the fix commit message and release notes (with their permission). Anonymous reports are accepted — state your preference in the report.

---

## Related

- [`SECURITY_NOTICE.md`](./SECURITY_NOTICE.md) — Credential rotation audit log (for maintainers)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — System architecture and security layers
- [`PRODUCTION_CHECKLIST.md`](./PRODUCTION_CHECKLIST.md) — Pre-launch security checklist
