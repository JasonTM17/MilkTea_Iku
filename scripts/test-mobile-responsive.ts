import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.join(__dirname, "..", "test-results", "mobile-responsive");

const PAGES = [
  { route: "/", name: "home" },
  { route: "/menu", name: "menu" },
  { route: "/about", name: "about" },
  { route: "/contact", name: "contact" },
  { route: "/stores", name: "stores" },
  { route: "/checkout", name: "checkout" },
  { route: "/tracking", name: "tracking" },
  { route: "/promotions", name: "promotions" },
  { route: "/vouchers", name: "vouchers" },
  { route: "/wishlist", name: "wishlist" },
  { route: "/orders", name: "orders" },
  { route: "/blog", name: "blog" },
  { route: "/careers", name: "careers" },
  { route: "/events", name: "events" },
  { route: "/delivery", name: "delivery" },
  { route: "/faq", name: "faq" },
  { route: "/privacy", name: "privacy" },
  { route: "/terms", name: "terms" },
  { route: "/loyalty", name: "loyalty" },
  { route: "/recipes", name: "recipes" },
  { route: "/reviews", name: "reviews" },
];

interface Result {
  route: string;
  status: "PASS" | "FAIL";
  scrollWidth?: number;
  overflow?: number;
  contentOk?: boolean;
  error?: string;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  });

  const results: Result[] = [];

  for (const { route, name } of PAGES) {
    const page = await context.newPage();
    try {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForTimeout(2000);

      // 1. Check horizontal overflow
      const scrollWidth: number = await page.evaluate(
        () => document.body.scrollWidth
      );
      const hasOverflow = scrollWidth > 376;

      // 2. Take screenshot
      const screenshotPath = path.join(OUTPUT_DIR, `${name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      // 3. Check main content exists and has text
      let contentOk = false;
      let contentError = "";
      try {
        const mainEl = page.locator("main").first();
        const text = await mainEl.textContent({ timeout: 5000 });
        contentOk = !!(text && text.trim().length > 10);
        if (!contentOk) contentError = "main element has no meaningful text";
      } catch {
        contentError = "no <main> element found";
      }

      const failed = hasOverflow || !contentOk;
      const result: Result = {
        route,
        status: failed ? "FAIL" : "PASS",
        scrollWidth,
        overflow: hasOverflow ? scrollWidth - 375 : 0,
        contentOk,
        error: !contentOk ? contentError : undefined,
      };
      results.push(result);

      if (failed) {
        const reasons: string[] = [];
        if (hasOverflow) reasons.push(`scrollWidth=${scrollWidth} (+${scrollWidth - 375}px overflow)`);
        if (!contentOk) reasons.push(contentError);
        console.log(`FAIL  ${route.padEnd(16)} — ${reasons.join(" | ")}`);
      } else {
        console.log(`PASS  ${route.padEnd(16)} — scrollWidth=${scrollWidth}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ route, status: "FAIL", error: msg });
      console.log(`FAIL  ${route.padEnd(16)} — Error: ${msg.slice(0, 80)}`);
    } finally {
      await page.close();
    }
  }

  await context.close();
  await browser.close();

  // ── Summary ─────────────────────────────────────────────────────────────
  const passed = results.filter((r) => r.status === "PASS");
  const failed = results.filter((r) => r.status === "FAIL");

  console.log("\n════════════════════════════════════════");
  console.log("  MOBILE RESPONSIVE TEST RESULTS");
  console.log("════════════════════════════════════════");
  console.log(`  Viewport : 375 × 812`);
  console.log(`  Total    : ${results.length}`);
  console.log(`  PASS     : ${passed.length}`);
  console.log(`  FAIL     : ${failed.length}`);
  console.log("════════════════════════════════════════");

  if (passed.length > 0) {
    console.log("\nPASSED:");
    for (const r of passed) {
      console.log(`  ✓ ${r.route}`);
    }
  }

  if (failed.length > 0) {
    console.log("\nFAILED:");
    for (const r of failed) {
      const details: string[] = [];
      if (r.overflow && r.overflow > 0)
        details.push(`horizontal overflow +${r.overflow}px (scrollWidth=${r.scrollWidth})`);
      if (r.error) details.push(r.error);
      console.log(`  ✗ ${r.route}: ${details.join(" | ")}`);
    }
  }

  console.log(`\nScreenshots saved to: ${OUTPUT_DIR}`);

  if (failed.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Script failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
