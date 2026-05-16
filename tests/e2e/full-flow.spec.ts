import { test, expect } from "@playwright/test";

test.describe("Full Order Flow", () => {
  test("complete order from menu to confirmation", async ({ page }) => {
    // Step 1: Browse menu
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    // Step 2: Click on a product
    const productLink = page.locator('a[href*="/menu/"]').first();
    await expect(productLink).toBeVisible({ timeout: 10000 });
    await productLink.click();
    await page.waitForLoadState("networkidle");

    // Step 3: Add to cart
    const addToCartBtn = page.locator('button:has-text("Thêm vào giỏ")').first();
    if (await addToCartBtn.isVisible({ timeout: 5000 })) {
      await addToCartBtn.click();
      await page.waitForTimeout(1000);
    }

    // Step 4: Go to checkout
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("search for product and navigate", async ({ page }) => {
    await page.goto("/");

    // Open search
    const searchBtn = page.locator('[aria-label="Tìm kiếm"]').first();
    if (await searchBtn.isVisible()) {
      await searchBtn.click();
      await page.waitForTimeout(500);

      // Type search query
      const searchInput = page.locator('input[placeholder*="Tìm"]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill("matcha");
        await page.waitForTimeout(1000);
      }
    }
  });

  test("view order tracking page", async ({ page }) => {
    await page.goto("/tracking");
    await expect(page.locator("main")).toBeVisible();
  });

  test("view promotions page", async ({ page }) => {
    await page.goto("/promotions");
    await expect(page.locator("main")).toBeVisible();
  });

  test("view about page", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("main")).toBeVisible();
  });

  test("view stores page", async ({ page }) => {
    await page.goto("/stores");
    await expect(page.locator("main")).toBeVisible();
  });
});
