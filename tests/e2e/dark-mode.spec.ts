import { test, expect } from "@playwright/test";

const pages = ["/", "/menu", "/about", "/contact", "/stores"];

test.describe("Dark Mode", () => {
  for (const pagePath of pages) {
    test(`${pagePath} should support dark mode`, async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem("theme", "dark");
      });
      await page.goto(pagePath);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);

      const html = page.locator("html");
      const className = await html.getAttribute("class") || "";
      const hasDark = className.includes("dark");
      const style = await html.getAttribute("style") || "";
      const hasColorScheme = style.includes("dark");
      expect(hasDark || hasColorScheme).toBeTruthy();
    });
  }
});
