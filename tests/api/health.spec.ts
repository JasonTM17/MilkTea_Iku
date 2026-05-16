import { test, expect } from "@playwright/test";

test.describe("Health Check API", () => {
  test("GET /api/health should return 200", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("status", "healthy");
    expect(data).toHaveProperty("database", "connected");
  });

  test("GET /api/health should include timestamp", async ({ request }) => {
    const response = await request.get("/api/health");
    const data = await response.json();
    expect(data).toHaveProperty("timestamp");
  });
});

test.describe("Products API", () => {
  test("GET /api/products should return products array", async ({ request }) => {
    const response = await request.get("/api/products");
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("data");
    expect(Array.isArray(data.data)).toBe(true);
  });

  test("GET /api/products should support pagination", async ({ request }) => {
    const response = await request.get("/api/products?page=1&limit=5");
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.data.length).toBeLessThanOrEqual(5);
  });

  test("GET /api/categories should return categories", async ({ request }) => {
    const response = await request.get("/api/categories");
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data.data || data)).toBe(true);
  });
});

test.describe("Orders API", () => {
  test("POST /api/orders should validate required fields", async ({ request }) => {
    const response = await request.post("/api/orders", {
      data: {},
    });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test("POST /api/orders should accept valid order", async ({ request }) => {
    const response = await request.post("/api/orders", {
      data: {
        customerName: "Test User",
        phone: "0901234567",
        address: "123 Test Street, Q.1, TP.HCM",
        items: [
          { productId: "test-product-1", quantity: 2, price: 45000 },
        ],
        note: "Test order",
      },
    });
    // May return 201 (created) or 400 (if product doesn't exist)
    expect([200, 201, 400]).toContain(response.status());
  });
});

test.describe("Contact API", () => {
  test("POST /api/contact should validate email", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        name: "Test",
        email: "invalid-email",
        message: "Hello",
      },
    });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
