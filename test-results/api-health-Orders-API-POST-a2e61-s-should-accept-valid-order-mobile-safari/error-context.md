# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\health.spec.ts >> Orders API >> POST /api/orders should accept valid order
- Location: tests\api\health.spec.ts:55:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 404
Received array: [200, 201, 400, 429]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Health Check API", () => {
  4  |   test("GET /api/health should return 200", async ({ request }) => {
  5  |     const response = await request.get("/api/health");
  6  |     expect(response.status()).toBe(200);
  7  | 
  8  |     const data = await response.json();
  9  |     expect(data).toHaveProperty("status", "healthy");
  10 |     expect(data).toHaveProperty("database", "connected");
  11 |   });
  12 | 
  13 |   test("GET /api/health should include timestamp", async ({ request }) => {
  14 |     const response = await request.get("/api/health");
  15 |     const data = await response.json();
  16 |     expect(data).toHaveProperty("timestamp");
  17 |   });
  18 | });
  19 | 
  20 | test.describe("Products API", () => {
  21 |   test("GET /api/products should return products array", async ({ request }) => {
  22 |     const response = await request.get("/api/products");
  23 |     expect(response.status()).toBe(200);
  24 | 
  25 |     const data = await response.json();
  26 |     expect(data).toHaveProperty("data");
  27 |     expect(Array.isArray(data.data)).toBe(true);
  28 |   });
  29 | 
  30 |   test("GET /api/products should support pagination", async ({ request }) => {
  31 |     const response = await request.get("/api/products?page=1&limit=5");
  32 |     expect(response.status()).toBe(200);
  33 | 
  34 |     const data = await response.json();
  35 |     expect(data.data.length).toBeLessThanOrEqual(5);
  36 |   });
  37 | 
  38 |   test("GET /api/categories should return categories", async ({ request }) => {
  39 |     const response = await request.get("/api/categories");
  40 |     expect(response.status()).toBe(200);
  41 | 
  42 |     const data = await response.json();
  43 |     expect(Array.isArray(data.data || data)).toBe(true);
  44 |   });
  45 | });
  46 | 
  47 | test.describe("Orders API", () => {
  48 |   test("POST /api/orders should validate required fields", async ({ request }) => {
  49 |     const response = await request.post("/api/orders", {
  50 |       data: {},
  51 |     });
  52 |     expect(response.status()).toBeGreaterThanOrEqual(400);
  53 |   });
  54 | 
  55 |   test("POST /api/orders should accept valid order", async ({ request }) => {
  56 |     const response = await request.post("/api/orders", {
  57 |       data: {
  58 |         customerName: "Test User",
  59 |         phone: "0901234567",
  60 |         address: "123 Test Street, Q.1, TP.HCM",
  61 |         items: [
  62 |           { productId: "test-product-1", quantity: 2, price: 45000 },
  63 |         ],
  64 |         note: "Test order",
  65 |       },
  66 |     });
  67 |     // May return 201 (created), 400 (if product doesn't exist), or 429 (rate limited)
> 68 |     expect([200, 201, 400, 429]).toContain(response.status());
     |                                  ^ Error: expect(received).toContain(expected) // indexOf
  69 |   });
  70 | });
  71 | 
  72 | test.describe("Contact API", () => {
  73 |   test("POST /api/contact should validate email", async ({ request }) => {
  74 |     const response = await request.post("/api/contact", {
  75 |       data: {
  76 |         name: "Test",
  77 |         email: "invalid-email",
  78 |         message: "Hello",
  79 |       },
  80 |     });
  81 |     expect(response.status()).toBeGreaterThanOrEqual(400);
  82 |   });
  83 | });
  84 | 
```