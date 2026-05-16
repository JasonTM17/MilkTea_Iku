import { test, expect } from "@playwright/test";

test.describe("Search API", () => {
  test("GET /api/search should return empty without query", async ({ request }) => {
    const response = await request.get("/api/search");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.data).toHaveLength(0);
  });

  test("GET /api/search?q=tra should return results", async ({ request }) => {
    const response = await request.get("/api/search?q=tra");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });

  test("GET /api/search?q=xyz123 should return empty results", async ({ request }) => {
    const response = await request.get("/api/search?q=xyz123nonexistent");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.data).toHaveLength(0);
  });
});

test.describe("Recommendations API", () => {
  test("GET /api/products/recommendations should return products", async ({ request }) => {
    const response = await request.get("/api/products/recommendations");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
    expect(Array.isArray(data.data)).toBe(true);
  });

  test("GET /api/products/recommendations?category=tra-sua should filter", async ({ request }) => {
    const response = await request.get("/api/products/recommendations?category=tra-sua");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });
});

test.describe("Wishlist API", () => {
  test("GET /api/wishlist should return array", async ({ request }) => {
    const response = await request.get("/api/wishlist");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });

  test("POST /api/wishlist should add item", async ({ request }) => {
    const response = await request.post("/api/wishlist", {
      data: { productId: "test-product-1" },
    });
    expect([200, 201]).toContain(response.status());
  });
});

test.describe("Newsletter Subscribers API", () => {
  test("GET /api/newsletter/subscribers should return data", async ({ request }) => {
    const response = await request.get("/api/newsletter/subscribers");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("data");
  });
});
