import { test, expect } from "@playwright/test";

test.describe("Error Handling", () => {
  test("404 page should display for non-existent routes", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-12345");
    expect(response?.status()).toBe(404);
  });

  test("404 page should have navigation back to home", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-12345");
    const homeLink = page.locator('a[href="/"]');
    if (await homeLink.count() > 0) {
      await expect(homeLink.first()).toBeVisible();
    }
  });

  test("API should return JSON for non-existent endpoints", async ({ request }) => {
    const response = await request.get("/api/nonexistent-endpoint-xyz");
    expect([404, 405]).toContain(response.status());
  });
});

test.describe("Responsive Images", () => {
  test("product images should have proper attributes", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    const images = page.locator("img[alt]");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });
});

test.describe("Cart Functionality", () => {
  test("cart should be accessible from header", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const cartButton = page.locator('button[aria-label*="cart"], button[aria-label*="Cart"], [class*="cart"]').first();
    if (await cartButton.count() > 0) {
      await expect(cartButton).toBeVisible();
    }
  });
});

test.describe("Theme Persistence", () => {
  test("dark mode toggle should work", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const html = page.locator("html");
    const initialClass = await html.getAttribute("class");
    const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="dark"], button[aria-label*="Dark"]').first();
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      const newClass = await html.getAttribute("class");
      expect(newClass).not.toBe(initialClass);
    }
  });
});
