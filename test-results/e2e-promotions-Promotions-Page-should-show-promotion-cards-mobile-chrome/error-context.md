# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\promotions.spec.ts >> Promotions Page >> should show promotion cards
- Location: tests\e2e\promotions.spec.ts:10:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1, h2').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h1, h2').first()

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Promotions Page", () => {
  4  |   test("should display promotions", async ({ page }) => {
  5  |     await page.goto("/promotions");
  6  |     await page.waitForLoadState("networkidle");
  7  |     await expect(page.locator("main")).toBeVisible();
  8  |   });
  9  | 
  10 |   test("should show promotion cards", async ({ page }) => {
  11 |     await page.goto("/promotions");
  12 |     await page.waitForLoadState("networkidle");
  13 |     const heading = page.locator("h1, h2").first();
> 14 |     await expect(heading).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  15 |   });
  16 | });
  17 | 
```