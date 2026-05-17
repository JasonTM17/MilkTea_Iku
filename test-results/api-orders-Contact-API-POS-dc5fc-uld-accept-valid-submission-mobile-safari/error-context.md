# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\orders.spec.ts >> Contact API >> POST /api/contact should accept valid submission
- Location: tests\api\orders.spec.ts:73:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 500
Received array: [200, 201, 429]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { API_BASE } from "../helpers/test-utils";
  3   | 
  4   | test.describe("Orders API", () => {
  5   |   test("POST /api/orders should validate required fields", async ({ request }) => {
  6   |     const response = await request.post(`${API_BASE}/orders`, {
  7   |       data: {},
  8   |     });
  9   |     expect([400, 429]).toContain(response.status());
  10  |   });
  11  | 
  12  |   test("POST /api/orders should validate phone format", async ({ request }) => {
  13  |     const response = await request.post(`${API_BASE}/orders`, {
  14  |       data: {
  15  |         customerName: "Test User",
  16  |         phone: "invalid",
  17  |         address: "123 Test St",
  18  |         items: [{ productId: "test", quantity: 1, size: "M", sugarLevel: 100, iceLevel: 100, toppings: [], subtotal: 45000 }],
  19  |       },
  20  |     });
  21  |     expect([400, 429]).toContain(response.status());
  22  |   });
  23  | 
  24  |   test("POST /api/orders should create order with valid data", async ({ request }) => {
  25  |     const productsRes = await request.get(`${API_BASE}/products?limit=1`);
  26  |     const productsData = await productsRes.json();
  27  |     const product = productsData.data?.[0];
  28  |     if (!product) return;
  29  | 
  30  |     const response = await request.post(`${API_BASE}/orders`, {
  31  |       data: {
  32  |         customerName: "Nguyễn Test",
  33  |         phone: "0901234567",
  34  |         address: "123 Nguyễn Huệ, Q.1",
  35  |         items: [
  36  |           {
  37  |             productId: product.id,
  38  |             quantity: 1,
  39  |             size: "M",
  40  |             sugarLevel: 100,
  41  |             iceLevel: 100,
  42  |             toppings: [],
  43  |             subtotal: product.basePrice || 45000,
  44  |           },
  45  |         ],
  46  |         note: "",
  47  |       },
  48  |     });
  49  |     expect([200, 201, 429]).toContain(response.status());
  50  |   });
  51  | 
  52  |   test("GET /api/orders should return orders list", async ({ request }) => {
  53  |     const response = await request.get(`${API_BASE}/orders?phone=0901234567`);
  54  |     expect(response.status()).toBe(200);
  55  |     const data = await response.json();
  56  |     expect(data).toHaveProperty("data");
  57  |   });
  58  | 
  59  |   test("GET /api/orders/tracking should handle missing orders", async ({ request }) => {
  60  |     const response = await request.get(`${API_BASE}/orders/tracking?phone=0000000000`);
  61  |     expect([200, 400, 404]).toContain(response.status());
  62  |   });
  63  | });
  64  | 
  65  | test.describe("Contact API", () => {
  66  |   test("POST /api/contact should validate required fields", async ({ request }) => {
  67  |     const response = await request.post(`${API_BASE}/contact`, {
  68  |       data: { name: "", email: "bad", message: "x" },
  69  |     });
  70  |     expect([400, 429]).toContain(response.status());
  71  |   });
  72  | 
  73  |   test("POST /api/contact should accept valid submission", async ({ request }) => {
  74  |     const response = await request.post(`${API_BASE}/contact`, {
  75  |       data: {
  76  |         name: "Test User",
  77  |         email: "test@example.com",
  78  |         subject: "Test Subject",
  79  |         message: "This is a test message that is long enough to pass validation requirements",
  80  |       },
  81  |     });
> 82  |     expect([200, 201, 429]).toContain(response.status());
      |                             ^ Error: expect(received).toContain(expected) // indexOf
  83  |   });
  84  | });
  85  | 
  86  | test.describe("Newsletter API", () => {
  87  |   test("POST /api/newsletter should validate email", async ({ request }) => {
  88  |     const response = await request.post(`${API_BASE}/newsletter`, {
  89  |       data: { email: "invalid-email" },
  90  |     });
  91  |     expect(response.status()).toBe(400);
  92  |   });
  93  | 
  94  |   test("POST /api/newsletter should accept valid email", async ({ request }) => {
  95  |     const response = await request.post(`${API_BASE}/newsletter`, {
  96  |       data: { email: `test${Date.now()}@example.com` },
  97  |     });
  98  |     expect([200, 201, 429]).toContain(response.status());
  99  |   });
  100 | });
  101 | 
  102 | test.describe("Coupons API", () => {
  103 |   test("GET /api/coupons/validate should validate coupon code", async ({ request }) => {
  104 |     const response = await request.get(`${API_BASE}/coupons/validate?code=INVALID`);
  105 |     expect([200, 404]).toContain(response.status());
  106 |     const data = await response.json();
  107 |     expect(data.valid).toBe(false);
  108 |   });
  109 | });
  110 | 
```