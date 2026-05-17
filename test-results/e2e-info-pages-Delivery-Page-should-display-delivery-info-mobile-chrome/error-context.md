# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\info-pages.spec.ts >> Delivery Page >> should display delivery info
- Location: tests\e2e\info-pages.spec.ts:19:7

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
    - waiting for" http://localhost:3000/delivery" navigation to finish...
    - navigated to "http://localhost:3000/delivery"
    - waiting for" http://localhost:3000/delivery" navigation to finish...

```

# Page snapshot

```yaml
- generic [ref=e2]: missing required error components, refreshing...
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Careers Page", () => {
  4  |   test("should display job listings", async ({ page }) => {
  5  |     await page.goto("/careers");
  6  |     await page.waitForLoadState("networkidle");
  7  |     await expect(page.locator("main")).toBeVisible();
  8  |   });
  9  | 
  10 |   test("should show job cards", async ({ page }) => {
  11 |     await page.goto("/careers");
  12 |     await page.waitForLoadState("networkidle");
  13 |     const heading = page.locator("h1, h2").first();
  14 |     await expect(heading).toBeVisible();
  15 |   });
  16 | });
  17 | 
  18 | test.describe("Delivery Page", () => {
  19 |   test("should display delivery info", async ({ page }) => {
  20 |     await page.goto("/delivery");
  21 |     await page.waitForLoadState("networkidle");
> 22 |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  23 |   });
  24 | });
  25 | 
  26 | test.describe("Events Page", () => {
  27 |   test("should display events", async ({ page }) => {
  28 |     await page.goto("/events");
  29 |     await page.waitForLoadState("networkidle");
  30 |     await expect(page.locator("main")).toBeVisible();
  31 |   });
  32 | });
  33 | 
  34 | test.describe("Privacy Page", () => {
  35 |   test("should display privacy policy", async ({ page }) => {
  36 |     await page.goto("/privacy");
  37 |     await page.waitForLoadState("networkidle");
  38 |     await expect(page.locator("main")).toBeVisible();
  39 |     const heading = page.locator("h1").first();
  40 |     await expect(heading).toBeVisible();
  41 |   });
  42 | });
  43 | 
  44 | test.describe("Terms Page", () => {
  45 |   test("should display terms of service", async ({ page }) => {
  46 |     await page.goto("/terms");
  47 |     await page.waitForLoadState("networkidle");
  48 |     await expect(page.locator("main")).toBeVisible();
  49 |   });
  50 | });
  51 | 
  52 | test.describe("Loyalty Page", () => {
  53 |   test("should display loyalty program", async ({ page }) => {
  54 |     await page.goto("/loyalty");
  55 |     await page.waitForLoadState("networkidle");
  56 |     await expect(page.locator("main")).toBeVisible();
  57 |   });
  58 | 
  59 |   test("should show membership tiers", async ({ page }) => {
  60 |     await page.goto("/loyalty");
  61 |     await page.waitForLoadState("networkidle");
  62 |     const heading = page.locator("h1, h2").first();
  63 |     await expect(heading).toBeVisible();
  64 |   });
  65 | });
  66 | 
```