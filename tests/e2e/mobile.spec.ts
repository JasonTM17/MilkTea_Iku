import { test, expect } from "@playwright/test";

test.describe("Mobile Experience", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should show mobile bottom navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const mobileNav = page.locator('[class*="fixed"][class*="bottom"]').first();
    await expect(mobileNav).toBeVisible();
  });

  test("should hide desktop header nav on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const desktopNav = page.locator('header nav.hidden, header nav[class*="hidden"]').first();
    if (await desktopNav.count() > 0) {
      await expect(desktopNav).not.toBeVisible();
    }
  });

  test("should have touch-friendly button sizes", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const buttons = page.locator("button:visible");
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const box = await buttons.nth(i).boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(32);
      }
    }
  });

  test("should not have horizontal overflow", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const body = page.locator("body");
    const box = await body.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(376);
  });

  test("menu page should be scrollable on mobile", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(scrollHeight).toBeGreaterThan(812);
  });
});
