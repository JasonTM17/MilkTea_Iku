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
  await homePage.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await homePage.waitForSelector("main", { state: "visible", timeout: 15000 });
  await homePage.waitForTimeout(3000);
  const heroText = await homePage.locator("main").textContent();
  if (!heroText || heroText.length < 50) {
    throw new Error("Homepage did not load properly - content too short");
  }
  await homePage.screenshot({ path: path.join(OUTPUT_DIR, "homepage.png"), fullPage: false });
  console.log("✓ homepage.png captured");
  await homePage.close();

  // Menu page
  const menuPage = await desktopCtx.newPage();
  await menuPage.goto(`${BASE_URL}/menu`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await menuPage.waitForSelector("main", { state: "visible", timeout: 15000 });
  await menuPage.waitForTimeout(3000);
  await menuPage.screenshot({ path: path.join(OUTPUT_DIR, "menu.png"), fullPage: false });
  console.log("✓ menu.png captured");
  await menuPage.close();

  // Dark mode - homepage (intercept HTML to inject dark class before hydration)
  const darkCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  const darkPage = await darkCtx.newPage();
  // Intercept the HTML response and inject dark class + localStorage script
  await darkPage.route("**/", async (route) => {
    const response = await route.fetch();
    const contentType = response.headers()["content-type"] || "";
    if (contentType.includes("text/html")) {
      let body = await response.text();
      // Replace the html tag to include dark class
      body = body.replace(
        /(<html[^>]*)(class="[^"]*")?/,
        '$1 class="dark" style="color-scheme: dark"'
      );
      // Inject script at very start of head to set localStorage before next-themes reads it
      body = body.replace(
        /<head>/i,
        '<head><script>try{localStorage.setItem("theme","dark")}catch(e){}</script>'
      );
      await route.fulfill({ body, headers: { ...response.headers() } });
    } else {
      await route.continue();
    }
  });
  // Also route sub-resources normally
  await darkPage.route("**/*.js", (route) => route.continue());
  await darkPage.route("**/*.css", (route) => route.continue());
  await darkPage.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await darkPage.waitForSelector("main", { state: "visible", timeout: 15000 });
  await darkPage.waitForTimeout(4000);
  // Verify and log
  const finalClass = await darkPage.evaluate(() => document.documentElement.className);
  console.log(`  html class: "${finalClass}"`);
  await darkPage.screenshot({ path: path.join(OUTPUT_DIR, "dark-mode.png"), fullPage: false });
  console.log("✓ dark-mode.png captured");
  await darkPage.close();
  await darkCtx.close();

  // Mobile screenshot
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await mobilePage.waitForSelector("main", { state: "visible", timeout: 15000 });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, "mobile.png"), fullPage: false });
  console.log("✓ mobile.png captured");
  await mobilePage.close();

  // Stores page
  const storesPage = await desktopCtx.newPage();
  await storesPage.goto(`${BASE_URL}/stores`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await storesPage.waitForSelector("main", { state: "visible", timeout: 15000 });
  await storesPage.waitForTimeout(3000);
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
