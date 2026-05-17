# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance\lighthouse.spec.ts >> Performance Checks >> should serve compressed assets
- Location: tests\performance\lighthouse.spec.ts:51:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Performance Checks", () => {
  4  |   test("homepage should load within 5 seconds", async ({ page }) => {
  5  |     const start = Date.now();
  6  |     await page.goto("/");
  7  |     await page.waitForLoadState("domcontentloaded");
  8  |     const loadTime = Date.now() - start;
  9  |     expect(loadTime).toBeLessThan(5000);
  10 |   });
  11 | 
  12 |   test("menu page should load within 5 seconds", async ({ page }) => {
  13 |     const start = Date.now();
  14 |     await page.goto("/menu");
  15 |     await page.waitForLoadState("domcontentloaded");
  16 |     const loadTime = Date.now() - start;
  17 |     expect(loadTime).toBeLessThan(5000);
  18 |   });
  19 | 
  20 |   test("should not have excessive DOM nodes", async ({ page }) => {
  21 |     await page.goto("/");
  22 |     await page.waitForLoadState("networkidle");
  23 |     const nodeCount = await page.evaluate(() => document.querySelectorAll("*").length);
  24 |     expect(nodeCount).toBeLessThan(3000);
  25 |   });
  26 | 
  27 |   test("images should use lazy loading", async ({ page }) => {
  28 |     await page.goto("/menu");
  29 |     await page.waitForLoadState("networkidle");
  30 |     const images = page.locator("img");
  31 |     const count = await images.count();
  32 |     let lazyCount = 0;
  33 |     for (let i = 0; i < count; i++) {
  34 |       const loading = await images.nth(i).getAttribute("loading");
  35 |       if (loading === "lazy") lazyCount++;
  36 |     }
  37 |     // At least some images should be lazy loaded
  38 |     if (count > 3) {
  39 |       expect(lazyCount).toBeGreaterThan(0);
  40 |     }
  41 |   });
  42 | 
  43 |   test("should have proper meta viewport", async ({ page }) => {
  44 |     await page.goto("/");
  45 |     const viewport = page.locator('meta[name="viewport"]');
  46 |     await expect(viewport).toBeAttached();
  47 |     const content = await viewport.getAttribute("content");
  48 |     expect(content).toContain("width=device-width");
  49 |   });
  50 | 
  51 |   test("should serve compressed assets", async ({ page }) => {
  52 |     const response = await page.goto("/");
  53 |     const headers = response?.headers();
  54 |     // Next.js typically handles compression
> 55 |     expect(response?.status()).toBe(200);
     |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  56 |   });
  57 | });
  58 | 
```