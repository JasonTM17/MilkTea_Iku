# Design System — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

> **30-second reviewer brief**
>
> Two-font system: Inter (body) + Playfair Display (headings). Brand palette is warm brown-orange (`brand-500` = `#d4792a`) on cream backgrounds. All colors are expressed as CSS variables in `src/app/globals.css` — components use semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`) rather than hardcoded hex values, enabling automatic dark mode switching via `next-themes`. Tailwind default spacing (4px base unit) with a 10px base border radius. Motion durations: 150ms fast, 200–300ms normal, 400–550ms slow.

---

## Mục lục (Table of Contents)

1. [Color Palette](#1-color-palette)
2. [Semantic Tokens (CSS Variables)](#2-semantic-tokens)
3. [Typography Scale](#3-typography-scale)
4. [Spacing Scale](#4-spacing-scale)
5. [Border Radius](#5-border-radius)
6. [Elevation / Shadow Scale](#6-elevation--shadow-scale)
7. [Breakpoints](#7-breakpoints)
8. [Z-Index Hierarchy](#8-z-index-hierarchy)
9. [Motion Durations](#9-motion-durations)

---

## 1. Color Palette

### Brand (Nâu cam — màu chủ đạo)

| Token | Hex | Dùng cho |
|-------|-----|----------|
| `brand-50` | `#fdf8f0` | Background nhạt, hover state |
| `brand-100` | `#f9eddb` | Background section, badge bg |
| `brand-200` | `#f2d7b0` | Border nhạt, divider |
| `brand-300` | `#e9bc7d` | Icon phụ, dot indicator |
| `brand-400` | `#df9a48` | Icon, label phụ |
| `brand-500` | `#d4792a` | Primary action, CTA button |
| `brand-600` | `#c25f20` | Hover state của brand-500 |
| `brand-700` | `#a1471d` | Active state, text link |
| `brand-800` | `#82391f` | Heading text, logo text |
| `brand-900` | `#6b301c` | Dark text trên nền sáng |
| `brand-950` | `#3a170c` | Footer background |

### Cream (Kem — màu nền)

| Token | Hex | Dùng cho |
|-------|-----|----------|
| `cream-50` | `#fefdfb` | Body background (light mode) |
| `cream-100` | `#fdf9f0` | Header background, card bg |
| `cream-200` | `#faf0dc` | Section background |
| `cream-300` | `#f5e3c0` | Skeleton, placeholder |
| `cream-400` | `#efd19d` | Decorative element |
| `cream-500` | `#e8bc78` | Accent warm |

### Màu ngữ nghĩa (Semantic Colors)

| Màu | Dùng cho |
|-----|----------|
| `green-500` | Badge "Mới", success state |
| `red-500` / `destructive` | Error, delete action |
| `gray-400` | Muted text, placeholder |
| `gray-900` | Body text (light mode) |
| `gray-50` | Body text (dark mode) |

---

## 2. Semantic Tokens

Tất cả màu trong component phải dùng CSS variables thay vì hardcode hex. Các biến này được định nghĩa trong `src/app/globals.css`.

### Light Mode

```css
:root {
  --background: 0 0% 100%;           /* Trắng — body bg */
  --foreground: 20 14.3% 4.1%;       /* Gần đen — body text */
  --card: 0 0% 100%;                 /* Card background */
  --card-foreground: 20 14.3% 4.1%;
  --primary: 24 70% 45%;             /* brand-500 */
  --primary-foreground: 60 9.1% 97.8%;
  --secondary: 30 30% 94%;           /* cream-100 */
  --muted: 30 30% 94%;
  --muted-foreground: 25 5.3% 44.7%;
  --border: 20 5.9% 90%;
  --ring: 24 70% 45%;                /* Focus ring = brand-500 */
  --radius: 0.625rem;                /* 10px base radius */
}
```

### Dark Mode

```css
.dark {
  --background: 20 14.3% 4.1%;      /* Gần đen ấm */
  --foreground: 60 9.1% 97.8%;      /* Trắng kem */
  --card: 20 14.3% 8%;              /* Card bg tối hơn background */
  --primary: 24 70% 50%;            /* brand-500 sáng hơn chút */
  --muted-foreground: 24 5.4% 63.9%;
  --border: 20 14.3% 14%;
}
```

### Quy tắc sử dụng

- Dùng `bg-background`, `text-foreground` cho body
- Dùng `bg-card`, `text-card-foreground` cho card
- Dùng `text-muted-foreground` cho text phụ, placeholder
- Dùng `border-border` cho đường kẻ
- **Không** hardcode `bg-white` hoặc `text-gray-900` trong component mới — dùng semantic tokens

---

## 3. Typography Scale

### Font Families

| Variable | Font | Dùng cho |
|----------|------|----------|
| `--font-sans` | Inter (latin + vietnamese) | Body text, UI labels |
| `--font-playfair` | Playfair Display | Headings, logo, display text |

```tsx
// Tailwind classes
font-sans      // Inter — default body
font-display   // Playfair Display — headings
```

### Type Scale

| Class | Size | Line Height | Dùng cho |
|-------|------|-------------|----------|
| `text-xs` | 12px | 16px | Badge, caption, meta |
| `text-sm` | 14px | 20px | Body text, nav links, labels |
| `text-base` | 16px | 24px | Default body, price |
| `text-lg` | 18px | 28px | Section intro, card title |
| `text-xl` | 20px | 28px | Logo text, sub-heading |
| `text-2xl` | 24px | 32px | Page section heading |
| `text-3xl` | 30px | 36px | Page title (mobile) |
| `text-4xl` | 36px | 40px | Hero heading (mobile) |
| `text-5xl` | 48px | 1 | Hero heading (desktop) |
| `text-6xl` | 60px | 1 | Display / marketing |

### Letter Spacing

| Class | Value | Dùng cho |
|-------|-------|----------|
| `tracking-tight` | -0.025em | Large headings |
| `tracking-normal` | 0 | Body text |
| `tracking-wide` | 0.025em | Uppercase labels |
| `tracking-[0.2em]` | 0.2em | Brand tagline (custom) |

### Font Weight

| Class | Weight | Dùng cho |
|-------|--------|----------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Nav links, labels |
| `font-semibold` | 600 | Card title, badge |
| `font-bold` | 700 | Price, CTA, heading |

---

## 4. Spacing Scale

Dự án dùng Tailwind default spacing (1 unit = 4px). Hệ thống spacing ưu tiên:

| Token | px | Dùng cho |
|-------|----|----------|
| `1` | 4px | Gap nhỏ nhất, icon padding |
| `2` | 8px | Gap trong inline elements |
| `3` | 12px | Padding button sm |
| `4` | 16px | Padding card, section gap |
| `6` | 24px | Gap giữa elements |
| `8` | 32px | Section padding vertical |
| `12` | 48px | Section gap lớn |
| `16` | 64px | Section padding lớn |
| `20` | 80px | Hero padding |
| `24` | 96px | Section vertical spacing |

### Container

```tsx
// Max width container chuẩn
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

---

## 5. Border Radius

Radius base được định nghĩa qua CSS variable `--radius: 0.625rem` (10px).

| Token | Value | Dùng cho |
|-------|-------|----------|
| `rounded-sm` | `calc(var(--radius) - 4px)` ≈ 6px | Badge, tag nhỏ |
| `rounded-md` | `calc(var(--radius) - 2px)` ≈ 8px | Input, button sm |
| `rounded-lg` | `var(--radius)` = 10px | Card, button default |
| `rounded-xl` | 12px | Card lớn, sheet nav item |
| `rounded-2xl` | 16px | ProductCard, modal |
| `rounded-full` | 9999px | Avatar, badge pill, icon button |

---

## 6. Elevation / Shadow Scale

| Class | Value | Dùng cho |
|-------|-------|----------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Button, input |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1)` | Card resting |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Dropdown, popover |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modal, sheet |
| `shadow-brand` | `0 4px 14px rgba(212,121,42,0.15)` | CTA button, brand element |

```css
/* Định nghĩa trong globals.css */
.shadow-brand {
  box-shadow: 0 4px 14px 0 rgba(212, 121, 42, 0.15);
}
.dark .shadow-brand {
  box-shadow: 0 4px 14px 0 rgba(212, 121, 42, 0.08);
}
```

### Header scroll shadow

```tsx
// Header dùng shadow động khi scroll
isScrolled
  ? "shadow-[0_2px_24px_rgba(212,121,42,0.13)]"
  : ""
```

---

## 7. Breakpoints

Tailwind default breakpoints — mobile-first:

| Prefix | Min-width | Thiết bị |
|--------|-----------|----------|
| (none) | 0px | Mobile portrait |
| `sm:` | 640px | Mobile landscape, small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop nhỏ, laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Desktop lớn, 4K |

### Breakpoint thường dùng

```tsx
// Navigation: ẩn mobile nav trên md+
<nav className="hidden md:flex">

// Grid: 1 cột mobile → 2 cột sm → 3 cột lg → 4 cột xl
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Container padding
<div className="px-4 sm:px-6 lg:px-8">
```

---

## 8. Z-Index Hierarchy

| Layer | z-index | Component |
|-------|---------|-----------|
| Base content | 0 | Page content |
| Sticky elements | 10 | Sticky sidebar, promo banner |
| Dropdown / Popover | 20 | Select, Tooltip, Popover |
| Sidebar / Sheet | 30 | Mobile Sheet nav |
| Modal / Dialog | 40 | Dialog, Cart drawer |
| Toast / Notification | 50 | react-hot-toast |
| Skip link | 100 | SkipLink component |
| Header (fixed) | 50 | Header (z-50 trong Tailwind) |

```tsx
// Tailwind z-index classes
z-10   // sticky
z-20   // dropdown
z-30   // sidebar
z-40   // modal
z-50   // toast, header
z-[100] // skip link
```

---

## 9. Motion Durations

### Duration chuẩn

| Tên | Duration | Dùng cho |
|-----|----------|----------|
| Fast | 150ms | Hover color, opacity toggle |
| Normal | 200–300ms | Button press, icon swap, CSS transition |
| Slow | 400–550ms | Entrance animation, page element |
| Very slow | 3000ms | Float loop animation |

### Easing curves

| Tên | Curve | Dùng cho |
|-----|-------|----------|
| `ease-out` | `cubic-bezier(0,0,0.2,1)` | Element vào màn hình |
| `ease-in` | `cubic-bezier(0.4,0,1,1)` | Element rời màn hình |
| `ease-in-out` | `cubic-bezier(0.4,0,0.2,1)` | Toggle, swap |
| Custom spring | `[0.22, 1, 0.36, 1]` | Header entrance (snappy) |

### Tailwind animation classes có sẵn

```tsx
animate-fade-in        // fadeIn 0.5s ease-out
animate-slide-up       // slideUp 0.5s ease-out
animate-slide-in-right // slideInRight 0.3s ease-out
animate-float          // float 3s ease-in-out infinite
animate-accordion-down // accordion expand
animate-accordion-up   // accordion collapse
animate-shimmer        // skeleton loading shimmer
```

---

## Related

- [UI_UX_GUIDELINES.md](./UI_UX_GUIDELINES.md) — Naming, folder structure, animation rules
- [DARK_MODE.md](./DARK_MODE.md) — Dark mode token usage
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — Contrast requirements
- [MOBILE_RESPONSIVE.md](./MOBILE_RESPONSIVE.md) — Breakpoint patterns
- [COMPONENT_RULES.md](./COMPONENT_RULES.md) — Component construction
