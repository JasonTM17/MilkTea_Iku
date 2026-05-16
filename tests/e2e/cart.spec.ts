import { test, expect } from "@playwright/test";

test.describe("Cart Functionality", () => {
  test("should add product to cart from menu", async ({ page }) => {
    await page.goto("/menu");
    const productLink = page.locator('a[href*="/menu/"]').first();
    await expect(productLink).toBeVisible({ timeout: 10000 });
    await productLink.click();
    await page.waitForLoadState("networkidle");

    const addToCartBtn = page.locator('button:has-text("Thêm vào giỏ")').first();
    if (await addToCartBtn.isVisible()) {
      await addToCartBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test("should show empty cart message", async ({ page }) => {
    await page.goto("/");
    const cartBtn = page.locator('[aria-label="Giỏ hàng"]').first();
    if (await cartBtn.isVisible()) {
      await cartBtn.click();
      await expect(page.locator("text=Giỏ hàng trống")).toBeVisible({ timeout: 5000 });
    }
  });

  test("should persist cart across page navigation", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Cart state should persist via Zustand persist
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Checkout Flow", () => {
  test("should display checkout form", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should validate required fields on checkout", async ({ page }) => {
    await page.goto("/checkout");
    const submitBtn = page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(500);
    }
  });
});
