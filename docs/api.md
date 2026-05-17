# MilkTea Iku — API Reference

> **30-second reviewer brief**: REST API for the MilkTea Iku e-commerce platform built with Next.js App Router. 24 route handlers across products, orders, coupons, reviews, newsletter, contact, chatbot, and admin management. Admin endpoints use HTTP Basic Auth. Public endpoints are unauthenticated. Rate limiting is applied on all write and sensitive read endpoints.

---

## Base URLs

| Environment | URL |
|---|---|
| Development | `http://localhost:3000/api` |
| Production | `https://milktea-iku.vercel.app/api` |

---

## Authentication

Admin endpoints require **HTTP Basic Auth** using credentials from environment variables:

```
ADMIN_USERNAME=<value>
ADMIN_PASSWORD=<value>
```

Send the `Authorization` header with every admin request:

```
Authorization: Basic <base64(username:password)>
```

Unauthorized requests receive `401 Unauthorized` with a `WWW-Authenticate: Basic realm="Admin"` response header.

---

## Rate Limiting

Rate limiting is applied per IP address using a sliding-window token bucket. Limits vary by endpoint sensitivity:

| Limit | Endpoints |
|---|---|
| 3 req / window | `POST /api/contact` |
| 5 req / window | `POST /api/orders`, `POST /api/reviews`, `POST /api/newsletter` |
| 10 req / window | `GET /api/orders/tracking`, `POST /api/chatbot` |
| 15 req / window | `GET /api/coupons/validate` |

Exceeded limits return `429 Too Many Requests`.

---

## Common Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad request / validation error |
| 401 | Unauthorized (missing or invalid Basic Auth) |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Conflict (duplicate resource) |
| 410 | Gone (endpoint disabled) |
| 422 | Unprocessable entity (business logic failure) |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 503 | Service unavailable (database down) |

---

## 1. Public — Catalog

### GET /api/health

System health check. Returns database connectivity status.

**Auth**: None

**Response 200**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "uptime": 3600.5,
  "database": "connected",
  "productCount": 42
}
```

**Response 503**
```json
{ "status": "unhealthy", "database": "disconnected" }
```

```bash
curl https://milktea-iku.vercel.app/api/health
```

---

### GET /api/products

List available products with pagination, filtering, and sorting.

**Auth**: None

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | integer | 1 | Page number |
| `limit` | integer | 12 | Items per page (max 100) |
| `category` | string | — | Filter by category slug |
| `search` | string | — | Full-text search on name and description |
| `bestSeller` | string | — | Pass `true` to filter best sellers only |
| `sort` | string | `newest` | Sort order: `newest`, `price_asc`, `price_desc`, `popular` |

**Response 200**
```json
{
  "data": [
    {
      "id": "clx1abc",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "basePrice": 35000,
      "image": "https://...",
      "isNew": false,
      "isBestSeller": true,
      "category": { "id": "cat1", "name": "Trà Sữa", "slug": "tra-sua" }
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 12,
    "totalPages": 4,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

```bash
curl "https://milktea-iku.vercel.app/api/products?category=tra-sua&sort=popular&page=1&limit=12"
```

---

### GET /api/products/[slug]

Get a single product by its URL slug.

**Auth**: None

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `slug` | string | Product slug |

**Response 200** — Full product object including category and order count.

**Response 400** — Missing slug.

**Response 404**
```json
{ "error": "Không tìm thấy sản phẩm" }
```

```bash
curl https://milktea-iku.vercel.app/api/products/tra-sua-truyen-thong
```

---

### GET /api/products/recommendations

Returns up to 4 random available products. Optionally filtered by category.

**Auth**: None

**Query Parameters**

| Parameter | Type | Description |
|---|---|---|
| `category` | string | Filter by category slug |

**Response 200**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1abc",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "basePrice": 35000,
      "image": "https://...",
      "isNew": false,
      "isBestSeller": true,
      "category": { "name": "Trà Sữa", "slug": "tra-sua" }
    }
  ]
}
```

```bash
curl "https://milktea-iku.vercel.app/api/products/recommendations?category=tra-sua"
```

---

### GET /api/categories

List all product categories ordered by display order, with product count.

**Auth**: None

**Response 200**
```json
[
  {
    "id": "cat1",
    "name": "Trà Sữa",
    "slug": "tra-sua",
    "order": 1,
    "_count": { "products": 12 }
  }
]
```

```bash
curl https://milktea-iku.vercel.app/api/categories
```

---

### GET /api/toppings

List all available toppings.

**Auth**: None

**Response 200**
```json
[
  { "id": "top1", "name": "Trân Châu Đen", "price": 5000 },
  { "id": "top2", "name": "Thạch Dừa", "price": 5000 }
]
```

```bash
curl https://milktea-iku.vercel.app/api/toppings
```

---

### GET /api/search

Quick product search. Returns up to 10 matching available products.

**Auth**: None

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `q` | string | Yes | Search query (min 1 character) |

**Response 200**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1abc",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "price": 35000,
      "image": "https://...",
      "category": "Trà Sữa"
    }
  ]
}
```

Returns empty array if `q` is missing or empty.

```bash
curl "https://milktea-iku.vercel.app/api/search?q=tra+sua"
```

---

## 2. Public — Reviews

### GET /api/reviews

Get reviews for a product by product ID, with aggregate stats.

**Auth**: None

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `productId` | string | Yes | Product ID |

**Response 200**
```json
{
  "reviews": [
    {
      "id": "rev1",
      "productId": "clx1abc",
      "customerName": "Nguyễn A",
      "rating": 5,
      "comment": "Rất ngon!",
      "createdAt": "2026-05-17T10:00:00.000Z"
    }
  ],
  "stats": { "average": 4.7, "count": 23 }
}
```

**Response 400** — Missing `productId`.

```bash
curl "https://milktea-iku.vercel.app/api/reviews?productId=clx1abc"
```

---

### POST /api/reviews

Submit a review for a product.

**Auth**: None | **Rate limit**: 5 req/window per IP

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `productId` | string | Yes | Valid product ID |
| `name` | string | Yes | Min 2 characters |
| `rating` | number | Yes | 1–5 |
| `comment` | string | Yes | Min 10 characters |

**Response 201** — Created review object.

**Response 400** — Validation error with `details` array.

**Response 429** — Rate limit exceeded.

```bash
curl -X POST https://milktea-iku.vercel.app/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"productId":"clx1abc","name":"Nguyễn A","rating":5,"comment":"Rất ngon, đậm vị!"}'
```

---

### GET /api/products/[slug]/reviews

Get paginated reviews for a product by slug, with aggregate stats.

**Auth**: None

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `slug` | string | Product slug |

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page (max 50) |

**Response 200**
```json
{
  "reviews": [...],
  "stats": { "average": 4.7, "total": 23 },
  "meta": { "page": 1, "limit": 10, "total": 23, "totalPages": 3 }
}
```

**Response 404** — Product not found.

```bash
curl "https://milktea-iku.vercel.app/api/products/tra-sua-truyen-thong/reviews?page=1&limit=10"
```

---

### POST /api/products/[slug]/reviews

Submit a review for a product by slug.

**Auth**: None | **Rate limit**: 5 req/window per IP

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `slug` | string | Product slug |

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `name` | string | Yes | 2–100 characters |
| `rating` | number | Yes | 1–5 |
| `comment` | string | Yes | 5–1000 characters |

**Response 201** — Created review object.

**Response 400** — Validation error.

**Response 404** — Product not found.

**Response 429** — Rate limit exceeded.

```bash
curl -X POST https://milktea-iku.vercel.app/api/products/tra-sua-truyen-thong/reviews \
  -H "Content-Type: application/json" \
  -d '{"name":"Nguyễn A","rating":5,"comment":"Rất ngon!"}'
```

---

## 3. Public — Coupons

### GET /api/coupons/validate

Validate a coupon code and return its discount details.

**Auth**: None | **Rate limit**: 15 req/window per IP

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `code` | string | Yes | Coupon code (case-insensitive) |

**Response 200**
```json
{
  "valid": true,
  "coupon": {
    "code": "SUMMER20",
    "discountType": "percentage",
    "discountValue": 20,
    "minOrderAmount": 50000,
    "description": "Giảm 20% mùa hè"
  }
}
```

**Response 400** — Coupon inactive, expired, or usage limit reached.
```json
{ "valid": false, "error": "Mã giảm giá đã hết hạn" }
```

**Response 404** — Coupon code not found.
```json
{ "valid": false, "error": "Mã giảm giá không tồn tại" }
```

**Response 429** — Rate limit exceeded.

```bash
curl "https://milktea-iku.vercel.app/api/coupons/validate?code=SUMMER20"
```

---

## 4. User — Orders

### POST /api/orders

Place a new order. Prices are verified server-side against the database; client-submitted subtotals are ignored.

**Auth**: None | **Rate limit**: 5 req/window per IP

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `customerName` | string | Yes | Min 2 characters |
| `phone` | string | Yes | Min 9 characters |
| `address` | string | No | Delivery address |
| `note` | string | No | Order note |
| `items` | array | Yes | Min 1 item |

**Item object**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `productId` | string | Yes | Valid product ID |
| `size` | string | Yes | Size identifier |
| `quantity` | integer | Yes | Min 1 |
| `sugarLevel` | integer | Yes | 0–100 |
| `iceLevel` | integer | Yes | 0–100 |
| `toppings` | string[] | Yes | Array of topping names |
| `subtotal` | integer | Yes | Client hint; overwritten by server |

**Response 201** — Full order object with items and product details.

**Response 400** — Validation error.

**Response 422** — One or more products unavailable.

**Response 429** — Rate limit exceeded.

```bash
curl -X POST https://milktea-iku.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Nguyễn Sơn",
    "phone": "0901234567",
    "address": "123 Đường ABC, TP.HCM",
    "items": [{
      "productId": "clx1abc",
      "size": "M",
      "quantity": 2,
      "sugarLevel": 100,
      "iceLevel": 50,
      "toppings": ["Trân Châu Đen"],
      "subtotal": 80000
    }]
  }'
```

---

### GET /api/orders

List orders. Requires admin auth. Optionally filter by phone number.

**Auth**: Admin (Basic Auth)

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `phone` | string | — | Filter by phone number (partial match) |
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page (max 50) |

**Response 200**
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response 401** — Unauthorized.

```bash
curl -u admin:password "https://milktea-iku.vercel.app/api/orders?page=1&limit=10"
```

---

### PATCH /api/orders/[id]/status

Update the status of a specific order.

**Auth**: Admin (Basic Auth)

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | string | Order ID |

**Request Body**

| Field | Type | Required | Valid values |
|---|---|---|---|
| `status` | string | Yes | `PENDING`, `CONFIRMED`, `PREPARING`, `DELIVERING`, `COMPLETED`, `CANCELLED` |

**Response 200** — Updated order object.

**Response 400** — Invalid status value.

**Response 401** — Unauthorized.

**Response 404** — Order not found.

```bash
curl -X PATCH https://milktea-iku.vercel.app/api/orders/clx1order/status \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"status":"CONFIRMED"}'
```

---

### GET /api/orders/tracking

Public order tracking by order ID and/or phone number. Address is redacted in the response.

**Auth**: None | **Rate limit**: 10 req/window per IP

**Query Parameters** (at least one required)

| Parameter | Type | Description |
|---|---|---|
| `orderId` | string | Order ID |
| `phone` | string | Customer phone number |

**Response 200**
```json
{
  "orders": [
    {
      "id": "clx1order",
      "customerName": "Nguyễn Sơn",
      "phone": "0901234567",
      "address": "***",
      "status": "PREPARING",
      "total": 80000,
      "createdAt": "2026-05-17T10:00:00.000Z",
      "items": [...]
    }
  ]
}
```

**Response 400** — Missing both parameters, or invalid phone format.

**Response 404** — No orders found.

**Response 429** — Rate limit exceeded.

```bash
curl "https://milktea-iku.vercel.app/api/orders/tracking?orderId=clx1order&phone=0901234567"
```

---

## 5. User — Newsletter & Contact

### POST /api/newsletter

Subscribe an email address to the newsletter. Idempotent — re-subscribing an existing email returns 200.

**Auth**: None | **Rate limit**: 5 req/window per IP

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `email` | string | Yes | Valid email address |

**Response 201**
```json
{ "message": "Đăng ký thành công! Cảm ơn bạn đã quan tâm." }
```

**Response 200** — Email already subscribed.
```json
{ "message": "Email này đã đăng ký nhận tin rồi!" }
```

**Response 400** — Invalid email.

**Response 429** — Rate limit exceeded.

```bash
curl -X POST https://milktea-iku.vercel.app/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

### POST /api/contact

Submit a contact form message.

**Auth**: None | **Rate limit**: 3 req/window per IP

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `name` | string | Yes | Min 2 characters |
| `email` | string | Yes | Valid email address |
| `phone` | string | No | Optional phone number |
| `subject` | string | No | Default: `general` |
| `message` | string | Yes | Min 20 characters |

**Response 201**
```json
{
  "message": "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24 giờ.",
  "id": "contact1"
}
```

**Response 400** — Validation error with `details` array.

**Response 429** — Rate limit exceeded.

```bash
curl -X POST https://milktea-iku.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Sơn",
    "email": "user@example.com",
    "subject": "feedback",
    "message": "Sản phẩm rất ngon, tôi muốn góp ý thêm về bao bì."
  }'
```

---

## 6. Utility — Chatbot

### POST /api/chatbot

Send a message to the chatbot. Routes to an n8n webhook if `N8N_WEBHOOK_URL` is configured; otherwise returns a fallback reply.

**Auth**: None | **Rate limit**: 10 req/window per IP

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `message` | string | Yes | Non-empty, max 1000 characters |

**Response 200 — n8n connected**
```json
{ "reply": "Xin chào! Bạn cần hỗ trợ gì?", "source": "n8n" }
```

**Response 200 — fallback (n8n not configured)**
```json
{
  "reply": "Xin chào! Tôi là trợ lý ảo của MilkTea Iku. Hiện tại hệ thống chatbot đang được cấu hình. Vui lòng liên hệ hotline 1900-xxxx để được hỗ trợ.",
  "source": "fallback"
}
```

**Response 400** — Empty or invalid message.

**Response 429** — Rate limit exceeded.

**Response 500** — System error.

```bash
curl -X POST https://milktea-iku.vercel.app/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message":"Menu hôm nay có gì mới?"}'
```

---

## 7. Admin

All admin endpoints require `Authorization: Basic <base64(username:password)>`.

---

### GET /api/admin/stats

Dashboard overview: product count, order totals, today's orders, recent orders, and top 5 popular products.

**Auth**: Admin

**Response 200**
```json
{
  "overview": {
    "totalProducts": 42,
    "totalOrders": 1500,
    "todayOrders": 23,
    "totalRevenue": 52500000
  },
  "recentOrders": [
    {
      "id": "clx1order",
      "customerName": "Nguyễn Sơn",
      "total": 80000,
      "status": "COMPLETED",
      "createdAt": "2026-05-17T10:00:00.000Z"
    }
  ],
  "popularProducts": [
    {
      "id": "clx1abc",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "basePrice": 35000,
      "orderCount": 320
    }
  ]
}
```

**Response 401** — Unauthorized.

```bash
curl -u admin:password https://milktea-iku.vercel.app/api/admin/stats
```

---

### GET /api/stats

Admin statistics (alternative endpoint). Returns total products, orders, revenue, today's orders, and top 5 popular products with full product details.

**Auth**: Admin

**Response 200**
```json
{
  "totalProducts": 42,
  "totalOrders": 1500,
  "totalRevenue": 52500000,
  "ordersToday": 23,
  "popularProducts": [...]
}
```

**Response 401** — Unauthorized.

```bash
curl -u admin:password https://milktea-iku.vercel.app/api/stats
```

---

### GET /api/admin/orders

List all orders with pagination and optional status filter.

**Auth**: Admin

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `status` | string | — | Filter by order status |
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |

**Response 200**
```json
{
  "orders": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1500,
    "totalPages": 75
  }
}
```

**Response 401** — Unauthorized.

```bash
curl -u admin:password "https://milktea-iku.vercel.app/api/admin/orders?status=PENDING&page=1"
```

---

### PATCH /api/admin/orders

Bulk-update a single order's status (by body `orderId`).

**Auth**: Admin

**Request Body**

| Field | Type | Required | Valid values |
|---|---|---|---|
| `orderId` | string | Yes | Valid order ID |
| `status` | string | Yes | `pending`, `confirmed`, `preparing`, `delivering`, `delivered`, `cancelled` |

**Response 200** — Updated order object.

**Response 400** — Missing fields or invalid status.

**Response 401** — Unauthorized.

```bash
curl -X PATCH https://milktea-iku.vercel.app/api/admin/orders \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"orderId":"clx1order","status":"confirmed"}'
```

---

### PATCH /api/admin/orders/[id]

Update a specific order's status by path parameter.

**Auth**: Admin

**Path Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | string | Order ID |

**Request Body**

| Field | Type | Required | Valid values |
|---|---|---|---|
| `status` | string | Yes | `pending`, `confirmed`, `preparing`, `delivering`, `completed` |

**Response 200** — Updated order object.

**Response 400** — Invalid status.

**Response 401** — Unauthorized.

```bash
curl -X PATCH https://milktea-iku.vercel.app/api/admin/orders/clx1order \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"status":"preparing"}'
```

---

### GET /api/admin/coupons

List all coupons ordered by creation date.

**Auth**: Admin

**Response 200** — Array of coupon objects.

```bash
curl -u admin:password https://milktea-iku.vercel.app/api/admin/coupons
```

---

### POST /api/admin/coupons

Create a new coupon code.

**Auth**: Admin

**Request Body**

| Field | Type | Required | Constraints |
|---|---|---|---|
| `code` | string | Yes | 3–30 chars, alphanumeric/dash/underscore; stored uppercase |
| `description` | string | No | Max 200 characters |
| `discountType` | string | Yes | `percentage` or `fixed` |
| `discountValue` | number | Yes | Positive, max 100000 |
| `minOrderAmount` | integer | No | Default 0 |
| `maxUses` | integer | No | 1–100000, default 100 |
| `expiresAt` | string | No | ISO 8601 datetime; defaults to 30 days from now |

**Response 201** — Created coupon object.

**Response 400** — Validation error.

**Response 401** — Unauthorized.

**Response 409** — Coupon code already exists.

```bash
curl -X POST https://milktea-iku.vercel.app/api/admin/coupons \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SUMMER20",
    "description": "Giảm 20% mùa hè",
    "discountType": "percentage",
    "discountValue": 20,
    "minOrderAmount": 50000,
    "maxUses": 500,
    "expiresAt": "2026-08-31T23:59:59.000Z"
  }'
```

---

### GET /api/newsletter/subscribers

List newsletter subscribers with pagination.

**Auth**: Admin

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page (max 100) |

**Response 200**
```json
{
  "success": true,
  "data": [
    { "id": "sub1", "email": "user@example.com", "createdAt": "2026-05-17T10:00:00.000Z" }
  ],
  "pagination": {
    "total": 250,
    "page": 1,
    "limit": 20,
    "totalPages": 13,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response 401** — Unauthorized.

```bash
curl -u admin:password "https://milktea-iku.vercel.app/api/newsletter/subscribers?page=1&limit=20"
```

---

## 8. Disabled Endpoints

### GET /api/wishlist
### POST /api/wishlist
### DELETE /api/wishlist

Wishlist server-side API is disabled. Wishlist state is managed client-side via Zustand (localStorage). All three methods return `410 Gone`.

**Response 410**
```json
{
  "success": false,
  "error": "Wishlist API is disabled until per-user authentication is implemented. Wishlist hiện được lưu cục bộ trong trình duyệt qua zustand."
}
```

---

## 9. OpenAPI Schema

A machine-readable OpenAPI 3.0 schema is available at:

```
GET /api/docs
```

```bash
curl https://milktea-iku.vercel.app/api/docs
```

---

*Author: Nguyễn Sơn*
