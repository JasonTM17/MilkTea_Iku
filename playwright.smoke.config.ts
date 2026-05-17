import { defineConfig, devices } from "@playwright/test";

/**
 * Minimal smoke test config for CI.
 * Runs only Chromium against the production build (`npm run start`).
 * Full cross-browser suite lives in playwright.config.ts.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /ui-smoke\.spec\.ts$/,
  fullyParallel: false,
  forbidOnly: true,
  retries: 1,
  workers: 1,
  reporter: [["html", { open: "never" }], ["github"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
