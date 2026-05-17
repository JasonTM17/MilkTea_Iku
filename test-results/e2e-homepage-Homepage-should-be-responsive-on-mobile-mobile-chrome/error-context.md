# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\homepage.spec.ts >> Homepage >> should be responsive on mobile
- Location: tests\e2e\homepage.spec.ts:47:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: locator('main')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main')
    - waiting for" http://localhost:3000/" navigation to finish...
    - navigated to "http://localhost:3000/"

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
  - paragraph: "Error: Cannot find module './1682.js' Require stack: - D:\\MilkTea_Iku\\.next\\server\\webpack-runtime.js - D:\\MilkTea_Iku\\.next\\server\\app\\page.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\server\\require.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\server\\load-components.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\build\\utils.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\server\\dev\\hot-middleware.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\server\\dev\\hot-reloader-webpack.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\server\\lib\\router-utils\\setup-dev-bundler.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\server\\lib\\router-server.js - D:\\MilkTea_Iku\\node_modules\\next\\dist\\server\\lib\\start-server.js"
  - text: This error happened while generating the page. Any console logs will be displayed in the terminal window.
  - heading "Call Stack" [level=2]
  - group:
    - img
    - img
    - text: Next.js
  - heading "TracingChannel.traceSync" [level=3]
  - text: node:diagnostics_channel (328:14)
  - group:
    - img
    - img
    - text: Next.js
  - heading "Array.reduce" [level=3]
  - text: <anonymous>
  - group:
    - img
    - img
    - text: Next.js
  - heading "Array.map" [level=3]
  - text: <anonymous>
  - group:
    - img
    - img
    - text: Next.js
  - heading "<unknown>" [level=3]
  - text: file:///D:/MilkTea_Iku/.next/server/pages/_document.js (1:340)
  - heading "Object.<anonymous>" [level=3]
  - text: file:///D:/MilkTea_Iku/.next/server/pages/_document.js (1:383)
  - heading "TracingChannel.traceSync" [level=3]
  - text: node:diagnostics_channel (328:14)
  - group:
    - img
    - img
    - text: Next.js
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Homepage", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("/");
  6  |     await page.waitForLoadState("networkidle");
  7  |   });
  8  | 
  9  |   test("should load and display hero section", async ({ page }) => {
  10 |     await expect(page.locator("main")).toBeVisible();
  11 |     await expect(page.locator("text=Đặt hàng ngay").first()).toBeVisible({ timeout: 10000 });
  12 |   });
  13 | 
  14 |   test("should display navigation header", async ({ page }) => {
  15 |     const header = page.locator("header");
  16 |     await expect(header).toBeVisible();
  17 |   });
  18 | 
  19 |   test("should display categories section", async ({ page }) => {
  20 |     await expect(page.locator("text=Khám phá danh mục")).toBeVisible();
  21 |   });
  22 | 
  23 |   test("should display best sellers section", async ({ page }) => {
  24 |     await expect(page.locator("text=Best Sellers")).toBeVisible();
  25 |   });
  26 | 
  27 |   test("should display footer", async ({ page }) => {
  28 |     const footer = page.locator("footer");
  29 |     await expect(footer).toBeVisible();
  30 |   });
  31 | 
  32 |   test("should navigate to menu page", async ({ page }) => {
  33 |     await page.goto("/menu");
  34 |     await page.waitForLoadState("networkidle");
  35 |     await expect(page).toHaveURL(/\/menu/);
  36 |     await expect(page.locator("main")).toBeVisible();
  37 |   });
  38 | 
  39 |   test("should open search modal", async ({ page }) => {
  40 |     const searchBtn = page.locator('[aria-label="Tìm kiếm"]').first();
  41 |     if (await searchBtn.isVisible()) {
  42 |       await searchBtn.click();
  43 |       await expect(page.locator('[role="dialog"]')).toBeVisible();
  44 |     }
  45 |   });
  46 | 
  47 |   test("should be responsive on mobile", async ({ page }) => {
  48 |     await page.setViewportSize({ width: 375, height: 812 });
> 49 |     await expect(page.locator("main")).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  50 |   });
  51 | });
  52 | 
```