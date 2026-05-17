# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\rate-limit.spec.ts >> Rate Limiting >> should allow normal request rate
- Location: tests\api\rate-limit.spec.ts:4:7

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
  3  | test.describe("Rate Limiting", () => {
  4  |   test("should allow normal request rate", async ({ request }) => {
  5  |     const response = await request.get("/api/products");
> 6  |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  7  |   });
  8  | 
  9  |   test("should return proper headers", async ({ request }) => {
  10 |     const response = await request.get("/api/health");
  11 |     expect(response.status()).toBe(200);
  12 |     expect(response.headers()).toBeDefined();
  13 |   });
  14 | });
  15 | 
```