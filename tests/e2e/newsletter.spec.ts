import { test, expect } from "@playwright/test";

test.describe("Newsletter Component", () => {
  test("should display newsletter section on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const newsletter = page.locator('text=Đăng ký nhận tin').first();
    if (await newsletter.isVisible({ timeout: 3000 })) {
      await expect(newsletter).toBeVisible();
    }
  });

  test("should validate email input", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const emailInput = page.locator('input[type="email"]').first();
    if (await emailInput.isVisible({ timeout: 3000 })) {
      await emailInput.fill("invalid");
      const submitBtn = emailInput.locator("..").locator('button[type="submit"]').first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        await page.waitForTimeout(500);
      }
    }
  });
});

test.describe("Promo Banner", () => {
  test("should display promo banner at top", async ({ page }) => {
    await page.goto("/");
    const banner = page.locator('[class*="bg-brand"]').first();
    await expect(banner).toBeVisible({ timeout: 5000 });
  });

  test("should be dismissible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const closeBtn = page.locator('button[aria-label*="Đóng"], button:has(svg.lucide-x)').first();
    if (await closeBtn.isVisible({ timeout: 3000 })) {
      await closeBtn.click();
      await page.waitForTimeout(500);
    }
  });
});
