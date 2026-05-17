# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\navigation.spec.ts >> Navigation >> should show mobile navigation on small screens
- Location: tests\e2e\navigation.spec.ts:28:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[class*="fixed"][class*="bottom"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[class*="fixed"][class*="bottom"]').first()

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Navigation", () => {
  4  |   test("should navigate between pages via links", async ({ page }) => {
  5  |     await page.goto("/");
  6  |     await page.waitForLoadState("networkidle");
  7  | 
  8  |     await page.goto("/menu");
  9  |     await page.waitForLoadState("networkidle");
  10 |     await expect(page).toHaveURL(/\/menu/);
  11 | 
  12 |     await page.goto("/about");
  13 |     await page.waitForLoadState("networkidle");
  14 |     await expect(page).toHaveURL(/\/about/);
  15 |   });
  16 | 
  17 |   test("should navigate via footer links", async ({ page }) => {
  18 |     await page.goto("/");
  19 |     const footer = page.locator("footer");
  20 | 
  21 |     const aboutLink = footer.locator('a:has-text("Về chúng tôi")').first();
  22 |     if (await aboutLink.isVisible()) {
  23 |       await aboutLink.click();
  24 |       await expect(page).toHaveURL(/\/about/);
  25 |     }
  26 |   });
  27 | 
  28 |   test("should show mobile navigation on small screens", async ({ page }) => {
  29 |     await page.setViewportSize({ width: 375, height: 812 });
  30 |     await page.goto("/");
  31 | 
  32 |     const mobileNav = page.locator('[class*="fixed"][class*="bottom"]');
> 33 |     await expect(mobileNav.first()).toBeVisible();
     |                                     ^ Error: expect(locator).toBeVisible() failed
  34 |   });
  35 | 
  36 |   test("should have working back navigation", async ({ page }) => {
  37 |     await page.goto("/");
  38 |     await page.waitForLoadState("networkidle");
  39 | 
  40 |     await page.goto("/menu");
  41 |     await page.waitForLoadState("networkidle");
  42 |     await expect(page).toHaveURL(/\/menu/);
  43 | 
  44 |     await page.goBack();
  45 |     await expect(page).toHaveURL("/");
  46 |   });
  47 | });
  48 | 
  49 | test.describe("Dark Mode", () => {
  50 |   test("should toggle dark mode", async ({ page }) => {
  51 |     await page.goto("/");
  52 | 
  53 |     const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="Theme"], button:has(svg.lucide-moon), button:has(svg.lucide-sun)').first();
  54 |     if (await themeToggle.isVisible()) {
  55 |       await themeToggle.click();
  56 |       await page.waitForTimeout(500);
  57 |       const html = page.locator("html");
  58 |       const className = await html.getAttribute("class");
  59 |       expect(className).toContain("dark");
  60 |     }
  61 |   });
  62 | });
  63 | 
  64 | test.describe("Responsive Design", () => {
  65 |   const viewports = [
  66 |     { name: "mobile", width: 375, height: 812 },
  67 |     { name: "tablet", width: 768, height: 1024 },
  68 |     { name: "desktop", width: 1440, height: 900 },
  69 |   ];
  70 | 
  71 |   for (const viewport of viewports) {
  72 |     test(`should render correctly at ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
  73 |       await page.setViewportSize({ width: viewport.width, height: viewport.height });
  74 |       await page.goto("/");
  75 |       await expect(page.locator("main")).toBeVisible();
  76 | 
  77 |       const body = page.locator("body");
  78 |       const box = await body.boundingBox();
  79 |       expect(box?.width).toBeLessThanOrEqual(viewport.width + 1);
  80 |     });
  81 |   }
  82 | });
  83 | 
```