# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual\screenshots.spec.ts >> Visual Regression - Menu >> menu page layout
- Location: tests\visual\screenshots.spec.ts:25:7

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  71956 pixels (ratio 0.26 of all image pixels) are different.

  Snapshot: menu-page.png

Call log:
  - Expect "toHaveScreenshot(menu-page.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 71956 pixels (ratio 0.26 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 71956 pixels (ratio 0.26 of all image pixels) are different.

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Visual Regression - Homepage", () => {
  4  |   test("homepage hero section", async ({ page }) => {
  5  |     await page.goto("/");
  6  |     await page.waitForLoadState("networkidle");
  7  |     await expect(page.locator("main")).toBeVisible();
  8  |     await expect(page).toHaveScreenshot("homepage-hero.png", {
  9  |       fullPage: false,
  10 |       maxDiffPixelRatio: 0.25,
  11 |     });
  12 |   });
  13 | 
  14 |   test("homepage full page", async ({ page }) => {
  15 |     await page.goto("/");
  16 |     await page.waitForLoadState("networkidle");
  17 |     await expect(page).toHaveScreenshot("homepage-full.png", {
  18 |       fullPage: true,
  19 |       maxDiffPixelRatio: 0.25,
  20 |     });
  21 |   });
  22 | });
  23 | 
  24 | test.describe("Visual Regression - Menu", () => {
  25 |   test("menu page layout", async ({ page }) => {
  26 |     await page.goto("/menu");
  27 |     await page.waitForLoadState("networkidle");
  28 |     await page.waitForTimeout(2000);
> 29 |     await expect(page).toHaveScreenshot("menu-page.png", {
     |                        ^ Error: expect(page).toHaveScreenshot(expected) failed
  30 |       fullPage: false,
  31 |       maxDiffPixelRatio: 0.25,
  32 |     });
  33 |   });
  34 | });
  35 | 
  36 | test.describe("Visual Regression - Mobile", () => {
  37 |   test.use({ viewport: { width: 375, height: 812 } });
  38 | 
  39 |   test("mobile homepage", async ({ page }) => {
  40 |     await page.goto("/");
  41 |     await page.waitForLoadState("networkidle");
  42 |     await expect(page).toHaveScreenshot("mobile-homepage.png", {
  43 |       fullPage: false,
  44 |       maxDiffPixelRatio: 0.25,
  45 |     });
  46 |   });
  47 | 
  48 |   test("mobile menu", async ({ page }) => {
  49 |     await page.goto("/menu");
  50 |     await page.waitForLoadState("networkidle");
  51 |     await page.waitForTimeout(2000);
  52 |     await expect(page).toHaveScreenshot("mobile-menu.png", {
  53 |       fullPage: false,
  54 |       maxDiffPixelRatio: 0.25,
  55 |     });
  56 |   });
  57 | });
  58 | 
  59 | test.describe("Visual Regression - Dark Mode", () => {
  60 |   test("dark mode homepage", async ({ page }) => {
  61 |     await page.goto("/");
  62 |     await page.evaluate(() => {
  63 |       document.documentElement.classList.add("dark");
  64 |     });
  65 |     await page.waitForTimeout(1000);
  66 |     await expect(page).toHaveScreenshot("dark-homepage.png", {
  67 |       fullPage: false,
  68 |       maxDiffPixelRatio: 0.25,
  69 |     });
  70 |   });
  71 | });
  72 | 
```