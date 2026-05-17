import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "tests/**"],
  },
  resolve: {
    alias: [
      // More-specific aliases must come before the broad "@" catch-all so
      // that Vite resolves "@/lib/foo" to backend/lib before falling back
      // to src/lib/foo via the "@" → src mapping.
      { find: "@/lib", replacement: path.resolve(__dirname, "./backend/lib") },
      { find: "@/components", replacement: path.resolve(__dirname, "./frontend/components") },
      { find: "@/hooks", replacement: path.resolve(__dirname, "./frontend/hooks") },
      { find: "@/store", replacement: path.resolve(__dirname, "./frontend/store") },
      { find: "@/shared", replacement: path.resolve(__dirname, "./shared") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
});
