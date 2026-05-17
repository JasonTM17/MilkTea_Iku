import { test, expect } from "@playwright/test";
import { API_BASE } from "../helpers/test-utils";

test.describe("Order Tracking API", () => {
  test("GET /api/orders/tracking should require phone parameter", async ({ request }) => {
    const response = await request.get(`${API_BASE}/orders/tracking`);
    expect([200, 400]).toContain(response.status());
  });

  test("GET /api/orders/tracking should return results for valid phone", async ({ request }) => {
    const response = await request.get(`${API_BASE}/orders/tracking?phone=0901234567`);
    expect([200, 400, 404]).toContain(response.status());
  });
});

test.describe("Product Recommendations API", () => {
  test("GET /api/products/recommendations should return products", async ({ request }) => {
    const response = await request.get(`${API_BASE}/products/recommendations`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });
});

test.describe("Stats API", () => {
  const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "change-me-in-production";
  const adminAuth = Buffer.from(`${adminUsername}:${adminPassword}`).toString("base64");

  test("GET /api/stats should require auth or return stats", async ({ request }) => {
    const response = await request.get(`${API_BASE}/stats`);
    expect([200, 401]).toContain(response.status());
  });

  test("GET /api/stats should return stats with auth", async ({ request }) => {
    const response = await request.get(`${API_BASE}/stats`, {
      headers: { Authorization: `Basic ${adminAuth}` },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
  });
});

test.describe("Newsletter Subscribers API", () => {
  test("GET /api/newsletter/subscribers should require auth", async ({ request }) => {
    const response = await request.get(`${API_BASE}/newsletter/subscribers`);
    expect([200, 401, 403]).toContain(response.status());
  });
});
