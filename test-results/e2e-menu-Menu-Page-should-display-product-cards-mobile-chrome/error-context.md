# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu.spec.ts >> Menu Page >> should display product cards
- Location: tests\e2e\menu.spec.ts:12:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[class*="card"], [class*="Card"], article').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[class*="card"], [class*="Card"], article').first()

```

```yaml
- text: missing required error components, refreshing...
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Menu Page", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("/menu");
  6  |   });
  7  | 
  8  |   test("should load menu page", async ({ page }) => {
  9  |     await expect(page.locator("main")).toBeVisible();
  10 |   });
  11 | 
  12 |   test("should display product cards", async ({ page }) => {
  13 |     const products = page.locator('[class*="card"], [class*="Card"], article');
> 14 |     await expect(products.first()).toBeVisible({ timeout: 10000 });
     |                                    ^ Error: expect(locator).toBeVisible() failed
  15 |   });
  16 | 
  17 |   test("should have category filter tabs", async ({ page }) => {
  18 |     const tabs = page.locator('button:has-text("Tất cả"), a:has-text("Tất cả")');
  19 |     await expect(tabs.first()).toBeVisible();
  20 |   });
  21 | 
  22 |   test("should filter products by category", async ({ page }) => {
  23 |     const categoryBtn = page.locator('button:has-text("Trà Sữa")').first();
  24 |     if (await categoryBtn.isVisible()) {
  25 |       await categoryBtn.click();
  26 |       await page.waitForTimeout(500);
  27 |       await expect(page.locator("main")).toBeVisible();
  28 |     }
  29 |   });
  30 | 
  31 |   test("should navigate to product detail", async ({ page }) => {
  32 |     const productLink = page.locator('a[href*="/menu/"]').first();
  33 |     await expect(productLink).toBeVisible({ timeout: 10000 });
  34 |     await productLink.click();
  35 |     await expect(page).toHaveURL(/\/menu\/.+/);
  36 |   });
  37 | 
  38 |   test("should display product prices", async ({ page }) => {
  39 |     const price = page.locator('text=/\\d+\\.?\\d*đ/').first();
  40 |     await expect(price).toBeVisible({ timeout: 10000 });
  41 |   });
  42 | });
  43 | 
```