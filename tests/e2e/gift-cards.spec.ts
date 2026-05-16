import { test, expect } from "@playwright/test";

test.describe("Gift Cards Page", () => {
  test("should display gift card form", async ({ page }) => {
    await page.goto("/gift-cards");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should have amount selection", async ({ page }) => {
    await page.goto("/gift-cards");
    await page.waitForLoadState("networkidle");
    const buttons = page.locator("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(2);
  });

  test("should have recipient fields", async ({ page }) => {
    await page.goto("/gift-cards");
    await page.waitForLoadState("networkidle");
    const inputs = page.locator("input");
    const count = await inputs.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
