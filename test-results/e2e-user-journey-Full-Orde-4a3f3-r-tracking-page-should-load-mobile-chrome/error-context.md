# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\user-journey.spec.ts >> Full Order Flow >> order tracking page should load
- Location: tests\e2e\user-journey.spec.ts:37:7

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

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Full Order Flow", () => {
  4  |   test("should browse menu and interact with products", async ({ page }) => {
  5  |     await page.goto("/menu");
  6  |     await page.waitForLoadState("networkidle");
  7  | 
  8  |     const productCard = page.locator('[class*="card"], [class*="Card"]').first();
  9  |     await expect(productCard).toBeVisible();
  10 |     await productCard.click();
  11 |     await page.waitForTimeout(1000);
  12 | 
  13 |     const url = page.url();
  14 |     expect(url).toMatch(/\/menu/);
  15 |   });
  16 | 
  17 |   test("should display product customization options", async ({ page }) => {
  18 |     await page.goto("/menu");
  19 |     await page.waitForLoadState("networkidle");
  20 | 
  21 |     const productCard = page.locator('[class*="card"], [class*="Card"]').first();
  22 |     if (await productCard.count() > 0) {
  23 |       await productCard.click();
  24 |       await page.waitForLoadState("networkidle");
  25 | 
  26 |       const main = page.locator("main");
  27 |       await expect(main).toBeVisible();
  28 |     }
  29 |   });
  30 | 
  31 |   test("checkout page should load correctly", async ({ page }) => {
  32 |     await page.goto("/checkout");
  33 |     await page.waitForLoadState("networkidle");
  34 |     await expect(page.locator("main")).toBeVisible();
  35 |   });
  36 | 
  37 |   test("order tracking page should load", async ({ page }) => {
  38 |     await page.goto("/tracking");
  39 |     await page.waitForLoadState("networkidle");
> 40 |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  41 |   });
  42 | });
  43 | 
  44 | test.describe("User Journey - Information Pages", () => {
  45 |   const pages = [
  46 |     { path: "/about", name: "About" },
  47 |     { path: "/faq", name: "FAQ" },
  48 |     { path: "/privacy", name: "Privacy" },
  49 |     { path: "/terms", name: "Terms" },
  50 |     { path: "/delivery", name: "Delivery" },
  51 |     { path: "/loyalty", name: "Loyalty" },
  52 |   ];
  53 | 
  54 |   for (const p of pages) {
  55 |     test(`${p.name} page should load and have content`, async ({ page }) => {
  56 |       await page.goto(p.path);
  57 |       await page.waitForLoadState("networkidle");
  58 |       const main = page.locator("main");
  59 |       await expect(main).toBeVisible();
  60 |       const text = await main.textContent();
  61 |       expect(text?.length).toBeGreaterThan(50);
  62 |     });
  63 |   }
  64 | });
  65 | 
```