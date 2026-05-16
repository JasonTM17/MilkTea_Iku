import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load and display hero section", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("text=Đặt hàng ngay")).toBeVisible();
  });

  test("should display navigation header", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header.locator("nav")).toBeVisible();
  });

  test("should display categories section", async ({ page }) => {
    await expect(page.locator("text=Khám phá danh mục")).toBeVisible();
  });

  test("should display best sellers section", async ({ page }) => {
    await expect(page.locator("text=Best Sellers")).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should navigate to menu page", async ({ page }) => {
    await page.locator('a:has-text("Menu")').first().click();
    await expect(page).toHaveURL(/\/menu/);
  });

  test("should open search modal", async ({ page }) => {
    const searchBtn = page.locator('[aria-label="Tìm kiếm"]').first();
    if (await searchBtn.isVisible()) {
      await searchBtn.click();
      await expect(page.locator('[role="dialog"]')).toBeVisible();
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator("main")).toBeVisible();
  });
});
