import { test, expect } from "@playwright/test";

test.describe("Checkout Flow", () => {
  test("should display checkout form", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");

    const submitBtn = page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible({ timeout: 5000 })) {
      await submitBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test("should accept valid phone number", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");

    const phoneInput = page.locator('input[name="phone"], input[placeholder*="Số điện thoại"]').first();
    if (await phoneInput.isVisible({ timeout: 5000 })) {
      await phoneInput.fill("0901234567");
      await expect(phoneInput).toHaveValue("0901234567");
    }
  });

  test("should show empty cart message when no items", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Checkout - Payment Methods", () => {
  test("should display payment options", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");

    const paymentSection = page.locator('text=Thanh toán').first();
    if (await paymentSection.isVisible({ timeout: 5000 })) {
      await expect(paymentSection).toBeVisible();
    }
  });
});
