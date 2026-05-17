# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\extended.spec.ts >> Error Handling >> API should return JSON for non-existent endpoints
- Location: tests\e2e\extended.spec.ts:17:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 500
Received array: [404, 405]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Error Handling", () => {
  4  |   test("404 page should display for non-existent routes", async ({ page }) => {
  5  |     const response = await page.goto("/this-page-does-not-exist-12345");
  6  |     expect(response?.status()).toBe(404);
  7  |   });
  8  | 
  9  |   test("404 page should have navigation back to home", async ({ page }) => {
  10 |     await page.goto("/this-page-does-not-exist-12345");
  11 |     const homeLink = page.locator('a[href="/"]');
  12 |     if (await homeLink.count() > 0) {
  13 |       await expect(homeLink.first()).toBeVisible();
  14 |     }
  15 |   });
  16 | 
  17 |   test("API should return JSON for non-existent endpoints", async ({ request }) => {
  18 |     const response = await request.get("/api/nonexistent-endpoint-xyz");
> 19 |     expect([404, 405]).toContain(response.status());
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  20 |   });
  21 | });
  22 | 
  23 | test.describe("Responsive Images", () => {
  24 |   test("product images should have proper attributes", async ({ page }) => {
  25 |     await page.goto("/menu");
  26 |     await page.waitForLoadState("networkidle");
  27 |     const images = page.locator("img[alt]");
  28 |     const count = await images.count();
  29 |     expect(count).toBeGreaterThan(0);
  30 |     for (let i = 0; i < Math.min(count, 5); i++) {
  31 |       const img = images.nth(i);
  32 |       const alt = await img.getAttribute("alt");
  33 |       expect(alt).toBeTruthy();
  34 |     }
  35 |   });
  36 | });
  37 | 
  38 | test.describe("Cart Functionality", () => {
  39 |   test("cart should be accessible from header", async ({ page }) => {
  40 |     await page.goto("/");
  41 |     await page.waitForLoadState("networkidle");
  42 |     const cartButton = page.locator('button[aria-label*="cart"], button[aria-label*="Cart"], [class*="cart"]').first();
  43 |     if (await cartButton.count() > 0) {
  44 |       await expect(cartButton).toBeVisible();
  45 |     }
  46 |   });
  47 | });
  48 | 
  49 | test.describe("Theme Persistence", () => {
  50 |   test("dark mode toggle should work", async ({ page }) => {
  51 |     await page.goto("/");
  52 |     await page.waitForLoadState("networkidle");
  53 |     const html = page.locator("html");
  54 |     const initialClass = await html.getAttribute("class");
  55 |     const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="dark"], button[aria-label*="Dark"]').first();
  56 |     if (await themeToggle.count() > 0) {
  57 |       await themeToggle.click();
  58 |       await page.waitForTimeout(500);
  59 |       const newClass = await html.getAttribute("class");
  60 |       expect(newClass).not.toBe(initialClass);
  61 |     }
  62 |   });
  63 | });
  64 | 
```