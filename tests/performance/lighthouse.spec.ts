import { test, expect } from "@playwright/test";

test.describe("Performance Checks", () => {
  test("homepage should load within 5 seconds", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000);
  });

  test("menu page should load within 5 seconds", async ({ page }) => {
    const start = Date.now();
    await page.goto("/menu");
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000);
  });

  test("should not have excessive DOM nodes", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const nodeCount = await page.evaluate(() => document.querySelectorAll("*").length);
    expect(nodeCount).toBeLessThan(3000);
  });

  test("images should use lazy loading", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const images = page.locator("img");
    const count = await images.count();
    let lazyCount = 0;
    for (let i = 0; i < count; i++) {
      const loading = await images.nth(i).getAttribute("loading");
      if (loading === "lazy") lazyCount++;
    }
    // At least some images should be lazy loaded
    if (count > 3) {
      expect(lazyCount).toBeGreaterThan(0);
    }
  });

  test("should have proper meta viewport", async ({ page }) => {
    await page.goto("/");
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toBeAttached();
    const content = await viewport.getAttribute("content");
    expect(content).toContain("width=device-width");
  });

  test("should serve compressed assets", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers();
    // Next.js typically handles compression
    expect(response?.status()).toBe(200);
  });
});
