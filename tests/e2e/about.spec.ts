import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test("should display about content", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should have brand story section", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("should display team or values section", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    const sections = page.locator("section");
    const count = await sections.count();
    expect(count).toBeGreaterThan(1);
  });
});
