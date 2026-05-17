# Hướng dẫn đóng góp UI — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

## Mục lục (Table of Contents)

1. [Branch Naming](#1-branch-naming)
2. [PR Checklist](#2-pr-checklist)
3. [Cài đặt shadcn Components](#3-cài-đặt-shadcn-components)
4. [Required Tests](#4-required-tests)
5. [Lighthouse Score Target](#5-lighthouse-score-target)
6. [Quy trình review](#6-quy-trình-review)

---

## 1. Branch Naming

Tất cả thay đổi UI phải dùng prefix phù hợp:

| Loại thay đổi | Prefix | Ví dụ |
|---------------|--------|-------|
| Tính năng UI mới | `feat/ui-` | `feat/ui-product-filter` |
| Sửa lỗi UI | `fix/ui-` | `fix/ui-mobile-overflow` |
| Cải thiện UI | `ui/` | `ui/improve-card-hover` |
| Dark mode fix | `fix/dark-` | `fix/dark-contrast-footer` |
| Responsive fix | `fix/responsive-` | `fix/responsive-hero-mobile` |
| Refactor component | `refactor/` | `refactor/product-card` |

```bash
# Tạo branch mới
git checkout -b feat/ui-product-filter
git checkout -b fix/ui-mobile-overflow
```

---

## 2. PR Checklist

Trước khi tạo PR cho bất kỳ thay đổi UI nào, phải hoàn thành checklist sau:

### Screenshots bắt buộc

Mỗi PR phải đính kèm screenshots cho:

- [ ] Light mode — desktop (1280px+)
- [ ] Dark mode — desktop (1280px+)
- [ ] Light mode — mobile (375px)
- [ ] Dark mode — mobile (375px)

Cách chụp screenshot nhanh:

```bash
# Chụp screenshot với Playwright
npx playwright test --project=chromium visual/
npx playwright test --project=mobile-chrome visual/
```

Hoặc dùng Chrome DevTools:
1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. Chọn viewport 375px (iPhone SE)
3. Bật/tắt dark mode qua ThemeToggle
4. Chụp screenshot

### Code checklist

- [ ] Không có `console.log` trong code production
- [ ] Không có hardcode màu hex trong JSX — dùng Tailwind classes hoặc CSS variables
- [ ] Tất cả `<Image>` có `alt` text và `sizes` attribute
- [ ] Tất cả icon-only buttons có `aria-label`
- [ ] Không có `bg-white` mà không có `dark:bg-*` variant
- [ ] Không có `text-gray-900` mà không có `dark:text-*` variant
- [ ] Props interface được export
- [ ] Không dùng `<img>` thay vì `<Image>`
- [ ] Không dùng `<a>` cho internal routes thay vì `<Link>`

### Accessibility checklist

- [ ] Keyboard navigation hoạt động (Tab qua tất cả interactive elements)
- [ ] Focus ring hiển thị rõ ràng
- [ ] Không có heading nhảy cấp (h1 → h3)
- [ ] Form inputs có labels

### Performance checklist

- [ ] Không có ảnh thiếu `sizes` attribute
- [ ] Above-the-fold images có `priority` prop
- [ ] Không import thư viện nặng không cần thiết
- [ ] `"use client"` chỉ ở component thực sự cần

---

## 3. Cài đặt shadcn Components

### Cách 1: MCP shadcn (ưu tiên)

Dùng MCP shadcn tool để tìm và cài component:

```
// Tìm component
search_items_in_registries: { query: "dialog", registries: ["@shadcn"] }

// Xem chi tiết
view_items_in_registries: { items: ["@shadcn/dialog"] }

// Lấy lệnh cài
get_add_command_for_items: { items: ["@shadcn/dialog"] }
```

### Cách 2: CLI

```bash
# Cài component mới
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add toast

# Cài nhiều component cùng lúc
npx shadcn@latest add dialog select tooltip
```

### Sau khi cài

1. Component được tạo trong `frontend/components/ui/`
2. Kiểm tra file mới có đúng style với `components.json` config không
3. Import từ `@/components/ui/component-name`

```tsx
// Import đúng
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
```

### Không được

- Sửa trực tiếp file trong `frontend/components/ui/` — đây là shadcn primitives
- Nếu cần customize, wrap component trong file mới ở `frontend/components/`

---

## 4. Required Tests

### Mọi PR thay đổi UI phải có

**Minimum — navigation test:**

```ts
// Kiểm tra component render không lỗi
test("new component renders", async ({ page }) => {
  await page.goto("/page-with-new-component");
  await expect(page.locator('[data-testid="new-component"]')).toBeVisible();
});
```

**Nếu thêm interactive component:**

```ts
// Kiểm tra interaction
test("component interaction works", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="trigger"]');
  await expect(page.locator('[data-testid="result"]')).toBeVisible();
});
```

**Nếu thay đổi dark mode:**

```ts
// Kiểm tra dark mode không bị trắng
test("component dark mode", async ({ page }) => {
  await page.goto("/");
  await page.click('[aria-label="Switch to dark mode"]');
  const bg = await page.locator('[data-testid="component"]').evaluate(
    (el) => getComputedStyle(el).backgroundColor
  );
  expect(bg).not.toBe("rgb(255, 255, 255)");
});
```

**Nếu thay đổi mobile layout:**

```ts
// Kiểm tra mobile viewport
test.use({ viewport: { width: 375, height: 812 } });
test("mobile layout correct", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="mobile-element"]')).toBeVisible();
});
```

### Chạy tests trước khi tạo PR

```bash
# Chạy tất cả tests
npx playwright test

# Chạy chỉ tests liên quan
npx playwright test tests/navigation.spec.ts tests/cart.spec.ts

# Kiểm tra không có test nào fail
npx playwright test --reporter=list
```

---

## 5. Lighthouse Score Target

Mọi PR không được làm giảm Lighthouse score dưới ngưỡng:

| Category | Target | Minimum |
|----------|--------|---------|
| Performance | ≥ 90 | ≥ 85 |
| Accessibility | ≥ 90 | ≥ 85 |
| Best Practices | ≥ 90 | ≥ 85 |
| SEO | ≥ 90 | ≥ 85 |

### Chạy Lighthouse locally

```bash
# Cài Lighthouse CLI
npm install -g lighthouse

# Chạy audit
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Chạy cho mobile
lighthouse http://localhost:3000 --emulated-form-factor mobile --output html
```

### Hoặc dùng Chrome DevTools

1. Mở Chrome DevTools (F12)
2. Tab Lighthouse
3. Chọn "Mobile" hoặc "Desktop"
4. Click "Analyze page load"

### Các lỗi Lighthouse phổ biến cần tránh

| Lỗi | Nguyên nhân | Fix |
|-----|-------------|-----|
| Images without alt | `<Image>` thiếu `alt` | Thêm `alt` text |
| Missing sizes | `fill` image thiếu `sizes` | Thêm `sizes` attribute |
| Low contrast | Màu text không đủ contrast | Xem DARK_MODE.md |
| Missing lang | `<html>` thiếu `lang` | Đã có `lang="vi"` trong layout |
| No heading structure | Heading nhảy cấp | Dùng h1→h2→h3 đúng thứ tự |

---

## 6. Quy trình Review

### Tự review trước khi tạo PR

1. Chạy `npm run build` — không có lỗi TypeScript
2. Chạy `npm run lint` — không có ESLint warnings
3. Chạy `npx playwright test` — tất cả tests pass
4. Kiểm tra visual trên light + dark + mobile
5. Kiểm tra keyboard navigation

### PR description template

```markdown
## Thay đổi
- Mô tả ngắn gọn những gì đã thay đổi

## Screenshots
| | Light | Dark |
|---|---|---|
| Desktop | [screenshot] | [screenshot] |
| Mobile | [screenshot] | [screenshot] |

## Tests
- [ ] Playwright tests pass
- [ ] Lighthouse score ≥ 90
- [ ] Dark mode kiểm tra
- [ ] Mobile kiểm tra

## Checklist
- [ ] Không có hardcode màu
- [ ] Tất cả images có alt + sizes
- [ ] Icon buttons có aria-label
- [ ] Không có console.log
```

---

## Related

- [UI_UX_GUIDELINES.md](./UI_UX_GUIDELINES.md) — Naming conventions, rules
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Color tokens, spacing
- [DARK_MODE.md](./DARK_MODE.md) — Dark mode implementation
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — A11y requirements
- [TESTING.md](./TESTING.md) — Playwright test patterns
