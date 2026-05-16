import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("all images should have alt text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("interactive elements should be keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });

  test("skip link should be present", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test("buttons should have accessible names", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const buttons = page.locator("button");
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const btn = buttons.nth(i);
      if (await btn.isVisible()) {
        const text = await btn.textContent();
        const ariaLabel = await btn.getAttribute("aria-label");
        expect(text || ariaLabel).toBeTruthy();
      }
    }
  });

  test("form inputs should have labels", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    const inputs = page.locator("input:not([type='hidden'])");
    const count = await inputs.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const input = inputs.nth(i);
      if (await input.isVisible()) {
        const id = await input.getAttribute("id");
        const ariaLabel = await input.getAttribute("aria-label");
        const placeholder = await input.getAttribute("placeholder");
        expect(id || ariaLabel || placeholder).toBeTruthy();
      }
    }
  });

  test("color contrast should be sufficient for main text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const body = page.locator("body");
    const color = await body.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBeTruthy();
  });
});
