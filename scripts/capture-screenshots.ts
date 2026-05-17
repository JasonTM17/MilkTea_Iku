import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.join(__dirname, "..", "docs", "screenshots");

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  // Desktop screenshots
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  // Homepage - light mode
  const homePage = await desktopCtx.newPage();
  await homePage.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 60000 });
  await homePage.waitForTimeout(4000);
  const heroText = await homePage.locator("body").textContent();
  if (!heroText || heroText.length < 50) {
    throw new Error("Homepage did not load properly - content too short");
  }
  await homePage.screenshot({ path: path.join(OUTPUT_DIR, "homepage.png"), fullPage: false });
  console.log("✓ homepage.png captured");
  await homePage.close();

  // Menu page
  const menuPage = await desktopCtx.newPage();
  await menuPage.goto(`${BASE_URL}/menu`, { waitUntil: "load", timeout: 60000 });
  await menuPage.waitForTimeout(5000);
  await menuPage.screenshot({ path: path.join(OUTPUT_DIR, "menu.png"), fullPage: false });
  console.log("✓ menu.png captured");
  await menuPage.close();

  // Dark mode - use a fresh page, navigate, then toggle dark mode via script + reload
  const darkPage = await desktopCtx.newPage();
  await darkPage.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 60000 });
  await darkPage.waitForTimeout(2000);
  // Set dark mode via localStorage and add class
  await darkPage.evaluate(() => {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  });
  // Reload to let next-themes pick up the localStorage value
  await darkPage.reload({ waitUntil: "load", timeout: 60000 });
  await darkPage.waitForTimeout(3000);
  // Force dark class in case next-themes didn't apply it
  await darkPage.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  });
  await darkPage.waitForTimeout(1000);
  const finalClass = await darkPage.evaluate(() => document.documentElement.className);
  console.log(`  html class: "${finalClass}"`);
  await darkPage.screenshot({ path: path.join(OUTPUT_DIR, "dark-mode.png"), fullPage: false });
  console.log("✓ dark-mode.png captured");
  await darkPage.close();

  // Mobile screenshot
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 60000 });
  await mobilePage.waitForTimeout(4000);
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, "mobile.png"), fullPage: false });
  console.log("✓ mobile.png captured");
  await mobilePage.close();

  // Stores page
  const storesPage = await desktopCtx.newPage();
  await storesPage.goto(`${BASE_URL}/stores`, { waitUntil: "load", timeout: 60000 });
  await storesPage.waitForTimeout(4000);
  await storesPage.screenshot({ path: path.join(OUTPUT_DIR, "stores.png"), fullPage: false });
  console.log("✓ stores.png captured");
  await storesPage.close();

  await desktopCtx.close();
  await mobileCtx.close();
  await browser.close();

  console.log("\n✅ All screenshots captured successfully!");
}

main().catch((err) => {
  console.error("❌ Screenshot capture failed:", err.message);
  process.exit(1);
});
