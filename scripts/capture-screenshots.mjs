import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { mkdirSync, statSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = join(__dirname, "..", "docs", "screenshots");

mkdirSync(OUTPUT_DIR, { recursive: true });

async function waitForPage(page, url, waitUntil = "networkidle") {
  await page.goto(url, { waitUntil, timeout: 60000 });
  await page.waitForTimeout(1500);
}

async function applyDarkMode(page) {
  await page.evaluate(() => {
    localStorage.setItem("theme", "dark");
  });
  await page.reload({ waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  // Force the class in case next-themes hydration is delayed
  await page.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  });
  await page.waitForTimeout(500);
}

async function capture(page, filename, fullPage = false) {
  const outPath = join(OUTPUT_DIR, filename);
  await page.screenshot({ path: outPath, fullPage });
  const size = statSync(outPath).size;
  console.log(`  captured ${filename} (${(size / 1024).toFixed(0)} KB)`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  // ── Desktop context ──────────────────────────────────────────────────────
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  // homepage.png
  const homePage = await desktop.newPage();
  await waitForPage(homePage, `${BASE_URL}/`);
  await capture(homePage, "homepage.png", false);
  await homePage.close();

  // dark-mode.png
  const darkHome = await desktop.newPage();
  await waitForPage(darkHome, `${BASE_URL}/`);
  await applyDarkMode(darkHome);
  await capture(darkHome, "dark-mode.png", false);
  await darkHome.close();

  // menu.png
  const menuPage = await desktop.newPage();
  await waitForPage(menuPage, `${BASE_URL}/menu`);
  await capture(menuPage, "menu.png", true);
  await menuPage.close();

  // menu-dark.png
  const menuDark = await desktop.newPage();
  await waitForPage(menuDark, `${BASE_URL}/menu`);
  await applyDarkMode(menuDark);
  await capture(menuDark, "menu-dark.png", true);
  await menuDark.close();

  // stores.png
  const storesPage = await desktop.newPage();
  await waitForPage(storesPage, `${BASE_URL}/stores`);
  await capture(storesPage, "stores.png", false);
  await storesPage.close();

  // checkout.png
  const checkoutPage = await desktop.newPage();
  await waitForPage(checkoutPage, `${BASE_URL}/checkout`);
  await capture(checkoutPage, "checkout.png", false);
  await checkoutPage.close();

  await desktop.close();

  // ── Mobile context ───────────────────────────────────────────────────────
  const mobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // mobile.png
  const mobilePage = await mobile.newPage();
  await waitForPage(mobilePage, `${BASE_URL}/`);
  await capture(mobilePage, "mobile.png", false);
  await mobilePage.close();

  // mobile-dark.png
  const mobileDark = await mobile.newPage();
  await waitForPage(mobileDark, `${BASE_URL}/`);
  await applyDarkMode(mobileDark);
  await capture(mobileDark, "mobile-dark.png", false);
  await mobileDark.close();

  await mobile.close();
  await browser.close();

  console.log("\nAll screenshots saved to:", OUTPUT_DIR);
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err.message);
  process.exit(1);
});
