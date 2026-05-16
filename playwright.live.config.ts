import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "https://milktea-iku.vercel.app" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
