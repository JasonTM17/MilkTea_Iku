# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\newsletter.spec.ts >> Promo Banner >> should display promo banner at top
- Location: tests\e2e\newsletter.spec.ts:29:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[class*="bg-brand"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[class*="bg-brand"]').first()

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Newsletter Component", () => {
  4  |   test("should display newsletter section on homepage", async ({ page }) => {
  5  |     await page.goto("/");
  6  |     await page.waitForLoadState("networkidle");
  7  |     const newsletter = page.locator('text=Đăng ký nhận tin').first();
  8  |     if (await newsletter.isVisible({ timeout: 3000 })) {
  9  |       await expect(newsletter).toBeVisible();
  10 |     }
  11 |   });
  12 | 
  13 |   test("should validate email input", async ({ page }) => {
  14 |     await page.goto("/");
  15 |     await page.waitForLoadState("networkidle");
  16 |     const emailInput = page.locator('input[type="email"]').first();
  17 |     if (await emailInput.isVisible({ timeout: 3000 })) {
  18 |       await emailInput.fill("invalid");
  19 |       const submitBtn = emailInput.locator("..").locator('button[type="submit"]').first();
  20 |       if (await submitBtn.isVisible()) {
  21 |         await submitBtn.click();
  22 |         await page.waitForTimeout(500);
  23 |       }
  24 |     }
  25 |   });
  26 | });
  27 | 
  28 | test.describe("Promo Banner", () => {
  29 |   test("should display promo banner at top", async ({ page }) => {
  30 |     await page.goto("/");
  31 |     const banner = page.locator('[class*="bg-brand"]').first();
> 32 |     await expect(banner).toBeVisible({ timeout: 5000 });
     |                          ^ Error: expect(locator).toBeVisible() failed
  33 |   });
  34 | 
  35 |   test("should be dismissible", async ({ page }) => {
  36 |     await page.goto("/");
  37 |     await page.waitForLoadState("networkidle");
  38 |     const closeBtn = page.locator('button[aria-label*="Đóng"], button:has(svg.lucide-x)').first();
  39 |     if (await closeBtn.isVisible({ timeout: 3000 })) {
  40 |       await closeBtn.click();
  41 |       await page.waitForTimeout(500);
  42 |     }
  43 |   });
  44 | });
  45 | 
```