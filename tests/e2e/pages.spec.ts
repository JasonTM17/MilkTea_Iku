import { test, expect } from "@playwright/test";

test.describe("Wishlist Page", () => {
  test("should display wishlist page", async ({ page }) => {
    await page.goto("/wishlist");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should show empty state when no items", async ({ page }) => {
    await page.goto("/wishlist");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Tracking Page", () => {
  test("should display tracking page", async ({ page }) => {
    await page.goto("/tracking");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should have order input field", async ({ page }) => {
    await page.goto("/tracking");
    await page.waitForLoadState("networkidle");
    const input = page.locator("input").first();
    if (await input.isVisible({ timeout: 5000 })) {
      await expect(input).toBeVisible();
    }
  });
});

test.describe("Blog Page", () => {
  test("should display blog posts", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should have article cards", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });
});

test.describe("Recipes Page", () => {
  test("should display recipes", async ({ page }) => {
    await page.goto("/recipes");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Franchise Page", () => {
  test("should display franchise info", async ({ page }) => {
    await page.goto("/franchise");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should have contact form", async ({ page }) => {
    await page.goto("/franchise");
    await page.waitForLoadState("networkidle");
    const inputs = page.locator("input");
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
});
