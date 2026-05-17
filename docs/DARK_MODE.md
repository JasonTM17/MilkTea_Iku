# Dark Mode — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

<table>
  <tr>
    <td><img src="screenshots/homepage.png" alt="Light mode" width="430"/></td>
    <td><img src="screenshots/dark-mode.png" alt="Dark mode" width="430"/></td>
  </tr>
  <tr>
    <td align="center"><em>Light mode (default)</em></td>
    <td align="center"><em>Dark mode — đạt WCAG AA contrast 4.5:1</em></td>
  </tr>
</table>

---

## Mục lục (Table of Contents)

1. [Tổng quan (Overview)](#1-tổng-quan)
2. [WCAG AA Contrast Requirements](#2-wcag-aa-contrast-requirements)
3. [Quy tắc sử dụng màu trong dark mode](#3-quy-tắc-sử-dụng-màu)
4. [Các lỗi phổ biến (Common Pitfalls)](#4-các-lỗi-phổ-biến)
5. [Testing dark mode locally](#5-testing-dark-mode-locally)
6. [Image overlays trong dark mode](#6-image-overlays)
7. [Dark mode overrides trong globals.css](#7-dark-mode-overrides)

---

## 1. Tổng quan

Dự án dùng **next-themes** với `attribute="class"` — khi dark mode bật, class `dark` được thêm vào `<html>`. Tailwind đọc `darkMode: ["class"]` trong `tailwind.config.ts`.

```tsx
// src/app/layout.tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
```

```tsx
// ThemeToggle.tsx — toggle giữa light/dark
const { theme, setTheme } = useTheme();
setTheme(isDark ? "light" : "dark");
```

**Nguyên tắc cốt lõi:** Mọi màu sắc trong component phải có dark variant tương ứng. Không có màu nào chỉ hoạt động ở light mode.

---

## 2. WCAG AA Contrast Requirements

WCAG 2.1 AA yêu cầu tỷ lệ tương phản (contrast ratio) tối thiểu:

| Loại text | Contrast ratio tối thiểu |
|-----------|--------------------------|
| Body text (< 18px hoặc < 14px bold) | **4.5:1** |
| Large text (≥ 18px hoặc ≥ 14px bold) | **3:1** |
| UI components, icons | **3:1** |
| Decorative elements | Không yêu cầu |

### Các cặp màu đã kiểm tra

**Light mode:**

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| `brand-800` (#82391f) | `cream-50` (#fefdfb) | ~8.5:1 | AA |
| `brand-600` (#c25f20) | white | ~4.6:1 | AA |
| `gray-900` (#111827) | white | ~19:1 | AA |
| `gray-400` (#9ca3af) | white | ~2.6:1 | Fail — chỉ dùng cho decorative |
| `muted-foreground` | `muted` | ~4.5:1 | AA |

**Dark mode:**

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| `foreground` (97.8% lightness) | `background` (4.1% lightness) | ~18:1 | AA |
| `brand-400` (#df9a48) | dark bg | ~5.2:1 | AA |
| `brand-300` (#e9bc7d) | dark bg | ~7.1:1 | AA |
| `muted-foreground` dark | `muted` dark | ~4.5:1 | AA |

### Quy tắc

- `text-gray-400` trên nền trắng **không đạt** AA cho body text — chỉ dùng cho caption, meta, decorative
- Trong dark mode, text màu `brand-600` phải đổi thành `dark:text-brand-400` để đạt contrast
- Luôn kiểm tra contrast khi thêm màu mới bằng [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 3. Quy tắc sử dụng màu

### Mapping light → dark

| Light mode class | Dark mode class | Lý do |
|-----------------|-----------------|-------|
| `bg-white` | `dark:bg-gray-800` | Card background |
| `bg-cream-50` | `dark:bg-gray-900` | Body background |
| `bg-cream-100` | `dark:bg-gray-900` | Header, section bg |
| `bg-brand-50` | `dark:bg-[hsl(24_70%_12%)]` | Brand tint bg |
| `text-gray-900` | `dark:text-gray-50` | Heading text |
| `text-gray-500` | `dark:text-gray-400` | Body text phụ |
| `text-brand-600` | `dark:text-brand-400` | Brand text link |
| `text-brand-700` | `dark:text-brand-300` | Brand heading |
| `border-gray-100` | `dark:border-gray-800` | Divider |
| `border-brand-100` | `dark:border-gray-700` | Card border |
| `ring-brand-100` | `dark:ring-gray-700` | Card ring |

### Semantic tokens (ưu tiên dùng)

Khi dùng semantic tokens từ CSS variables, dark mode tự động được xử lý:

```tsx
// Đúng — semantic token tự đổi màu theo theme
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<p className="text-muted-foreground">

// Cần thêm dark: variant thủ công
<div className="bg-white dark:bg-gray-800">
<p className="text-gray-900 dark:text-gray-50">
```

### Gradient text trong dark mode

```tsx
// globals.css đã định nghĩa
.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800;
}
.dark .gradient-text {
  @apply from-brand-400 to-brand-600;
}
```

---

## 4. Các lỗi phổ biến

### Lỗi 1: `bg-white` không có dark variant

```tsx
// Sai — trắng chói trong dark mode
<div className="bg-white rounded-xl p-4">

// Đúng
<div className="bg-white dark:bg-gray-800 rounded-xl p-4">
// Hoặc dùng semantic token
<div className="bg-card rounded-xl p-4">
```

### Lỗi 2: Opacity overlay không đủ contrast

```tsx
// Sai — overlay quá nhạt trong dark mode
<div className="bg-black/10">

// Đúng — tăng opacity trong dark mode
<div className="bg-black/10 dark:bg-black/30">
```

### Lỗi 3: Hardcode màu brand không đổi theo theme

```tsx
// Sai — brand-600 quá tối trong dark mode
<span className="text-brand-600">Giá: 45.000đ</span>

// Đúng
<span className="text-brand-600 dark:text-brand-400">Giá: 45.000đ</span>
```

### Lỗi 4: Shadow quá đậm trong dark mode

```tsx
// Sai — shadow đậm trông lạ trên nền tối
<div className="shadow-lg">

// Đúng — giảm shadow trong dark mode
<div className="shadow-lg dark:shadow-none dark:ring-1 dark:ring-white/10">
```

### Lỗi 5: Hydration mismatch với next-themes

```tsx
// Sai — render icon trước khi biết theme
export default function ThemeToggle() {
  const { theme } = useTheme();
  return <button>{theme === "dark" ? <Moon /> : <Sun />}</button>;
}

// Đúng — chờ mount
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <div className="h-9 w-9 rounded-full bg-brand-100" />;
```

---

## 5. Testing Dark Mode Locally

### Bật dark mode qua ThemeToggle

1. Chạy `npm run dev`
2. Click nút ThemeToggle (Sun/Moon icon) trên Header
3. Kiểm tra toàn bộ trang trong dark mode

### Bật dark mode qua DevTools

```
Chrome DevTools → Rendering tab → Emulate CSS media feature prefers-color-scheme → dark
```

### Bật dark mode qua URL (next-themes)

next-themes lưu theme vào `localStorage`. Để test:

```js
// Trong browser console
localStorage.setItem("theme", "dark");
location.reload();
```

### Playwright dark mode test

```ts
// tests/dark-mode.spec.ts
test("dark mode toggle works", async ({ page }) => {
  await page.goto("/");
  // Bật dark mode
  await page.click('[aria-label="Switch to dark mode"]');
  // Kiểm tra class dark trên html
  await expect(page.locator("html")).toHaveClass(/dark/);
  // Kiểm tra background tối
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  expect(bg).not.toBe("rgb(255, 255, 255)");
});
```

---

## 6. Image Overlays

### Gradient overlay trên ảnh

Trong dark mode, gradient overlay trên ảnh cần đậm hơn để duy trì contrast với text:

```tsx
// ProductCard — gradient bottom
<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

// Trong dark mode, tăng opacity
<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/50 via-transparent to-transparent" />
```

### Hero section overlay

```tsx
// Hero với ảnh nền
<div className="relative">
  <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />
  <div className="absolute inset-0 bg-brand-950/40 dark:bg-brand-950/60" />
  <div className="relative z-10 text-white">
    <h1>Trà Sữa Premium</h1>
  </div>
</div>
```

### Glassmorphism trong dark mode

```css
/* globals.css */
.glass {
  @apply bg-white/70 backdrop-blur-lg border border-white/20;
}
.dark .glass {
  @apply bg-gray-900/70 border-gray-700/30;
}
```

---

## 7. Dark Mode Overrides trong globals.css

Dự án có một số override thủ công trong `globals.css` cho các class Tailwind không có dark variant tự động:

```css
/* Các class này được override trong globals.css */
.dark .bg-cream-50  { background-color: hsl(20 14.3% 6%); }
.dark .bg-cream-100 { background-color: hsl(20 14.3% 10%); }
.dark .bg-white     { background-color: hsl(20 14.3% 8%); }
.dark .border-gray-100 { border-color: hsl(20 14.3% 14%); }
.dark .text-gray-900   { color: hsl(60 9.1% 97.8%); }
.dark .text-gray-500   { color: hsl(24 5.4% 63.9%); }
.dark .text-gray-400   { color: hsl(24 5.4% 50%); }
.dark .bg-brand-50     { background-color: hsl(24 70% 12%); }
.dark .bg-brand-100    { background-color: hsl(24 70% 16%); }
.dark .text-brand-600  { color: hsl(24 70% 60%); }
.dark .text-brand-700  { color: hsl(24 70% 55%); }
```

Khi thêm màu mới vào component, kiểm tra xem có cần thêm override vào `globals.css` không, hoặc dùng `dark:` variant trực tiếp trong JSX.

---

## Related

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Color tokens và CSS variables
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — WCAG contrast requirements
- [TESTING.md](./TESTING.md) — Playwright dark mode test patterns
- [UI_UX_GUIDELINES.md](./UI_UX_GUIDELINES.md) — Animation và transition rules
