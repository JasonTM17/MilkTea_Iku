# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\full-flow.spec.ts >> Full Order Flow >> view stores page
- Location: tests\e2e\full-flow.spec.ts:61:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('main')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main')

```

```yaml
- alert
- dialog "Server Error":
  - navigation:
    - button "previous" [disabled]:
      - img "previous"
    - button "next" [disabled]:
      - img "next"
    - text: 1 of 1 error Next.js (14.2.35) is outdated
    - link "(learn more)":
      - /url: https://nextjs.org/docs/messages/version-staleness
  - heading "Server Error" [level=1]
  - paragraph: "TypeError: e[o] is not a function"
  - text: This error happened while generating the page. Any console logs will be displayed in the terminal window.
  - heading "Call Stack" [level=2]
  - group:
    - img
    - img
    - text: Next.js
  - heading "JSON.parse" [level=3]
  - text: <anonymous>
  - group:
    - img
    - img
    - text: Next.js
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Full Order Flow", () => {
  4  |   test("complete order from menu to confirmation", async ({ page }) => {
  5  |     // Step 1: Browse menu
  6  |     await page.goto("/menu");
  7  |     await page.waitForLoadState("networkidle");
  8  | 
  9  |     // Step 2: Click on a product
  10 |     const productLink = page.locator('a[href*="/menu/"]').first();
  11 |     await expect(productLink).toBeVisible({ timeout: 10000 });
  12 |     await productLink.click();
  13 |     await page.waitForLoadState("networkidle");
  14 | 
  15 |     // Step 3: Add to cart
  16 |     const addToCartBtn = page.locator('button:has-text("Thêm vào giỏ")').first();
  17 |     if (await addToCartBtn.isVisible({ timeout: 5000 })) {
  18 |       await addToCartBtn.click();
  19 |       await page.waitForTimeout(1000);
  20 |     }
  21 | 
  22 |     // Step 4: Go to checkout
  23 |     await page.goto("/checkout");
  24 |     await page.waitForLoadState("networkidle");
  25 |     await expect(page.locator("main")).toBeVisible();
  26 |   });
  27 | 
  28 |   test("search for product and navigate", async ({ page }) => {
  29 |     await page.goto("/");
  30 | 
  31 |     // Open search
  32 |     const searchBtn = page.locator('[aria-label="Tìm kiếm"]').first();
  33 |     if (await searchBtn.isVisible()) {
  34 |       await searchBtn.click();
  35 |       await page.waitForTimeout(500);
  36 | 
  37 |       // Type search query
  38 |       const searchInput = page.locator('input[placeholder*="Tìm"]').first();
  39 |       if (await searchInput.isVisible()) {
  40 |         await searchInput.fill("matcha");
  41 |         await page.waitForTimeout(1000);
  42 |       }
  43 |     }
  44 |   });
  45 | 
  46 |   test("view order tracking page", async ({ page }) => {
  47 |     await page.goto("/tracking");
  48 |     await expect(page.locator("main")).toBeVisible();
  49 |   });
  50 | 
  51 |   test("view promotions page", async ({ page }) => {
  52 |     await page.goto("/promotions");
  53 |     await expect(page.locator("main")).toBeVisible();
  54 |   });
  55 | 
  56 |   test("view about page", async ({ page }) => {
  57 |     await page.goto("/about");
  58 |     await expect(page.locator("main")).toBeVisible();
  59 |   });
  60 | 
  61 |   test("view stores page", async ({ page }) => {
  62 |     await page.goto("/stores");
> 63 |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  64 |   });
  65 | });
  66 | 
```