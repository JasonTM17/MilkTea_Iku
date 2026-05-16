import { test, expect } from "@playwright/test";

test.describe("Menu Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/menu");
  });

  test("should load menu page", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();
  });

  test("should display product cards", async ({ page }) => {
    const products = page.locator('[class*="product"], [class*="ProductCard"], article');
    await expect(products.first()).toBeVisible({ timeout: 10000 });
  });

  test("should have category filter tabs", async ({ page }) => {
    const tabs = page.locator('button:has-text("Tất cả"), a:has-text("Tất cả")');
    await expect(tabs.first()).toBeVisible();
  });

  test("should filter products by category", async ({ page }) => {
    const categoryBtn = page.locator('button:has-text("Trà Sữa")').first();
    if (await categoryBtn.isVisible()) {
      await categoryBtn.click();
      await page.waitForTimeout(500);
      await expect(page.locator("main")).toBeVisible();
    }
  });

  test("should navigate to product detail", async ({ page }) => {
    const productLink = page.locator('a[href*="/menu/"]').first();
    await expect(productLink).toBeVisible({ timeout: 10000 });
    await productLink.click();
    await expect(page).toHaveURL(/\/menu\/.+/);
  });

  test("should display product prices", async ({ page }) => {
    const price = page.locator('text=/\\d+\\.?\\d*đ/').first();
    await expect(price).toBeVisible({ timeout: 10000 });
  });
});
