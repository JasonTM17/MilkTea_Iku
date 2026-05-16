import { test, expect } from "@playwright/test";

test.describe("Stores Page", () => {
  test("should display store locations", async ({ page }) => {
    await page.goto("/stores");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should show store information", async ({ page }) => {
    await page.goto("/stores");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });
});
