# Tài liệu UI/UX — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

Bộ tài liệu UI/UX cho dự án MilkTea Iku — nền tảng thương mại điện tử trà sữa premium xây dựng trên Next.js 14, Tailwind CSS 3.4, shadcn/ui, next-themes, và framer-motion.

---

<p align="center">
  <img src="screenshots/homepage.png" alt="Homepage" width="900"/>
</p>

<table>
  <tr>
    <td><img src="screenshots/menu.png" alt="Menu" width="430"/></td>
    <td><img src="screenshots/dark-mode.png" alt="Dark mode" width="430"/></td>
  </tr>
  <tr>
    <td align="center"><em>Menu — light</em></td>
    <td align="center"><em>Dark mode</em></td>
  </tr>
</table>

---

## Tài liệu

### [UI_UX_GUIDELINES.md](./UI_UX_GUIDELINES.md)

Bộ quy tắc chủ đạo cho toàn bộ UI/UX của dự án.

Bao gồm: quy tắc đặt tên (naming conventions), cấu trúc thư mục, khi nào dùng shadcn primitive vs custom component, quy tắc animation (framer-motion vs CSS transitions), loading/empty/error states, toast patterns, form validation với zod + react-hook-form, và SEO checklist cho mỗi page.

---

### [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

Design tokens và hệ thống thiết kế của dự án.

Bao gồm: bảng màu brand (50–950) và cream (50–500), semantic tokens qua CSS variables, typography scale (font families Inter + Playfair Display, size scale, weight), spacing scale, border radius, elevation/shadow scale, breakpoints, z-index hierarchy, và motion durations.

---

### [DARK_MODE.md](./DARK_MODE.md)

Quy tắc triển khai dark mode với next-themes.

Bao gồm: WCAG AA contrast requirements (4.5:1 body text, 3:1 large text), mapping light → dark cho từng màu, các lỗi phổ biến (white bg không có dark variant, hydration mismatch), cách test dark mode locally, image overlays trong dark mode, và danh sách dark mode overrides trong globals.css.

---

### [ACCESSIBILITY.md](./ACCESSIBILITY.md)

Tiêu chuẩn accessibility WCAG 2.1 AA cho dự án.

Bao gồm: touch targets tối thiểu 44×44px, focus ring requirements (focus-visible:ring-2 ring-brand-500), aria-label cho icon-only buttons, skip link và keyboard navigation, semantic HTML (heading hierarchy, button vs link, form labels), reduced motion (prefers-reduced-motion), screen reader patterns, và form accessibility.

---

### [MOBILE_RESPONSIVE.md](./MOBILE_RESPONSIVE.md)

Quy tắc responsive design theo mobile-first approach.

Bao gồm: mobile-first Tailwind approach, common layout patterns (stack on mobile, grid on desktop), mobile navigation (Sheet drawer vs bottom nav), responsive images với Next.js Image và sizes attribute, safe area insets cho iOS, overflow-x-hidden, touch-friendly spacing, và typography responsive.

---

### [COMPONENT_RULES.md](./COMPONENT_RULES.md)

Quy tắc xây dựng components trong dự án.

Bao gồm: Server Component vs Client Component (khi nào dùng "use client"), props interface luôn export, default props vs required props, composition over configuration, React.memo chỉ khi có bằng chứng perf, Image component rules (always next/image, sizes, alt, fallback), Link component rules (always next/link cho internal), và state management (zustand cho cart, useState cho UI state).

---

### [TESTING.md](./TESTING.md)

Chiến lược testing với Playwright.

Bao gồm: Playwright config (5 browsers: chromium, firefox, webkit, mobile-chrome, mobile-safari), E2E test patterns (navigation, cart flow, checkout, dark mode toggle), visual regression với screenshots, mobile viewport testing, API testing (rate limit, validation, auth guard, business logic), và CI/CD secrets requirements.

---

### [CONTRIBUTING_UI.md](./CONTRIBUTING_UI.md)

Quy trình đóng góp cho UI changes.

Bao gồm: branch naming conventions (ui/, fix/ui-, feat/ui-), PR checklist (light + dark + mobile screenshots bắt buộc), cài đặt shadcn components qua MCP hoặc CLI, required tests cho mỗi loại thay đổi, Lighthouse score target ≥ 90, và quy trình review.

---

## Stack kỹ thuật

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| Next.js | ^14.2.0 | Framework (App Router) |
| React | ^18.3.0 | UI library |
| TypeScript | ^5.4.0 | Type safety |
| Tailwind CSS | ^3.4.0 | Styling |
| shadcn/ui | ^4.7.0 | UI primitives |
| @base-ui/react | ^1.4.1 | Headless UI (Button primitive) |
| framer-motion | ^11.0.0 | Animations |
| next-themes | ^0.4.6 | Dark mode |
| zustand | ^4.5.0 | Cart state management |
| zod | ^3.23.0 | Schema validation |
| react-hot-toast | ^2.4.1 | Toast notifications |
| lucide-react | ^0.378.0 | Icons |
| Prisma | ^5.14.0 | Database ORM |
| Playwright | ^1.60.0 | E2E testing |

## Cấu trúc dự án

```
D:\MilkTea_Iku\
├── src/app/           # Next.js App Router pages
├── frontend/
│   └── components/    # UI components
│       └── ui/        # shadcn primitives
├── backend/
│   └── prisma/        # Database schema + seed
├── tests/             # Playwright E2E tests
└── docs/              # Tài liệu này
```

## Liên kết nhanh

- Repository: https://github.com/JasonTM17/MilkTea_Iku
- Production: https://milktea-iku.vercel.app
- Issues: https://github.com/JasonTM17/MilkTea_Iku/issues
