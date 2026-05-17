import { chromium } from "playwright";
import { spawnSync } from "child_process";
import { mkdirSync, rmSync, statSync, existsSync, renameSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = "http://localhost:3000";
const FFMPEG =
  "C:/Users/Admin/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe";
const TMP_DIR = join(__dirname, "..", "tmp-videos");
const OUT_DIR = join(__dirname, "..", "docs", "screenshots");

mkdirSync(TMP_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

// ── helpers ──────────────────────────────────────────────────────────────────

async function waitReady(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
}

// Scroll distance in steps with short pauses — keep total time tight
async function slowScroll(page, distance, steps = 4) {
  const step = Math.round(distance / steps);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(250);
  }
}

/**
 * Convert a webm to an optimised GIF.
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {number} width   output width in px (height auto)
 * @param {number} capSecs hard-cap recording length fed to ffmpeg
 */
function convertToGif(inputPath, outputPath, width, capSecs) {
  console.log(`  converting → ${outputPath}`);
  // Two-pass palette approach for clean colours with minimal file size
  const vf = [
    `fps=8`,
    `scale=${width}:-1:flags=lanczos`,
    `split[s0][s1]`,
    `[s0]palettegen=max_colors=48[p]`,
    `[s1][p]paletteuse=dither=bayer:bayer_scale=5`,
  ].join(",");

  const args = ["-y", "-i", inputPath, "-t", String(capSecs), "-vf", vf, "-loop", "0", outputPath];

  const result = spawnSync(FFMPEG, args, { encoding: "utf8", timeout: 120000 });

  if (result.status !== 0) {
    console.error("ffmpeg stderr:", result.stderr?.slice(-600));
    throw new Error(`ffmpeg exited ${result.status}`);
  }

  const bytes = statSync(outputPath).size;
  const mb = (bytes / 1024 / 1024).toFixed(2);
  const flag = bytes > 3 * 1024 * 1024 ? " !! OVER 3MB" : "";
  console.log(`  ${outputPath.split(/[\\/]/).pop()}: ${(bytes / 1024).toFixed(0)} KB (${mb} MB)${flag}`);
  return bytes;
}

// ── demo 1: homepage tour (~6 s) ─────────────────────────────────────────────

async function recordHomepageTour(browser) {
  console.log("\n[1/4] homepage-tour");
  const ctx = await browser.newContext({
    viewport: { width: 960, height: 540 },
    recordVideo: { dir: TMP_DIR, size: { width: 960, height: 540 } },
  });
  await ctx.addInitScript(() => {
    try { localStorage.setItem("iku-cookie-consent", "accepted"); } catch {}
  });

  const page = await ctx.newPage();
  const video = page.video();

  await waitReady(page, `${BASE_URL}/`);
  await page.waitForTimeout(600);          // show hero

  await slowScroll(page, 500, 4);          // hero → featured products
  await page.waitForTimeout(400);

  await slowScroll(page, 500, 4);          // featured → store section
  await page.waitForTimeout(400);

  await page.close();
  await ctx.close();

  const src = await video.path();
  const dest = join(TMP_DIR, "homepage-tour.webm");
  renameSync(src, dest);
  return dest;
}

// ── demo 2: menu browse (~6 s) ───────────────────────────────────────────────

async function recordMenuBrowse(browser) {
  console.log("\n[2/4] menu-browse");
  const ctx = await browser.newContext({
    viewport: { width: 960, height: 540 },
    recordVideo: { dir: TMP_DIR, size: { width: 960, height: 540 } },
  });
  await ctx.addInitScript(() => {
    try { localStorage.setItem("iku-cookie-consent", "accepted"); } catch {}
  });

  const page = await ctx.newPage();
  const video = page.video();

  await waitReady(page, `${BASE_URL}/menu`);
  await page.waitForTimeout(400);

  // Hover first 2 product cards
  const cards = await page.$$("[class*='product'], [class*='card'], article");
  for (let i = 0; i < Math.min(2, cards.length); i++) {
    try { await cards[i].hover(); await page.waitForTimeout(400); } catch {}
  }

  // Click up to 2 filter/category buttons
  const filters = await page.$$(
    "button[class*='filter'], button[class*='pill'], button[class*='category'], [role='tab']",
  );
  for (let i = 0; i < Math.min(2, filters.length); i++) {
    try { await filters[i].click(); await page.waitForTimeout(500); } catch {}
  }

  await slowScroll(page, 400, 4);
  await page.waitForTimeout(400);

  await page.close();
  await ctx.close();

  const src = await video.path();
  const dest = join(TMP_DIR, "menu-browse.webm");
  renameSync(src, dest);
  return dest;
}

// ── demo 3: dark mode toggle (~5 s) ──────────────────────────────────────────

async function recordDarkToggle(browser) {
  console.log("\n[3/4] dark-toggle");
  const ctx = await browser.newContext({
    viewport: { width: 960, height: 540 },
    recordVideo: { dir: TMP_DIR, size: { width: 960, height: 540 } },
  });
  await ctx.addInitScript(() => {
    try { localStorage.setItem("iku-cookie-consent", "accepted"); } catch {}
  });

  const page = await ctx.newPage();
  const video = page.video();

  await waitReady(page, `${BASE_URL}/`);
  await page.waitForTimeout(500);

  // Find and click the theme toggle
  const toggleSelectors = [
    "button[aria-label*='dark' i]",
    "button[aria-label*='theme' i]",
    "button[aria-label*='mode' i]",
    "button[aria-label*='light' i]",
    "[data-testid='theme-toggle']",
    "button[title*='dark' i]",
    "button[title*='theme' i]",
  ];

  let toggled = false;
  for (const sel of toggleSelectors) {
    try {
      const btn = await page.$(sel);
      if (btn) {
        await btn.click();
        toggled = true;
        console.log(`  toggle: ${sel}`);
        break;
      }
    } catch {}
  }

  if (!toggled) {
    console.log("  toggle not found — localStorage fallback");
    await page.evaluate(() => {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    });
  }

  await page.waitForTimeout(800);
  await slowScroll(page, 350, 4);
  await page.waitForTimeout(400);

  await page.close();
  await ctx.close();

  const src = await video.path();
  const dest = join(TMP_DIR, "dark-toggle.webm");
  renameSync(src, dest);
  return dest;
}

// ── demo 4: mobile flow (~5 s) ───────────────────────────────────────────────

async function recordMobileFlow(browser) {
  console.log("\n[4/4] mobile-flow");
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: TMP_DIR, size: { width: 375, height: 667 } },
  });
  await ctx.addInitScript(() => {
    try { localStorage.setItem("iku-cookie-consent", "accepted"); } catch {}
  });

  const page = await ctx.newPage();
  const video = page.video();

  await waitReady(page, `${BASE_URL}/`);
  await page.waitForTimeout(500);

  // Try mobile menu hamburger
  const menuSelectors = [
    "button[aria-label*='menu' i]",
    "button[aria-label*='nav' i]",
    "[data-testid='mobile-menu']",
    "button[class*='hamburger']",
    "button[class*='mobile-menu']",
    "button[class*='menu-toggle']",
  ];

  for (const sel of menuSelectors) {
    try {
      const btn = await page.$(sel);
      if (btn) {
        await btn.tap();
        console.log(`  menu tap: ${sel}`);
        await page.waitForTimeout(600);
        break;
      }
    } catch {}
  }

  await slowScroll(page, 400, 4);
  await page.waitForTimeout(400);
  await slowScroll(page, 300, 3);
  await page.waitForTimeout(300);

  await page.close();
  await ctx.close();

  const src = await video.path();
  const dest = join(TMP_DIR, "mobile-flow.webm");
  renameSync(src, dest);
  return dest;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    const webmHomepage = await recordHomepageTour(browser);
    const webmMenu     = await recordMenuBrowse(browser);
    const webmDark     = await recordDarkToggle(browser);
    const webmMobile   = await recordMobileFlow(browser);

    console.log("\nConverting to GIF...");

    const gifHomepage = join(OUT_DIR, "demo-homepage.gif");
    const gifMenu     = join(OUT_DIR, "demo-menu.gif");
    const gifDark     = join(OUT_DIR, "demo-dark-toggle.gif");
    const gifMobile   = join(OUT_DIR, "demo-mobile.gif");

    // desktop: 640px wide, cap 7s; mobile: 320px wide, cap 6s
    convertToGif(webmHomepage, gifHomepage, 640, 7);
    convertToGif(webmMenu,     gifMenu,     640, 7);
    convertToGif(webmDark,     gifDark,     640, 6);
    convertToGif(webmMobile,   gifMobile,   320, 6);

    console.log("\nCleaning up tmp-videos/...");
    rmSync(TMP_DIR, { recursive: true, force: true });

    console.log("\nDone. GIFs in:", OUT_DIR);
    console.log("\nFinal sizes:");
    for (const [label, p] of [
      ["demo-homepage.gif",    gifHomepage],
      ["demo-menu.gif",        gifMenu],
      ["demo-dark-toggle.gif", gifDark],
      ["demo-mobile.gif",      gifMobile],
    ]) {
      if (existsSync(p)) {
        const bytes = statSync(p).size;
        const mb = (bytes / 1024 / 1024).toFixed(2);
        const flag = bytes > 3 * 1024 * 1024 ? " !! OVER 3MB" : " OK";
        console.log(`  ${label}: ${(bytes / 1024).toFixed(0)} KB (${mb} MB)${flag}`);
      } else {
        console.log(`  ${label}: MISSING`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("record-demos failed:", err.message);
  process.exit(1);
});
