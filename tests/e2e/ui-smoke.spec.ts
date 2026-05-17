import { test, expect } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL || "http://localhost:3000";

/**
 * Lean CI smoke suite — verifies the production build serves real pages.
 * Heavy interaction tests (keyboard shortcuts, modals, full flows) live in
 * the non-smoke suites that run with seeded data + auth tokens.
 */

test.describe("smoke", () => {
  test("homepage loads with brand content", async ({ page }) => {
    const response = await page.goto(BASE, { waitUntil: "networkidle" });
    expect(response?.ok()).toBe(true);
    await expect(page).toHaveTitle(/MilkTea|Iku/i);
    // Hero text or any branded content visible above the fold
    await expect(page.locator("body")).toContainText(/Trà|Menu|MilkTea|Iku/i);
  });

  test("menu page loads", async ({ page }) => {
    const response = await page.goto(`${BASE}/menu`, { waitUntil: "networkidle" });
    expect(response?.ok()).toBe(true);
    await expect(page.locator("body")).toContainText(/Menu|Trà|Sữa/i);
  });

  test("stores page loads", async ({ page }) => {
    const response = await page.goto(`${BASE}/stores`, { waitUntil: "networkidle" });
    expect(response?.ok()).toBe(true);
    await expect(page.locator("body")).toContainText(/cửa hàng|Store|Iku/i);
  });

  test("checkout page loads", async ({ page }) => {
    const response = await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" });
    expect(response?.ok()).toBe(true);
  });

  test("404 page renders", async ({ page }) => {
    const response = await page.goto(`${BASE}/this-page-does-not-exist`, {
      waitUntil: "networkidle",
    });
    expect(response?.status()).toBe(404);
  });
});

test.describe("a11y basics", () => {
  test("all images on homepage have alt", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "networkidle" });
    const imgs = await page.locator("img").all();
    for (const img of imgs) {
      const alt = await img.getAttribute("alt");
      expect(alt, "every img should have alt attribute").not.toBeNull();
    }
  });
});
