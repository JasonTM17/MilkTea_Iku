# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\stores.spec.ts >> Stores Page >> should display store locations
- Location: tests\e2e\stores.spec.ts:4:7

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
  3  | test.describe("Stores Page", () => {
  4  |   test("should display store locations", async ({ page }) => {
  5  |     await page.goto("/stores");
  6  |     await page.waitForLoadState("networkidle");
> 7  |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  8  |   });
  9  | 
  10 |   test("should show store information", async ({ page }) => {
  11 |     await page.goto("/stores");
  12 |     await page.waitForLoadState("networkidle");
  13 |     const heading = page.locator("h1, h2").first();
  14 |     await expect(heading).toBeVisible();
  15 |   });
  16 | });
  17 | 
```