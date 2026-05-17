# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\chatbot.spec.ts >> Chatbot API >> POST /api/chatbot should reject invalid body
- Location: tests\api\chatbot.spec.ts:24:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 500
Received array: [400, 404, 429]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { API_BASE } from "../helpers/test-utils";
  3  | 
  4  | test.describe("Chatbot API", () => {
  5  |   test("POST /api/chatbot should validate message field", async ({ request }) => {
  6  |     const response = await request.post(`${API_BASE}/chatbot`, {
  7  |       data: { message: "" },
  8  |     });
  9  |     expect([400, 404, 429]).toContain(response.status());
  10 |   });
  11 | 
  12 |   test("POST /api/chatbot should return fallback when n8n not configured", async ({ request }) => {
  13 |     const response = await request.post(`${API_BASE}/chatbot`, {
  14 |       data: { message: "Xin chào" },
  15 |     });
  16 |     expect([200, 404, 429]).toContain(response.status());
  17 |     if (response.status() === 200) {
  18 |       const data = await response.json();
  19 |       expect(data).toHaveProperty("reply");
  20 |       expect(data).toHaveProperty("source");
  21 |     }
  22 |   });
  23 | 
  24 |   test("POST /api/chatbot should reject invalid body", async ({ request }) => {
  25 |     const response = await request.post(`${API_BASE}/chatbot`, {
  26 |       data: {},
  27 |     });
> 28 |     expect([400, 404, 429]).toContain(response.status());
     |                             ^ Error: expect(received).toContain(expected) // indexOf
  29 |   });
  30 | });
  31 | 
```