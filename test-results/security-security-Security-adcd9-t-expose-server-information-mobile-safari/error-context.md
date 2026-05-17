# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: security\security.spec.ts >> Security Tests >> should not expose server information
- Location: tests\security\security.spec.ts:69:7

# Error details

```
Error: expect(received).toBeFalsy()

Received: "Next.js"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { API_BASE } from "../helpers/test-utils";
  3  | 
  4  | test.describe("Security Tests", () => {
  5  |   test("should have security headers on responses", async ({ request }) => {
  6  |     const response = await request.get(`${API_BASE}/health`);
  7  |     const headers = response.headers();
  8  |     expect(headers["x-frame-options"]).toBe("DENY");
  9  |     expect(headers["x-content-type-options"]).toBe("nosniff");
  10 |     expect(headers["x-xss-protection"]).toBe("1; mode=block");
  11 |     expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  12 |   });
  13 | 
  14 |   test("admin endpoints should require authentication", async ({ request }) => {
  15 |     const response = await request.get(`${API_BASE}/admin/stats`);
  16 |     expect(response.status()).toBe(401);
  17 |   });
  18 | 
  19 |   test("admin endpoints should reject invalid credentials", async ({ request }) => {
  20 |     const response = await request.get(`${API_BASE}/admin/stats`, {
  21 |       headers: {
  22 |         Authorization: "Basic " + Buffer.from("wrong:wrong").toString("base64"),
  23 |       },
  24 |     });
  25 |     expect(response.status()).toBe(401);
  26 |   });
  27 | 
  28 |   test("API should handle malformed JSON gracefully", async ({ request }) => {
  29 |     const response = await request.post(`${API_BASE}/orders`, {
  30 |       headers: { "Content-Type": "application/json" },
  31 |       data: "not-json{{{",
  32 |     });
  33 |     expect([400, 429]).toContain(response.status());
  34 |   });
  35 | 
  36 |   test("API should reject XSS in input fields", async ({ request }) => {
  37 |     const response = await request.post(`${API_BASE}/contact`, {
  38 |       data: {
  39 |         name: '<script>alert("xss")</script>',
  40 |         email: "test@example.com",
  41 |         subject: "Test",
  42 |         message: "This is a legitimate message for testing purposes only",
  43 |       },
  44 |     });
  45 |     if (response.status() === 201 || response.status() === 200) {
  46 |       const data = await response.json();
  47 |       if (data.name) {
  48 |         expect(data.name).not.toContain("<script>");
  49 |       }
  50 |     }
  51 |   });
  52 | 
  53 |   test("rate limiting should block excessive requests", async ({ request }) => {
  54 |     const responses = [];
  55 |     for (let i = 0; i < 8; i++) {
  56 |       const res = await request.post(`${API_BASE}/contact`, {
  57 |         data: {
  58 |           name: "Rate Test",
  59 |           email: `rate${i}@test.com`,
  60 |           subject: "Test",
  61 |           message: "Testing rate limiting with enough characters to pass validation",
  62 |         },
  63 |       });
  64 |       responses.push(res.status());
  65 |     }
  66 |     expect(responses).toContain(429);
  67 |   });
  68 | 
  69 |   test("should not expose server information", async ({ request }) => {
  70 |     const response = await request.get(`${API_BASE}/health`);
  71 |     const headers = response.headers();
> 72 |     expect(headers["x-powered-by"]).toBeFalsy();
     |                                     ^ Error: expect(received).toBeFalsy()
  73 |   });
  74 | 
  75 |   test("should handle unexpected URL patterns safely", async ({ request }) => {
  76 |     const response = await request.get(`${API_BASE}/products/nonexistent-slug-12345`);
  77 |     expect([200, 404]).toContain(response.status());
  78 |   });
  79 | 
  80 |   test("orders API should validate phone format", async ({ request }) => {
  81 |     const response = await request.post(`${API_BASE}/orders`, {
  82 |       data: {
  83 |         customerName: "Test",
  84 |         phone: "abc",
  85 |         address: "123 Street",
  86 |         items: [{ productId: "x", quantity: 1, size: "M", sugarLevel: 100, iceLevel: 100, toppings: [], subtotal: 45000 }],
  87 |       },
  88 |     });
  89 |     expect([400, 429]).toContain(response.status());
  90 |   });
  91 | });
  92 | 
```