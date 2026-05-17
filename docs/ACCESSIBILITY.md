# Accessibility (A11y) — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

## Mục lục (Table of Contents)

1. [Mục tiêu (Target Standard)](#1-mục-tiêu)
2. [Touch Targets](#2-touch-targets)
3. [Focus Ring Requirements](#3-focus-ring-requirements)
4. [Icon-only Buttons](#4-icon-only-buttons)
5. [Skip Link và Keyboard Navigation](#5-skip-link-và-keyboard-navigation)
6. [Semantic HTML](#6-semantic-html)
7. [Reduced Motion](#7-reduced-motion)
8. [Screen Reader Patterns](#8-screen-reader-patterns)
9. [Form Accessibility](#9-form-accessibility)

---

## 1. Mục tiêu

Dự án nhắm đến **WCAG 2.1 AA** — tiêu chuẩn tối thiểu cho ứng dụng web thương mại.

| Tiêu chí | Yêu cầu |
|----------|---------|
| Contrast ratio body text | 4.5:1 |
| Contrast ratio large text | 3:1 |
| Keyboard navigable | Tất cả interactive elements |
| Touch target size | Tối thiểu 44×44px (mobile) |
| Focus visible | Luôn hiển thị focus ring |
| Alt text | Tất cả ảnh có nội dung |

> Lưu ý: Xác nhận đầy đủ WCAG cần kiểm tra thủ công với assistive technologies (screen reader, keyboard-only navigation) và expert review. Tài liệu này là hướng dẫn implementation, không phải chứng nhận compliance.

---

## 2. Touch Targets

Trên mobile, mọi interactive element phải có vùng chạm tối thiểu **44×44px**.

### Quy tắc

- Button, link, icon button: `min-h-[44px] min-w-[44px]`
- Nếu visual size nhỏ hơn, dùng padding để tăng hit area
- Nav links trong mobile sheet: `py-3` (12px top + 12px bottom + text ≈ 44px)

```tsx
// Đúng — icon button với đủ touch area
<button
  className="flex h-11 w-11 items-center justify-center rounded-full"
  aria-label="Mở menu"
>
  <Menu className="w-5 h-5" />
</button>

// Sai — quá nhỏ trên mobile
<button className="p-1">
  <Menu className="w-4 h-4" />
</button>
```

### ThemeToggle — đã đúng

```tsx
// ThemeToggle.tsx dùng h-9 w-9 = 36px
// Trên mobile cần tăng lên h-11 w-11 = 44px
className="relative flex h-9 w-9 items-center justify-center rounded-full ..."
// TODO: xem xét tăng lên h-11 w-11 trên mobile
```

### Footer social links — đã đúng

```tsx
// w-9 h-9 = 36px — cần thêm padding để đạt 44px
<a className="w-9 h-9 rounded-lg ...">
// Nên đổi thành:
<a className="w-11 h-11 rounded-lg flex items-center justify-center ...">
```

---

## 3. Focus Ring Requirements

Mọi interactive element phải hiển thị focus ring rõ ràng khi navigate bằng keyboard.

### Chuẩn focus ring

```tsx
// Focus ring chuẩn của dự án
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-brand-500
focus-visible:ring-offset-2
```

### shadcn Button — đã có built-in

```tsx
// button.tsx dùng:
focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
// ring = brand-500 (từ CSS variable --ring)
```

### Custom interactive elements

```tsx
// Bất kỳ element nào có onClick hoặc href phải có focus ring
<button
  className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
>

// Link
<Link
  className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
>
```

### Không được

- Dùng `outline-none` mà không có `focus-visible:ring-*` thay thế
- Dùng `outline: none` trong CSS mà không có focus indicator khác

---

## 4. Icon-only Buttons

Mọi button chỉ có icon (không có text visible) phải có `aria-label`.

```tsx
// Đúng
<button aria-label="Giỏ hàng">
  <ShoppingBag className="w-4 h-4" />
</button>

<button aria-label="Mở menu">
  <Menu className="w-5 h-5" />
</button>

// ThemeToggle — đúng
<button
  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
>

// Sai — không có aria-label
<button onClick={toggleCart}>
  <ShoppingBag className="w-4 h-4" />
</button>
```

### SVG icons

- SVG decorative (không mang thông tin): `aria-hidden="true"`
- SVG có nghĩa (standalone): cần `role="img"` và `aria-label`

```tsx
// Logo SVG — decorative vì có text label cạnh
<svg aria-hidden="true" ...>

// Icon trong icon-only button — button đã có aria-label, svg là decorative
<button aria-label="Xóa sản phẩm">
  <Trash2 className="w-4 h-4" aria-hidden="true" />
</button>
```

---

## 5. Skip Link và Keyboard Navigation

### Skip Link

`SkipLink` component đã được mount trong root layout, cho phép keyboard users bỏ qua navigation:

```tsx
// src/app/layout.tsx
<SkipLink />
<div id="main-content">
  {children}
</div>
```

Skip link phải:
- Là element đầu tiên trong DOM
- Ẩn visually nhưng hiện khi focus (không dùng `display:none`)
- Link đến `#main-content`

```tsx
// Pattern chuẩn cho SkipLink
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg"
>
  Bỏ qua đến nội dung chính
</a>
```

### Keyboard Navigation Order

- Tab order phải theo thứ tự logic từ trái sang phải, trên xuống dưới
- Không dùng `tabIndex` dương (tabIndex > 0) — phá vỡ natural tab order
- `tabIndex={0}` chỉ dùng khi cần thêm non-interactive element vào tab order
- `tabIndex={-1}` để remove khỏi tab order (modal backdrop, decorative)

### Modal / Dialog Focus Trap

shadcn Dialog và Sheet tự động trap focus. Khi tạo custom modal:
- Focus phải vào modal khi mở
- Focus phải quay lại trigger element khi đóng
- Escape key phải đóng modal

---

## 6. Semantic HTML

### Heading Hierarchy

Mỗi trang phải có đúng một `<h1>`. Heading không được nhảy cấp.

```tsx
// Đúng
<h1>Menu Trà Sữa</h1>
  <h2>Trà Sữa Truyền Thống</h2>
    <h3>Trà Sữa Thái</h3>
  <h2>Trà Trái Cây</h2>

// Sai — nhảy từ h1 sang h3
<h1>Menu</h1>
<h3>Trà Sữa Truyền Thống</h3>
```

### Button vs Link

| Element | Dùng khi |
|---------|----------|
| `<button>` | Trigger action (add to cart, toggle, submit) |
| `<a>` / `<Link>` | Navigate đến URL khác |

```tsx
// Đúng
<button onClick={toggleCart}>Giỏ hàng</button>
<Link href="/menu">Xem menu</Link>

// Sai — dùng div/span cho interactive
<div onClick={toggleCart}>Giỏ hàng</div>
<span onClick={() => router.push("/menu")}>Xem menu</span>
```

### Form Labels

Mọi input phải có label liên kết:

```tsx
// Đúng — htmlFor liên kết với id
<label htmlFor="phone">Số điện thoại</label>
<input id="phone" type="tel" />

// Đúng — aria-label khi không có visible label
<input aria-label="Tìm kiếm sản phẩm" type="search" />

// Sai — placeholder không thay thế được label
<input placeholder="Số điện thoại" type="tel" />
```

### Landmark Regions

```tsx
<header>   // Navigation header
<nav>      // Navigation links
<main>     // Main content (id="main-content")
<footer>   // Footer
<aside>    // Sidebar, cart drawer
<section>  // Thêm aria-labelledby nếu có heading
<article>  // Standalone content (blog post, product)
```

---

## 7. Reduced Motion

Người dùng có thể bật `prefers-reduced-motion` trong OS settings. Phải tôn trọng preference này.

### CSS approach

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### framer-motion approach

```tsx
import { useReducedMotion } from "framer-motion";

function AnimatedCard() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

### Tailwind motion-safe / motion-reduce

```tsx
// Chỉ animate khi user không yêu cầu reduced motion
<div className="motion-safe:animate-fade-in">

// Fallback khi reduced motion
<div className="motion-reduce:transition-none motion-safe:transition-all duration-300">
```

---

## 8. Screen Reader Patterns

### Visually hidden text

```tsx
// sr-only — ẩn visually nhưng screen reader đọc được
<span className="sr-only">Số lượng trong giỏ hàng:</span>
<Badge>{count}</Badge>
```

### Live regions

Dùng `aria-live` cho content thay đổi động (cart count, toast):

```tsx
// Cart count update
<span aria-live="polite" aria-atomic="true" className="sr-only">
  {count} sản phẩm trong giỏ hàng
</span>
```

### Loading states

```tsx
<div aria-busy="true" aria-label="Đang tải sản phẩm...">
  <ProductCardSkeleton />
</div>
```

---

## 9. Form Accessibility

### Error messages

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <p id="email-error" role="alert" className="text-sm text-destructive mt-1">
      {errors.email.message}
    </p>
  )}
</div>
```

### Required fields

```tsx
<label htmlFor="name">
  Họ tên <span aria-hidden="true" className="text-destructive">*</span>
  <span className="sr-only">(bắt buộc)</span>
</label>
<input id="name" required aria-required="true" />
```

---

## Related

- [DARK_MODE.md](./DARK_MODE.md) — Contrast requirements trong dark mode
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Color contrast values
- [MOBILE_RESPONSIVE.md](./MOBILE_RESPONSIVE.md) — Touch target sizing
- [COMPONENT_RULES.md](./COMPONENT_RULES.md) — Component construction với a11y
- [TESTING.md](./TESTING.md) — Accessibility testing với Playwright
