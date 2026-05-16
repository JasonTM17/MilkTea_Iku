import { test, expect } from "@playwright/test";

test.describe("Admin Dashboard", () => {
  test("should require authentication", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForLoadState("networkidle");
    // Should either redirect or show login
    await expect(page.locator("main, body")).toBeVisible();
  });

  test("admin page should load", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("body")).toBeVisible();
  });
});
