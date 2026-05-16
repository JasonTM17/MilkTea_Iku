import { test, expect } from "@playwright/test";
import { API_BASE } from "../helpers/test-utils";

test.describe("Orders API", () => {
  test("POST /api/orders should validate required fields", async ({ request }) => {
    const response = await request.post(`${API_BASE}/orders`, {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/orders should validate phone format", async ({ request }) => {
    const response = await request.post(`${API_BASE}/orders`, {
      data: {
        customerName: "Test User",
        phone: "invalid",
        address: "123 Test St",
        items: [{ productId: 1, quantity: 1, size: "M", sugarLevel: "100%", iceLevel: "100%" }],
      },
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/orders should create order with valid data", async ({ request }) => {
    const response = await request.post(`${API_BASE}/orders`, {
      data: {
        customerName: "Nguyễn Test",
        phone: "0901234567",
        address: "123 Nguyễn Huệ, Q.1",
        items: [
          {
            productId: 1,
            quantity: 1,
            size: "M",
            sugarLevel: "100%",
            iceLevel: "100%",
            toppings: [],
          },
        ],
        paymentMethod: "cod",
        note: "",
      },
    });
    expect([200, 201]).toContain(response.status());
  });

  test("GET /api/orders should return orders list", async ({ request }) => {
    const response = await request.get(`${API_BASE}/orders?phone=0901234567`);
    expect(response.status()).toBe(200);
  });

  test("GET /api/orders/tracking should track by phone", async ({ request }) => {
    const response = await request.get(`${API_BASE}/orders/tracking?phone=0901234567`);
    expect(response.status()).toBe(200);
  });
});

test.describe("Contact API", () => {
  test("POST /api/contact should validate required fields", async ({ request }) => {
    const response = await request.post(`${API_BASE}/contact`, {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/contact should accept valid submission", async ({ request }) => {
    const response = await request.post(`${API_BASE}/contact`, {
      data: {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "This is a test message",
      },
    });
    expect([200, 201]).toContain(response.status());
  });
});

test.describe("Newsletter API", () => {
  test("POST /api/newsletter should validate email", async ({ request }) => {
    const response = await request.post(`${API_BASE}/newsletter`, {
      data: { email: "invalid-email" },
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/newsletter should accept valid email", async ({ request }) => {
    const response = await request.post(`${API_BASE}/newsletter`, {
      data: { email: `test${Date.now()}@example.com` },
    });
    expect([200, 201]).toContain(response.status());
  });
});

test.describe("Coupons API", () => {
  test("GET /api/coupons/validate should validate coupon code", async ({ request }) => {
    const response = await request.get(`${API_BASE}/coupons/validate?code=INVALID`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.valid === false || data.error).toBeTruthy();
  });
});
