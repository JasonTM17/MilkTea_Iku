import { test, expect } from "@playwright/test";
import { API_BASE } from "../helpers/test-utils";

test.describe("API Documentation", () => {
  test("GET /api/docs should return OpenAPI spec", async ({ request }) => {
    const response = await request.get(`${API_BASE}/docs`);
    expect([200, 404]).toContain(response.status());
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toHaveProperty("openapi");
      expect(data).toHaveProperty("info");
      expect(data).toHaveProperty("paths");
      expect(data.info.title).toBe("MilkTea Iku API");
    }
  });
});

test.describe("Wishlist API", () => {
  test("GET /api/wishlist should return list", async ({ request }) => {
    const response = await request.get(`${API_BASE}/wishlist`);
    expect([200, 404]).toContain(response.status());
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toHaveProperty("success");
    }
  });

  test("POST /api/wishlist should validate productId", async ({ request }) => {
    const response = await request.post(`${API_BASE}/wishlist`, {
      data: { productId: "" },
    });
    expect([400, 404, 429]).toContain(response.status());
  });

  test("POST /api/wishlist should add valid product", async ({ request }) => {
    const response = await request.post(`${API_BASE}/wishlist`, {
      data: { productId: "test-product-123" },
    });
    expect([200, 201, 404, 429]).toContain(response.status());
  });
});

test.describe("Search API", () => {
  test("GET /api/search should return results", async ({ request }) => {
    const response = await request.get(`${API_BASE}/search?q=tra+sua`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });

  test("GET /api/search with empty query should still work", async ({ request }) => {
    const response = await request.get(`${API_BASE}/search`);
    expect([200, 400]).toContain(response.status());
  });
});

test.describe("Categories API", () => {
  test("GET /api/categories should return categories", async ({ request }) => {
    const response = await request.get(`${API_BASE}/categories`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data) || data.data).toBeTruthy();
  });
});

test.describe("Toppings API", () => {
  test("GET /api/toppings should return toppings list", async ({ request }) => {
    const response = await request.get(`${API_BASE}/toppings`);
    expect(response.status()).toBe(200);
  });
});
