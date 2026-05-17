import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { mkdirSync, statSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = join(__dirname, "..", "docs", "screenshots");

mkdirSync(OUTPUT_DIR, { recursive: true });

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 375, height: 812 };

async function captureScreen({ browser, url, filename, theme = "light", isMobile = false }) {
  // Each shot gets its own context so localStorage doesn't bleed across captures
  const context = await browser.newContext({
    viewport: isMobile ? MOBILE_VIEWPORT : DESKTOP_VIEWPORT,
    deviceScaleFactor: 1,
    isMobile,
    hasTouch: isMobile,
  });

  // Pre-seed localStorage so cookie banner is dismissed and theme is correct on first paint
  await context.addInitScript((selectedTheme) => {
    try {
      localStorage.setItem("iku-cookie-consent", "accepted");
      localStorage.setItem("theme", selectedTheme);
    } catch {}
  }, theme);

  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  // Wait for Tailwind to apply by polling for a known brand class
  try {
    await page.waitForFunction(
      () =>
        document.querySelector(
          "[class*='bg-cream'], [class*='bg-brand'], [class*='from-brand']",
        ) !== null,
      { timeout: 20000 },
    );
  } catch {
    // Continue anyway — page should still render with default styles
  }

  // Force the theme class in case next-themes hydration is delayed
  await page.evaluate((selectedTheme) => {
    const root = document.documentElement;
    if (selectedTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, theme);

  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(2500);

  const outPath = join(OUTPUT_DIR, filename);
  await page.screenshot({ path: outPath, fullPage: false });
  const size = statSync(outPath).size;
  console.log(`  captured ${filename} (${(size / 1024).toFixed(0)} KB)`);

  await page.close();
  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  const shots = [
    { url: `${BASE_URL}/`, filename: "homepage.png", theme: "light" },
    { url: `${BASE_URL}/`, filename: "dark-mode.png", theme: "dark" },
    { url: `${BASE_URL}/menu`, filename: "menu.png", theme: "light" },
    { url: `${BASE_URL}/menu`, filename: "menu-dark.png", theme: "dark" },
    { url: `${BASE_URL}/stores`, filename: "stores.png", theme: "light" },
    { url: `${BASE_URL}/checkout`, filename: "checkout.png", theme: "light" },
    { url: `${BASE_URL}/`, filename: "mobile.png", theme: "light", isMobile: true },
    { url: `${BASE_URL}/`, filename: "mobile-dark.png", theme: "dark", isMobile: true },
  ];

  for (const shot of shots) {
    await captureScreen({ browser, ...shot });
  }

  await browser.close();
  console.log("\nAll screenshots saved to:", OUTPUT_DIR);
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err.message);
  process.exit(1);
});
