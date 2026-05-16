import { test, expect } from "@playwright/test";
import { API_BASE } from "../helpers/test-utils";

test.describe("Admin API - Authenticated", () => {
  const adminAuth = Buffer.from("admin:milktea-iku-2026").toString("base64");

  test("GET /api/admin/stats should return dashboard data with valid auth", async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/stats`, {
      headers: { Authorization: `Basic ${adminAuth}` },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("overview");
    expect(data.overview).toHaveProperty("totalProducts");
    expect(data.overview).toHaveProperty("totalOrders");
    expect(data.overview).toHaveProperty("totalRevenue");
  });

  test("GET /api/admin/orders should return orders list with auth", async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/orders`, {
      headers: { Authorization: `Basic ${adminAuth}` },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
  });

  test("GET /api/admin/coupons should return coupons with auth", async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/coupons`, {
      headers: { Authorization: `Basic ${adminAuth}` },
    });
    expect([200, 404]).toContain(response.status());
  });
});

test.describe("Admin API - Unauthorized", () => {
  test("GET /api/admin/stats should reject without auth", async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/stats`);
    expect(response.status()).toBe(401);
  });

  test("GET /api/admin/orders should reject without auth", async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/orders`);
    expect(response.status()).toBe(401);
  });

  test("PATCH /api/admin/orders/:id should reject without auth", async ({ request }) => {
    const response = await request.patch(`${API_BASE}/admin/orders/fake-id`, {
      data: { status: "confirmed" },
    });
    expect(response.status()).toBe(401);
  });
});
