import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("should display contact form", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should have input fields", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    const inputs = page.locator("input");
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should have submit button", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    const submitBtn = page.locator('button[type="submit"]').first();
    await expect(submitBtn).toBeVisible();
  });
});
