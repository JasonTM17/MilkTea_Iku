import { test, expect } from "@playwright/test";

test.describe("Visual Regression - Homepage", () => {
  test("homepage hero section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
    await expect(page).toHaveScreenshot("homepage-hero.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.25,
    });
  });

  test("homepage full page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("homepage-full.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.25,
    });
  });
});

test.describe("Visual Regression - Menu", () => {
  test("menu page layout", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot("menu-page.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.25,
    });
  });
});

test.describe("Visual Regression - Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("mobile-homepage.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.25,
    });
  });

  test("mobile menu", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot("mobile-menu.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.25,
    });
  });
});

test.describe("Visual Regression - Dark Mode", () => {
  test("dark mode homepage", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("dark-homepage.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.25,
    });
  });
});
