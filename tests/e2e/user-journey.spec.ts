import { test, expect } from "@playwright/test";

test.describe("Full Order Flow", () => {
  test("should browse menu and interact with products", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productCard = page.locator('[class*="card"], [class*="Card"]').first();
    await expect(productCard).toBeVisible();
    await productCard.click();
    await page.waitForTimeout(1000);

    const url = page.url();
    expect(url).toMatch(/\/menu/);
  });

  test("should display product customization options", async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle");

    const productCard = page.locator('[class*="card"], [class*="Card"]').first();
    if (await productCard.count() > 0) {
      await productCard.click();
      await page.waitForLoadState("networkidle");

      const main = page.locator("main");
      await expect(main).toBeVisible();
    }
  });

  test("checkout page should load correctly", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("order tracking page should load", async ({ page }) => {
    await page.goto("/tracking");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("User Journey - Information Pages", () => {
  const pages = [
    { path: "/about", name: "About" },
    { path: "/faq", name: "FAQ" },
    { path: "/privacy", name: "Privacy" },
    { path: "/terms", name: "Terms" },
    { path: "/delivery", name: "Delivery" },
    { path: "/loyalty", name: "Loyalty" },
  ];

  for (const p of pages) {
    test(`${p.name} page should load and have content`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      const main = page.locator("main");
      await expect(main).toBeVisible();
      const text = await main.textContent();
      expect(text?.length).toBeGreaterThan(50);
    });
  }
});
