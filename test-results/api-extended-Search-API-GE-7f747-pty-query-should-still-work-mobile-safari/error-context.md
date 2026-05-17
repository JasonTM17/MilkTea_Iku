# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\extended.spec.ts >> Search API >> GET /api/search with empty query should still work
- Location: tests\api\extended.spec.ts:51:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 404
Received array: [200, 400]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { API_BASE } from "../helpers/test-utils";
  3  | 
  4  | test.describe("API Documentation", () => {
  5  |   test("GET /api/docs should return OpenAPI spec", async ({ request }) => {
  6  |     const response = await request.get(`${API_BASE}/docs`);
  7  |     expect([200, 404]).toContain(response.status());
  8  |     if (response.status() === 200) {
  9  |       const data = await response.json();
  10 |       expect(data).toHaveProperty("openapi");
  11 |       expect(data).toHaveProperty("info");
  12 |       expect(data).toHaveProperty("paths");
  13 |       expect(data.info.title).toBe("MilkTea Iku API");
  14 |     }
  15 |   });
  16 | });
  17 | 
  18 | test.describe("Wishlist API", () => {
  19 |   test("GET /api/wishlist should return list", async ({ request }) => {
  20 |     const response = await request.get(`${API_BASE}/wishlist`);
  21 |     expect([200, 404]).toContain(response.status());
  22 |     if (response.status() === 200) {
  23 |       const data = await response.json();
  24 |       expect(data).toHaveProperty("success");
  25 |     }
  26 |   });
  27 | 
  28 |   test("POST /api/wishlist should validate productId", async ({ request }) => {
  29 |     const response = await request.post(`${API_BASE}/wishlist`, {
  30 |       data: { productId: "" },
  31 |     });
  32 |     expect([400, 404, 429]).toContain(response.status());
  33 |   });
  34 | 
  35 |   test("POST /api/wishlist should add valid product", async ({ request }) => {
  36 |     const response = await request.post(`${API_BASE}/wishlist`, {
  37 |       data: { productId: "test-product-123" },
  38 |     });
  39 |     expect([200, 201, 404, 429]).toContain(response.status());
  40 |   });
  41 | });
  42 | 
  43 | test.describe("Search API", () => {
  44 |   test("GET /api/search should return results", async ({ request }) => {
  45 |     const response = await request.get(`${API_BASE}/search?q=tra+sua`);
  46 |     expect(response.status()).toBe(200);
  47 |     const data = await response.json();
  48 |     expect(data).toHaveProperty("data");
  49 |   });
  50 | 
  51 |   test("GET /api/search with empty query should still work", async ({ request }) => {
  52 |     const response = await request.get(`${API_BASE}/search`);
> 53 |     expect([200, 400]).toContain(response.status());
     |                        ^ Error: expect(received).toContain(expected) // indexOf
  54 |   });
  55 | });
  56 | 
  57 | test.describe("Categories API", () => {
  58 |   test("GET /api/categories should return categories", async ({ request }) => {
  59 |     const response = await request.get(`${API_BASE}/categories`);
  60 |     expect(response.status()).toBe(200);
  61 |     const data = await response.json();
  62 |     expect(Array.isArray(data) || data.data).toBeTruthy();
  63 |   });
  64 | });
  65 | 
  66 | test.describe("Toppings API", () => {
  67 |   test("GET /api/toppings should return toppings list", async ({ request }) => {
  68 |     const response = await request.get(`${API_BASE}/toppings`);
  69 |     expect(response.status()).toBe(200);
  70 |   });
  71 | });
  72 | 
```