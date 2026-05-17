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
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/lib": path.resolve(__dirname, "./backend/lib"),
      "@/components": path.resolve(__dirname, "./frontend/components"),
      "@/hooks": path.resolve(__dirname, "./frontend/hooks"),
      "@/store": path.resolve(__dirname, "./frontend/store"),
      "@/shared": path.resolve(__dirname, "./shared"),
    },
  },
});
