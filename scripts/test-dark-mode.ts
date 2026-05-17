import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.join(__dirname, "..", "test-results", "dark-mode-audit");

const PAGES = [
  { route: "/", name: "home" },
  { route: "/menu", name: "menu" },
  { route: "/about", name: "about" },
  { route: "/stores", name: "stores" },
  { route: "/delivery", name: "delivery" },
  { route: "/contact", name: "contact" },
  { route: "/blog", name: "blog" },
  { route: "/careers", name: "careers" },
  { route: "/faq", name: "faq" },
  { route: "/privacy", name: "privacy" },
  { route: "/terms", name: "terms" },
];

interface BgColor {
  r: number;
  g: number;
  b: number;
  raw: string;
}

interface Result {
  route: string;
  name: string;
  status: "PASS" | "FAIL";
  bgColor?: string;
  error?: string;
}

function parseBgColor(cssColor: string): BgColor | null {
  // Handle rgb(r, g, b) or rgba(r, g, b, a)
  const match = cssColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      raw: cssColor,
    };
  }
  // Handle hex #rrggbb
  const hexMatch = cssColor.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      raw: cssColor,
    };
  }
  return null;
}

function isLightBackground(color: BgColor): boolean {
  // White: all channels 255
  // Cream-like: all channels > 240
  // Transparent / unset: rgba(0,0,0,0) — treat as light (no dark bg applied)
  if (color.r === 0 && color.g === 0 && color.b === 0 && color.raw.includes("rgba(0, 0, 0, 0)")) {
    return true; // transparent = no dark bg
  }
  return color.r > 240 && color.g > 240 && color.b > 240;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results: Result[] = [];

  for (const { route, name } of PAGES) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
    });
    const page = await context.newPage();

    try {
      // Intercept HTML responses to inject dark mode before hydration
      await page.route("**/*", async (route) => {
        const request = route.request();
        const resourceType = request.resourceType();

        if (resourceType === "document") {
          const response = await route.fetch();
          const contentType = response.headers()["content-type"] || "";
          if (contentType.includes("text/html")) {
            let body = await response.text();

            // Replace <html ...> to add dark class and color-scheme
            body = body.replace(
              /<html([^>]*?)>/i,
              (match, attrs) => {
                // Remove any existing class attribute, then add dark
                const cleanAttrs = attrs.replace(/\s*class="[^"]*"/, "");
                return `<html${cleanAttrs} class="dark" style="color-scheme: dark">`;
              }
            );

            // Inject localStorage script right after <head>
            body = body.replace(
              /<head>/i,
              '<head><script>try{localStorage.setItem("theme","dark")}catch(e){}</script>'
            );

            await route.fulfill({
              body,
              headers: { ...response.headers(), "content-type": "text/html; charset=utf-8" },
            });
          } else {
            await route.continue();
          }
        } else {
          await route.continue();
        }
      });

      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Wait 3 seconds for full render / hydration
      await page.waitForTimeout(3000);

      // Check background color of body and main
      const bgColor = await page.evaluate((): string => {
        const candidates = [
          document.querySelector("main"),
          document.querySelector("[class*='bg-']"),
          document.body,
        ];
        for (const el of candidates) {
          if (!el) continue;
          const bg = window.getComputedStyle(el).backgroundColor;
          // Skip transparent
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            return bg;
          }
        }
        // Fallback: body background
        return window.getComputedStyle(document.body).backgroundColor;
      });

      const screenshotPath = path.join(OUTPUT_DIR, `${name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const parsed = parseBgColor(bgColor);
      let status: "PASS" | "FAIL" = "FAIL";
      let statusReason = "";

      if (!parsed) {
        statusReason = `could not parse color: ${bgColor}`;
      } else if (isLightBackground(parsed)) {
        statusReason = `light background detected: ${bgColor}`;
      } else {
        status = "PASS";
      }

      const result: Result = {
        route,
        name,
        status,
        bgColor,
        error: status === "FAIL" ? statusReason : undefined,
      };
      results.push(result);

      const pad = route.padEnd(14);
      const colorStr = bgColor.padEnd(30);
      if (status === "PASS") {
        console.log(`PASS  ${pad}  bg: ${colorStr}`);
      } else {
        console.log(`FAIL  ${pad}  bg: ${colorStr}  — ${statusReason}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ route, name, status: "FAIL", error: msg });
      console.log(`FAIL  ${route.padEnd(14)}  — Error: ${msg.slice(0, 100)}`);
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();

  // ── Summary ──────────────────────────────────────────────────────────────
  const passed = results.filter((r) => r.status === "PASS");
  const failed = results.filter((r) => r.status === "FAIL");

  console.log("\n════════════════════════════════════════");
  console.log("  DARK MODE AUDIT RESULTS");
  console.log("════════════════════════════════════════");
  console.log(`  Total  : ${results.length}`);
  console.log(`  PASS   : ${passed.length}`);
  console.log(`  FAIL   : ${failed.length}`);
  console.log("════════════════════════════════════════");

  if (passed.length > 0) {
    console.log("\nPASSED:");
    for (const r of passed) {
      console.log(`  ✓ ${r.route.padEnd(14)}  bg: ${r.bgColor}`);
    }
  }

  if (failed.length > 0) {
    console.log("\nFAILED (light background in dark mode):");
    for (const r of failed) {
      console.log(`  ✗ ${r.route.padEnd(14)}  ${r.error}`);
    }
    console.log("\nFix: add dark:bg-gray-900 (or equivalent) to the page's root element.");
  }

  console.log(`\nScreenshots saved to: ${OUTPUT_DIR}`);

  if (failed.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Script failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
