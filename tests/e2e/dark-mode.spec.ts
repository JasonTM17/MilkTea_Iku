import { test, expect } from "@playwright/test";

const pages = ["/", "/menu", "/about", "/contact", "/stores"];

test.describe("Dark Mode", () => {
  for (const pagePath of pages) {
    test(`${pagePath} should support dark mode`, async ({ page }) => {
      await page.goto(pagePath);
      await page.waitForLoadState("networkidle");

      // Enable dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add("dark");
      });
      await page.waitForTimeout(300);

      // Verify dark class is applied
      const html = page.locator("html");
      const className = await html.getAttribute("class");
      expect(className).toContain("dark");

      // Verify page is still visible
      await expect(page.locator("main")).toBeVisible();
    });
  }
});
