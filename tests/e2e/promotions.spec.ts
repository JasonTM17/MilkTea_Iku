import { test, expect } from "@playwright/test";

test.describe("Promotions Page", () => {
  test("should display promotions", async ({ page }) => {
    await page.goto("/promotions");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should show promotion cards", async ({ page }) => {
    await page.goto("/promotions");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });
});
