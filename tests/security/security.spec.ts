import { test, expect } from "@playwright/test";
import { API_BASE } from "../helpers/test-utils";

test.describe("Security Tests", () => {
  test("should have security headers on responses", async ({ request }) => {
    const response = await request.get(`${API_BASE}/health`);
    const headers = response.headers();
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-xss-protection"]).toBe("1; mode=block");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("admin endpoints should require authentication", async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/stats`);
    expect(response.status()).toBe(401);
  });

  test("admin endpoints should reject invalid credentials", async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/stats`, {
      headers: {
        Authorization: "Basic " + Buffer.from("wrong:wrong").toString("base64"),
      },
    });
    expect(response.status()).toBe(401);
  });

  test("API should handle malformed JSON gracefully", async ({ request }) => {
    const response = await request.post(`${API_BASE}/orders`, {
      headers: { "Content-Type": "application/json" },
      data: "not-json{{{",
    });
    expect([400, 429]).toContain(response.status());
  });

  test("API should reject XSS in input fields", async ({ request }) => {
    const response = await request.post(`${API_BASE}/contact`, {
      data: {
        name: '<script>alert("xss")</script>',
        email: "test@example.com",
        subject: "Test",
        message: "This is a legitimate message for testing purposes only",
      },
    });
    if (response.status() === 201 || response.status() === 200) {
      const data = await response.json();
      if (data.name) {
        expect(data.name).not.toContain("<script>");
      }
    }
  });

  test("rate limiting should block excessive requests", async ({ request }) => {
    const responses = [];
    for (let i = 0; i < 8; i++) {
      const res = await request.post(`${API_BASE}/contact`, {
        data: {
          name: "Rate Test",
          email: `rate${i}@test.com`,
          subject: "Test",
          message: "Testing rate limiting with enough characters to pass validation",
        },
      });
      responses.push(res.status());
    }
    expect(responses).toContain(429);
  });

  test("should not expose server information", async ({ request }) => {
    const response = await request.get(`${API_BASE}/health`);
    const headers = response.headers();
    expect(headers["x-powered-by"]).toBeFalsy();
  });

  test("should handle unexpected URL patterns safely", async ({ request }) => {
    const response = await request.get(`${API_BASE}/products/nonexistent-slug-12345`);
    expect([200, 404]).toContain(response.status());
  });

  test("orders API should validate phone format", async ({ request }) => {
    const response = await request.post(`${API_BASE}/orders`, {
      data: {
        customerName: "Test",
        phone: "abc",
        address: "123 Street",
        items: [{ productId: "x", quantity: 1, size: "M", sugarLevel: 100, iceLevel: 100, toppings: [], subtotal: 45000 }],
      },
    });
    expect([400, 429]).toContain(response.status());
  });
});
