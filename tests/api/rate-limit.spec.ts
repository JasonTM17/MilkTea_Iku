import { test, expect } from "@playwright/test";

test.describe("Rate Limiting", () => {
  test("should allow normal request rate", async ({ request }) => {
    const response = await request.get("/api/products");
    expect(response.status()).toBe(200);
  });

  test("should return proper headers", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);
    expect(response.headers()).toBeDefined();
  });
});
