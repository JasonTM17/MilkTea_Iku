# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\gift-cards.spec.ts >> Gift Cards Page >> should display gift card form
- Location: tests\e2e\gift-cards.spec.ts:4:7

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
  3  | test.describe("Gift Cards Page", () => {
  4  |   test("should display gift card form", async ({ page }) => {
  5  |     await page.goto("/gift-cards");
  6  |     await page.waitForLoadState("networkidle");
> 7  |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  8  |   });
  9  | 
  10 |   test("should have amount selection", async ({ page }) => {
  11 |     await page.goto("/gift-cards");
  12 |     await page.waitForLoadState("networkidle");
  13 |     const buttons = page.locator("button");
  14 |     const count = await buttons.count();
  15 |     expect(count).toBeGreaterThan(2);
  16 |   });
  17 | 
  18 |   test("should have recipient fields", async ({ page }) => {
  19 |     await page.goto("/gift-cards");
  20 |     await page.waitForLoadState("networkidle");
  21 |     const inputs = page.locator("input");
  22 |     const count = await inputs.count();
  23 |     expect(count).toBeGreaterThanOrEqual(2);
  24 |   });
  25 | });
  26 | 
```