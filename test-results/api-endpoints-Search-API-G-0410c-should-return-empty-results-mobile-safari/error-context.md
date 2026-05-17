# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\endpoints.spec.ts >> Search API >> GET /api/search?q=xyz123 should return empty results
- Location: tests\api\endpoints.spec.ts:18:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Search API", () => {
  4  |   test("GET /api/search should return empty without query", async ({ request }) => {
  5  |     const response = await request.get("/api/search");
  6  |     expect(response.status()).toBe(200);
  7  |     const data = await response.json();
  8  |     expect(data.data).toHaveLength(0);
  9  |   });
  10 | 
  11 |   test("GET /api/search?q=tra should return results", async ({ request }) => {
  12 |     const response = await request.get("/api/search?q=tra");
  13 |     expect(response.status()).toBe(200);
  14 |     const data = await response.json();
  15 |     expect(data).toHaveProperty("data");
  16 |   });
  17 | 
  18 |   test("GET /api/search?q=xyz123 should return empty results", async ({ request }) => {
  19 |     const response = await request.get("/api/search?q=xyz123nonexistent");
> 20 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  21 |     const data = await response.json();
  22 |     expect(data.data).toHaveLength(0);
  23 |   });
  24 | });
  25 | 
  26 | test.describe("Recommendations API", () => {
  27 |   test("GET /api/products/recommendations should return products", async ({ request }) => {
  28 |     const response = await request.get("/api/products/recommendations");
  29 |     expect(response.status()).toBe(200);
  30 |     const data = await response.json();
  31 |     expect(data).toHaveProperty("data");
  32 |     expect(Array.isArray(data.data)).toBe(true);
  33 |   });
  34 | 
  35 |   test("GET /api/products/recommendations?category=tra-sua should filter", async ({ request }) => {
  36 |     const response = await request.get("/api/products/recommendations?category=tra-sua");
  37 |     expect(response.status()).toBe(200);
  38 |     const data = await response.json();
  39 |     expect(data).toHaveProperty("data");
  40 |   });
  41 | });
  42 | 
  43 | test.describe("Wishlist API", () => {
  44 |   test("GET /api/wishlist should return array", async ({ request }) => {
  45 |     const response = await request.get("/api/wishlist");
  46 |     expect(response.status()).toBe(200);
  47 |     const data = await response.json();
  48 |     expect(data).toHaveProperty("data");
  49 |   });
  50 | 
  51 |   test("POST /api/wishlist should add item", async ({ request }) => {
  52 |     const response = await request.post("/api/wishlist", {
  53 |       data: { productId: "test-product-1" },
  54 |     });
  55 |     expect([200, 201]).toContain(response.status());
  56 |   });
  57 | });
  58 | 
  59 | test.describe("Newsletter Subscribers API", () => {
  60 |   const adminAuth = Buffer.from("admin:milktea-iku-2026").toString("base64");
  61 | 
  62 |   test("GET /api/newsletter/subscribers should return data with auth", async ({ request }) => {
  63 |     const response = await request.get("/api/newsletter/subscribers", {
  64 |       headers: { Authorization: `Basic ${adminAuth}` },
  65 |     });
  66 |     expect(response.status()).toBe(200);
  67 |     const data = await response.json();
  68 |     expect(data).toHaveProperty("data");
  69 |   });
  70 | 
  71 |   test("GET /api/newsletter/subscribers should reject without auth", async ({ request }) => {
  72 |     const response = await request.get("/api/newsletter/subscribers");
  73 |     expect(response.status()).toBe(401);
  74 |   });
  75 | });
  76 | 
```