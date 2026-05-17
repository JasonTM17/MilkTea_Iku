# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seo\meta.spec.ts >> SEO Checks >> homepage should have meta description
- Location: tests\seo\meta.spec.ts:10:7

# Error details

```
Error: expect(locator).toBeAttached() failed

Locator: locator('meta[name="description"]')
Expected: attached
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeAttached" with timeout 5000ms
  - waiting for locator('meta[name="description"]')

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("SEO Checks", () => {
  4  |   test("homepage should have proper title", async ({ page }) => {
  5  |     await page.goto("/");
  6  |     const title = await page.title();
  7  |     expect(title).toContain("MilkTea Iku");
  8  |   });
  9  | 
  10 |   test("homepage should have meta description", async ({ page }) => {
  11 |     await page.goto("/");
  12 |     const metaDesc = page.locator('meta[name="description"]');
> 13 |     await expect(metaDesc).toBeAttached();
     |                            ^ Error: expect(locator).toBeAttached() failed
  14 |     const content = await metaDesc.getAttribute("content");
  15 |     expect(content).toBeTruthy();
  16 |     expect(content!.length).toBeGreaterThan(50);
  17 |   });
  18 | 
  19 |   test("should have canonical URL", async ({ page }) => {
  20 |     await page.goto("/");
  21 |     const canonical = page.locator('link[rel="canonical"]');
  22 |     if (await canonical.count() > 0) {
  23 |       const href = await canonical.getAttribute("href");
  24 |       expect(href).toBeTruthy();
  25 |     }
  26 |   });
  27 | 
  28 |   test("should have Open Graph tags", async ({ page }) => {
  29 |     await page.goto("/");
  30 |     const ogTitle = page.locator('meta[property="og:title"]');
  31 |     if (await ogTitle.count() > 0) {
  32 |       const content = await ogTitle.getAttribute("content");
  33 |       expect(content).toBeTruthy();
  34 |     }
  35 |   });
  36 | 
  37 |   test("menu page should have proper title", async ({ page }) => {
  38 |     await page.goto("/menu");
  39 |     const title = await page.title();
  40 |     expect(title.length).toBeGreaterThan(0);
  41 |   });
  42 | 
  43 |   test("should have lang attribute on html", async ({ page }) => {
  44 |     await page.goto("/");
  45 |     const lang = await page.locator("html").getAttribute("lang");
  46 |     expect(lang).toBe("vi");
  47 |   });
  48 | 
  49 |   test("should have viewport meta tag", async ({ page }) => {
  50 |     await page.goto("/");
  51 |     const viewport = page.locator('meta[name="viewport"]');
  52 |     await expect(viewport).toBeAttached();
  53 |   });
  54 | });
  55 | 
```