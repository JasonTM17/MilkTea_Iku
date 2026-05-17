# Testing Strategy — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

> **30-second reviewer brief**
>
> Testing is done entirely with Playwright across 5 browsers (Chromium, Firefox, WebKit, Pixel 5, iPhone 13). 35 spec files cover e2e flows, API contracts, accessibility assertions, visual regression, Lighthouse performance budgets, security headers, and SEO meta tags. Tests run in CI via GitHub Actions with secrets injected from repository secrets — no credentials are hardcoded. Run `npx playwright test` locally after `npm ci` and `npx playwright install --with-deps`.

---

## Mục lục (Table of Contents)

1. [Playwright Configuration](#1-playwright-configuration)
2. [E2E Test Patterns](#2-e2e-test-patterns)
3. [Visual Regression](#3-visual-regression)
4. [Mobile Viewport Testing](#4-mobile-viewport-testing)
5. [API Testing](#5-api-testing)
6. [Dark Mode Testing](#6-dark-mode-testing)
7. [CI/CD Requirements](#7-cicd-requirements)
8. [Chạy tests locally](#8-chạy-tests-locally)

---

## 1. Playwright Configuration

File config: `D:\MilkTea_Iku\playwright.config.ts`

```ts
// playwright.config.ts — tóm tắt cấu hình
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,   // Không cho .only trong CI
  retries: process.env.CI ? 2 : 0, // Retry 2 lần trong CI
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
});
```

### Browsers được test

| Project | Browser | Thiết bị |
|---------|---------|----------|
| `chromium` | Chrome | Desktop |
| `firefox` | Firefox | Desktop |
| `webkit` | Safari | Desktop |
| `mobile-chrome` | Chrome | Pixel 5 (393×851) |
| `mobile-safari` | Safari | iPhone 13 (390×844) |

### Web server

Playwright tự khởi động `npm run dev` trước khi chạy tests. Trong CI, server phải đã chạy sẵn.

### Cấu trúc thư mục tests

```
tests/
├── navigation.spec.ts      # Navigation, routing
├── cart.spec.ts            # Cart flow
├── checkout.spec.ts        # Checkout flow
├── dark-mode.spec.ts       # Dark mode toggle
├── mobile.spec.ts          # Mobile-specific tests
├── api/
│   ├── products.spec.ts    # Product API
│   ├── orders.spec.ts      # Order API
│   └── auth.spec.ts        # Auth guard tests
└── visual/
    └── screenshots/        # Visual regression baselines
```

---

## 2. E2E Test Patterns

### Navigation

```ts
// tests/navigation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/MilkTea Iku/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("nav links work", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/menu"]');
    await expect(page).toHaveURL("/menu");
    await expect(page.locator("h1")).toContainText("Menu");
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.click('[aria-label="Mở menu"]');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
```

### Cart Flow

```ts
// tests/cart.spec.ts
test.describe("Cart", () => {
  test("add product to cart", async ({ page }) => {
    await page.goto("/menu");
    // Hover để hiện nút "Thêm vào giỏ"
    const firstCard = page.locator('[data-testid="product-card"]').first();
    await firstCard.hover();
    await firstCard.locator('button:has-text("Thêm vào giỏ")').click();
    // Kiểm tra badge count tăng
    await expect(page.locator('[aria-label="Giỏ hàng"] .badge')).toContainText("1");
  });

  test("cart drawer opens", async ({ page }) => {
    await page.goto("/");
    await page.click('[aria-label="Giỏ hàng"]');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test("remove item from cart", async ({ page }) => {
    // Setup: thêm item trước
    await page.goto("/menu");
    const firstCard = page.locator('[data-testid="product-card"]').first();
    await firstCard.hover();
    await firstCard.locator('button:has-text("Thêm vào giỏ")').click();
    // Mở cart và xóa
    await page.click('[aria-label="Giỏ hàng"]');
    await page.click('[aria-label="Xóa sản phẩm"]');
    await expect(page.locator("text=Giỏ hàng trống")).toBeVisible();
  });
});
```

### Checkout Flow

```ts
// tests/checkout.spec.ts
test.describe("Checkout", () => {
  test("checkout form validation", async ({ page }) => {
    await page.goto("/order");
    // Submit form trống
    await page.click('button[type="submit"]');
    // Kiểm tra error messages
    await expect(page.locator("text=Tên phải có ít nhất 2 ký tự")).toBeVisible();
    await expect(page.locator("text=Số điện thoại không hợp lệ")).toBeVisible();
  });

  test("successful order submission", async ({ page }) => {
    await page.goto("/order");
    await page.fill('[name="name"]', "Nguyễn Văn A");
    await page.fill('[name="phone"]', "0901234567");
    await page.fill('[name="address"]', "123 Nguyễn Huệ, Quận 1, TP.HCM");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/order\/success/);
  });
});
```

---

## 3. Visual Regression

### Screenshot baseline

```ts
// tests/visual/homepage.spec.ts
import { test, expect } from "@playwright/test";

test("homepage visual — light mode", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("homepage-light.png", {
    fullPage: true,
    threshold: 0.02,  // 2% pixel difference tolerance
  });
});

test("homepage visual — dark mode", async ({ page }) => {
  await page.goto("/");
  await page.click('[aria-label="Switch to dark mode"]');
  await page.waitForTimeout(300);  // Chờ transition
  await expect(page).toHaveScreenshot("homepage-dark.png", {
    fullPage: true,
    threshold: 0.02,
  });
});
```

### Update baselines

```bash
# Cập nhật screenshot baselines khi UI thay đổi có chủ ý
npx playwright test --update-snapshots
```

### Quy tắc visual regression

- Chạy `--update-snapshots` chỉ khi UI thay đổi có chủ ý, không phải khi fix bug
- Commit baseline screenshots vào git
- Threshold 2% để tránh flaky tests do font rendering khác nhau giữa OS

---

## 4. Mobile Viewport Testing

### Playwright mobile projects

Playwright config đã có `mobile-chrome` (Pixel 5) và `mobile-safari` (iPhone 13).

```ts
// Test chỉ chạy trên mobile
test("mobile nav visible", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile only test");
  await page.goto("/");
  await expect(page.locator('[aria-label="Mở menu"]')).toBeVisible();
  await expect(page.locator("nav.hidden.md\\:flex")).not.toBeVisible();
});
```

### Custom viewport

```ts
// Test với viewport cụ thể
test.use({ viewport: { width: 375, height: 812 } });

test("iPhone SE layout", async ({ page }) => {
  await page.goto("/menu");
  // Kiểm tra grid 2 cột trên mobile
  const grid = page.locator('[data-testid="product-grid"]');
  await expect(grid).toHaveCSS("grid-template-columns", /repeat\(2/);
});
```

### Touch interaction

```ts
// Simulate tap (không phải click)
await page.tap('[aria-label="Giỏ hàng"]');
```

---

## 5. API Testing

### Rate limit testing

```ts
// tests/api/rate-limit.spec.ts
test("API rate limiting", async ({ request }) => {
  const requests = Array.from({ length: 20 }, () =>
    request.get("/api/products")
  );
  const responses = await Promise.all(requests);
  const tooManyRequests = responses.filter((r) => r.status() === 429);
  expect(tooManyRequests.length).toBeGreaterThan(0);
});
```

### Input validation

```ts
// tests/api/validation.spec.ts
test("order API rejects invalid phone", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: {
      name: "Test",
      phone: "invalid-phone",
      address: "123 Test Street",
      items: [],
    },
  });
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toContain("phone");
});

test("order API rejects empty items", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: {
      name: "Test",
      phone: "0901234567",
      address: "123 Test Street",
      items: [],
    },
  });
  expect(response.status()).toBe(400);
});
```

### Auth guard testing

```ts
// tests/api/auth.spec.ts
test("admin API requires authentication", async ({ request }) => {
  const response = await request.get("/api/admin/products");
  expect(response.status()).toBe(401);
});

test("admin API accepts valid token", async ({ request }) => {
  const response = await request.get("/api/admin/products", {
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_API_TOKEN}`,
    },
  });
  expect(response.status()).toBe(200);
});

test("admin page redirects unauthenticated users", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
});
```

### Business logic

```ts
// tests/api/business-logic.spec.ts
test("product price calculation with toppings", async ({ request }) => {
  const response = await request.post("/api/cart/calculate", {
    data: {
      productId: "test-product-id",
      size: "L",
      toppings: ["pearl", "jelly"],
    },
  });
  expect(response.status()).toBe(200);
  const { total } = await response.json();
  expect(total).toBeGreaterThan(0);
});
```

---

## 6. Dark Mode Testing

```ts
// tests/dark-mode.spec.ts
test.describe("Dark Mode", () => {
  test("toggle switches theme", async ({ page }) => {
    await page.goto("/");
    // Mặc định là light mode
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    // Bật dark mode
    await page.click('[aria-label="Switch to dark mode"]');
    await expect(page.locator("html")).toHaveClass(/dark/);
    // Tắt dark mode
    await page.click('[aria-label="Switch to light mode"]');
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("dark mode persists on reload", async ({ page }) => {
    await page.goto("/");
    await page.click('[aria-label="Switch to dark mode"]');
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("dark mode background is not white", async ({ page }) => {
    await page.goto("/");
    await page.click('[aria-label="Switch to dark mode"]');
    const bgColor = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );
    expect(bgColor).not.toBe("rgb(255, 255, 255)");
  });

  test("dark mode text has sufficient contrast", async ({ page }) => {
    await page.goto("/");
    await page.click('[aria-label="Switch to dark mode"]');
    // Kiểm tra heading text visible
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
    const color = await heading.evaluate((el) =>
      getComputedStyle(el).color
    );
    // Text không được là đen (rgb(0,0,0)) trong dark mode
    expect(color).not.toBe("rgb(0, 0, 0)");
  });
});
```

---

## 7. CI/CD Requirements

### Secrets bắt buộc trong CI

Các secrets sau phải được cấu hình trong CI environment (GitHub Actions Secrets hoặc tương đương):

| Secret | Mô tả |
|--------|-------|
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `ADMIN_API_TOKEN` | Bearer token cho admin API |
| `DATABASE_URL` | SQLite path hoặc production DB URL |

Playwright config đọc các biến này từ `process.env` (fallback an toàn cho dev local):

```ts
webServer: {
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? "admin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "change-me-in-production",
    ADMIN_API_TOKEN: process.env.ADMIN_API_TOKEN ?? "change-me-in-production",
    DATABASE_URL: process.env.DATABASE_URL ?? "file:./backend/prisma/dev.db",
  },
},
```

> **Quan trọng:** Không bao giờ commit credentials thật vào repo. Set `ADMIN_PASSWORD` và `ADMIN_API_TOKEN` qua `.env.local` (đã gitignore) cho dev và qua **GitHub Secrets** trong CI.

### GitHub Actions workflow mẫu

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          ADMIN_USERNAME: ${{ secrets.ADMIN_USERNAME }}
          ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
          ADMIN_API_TOKEN: ${{ secrets.ADMIN_API_TOKEN }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 8. Chạy Tests Locally

```bash
# Chạy tất cả tests
npx playwright test

# Chạy với UI mode (interactive)
npx playwright test --ui

# Chạy một file cụ thể
npx playwright test tests/cart.spec.ts

# Chạy trên browser cụ thể
npx playwright test --project=chromium
npx playwright test --project=mobile-chrome

# Chạy với headed mode (thấy browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Xem HTML report
npx playwright show-report
```

---

## Related

- [CONTRIBUTING_UI.md](./CONTRIBUTING_UI.md) — PR checklist và required tests
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — A11y testing patterns
- [DARK_MODE.md](./DARK_MODE.md) — Dark mode test patterns
- [MOBILE_RESPONSIVE.md](./MOBILE_RESPONSIVE.md) — Mobile viewport testing
