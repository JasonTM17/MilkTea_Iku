import { test, expect } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL || "http://localhost:3003";
const MOBILE_VIEWPORT = { width: 390, height: 844 };

test.describe("MilkTea Iku — UI smoke", () => {
  test("home renders and core sections visible", async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/MilkTea Iku/i);
    await expect(page.getByRole("heading", { name: /Trà Sữa Tươi/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Xem Menu/i })).toBeVisible();
  });

  test("dark mode toggle persists", async ({ page }) => {
    await page.goto(BASE);
    const toggle = page.getByRole("button", { name: /Switch to (dark|light) mode/i });
    await toggle.click();
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });

  test("menu page lists products", async ({ page }) => {
    await page.goto(`${BASE}/menu`);
    await expect(page.locator("img").first()).toBeVisible();
  });

  test("cart drawer opens", async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole("button", { name: /Giỏ hàng/i }).first().click();
    await expect(page.getByRole("heading", { name: /Giỏ hàng/i })).toBeVisible();
  });

  test("search modal opens with cmd+k and closes with escape", async ({ page }) => {
    await page.goto(BASE);
    await page.keyboard.press("Control+K");
    const search = page.getByPlaceholder(/Tìm kiếm/i);
    await expect(search).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(search).toBeHidden();
  });

  test("checkout page renders form", async ({ page }) => {
    await page.goto(`${BASE}/checkout`);
    await expect(page.getByRole("heading", { name: /Thanh toán|Giỏ hàng/i })).toBeVisible();
  });
});

test.describe("MilkTea Iku — mobile", () => {
  test("mobile home overflow check", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto(BASE);
    const html = page.locator("html");
    const widths = await html.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth,
    }));
    expect(widths.doc).toBeLessThanOrEqual(widths.win + 1);
  });

  test("mobile sheet menu opens", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto(BASE);
    await page.getByRole("button", { name: /Mở menu/i }).click();
    await expect(page.getByRole("link", { name: "Menu", exact: true })).toBeVisible();
  });
});

test.describe("MilkTea Iku — accessibility", () => {
  test("all images have alt text on home", async ({ page }) => {
    await page.goto(BASE);
    const imgs = await page.locator("img").all();
    for (const img of imgs) {
      const alt = await img.getAttribute("alt");
      expect(alt, "every img should have alt").not.toBeNull();
    }
  });

  test("interactive icon buttons have aria-label", async ({ page }) => {
    await page.goto(BASE);
    const iconButtons = await page
      .locator("button:not(:has(span)):not(:has-text(/.+/))")
      .all();
    for (const btn of iconButtons.slice(0, 20)) {
      const ariaLabel = await btn.getAttribute("aria-label");
      const title = await btn.getAttribute("title");
      expect(ariaLabel || title, "icon button should have aria-label/title").toBeTruthy();
    }
  });
});
