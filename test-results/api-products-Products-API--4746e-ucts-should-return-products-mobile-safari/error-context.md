# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\products.spec.ts >> Products API >> GET /api/products should return products
- Location: tests\api\products.spec.ts:5:7

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
  4  | test.describe("Products API", () => {
  5  |   test("GET /api/products should return products", async ({ request }) => {
  6  |     const response = await request.get(`${API_BASE}/products`);
> 7  |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  8  |     const data = await response.json();
  9  |     expect(Array.isArray(data.data)).toBe(true);
  10 |     expect(data.data.length).toBeGreaterThan(0);
  11 |   });
  12 | 
  13 |   test("GET /api/products should support pagination", async ({ request }) => {
  14 |     const response = await request.get(`${API_BASE}/products?limit=2&page=1`);
  15 |     expect(response.status()).toBe(200);
  16 |     const data = await response.json();
  17 |     expect(data.data.length).toBeLessThanOrEqual(2);
  18 |     expect(data.pagination).toBeDefined();
  19 |   });
  20 | 
  21 |   test("GET /api/products should filter by category", async ({ request }) => {
  22 |     const response = await request.get(`${API_BASE}/products?category=tra-sua-truyen-thong`);
  23 |     expect(response.status()).toBe(200);
  24 |   });
  25 | 
  26 |   test("GET /api/categories should return categories", async ({ request }) => {
  27 |     const response = await request.get(`${API_BASE}/categories`);
  28 |     expect(response.status()).toBe(200);
  29 |     const data = await response.json();
  30 |     expect(Array.isArray(data)).toBe(true);
  31 |     expect(data.length).toBeGreaterThan(0);
  32 |   });
  33 | 
  34 |   test("GET /api/toppings should return toppings", async ({ request }) => {
  35 |     const response = await request.get(`${API_BASE}/toppings`);
  36 |     expect(response.status()).toBe(200);
  37 |     const data = await response.json();
  38 |     expect(Array.isArray(data)).toBe(true);
  39 |   });
  40 | 
  41 |   test("GET /api/search should search products", async ({ request }) => {
  42 |     const response = await request.get(`${API_BASE}/search?q=matcha`);
  43 |     expect(response.status()).toBe(200);
  44 |     const data = await response.json();
  45 |     expect(data.success).toBe(true);
  46 |     expect(Array.isArray(data.data)).toBe(true);
  47 |   });
  48 | 
  49 |   test("GET /api/search should return empty for no match", async ({ request }) => {
  50 |     const response = await request.get(`${API_BASE}/search?q=xyznonexistent`);
  51 |     expect(response.status()).toBe(200);
  52 |     const data = await response.json();
  53 |     expect(data.data.length).toBe(0);
  54 |   });
  55 | });
  56 | 
```