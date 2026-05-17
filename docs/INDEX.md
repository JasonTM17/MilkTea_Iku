# Mục lục tài liệu — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

> **30-second reviewer brief**
>
> MilkTea Iku is a full-stack portfolio project built with Next.js 14 App Router, Prisma 5, Tailwind CSS, and Docker. It demonstrates production-shaped engineering: 24 API routes with Zod validation, server-side price recomputation, HTTP Basic + Bearer auth, rate limiting, security headers, CodeQL/Gitleaks/Trivy scanning, and 35 Playwright spec files across e2e/api/a11y/visual/perf/seo layers. The live deployment is at [milktea-iku.vercel.app](https://milktea-iku.vercel.app).
>
> **Start here:** Technical reviewers → [`REVIEW_EVIDENCE.md`](./REVIEW_EVIDENCE.md) → [`HONEST_SCOPE.md`](./HONEST_SCOPE.md) → [`ARCHITECTURE.md`](./ARCHITECTURE.md). New contributors → [`../README.md`](../README.md) → [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## Getting Started

| File | Mục đích | Người đọc dự kiến |
|------|----------|-------------------|
| [`/README.md`](../README.md) | Tổng quan dự án, cài đặt nhanh, tech stack, screenshots | Tất cả |
| [`docs/INDEX.md`](./INDEX.md) | File này — bản đồ toàn bộ tài liệu | Tất cả |

---

## Architecture & Operations

| File | Mục đích | Người đọc dự kiến |
|------|----------|-------------------|
| [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) | Sơ đồ hệ thống, layered architecture, data flow, auth, caching, error handling | Developer, reviewer kỹ thuật |
| [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md) | Vercel, Docker Compose, env vars, DB migration, CI/CD, rollback, production checklist | DevOps, contributor |
| [`docs/api.md`](./api.md) | REST API reference đầy đủ — 31 endpoints, request/response shape thực tế | Developer tích hợp, reviewer |
| [`/SECURITY.md`](../SECURITY.md) | Chính sách báo cáo lỗ hổng bảo mật | Security researcher |
| [`/SECURITY_NOTICE.md`](../SECURITY_NOTICE.md) | Hướng dẫn xoay vòng credentials cho self-hosters | Người tự triển khai |

---

## UI/UX

| File | Mục đích | Người đọc dự kiến |
|------|----------|-------------------|
| [`docs/UI_UX_GUIDELINES.md`](./UI_UX_GUIDELINES.md) | Master rule book — đặt tên, animation, form, SEO checklist | Frontend developer |
| [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Color palette, typography, spacing, shadow, motion tokens | Designer, frontend developer |
| [`docs/DARK_MODE.md`](./DARK_MODE.md) | Quy tắc dark variant, WCAG AA contrast, pitfalls thường gặp | Frontend developer |
| [`docs/ACCESSIBILITY.md`](./ACCESSIBILITY.md) | Tiêu chuẩn a11y, focus management, semantic HTML, keyboard nav | Frontend developer, QA |
| [`docs/MOBILE_RESPONSIVE.md`](./MOBILE_RESPONSIVE.md) | Mobile-first patterns, safe areas, overflow rules | Frontend developer |
| [`docs/COMPONENT_RULES.md`](./COMPONENT_RULES.md) | Server vs Client component, props convention, Image rules, state management | Frontend developer |
| [`docs/CONTRIBUTING_UI.md`](./CONTRIBUTING_UI.md) | Branch naming, PR checklist, Lighthouse target | Contributor |
| [`docs/UI_AUDIT_REPORT.md`](./UI_AUDIT_REPORT.md) | Kết quả audit UI/UX mới nhất và các fix đã thực hiện (2026-05-17) | Reviewer, maintainer |

---

## Quality & Evidence

| File | Mục đích | Người đọc dự kiến |
|------|----------|-------------------|
| [`docs/TESTING.md`](./TESTING.md) | Playwright config, e2e patterns, visual regression, CI workflow | Developer, QA |
| [`docs/REVIEW_EVIDENCE.md`](./REVIEW_EVIDENCE.md) | Bằng chứng cho từng claim trong README — build output, test structure, security, a11y, CI | Reviewer kỹ thuật |
| [`docs/HONEST_SCOPE.md`](./HONEST_SCOPE.md) | Phạm vi thực tế — đây là gì, không phải là gì, cái gì còn thiếu | Reviewer, người đánh giá dự án |

---

## Localized READMEs

| File | Mục đích | Người đọc dự kiến |
|------|----------|-------------------|
| [`docs/README.vi.md`](./README.vi.md) | README tiếng Việt đầy đủ | Người dùng Việt Nam |
| [`docs/README.ja.md`](./README.ja.md) | README tiếng Nhật đầy đủ | Người dùng Nhật Bản |

---

## Screenshots

| File | Nội dung |
|------|----------|
| [`docs/screenshots/homepage.png`](./screenshots/homepage.png) | Trang chủ — light mode |
| [`docs/screenshots/dark-mode.png`](./screenshots/dark-mode.png) | Trang chủ — dark mode |
| [`docs/screenshots/menu.png`](./screenshots/menu.png) | Trang menu — light mode |
| [`docs/screenshots/menu-dark.png`](./screenshots/menu-dark.png) | Trang menu — dark mode |
| [`docs/screenshots/checkout.png`](./screenshots/checkout.png) | Checkout flow |
| [`docs/screenshots/stores.png`](./screenshots/stores.png) | Store locator |
| [`docs/screenshots/mobile.png`](./screenshots/mobile.png) | Mobile — light mode |
| [`docs/screenshots/mobile-dark.png`](./screenshots/mobile-dark.png) | Mobile — dark mode |

---

## Cách đọc tài liệu này

Nếu bạn là **reviewer kỹ thuật**: bắt đầu từ `REVIEW_EVIDENCE.md` → `HONEST_SCOPE.md` → `ARCHITECTURE.md`.

Nếu bạn là **developer mới**: bắt đầu từ `README.md` → `DEPLOYMENT.md` → `api.md`.

Nếu bạn muốn **đóng góp UI**: đọc `CONTRIBUTING_UI.md` → `COMPONENT_RULES.md` → `UI_UX_GUIDELINES.md`.
