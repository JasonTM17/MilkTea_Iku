# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\pages.spec.ts >> Tracking Page >> should display tracking page
- Location: tests\e2e\pages.spec.ts:18:7

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
  3  | test.describe("Wishlist Page", () => {
  4  |   test("should display wishlist page", async ({ page }) => {
  5  |     await page.goto("/wishlist");
  6  |     await page.waitForLoadState("networkidle");
  7  |     await expect(page.locator("main")).toBeVisible();
  8  |   });
  9  | 
  10 |   test("should show empty state when no items", async ({ page }) => {
  11 |     await page.goto("/wishlist");
  12 |     await page.waitForLoadState("networkidle");
  13 |     await expect(page.locator("main")).toBeVisible();
  14 |   });
  15 | });
  16 | 
  17 | test.describe("Tracking Page", () => {
  18 |   test("should display tracking page", async ({ page }) => {
  19 |     await page.goto("/tracking");
  20 |     await page.waitForLoadState("networkidle");
> 21 |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  22 |   });
  23 | 
  24 |   test("should have order input field", async ({ page }) => {
  25 |     await page.goto("/tracking");
  26 |     await page.waitForLoadState("networkidle");
  27 |     const input = page.locator("input").first();
  28 |     if (await input.isVisible({ timeout: 5000 })) {
  29 |       await expect(input).toBeVisible();
  30 |     }
  31 |   });
  32 | });
  33 | 
  34 | test.describe("Blog Page", () => {
  35 |   test("should display blog posts", async ({ page }) => {
  36 |     await page.goto("/blog");
  37 |     await page.waitForLoadState("networkidle");
  38 |     await expect(page.locator("main")).toBeVisible();
  39 |   });
  40 | 
  41 |   test("should have article cards", async ({ page }) => {
  42 |     await page.goto("/blog");
  43 |     await page.waitForLoadState("networkidle");
  44 |     const heading = page.locator("h1, h2").first();
  45 |     await expect(heading).toBeVisible();
  46 |   });
  47 | });
  48 | 
  49 | test.describe("Recipes Page", () => {
  50 |   test("should display recipes", async ({ page }) => {
  51 |     await page.goto("/recipes");
  52 |     await page.waitForLoadState("networkidle");
  53 |     await expect(page.locator("main")).toBeVisible();
  54 |   });
  55 | });
  56 | 
  57 | test.describe("Franchise Page", () => {
  58 |   test("should display franchise info", async ({ page }) => {
  59 |     await page.goto("/franchise");
  60 |     await page.waitForLoadState("networkidle");
  61 |     await expect(page.locator("main")).toBeVisible();
  62 |   });
  63 | 
  64 |   test("should have contact form", async ({ page }) => {
  65 |     await page.goto("/franchise");
  66 |     await page.waitForLoadState("networkidle");
  67 |     const inputs = page.locator("input");
  68 |     const count = await inputs.count();
  69 |     expect(count).toBeGreaterThan(0);
  70 |   });
  71 | });
  72 | 
```