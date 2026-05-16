const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const baseUrl = "https://milktea-d2yatws14-nguyen-sons-projects-4f98af92.vercel.app";

  // Homepage
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "docs/screenshots/homepage.png", fullPage: false });

  // Menu
  await page.goto(baseUrl + "/menu", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "docs/screenshots/menu.png", fullPage: false });

  // Dark mode - toggle theme
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "docs/screenshots/dark-mode.png", fullPage: false });

  // Mobile view
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "docs/screenshots/mobile.png", fullPage: false });

  await browser.close();
  console.log("Screenshots captured successfully!");
})();
