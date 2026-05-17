# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\advanced.spec.ts >> Order Tracking API >> GET /api/orders/tracking should return results for valid phone
- Location: tests\api\advanced.spec.ts:10:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 500
Received array: [200, 400, 404]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { API_BASE } from "../helpers/test-utils";
  3  | 
  4  | test.describe("Order Tracking API", () => {
  5  |   test("GET /api/orders/tracking should require phone parameter", async ({ request }) => {
  6  |     const response = await request.get(`${API_BASE}/orders/tracking`);
  7  |     expect([200, 400]).toContain(response.status());
  8  |   });
  9  | 
  10 |   test("GET /api/orders/tracking should return results for valid phone", async ({ request }) => {
  11 |     const response = await request.get(`${API_BASE}/orders/tracking?phone=0901234567`);
> 12 |     expect([200, 400, 404]).toContain(response.status());
     |                             ^ Error: expect(received).toContain(expected) // indexOf
  13 |   });
  14 | });
  15 | 
  16 | test.describe("Product Recommendations API", () => {
  17 |   test("GET /api/products/recommendations should return products", async ({ request }) => {
  18 |     const response = await request.get(`${API_BASE}/products/recommendations`);
  19 |     expect(response.status()).toBe(200);
  20 |     const data = await response.json();
  21 |     expect(data).toHaveProperty("data");
  22 |   });
  23 | });
  24 | 
  25 | test.describe("Stats API", () => {
  26 |   const adminAuth = Buffer.from("admin:milktea-iku-2026").toString("base64");
  27 | 
  28 |   test("GET /api/stats should require auth or return stats", async ({ request }) => {
  29 |     const response = await request.get(`${API_BASE}/stats`);
  30 |     expect([200, 401]).toContain(response.status());
  31 |   });
  32 | 
  33 |   test("GET /api/stats should return stats with auth", async ({ request }) => {
  34 |     const response = await request.get(`${API_BASE}/stats`, {
  35 |       headers: { Authorization: `Basic ${adminAuth}` },
  36 |     });
  37 |     expect(response.status()).toBe(200);
  38 |     const data = await response.json();
  39 |     expect(data).toBeTruthy();
  40 |   });
  41 | });
  42 | 
  43 | test.describe("Newsletter Subscribers API", () => {
  44 |   test("GET /api/newsletter/subscribers should require auth", async ({ request }) => {
  45 |     const response = await request.get(`${API_BASE}/newsletter/subscribers`);
  46 |     expect([200, 401, 403]).toContain(response.status());
  47 |   });
  48 | });
  49 | 
```