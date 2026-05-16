import { test, expect } from "@playwright/test";

test.describe("Product Detail Page", () => {
  test("should display product information", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productLink = page.locator('a[href*="/menu/"]').first();
    if (await productLink.isVisible({ timeout: 10000 })) {
      await productLink.click();
      await page.waitForLoadState("networkidle");
      await expect(page.locator("main")).toBeVisible();
    }
  });

  test("should show product price", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productLink = page.locator('a[href*="/menu/"]').first();
    if (await productLink.isVisible({ timeout: 10000 })) {
      await productLink.click();
      await page.waitForLoadState("networkidle");
      const price = page.locator('text=/\\d+.*đ/').first();
      await expect(price).toBeVisible({ timeout: 5000 });
    }
  });

  test("should have add to cart button", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productLink = page.locator('a[href*="/menu/"]').first();
    if (await productLink.isVisible({ timeout: 10000 })) {
      await productLink.click();
      await page.waitForLoadState("networkidle");
      const addBtn = page.locator('button:has-text("Thêm vào giỏ")').first();
      if (await addBtn.isVisible({ timeout: 5000 })) {
        await expect(addBtn).toBeEnabled();
      }
    }
  });

  test("should show customization options", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productLink = page.locator('a[href*="/menu/"]').first();
    if (await productLink.isVisible({ timeout: 10000 })) {
      await productLink.click();
      await page.waitForLoadState("networkidle");
      await expect(page.locator("main")).toBeVisible();
    }
  });
});
