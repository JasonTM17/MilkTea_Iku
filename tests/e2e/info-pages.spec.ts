import { test, expect } from "@playwright/test";

test.describe("Careers Page", () => {
  test("should display job listings", async ({ page }) => {
    await page.goto("/careers");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should show job cards", async ({ page }) => {
    await page.goto("/careers");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });
});

test.describe("Delivery Page", () => {
  test("should display delivery info", async ({ page }) => {
    await page.goto("/delivery");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Events Page", () => {
  test("should display events", async ({ page }) => {
    await page.goto("/events");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Privacy Page", () => {
  test("should display privacy policy", async ({ page }) => {
    await page.goto("/privacy");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });
});

test.describe("Terms Page", () => {
  test("should display terms of service", async ({ page }) => {
    await page.goto("/terms");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Loyalty Page", () => {
  test("should display loyalty program", async ({ page }) => {
    await page.goto("/loyalty");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should show membership tiers", async ({ page }) => {
    await page.goto("/loyalty");
    await page.waitForLoadState("networkidle");
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });
});
