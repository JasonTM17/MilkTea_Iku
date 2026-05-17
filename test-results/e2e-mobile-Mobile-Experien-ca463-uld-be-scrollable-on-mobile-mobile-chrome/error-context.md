# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\mobile.spec.ts >> Mobile Experience >> menu page should be scrollable on mobile
- Location: tests\e2e\mobile.spec.ts:47:7

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
  3  | test.describe("Mobile Experience", () => {
  4  |   test.use({ viewport: { width: 375, height: 812 } });
  5  | 
  6  |   test("should show mobile bottom navigation", async ({ page }) => {
  7  |     await page.goto("/");
  8  |     await page.waitForLoadState("networkidle");
  9  |     const mobileNav = page.locator('[class*="fixed"][class*="bottom"]').first();
  10 |     await expect(mobileNav).toBeVisible();
  11 |   });
  12 | 
  13 |   test("should hide desktop header nav on mobile", async ({ page }) => {
  14 |     await page.goto("/");
  15 |     await page.waitForLoadState("networkidle");
  16 |     const desktopNav = page.locator('header nav.hidden, header nav[class*="hidden"]').first();
  17 |     if (await desktopNav.count() > 0) {
  18 |       await expect(desktopNav).not.toBeVisible();
  19 |     }
  20 |   });
  21 | 
  22 |   test("should have touch-friendly button sizes", async ({ page }) => {
  23 |     await page.goto("/");
  24 |     await page.waitForLoadState("networkidle");
  25 |     const buttons = page.locator("button:visible");
  26 |     const count = await buttons.count();
  27 |     let smallCount = 0;
  28 |     let total = 0;
  29 |     for (let i = 0; i < Math.min(count, 10); i++) {
  30 |       const box = await buttons.nth(i).boundingBox();
  31 |       if (box && box.height > 0) {
  32 |         total++;
  33 |         if (box.height < 28) smallCount++;
  34 |       }
  35 |     }
  36 |     expect(smallCount / Math.max(total, 1)).toBeLessThan(0.4);
  37 |   });
  38 | 
  39 |   test("should not have horizontal overflow", async ({ page }) => {
  40 |     await page.goto("/");
  41 |     await page.waitForLoadState("networkidle");
  42 |     const body = page.locator("body");
  43 |     const box = await body.boundingBox();
  44 |     expect(box?.width).toBeLessThanOrEqual(376);
  45 |   });
  46 | 
  47 |   test("menu page should be scrollable on mobile", async ({ page }) => {
  48 |     await page.goto("/menu");
  49 |     await page.waitForLoadState("networkidle");
> 50 |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  51 |     const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  52 |     expect(scrollHeight).toBeGreaterThan(812);
  53 |   });
  54 | });
  55 | 
```