# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\homepage.spec.ts >> Homepage >> should display footer
- Location: tests\e2e\homepage.spec.ts:27:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
=========================== logs ===========================
  "commit" event fired
  "domcontentloaded" event fired
  "load" event fired
  "commit" event fired
  "domcontentloaded" event fired
  "load" event fired
  "commit" event fired
  "domcontentloaded" event fired
  "load" event fired
  "commit" event fired
  "domcontentloaded" event fired
  "load" event fired
  "commit" event fired
  "domcontentloaded" event fired
  "load" event fired
  "commit" event fired
  "domcontentloaded" event fired
  "load" event fired
============================================================
```

# Page snapshot

```yaml
- generic [ref=e2]: missing required error components, refreshing...
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Homepage", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("/");
> 6  |     await page.waitForLoadState("networkidle");
     |                ^ Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
  7  |   });
  8  | 
  9  |   test("should load and display hero section", async ({ page }) => {
  10 |     await expect(page.locator("main")).toBeVisible();
  11 |     await expect(page.locator("text=Đặt hàng ngay").first()).toBeVisible({ timeout: 10000 });
  12 |   });
  13 | 
  14 |   test("should display navigation header", async ({ page }) => {
  15 |     const header = page.locator("header");
  16 |     await expect(header).toBeVisible();
  17 |   });
  18 | 
  19 |   test("should display categories section", async ({ page }) => {
  20 |     await expect(page.locator("text=Khám phá danh mục")).toBeVisible();
  21 |   });
  22 | 
  23 |   test("should display best sellers section", async ({ page }) => {
  24 |     await expect(page.locator("text=Best Sellers")).toBeVisible();
  25 |   });
  26 | 
  27 |   test("should display footer", async ({ page }) => {
  28 |     const footer = page.locator("footer");
  29 |     await expect(footer).toBeVisible();
  30 |   });
  31 | 
  32 |   test("should navigate to menu page", async ({ page }) => {
  33 |     await page.goto("/menu");
  34 |     await page.waitForLoadState("networkidle");
  35 |     await expect(page).toHaveURL(/\/menu/);
  36 |     await expect(page.locator("main")).toBeVisible();
  37 |   });
  38 | 
  39 |   test("should open search modal", async ({ page }) => {
  40 |     const searchBtn = page.locator('[aria-label="Tìm kiếm"]').first();
  41 |     if (await searchBtn.isVisible()) {
  42 |       await searchBtn.click();
  43 |       await expect(page.locator('[role="dialog"]')).toBeVisible();
  44 |     }
  45 |   });
  46 | 
  47 |   test("should be responsive on mobile", async ({ page }) => {
  48 |     await page.setViewportSize({ width: 375, height: 812 });
  49 |     await expect(page.locator("main")).toBeVisible();
  50 |   });
  51 | });
  52 | 
```