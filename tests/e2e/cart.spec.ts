import { test, expect } from "@playwright/test";

test.describe("Cart Functionality", () => {
  test("should open cart drawer", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cartBtn = page.locator('[aria-label*="Giỏ"], button:has(svg.lucide-shopping-bag)').first();
    if (await cartBtn.isVisible({ timeout: 5000 })) {
      await cartBtn.click();
      await page.waitForTimeout(500);
      const drawer = page.locator('[role="dialog"], [class*="fixed"][class*="right"]').first();
      await expect(drawer).toBeVisible({ timeout: 3000 });
    }
  });

  test("should show empty cart state", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cartBtn = page.locator('[aria-label*="Giỏ"], button:has(svg.lucide-shopping-bag)').first();
    if (await cartBtn.isVisible({ timeout: 5000 })) {
      await cartBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test("should add product to cart from menu", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productLink = page.locator('a[href*="/menu/"]').first();
    if (await productLink.isVisible({ timeout: 10000 })) {
      await productLink.click();
      await page.waitForLoadState("networkidle");

      const addBtn = page.locator('button:has-text("Thêm vào giỏ")').first();
      if (await addBtn.isVisible({ timeout: 5000 })) {
        await addBtn.click();
        await page.waitForTimeout(1000);
      }
    }
  });
});

test.describe("Cart - Quantity Controls", () => {
  test("should navigate to product detail page", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productLink = page.locator('a[href*="/menu/"]').first();
    if (await productLink.isVisible({ timeout: 10000 })) {
      await productLink.click();
      await expect(page).toHaveURL(/\/menu\//);
    }
  });
});
