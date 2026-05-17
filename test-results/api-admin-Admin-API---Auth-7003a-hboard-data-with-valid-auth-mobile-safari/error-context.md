# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\admin.spec.ts >> Admin API - Authenticated >> GET /api/admin/stats should return dashboard data with valid auth
- Location: tests\api\admin.spec.ts:7:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { API_BASE } from "../helpers/test-utils";
  3  | 
  4  | test.describe("Admin API - Authenticated", () => {
  5  |   const adminAuth = Buffer.from("admin:milktea-iku-2026").toString("base64");
  6  | 
  7  |   test("GET /api/admin/stats should return dashboard data with valid auth", async ({ request }) => {
  8  |     const response = await request.get(`${API_BASE}/admin/stats`, {
  9  |       headers: { Authorization: `Basic ${adminAuth}` },
  10 |     });
> 11 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  12 |     const data = await response.json();
  13 |     expect(data).toHaveProperty("overview");
  14 |     expect(data.overview).toHaveProperty("totalProducts");
  15 |     expect(data.overview).toHaveProperty("totalOrders");
  16 |     expect(data.overview).toHaveProperty("totalRevenue");
  17 |   });
  18 | 
  19 |   test("GET /api/admin/orders should return orders list with auth", async ({ request }) => {
  20 |     const response = await request.get(`${API_BASE}/admin/orders`, {
  21 |       headers: { Authorization: `Basic ${adminAuth}` },
  22 |     });
  23 |     expect(response.status()).toBe(200);
  24 |     const data = await response.json();
  25 |     expect(data).toBeTruthy();
  26 |   });
  27 | 
  28 |   test("GET /api/admin/coupons should return coupons with auth", async ({ request }) => {
  29 |     const response = await request.get(`${API_BASE}/admin/coupons`, {
  30 |       headers: { Authorization: `Basic ${adminAuth}` },
  31 |     });
  32 |     expect([200, 404]).toContain(response.status());
  33 |   });
  34 | });
  35 | 
  36 | test.describe("Admin API - Unauthorized", () => {
  37 |   test("GET /api/admin/stats should reject without auth", async ({ request }) => {
  38 |     const response = await request.get(`${API_BASE}/admin/stats`);
  39 |     expect(response.status()).toBe(401);
  40 |   });
  41 | 
  42 |   test("GET /api/admin/orders should reject without auth", async ({ request }) => {
  43 |     const response = await request.get(`${API_BASE}/admin/orders`);
  44 |     expect(response.status()).toBe(401);
  45 |   });
  46 | 
  47 |   test("PATCH /api/admin/orders/:id should reject without auth", async ({ request }) => {
  48 |     const response = await request.patch(`${API_BASE}/admin/orders/fake-id`, {
  49 |       data: { status: "confirmed" },
  50 |     });
  51 |     expect(response.status()).toBe(401);
  52 |   });
  53 | });
  54 | 
```