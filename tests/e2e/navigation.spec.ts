import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between pages via header links", async ({ page }) => {
    await page.goto("/");

    await page.locator('header a:has-text("Menu")').first().click();
    await expect(page).toHaveURL(/\/menu/);

    await page.locator('header a:has-text("Về chúng tôi")').first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("should navigate via footer links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");

    const aboutLink = footer.locator('a:has-text("Về chúng tôi")').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/\/about/);
    }
  });

  test("should show mobile navigation on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const mobileNav = page.locator('[class*="fixed"][class*="bottom"]');
    await expect(mobileNav.first()).toBeVisible();
  });

  test("should have working back navigation", async ({ page }) => {
    await page.goto("/");
    await page.locator('header a:has-text("Menu")').first().click();
    await expect(page).toHaveURL(/\/menu/);

    await page.goBack();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Dark Mode", () => {
  test("should toggle dark mode", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="Theme"], button:has(svg.lucide-moon), button:has(svg.lucide-sun)').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      const html = page.locator("html");
      const className = await html.getAttribute("class");
      expect(className).toContain("dark");
    }
  });
});

test.describe("Responsive Design", () => {
  const viewports = [
    { name: "mobile", width: 375, height: 812 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    test(`should render correctly at ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");
      await expect(page.locator("main")).toBeVisible();

      const body = page.locator("body");
      const box = await body.boundingBox();
      expect(box?.width).toBeLessThanOrEqual(viewport.width + 1);
    });
  }
});
