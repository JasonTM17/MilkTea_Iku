import { test, expect } from "@playwright/test";

test.describe("SEO Checks", () => {
  test("homepage should have proper title", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("MilkTea Iku");
  });

  test("homepage should have meta description", async ({ page }) => {
    await page.goto("/");
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toBeAttached();
    const content = await metaDesc.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(50);
  });

  test("should have canonical URL", async ({ page }) => {
    await page.goto("/");
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      const href = await canonical.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("should have Open Graph tags", async ({ page }) => {
    await page.goto("/");
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.count() > 0) {
      const content = await ogTitle.getAttribute("content");
      expect(content).toBeTruthy();
    }
  });

  test("menu page should have proper title", async ({ page }) => {
    await page.goto("/menu");
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test("should have lang attribute on html", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("vi");
  });

  test("should have viewport meta tag", async ({ page }) => {
    await page.goto("/");
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toBeAttached();
  });
});
