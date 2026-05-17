# API Reference — MilkTea Iku

> Cập nhật lần cuối: 2026-05-17
> Tác giả: Nguyễn Sơn (jasonbmt06@gmail.com)

OpenAPI 3.0 spec: `GET /api/docs`

---

## Base URL

| Môi trường | URL |
|-----------|-----|
| Production | `https://milktea-iku.vercel.app/api` |
| Development | `http://localhost:3000/api` |

---

## Authentication

Admin endpoints yêu cầu một trong hai:

```
Authorization: Basic <base64(ADMIN_USERNAME:ADMIN_PASSWORD)>
Authorization: Bearer <ADMIN_API_TOKEN>
```

Endpoints không có nhãn **[Admin]** là public — không cần auth.

---

## Rate limiting

Sliding window 60 giây, per-IP. Giới hạn theo endpoint:

| Endpoint | Giới hạn |
|----------|---------|
| `POST /api/orders` | 5 req / 60s |
| `POST /api/contact` | 3 req / 60s |
| `POST /api/newsletter` | 5 req / 60s |
| `POST /api/reviews` | 5 req / 60s |
| `POST /api/products/[slug]/reviews` | 5 req / 60s |
| `POST /api/chatbot` | 10 req / 60s |

Khi vượt giới hạn: `429 Too Many Requests`

```json
{ "error": "Quá nhiều yêu cầu, vui lòng thử lại sau" }
```

---

## Mục lục

- [System](#system)
- [Products](#products)
- [Categories](#categories)
- [Toppings](#toppings)
- [Orders](#orders)
- [Reviews](#reviews)
- [Search](#search)
- [Coupons](#coupons)
- [Wishlist](#wishlist)
- [Newsletter](#newsletter)
- [Contact](#contact)
- [Chatbot](#chatbot)
- [Stats](#stats)
- [Admin — Orders](#admin--orders)
- [Admin — Coupons](#admin--coupons)
- [Admin — Stats](#admin--stats)
- [Admin — Newsletter Subscribers](#admin--newsletter-subscribers)

---

## System

### GET /health

Kiểm tra trạng thái hệ thống và kết nối database.

**Auth:** Không cần

**Response 200:**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "uptime": 3600.5,
  "database": "connected",
  "productCount": 24
}
```

**Response 503:**
```json
{
  "status": "unhealthy",
  "database": "disconnected"
}
```

---

### GET /docs

Trả về OpenAPI 3.0 spec của toàn bộ API.

**Auth:** Không cần

**Response 200:** OpenAPI 3.0 JSON object

---

## Products

### GET /products

Danh sách sản phẩm có phân trang, lọc, sắp xếp.

**Auth:** Không cần

**Query params:**

| Param | Type | Default | Mô tả |
|-------|------|---------|-------|
| `page` | integer | `1` | Trang hiện tại |
| `limit` | integer | `12` | Số sản phẩm mỗi trang (tối đa 100) |
| `category` | string | — | Lọc theo category slug |
| `search` | string | — | Tìm kiếm theo tên hoặc mô tả |
| `bestSeller` | `"true"` | — | Chỉ lấy best sellers |
| `sort` | string | `"newest"` | `newest`, `price_asc`, `price_desc`, `popular` |

**Response 200:**
```json
{
  "data": [
    {
      "id": "clx...",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "description": "...",
      "basePrice": 35000,
      "image": "https://...",
      "isNew": false,
      "isBestSeller": true,
      "isAvailable": true,
      "categoryId": "clx...",
      "category": { "id": "clx...", "name": "Trà Sữa", "slug": "tra-sua" },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-05-17T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 24,
    "page": 1,
    "limit": 12,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### GET /products/[slug]

Chi tiết một sản phẩm theo slug.

**Auth:** Không cần

**Path params:** `slug` — product slug (string)

**Response 200:**
```json
{
  "id": "clx...",
  "name": "Trà Sữa Truyền Thống",
  "slug": "tra-sua-truyen-thong",
  "description": "...",
  "basePrice": 35000,
  "image": "https://...",
  "isNew": false,
  "isBestSeller": true,
  "isAvailable": true,
  "category": { "id": "clx...", "name": "Trà Sữa", "slug": "tra-sua" },
  "_count": { "orderItems": 142 },
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-05-17T00:00:00.000Z"
}
```

**Response 404:**
```json
{ "error": "Không tìm thấy sản phẩm" }
```

---

### GET /products/recommendations

4 sản phẩm ngẫu nhiên (Fisher-Yates shuffle từ pool 50 sản phẩm).

**Auth:** Không cần

**Query params:**

| Param | Type | Mô tả |
|-------|------|-------|
| `category` | string | Lọc theo category slug (optional) |

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "name": "Matcha Latte",
      "slug": "matcha-latte",
      "basePrice": 45000,
      "image": "https://...",
      "isNew": true,
      "isBestSeller": false,
      "category": { "name": "Matcha", "slug": "matcha" }
    }
  ]
}
```

---

### GET /products/[slug]/reviews

Danh sách đánh giá của một sản phẩm theo slug, có phân trang.

**Auth:** Không cần

**Path params:** `slug` — product slug

**Query params:**

| Param | Type | Default |
|-------|------|---------|
| `page` | integer | `1` |
| `limit` | integer | `10` (tối đa 50) |

**Response 200:**
```json
{
  "reviews": [
    {
      "id": "clx...",
      "productId": "clx...",
      "customerName": "Nguyễn Văn A",
      "rating": 5,
      "comment": "Ngon lắm!",
      "createdAt": "2026-05-17T00:00:00.000Z"
    }
  ],
  "stats": { "average": 4.7, "total": 23 },
  "meta": { "page": 1, "limit": 10, "total": 23, "totalPages": 3 }
}
```

**Response 404:**
```json
{ "error": "Sản phẩm không tồn tại" }
```

---

### POST /products/[slug]/reviews

Gửi đánh giá cho sản phẩm theo slug.

**Auth:** Không cần | **Rate limit:** 5 req / 60s

**Path params:** `slug` — product slug

**Request body:**
```json
{
  "name": "Nguyễn Văn A",
  "rating": 5,
  "comment": "Trà sữa ngon, giao hàng nhanh!"
}
```

| Field | Type | Validation |
|-------|------|-----------|
| `name` | string | 2–100 ký tự |
| `rating` | integer | 1–5 |
| `comment` | string | 5–1000 ký tự |

**Response 201:** Review object đã tạo

**Response 400:**
```json
{ "error": "Rating phải từ 1-5" }
```

---

## Categories

### GET /categories

Danh sách tất cả categories, sắp xếp theo `order` tăng dần. Mỗi category kèm số lượng sản phẩm.

**Auth:** Không cần

**Response 200:**
```json
[
  {
    "id": "clx...",
    "name": "Trà Sữa",
    "slug": "tra-sua",
    "description": "...",
    "image": "https://...",
    "order": 1,
    "_count": { "products": 8 },
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

---

## Toppings

### GET /toppings

Danh sách tất cả toppings.

**Auth:** Không cần

**Response 200:**
```json
[
  {
    "id": "clx...",
    "name": "Trân châu đen",
    "price": 5000,
    "image": "https://..."
  }
]
```

---

## Orders

### POST /orders

Tạo đơn hàng mới. Server tính lại giá từ database — client không thể giả mạo giá.

**Auth:** Không cần | **Rate limit:** 5 req / 60s

**Request body:**
```json
{
  "customerName": "Nguyễn Văn A",
  "phone": "0901234567",
  "address": "123 Nguyễn Huệ, Quận 1, TP.HCM",
  "note": "Ít đường",
  "items": [
    {
      "productId": "clx...",
      "size": "L",
      "quantity": 2,
      "sugarLevel": 50,
      "iceLevel": 100,
      "toppings": ["Trân châu đen", "Thạch"],
      "subtotal": 90000
    }
  ]
}
```

| Field | Type | Validation |
|-------|------|-----------|
| `customerName` | string | Tối thiểu 2 ký tự |
| `phone` | string | Tối thiểu 9 ký tự |
| `address` | string | Optional |
| `note` | string | Optional |
| `items` | array | Tối thiểu 1 item |
| `items[].productId` | string | Required |
| `items[].size` | string | Required |
| `items[].quantity` | integer | >= 1 |
| `items[].sugarLevel` | integer | 0–100 |
| `items[].iceLevel` | integer | 0–100 |
| `items[].toppings` | string[] | Tên topping (server lookup giá) |
| `items[].subtotal` | integer | Bị bỏ qua — server tính lại |

**Response 201:** Order object đầy đủ với items

**Response 400:**
```json
{
  "error": "Tên khách hàng phải có ít nhất 2 ký tự",
  "details": { "fieldErrors": { "customerName": ["..."] } }
}
```

**Response 422:**
```json
{ "error": "Một hoặc nhiều sản phẩm không tồn tại hoặc đã ngừng bán" }
```

---

### GET /orders

Danh sách đơn hàng, lọc theo số điện thoại.

**Auth:** Không cần

**Query params:**

| Param | Type | Default | Mô tả |
|-------|------|---------|-------|
| `phone` | string | — | Lọc theo số điện thoại (contains) |
| `page` | integer | `1` | |
| `limit` | integer | `10` (tối đa 50) | |

**Response 200:**
```json
{
  "data": [ /* Order objects */ ],
  "pagination": { "total": 5, "page": 1, "limit": 10, "totalPages": 1, "hasNextPage": false, "hasPrevPage": false }
}
```

---

### GET /orders/tracking

Tra cứu đơn hàng theo orderId hoặc số điện thoại.

**Auth:** Không cần

**Query params:** `orderId` hoặc `phone` (bắt buộc ít nhất một)

**Response 200:**
```json
{
  "orders": [
    {
      "id": "clx...",
      "customerName": "Nguyễn Văn A",
      "phone": "0901234567",
      "total": 90000,
      "status": "delivering",
      "items": [ /* OrderItem objects với product */ ],
      "createdAt": "2026-05-17T10:00:00.000Z"
    }
  ]
}
```

**Response 404:**
```json
{ "error": "Không tìm thấy đơn hàng" }
```

---

### PATCH /orders/[id]/status

Cập nhật trạng thái đơn hàng. **[Admin]**

**Auth:** Basic Auth hoặc Bearer token

**Path params:** `id` — order ID

**Request body:**
```json
{ "status": "CONFIRMED" }
```

Giá trị hợp lệ: `PENDING`, `CONFIRMED`, `PREPARING`, `DELIVERING`, `COMPLETED`, `CANCELLED`

**Response 200:**
```json
{ "success": true, "data": { /* Updated order */ } }
```

**Response 400:**
```json
{ "success": false, "error": "Trạng thái không hợp lệ. Các giá trị hợp lệ: PENDING, CONFIRMED, ..." }
```

---

## Reviews

### GET /reviews

Danh sách đánh giá theo productId.

**Auth:** Không cần

**Query params:** `productId` (bắt buộc)

**Response 200:**
```json
{
  "reviews": [ /* Review objects, tối đa 20, mới nhất trước */ ],
  "stats": { "average": 4.7, "count": 23 }
}
```

---

### POST /reviews

Gửi đánh giá mới.

**Auth:** Không cần | **Rate limit:** 5 req / 60s

**Request body:**
```json
{
  "productId": "clx...",
  "name": "Nguyễn Văn A",
  "rating": 5,
  "comment": "Rất ngon, sẽ mua lại!"
}
```

| Field | Validation |
|-------|-----------|
| `productId` | Required string |
| `name` | Tối thiểu 2 ký tự |
| `rating` | Integer 1–5 |
| `comment` | Tối thiểu 10 ký tự |

**Response 201:** Review object đã tạo

---

## Search

### GET /search

Tìm kiếm sản phẩm theo tên hoặc mô tả. Trả về tối đa 10 kết quả.

**Auth:** Không cần

**Query params:** `q` — chuỗi tìm kiếm (tối thiểu 1 ký tự)

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "price": 35000,
      "image": "https://...",
      "category": "Trà Sữa"
    }
  ]
}
```

---

## Coupons

### GET /coupons/validate

Kiểm tra tính hợp lệ của mã giảm giá.

**Auth:** Không cần

**Query params:** `code` (bắt buộc) — mã coupon (case-insensitive)

**Response 200 — hợp lệ:**
```json
{
  "valid": true,
  "coupon": {
    "code": "SUMMER20",
    "discountType": "percentage",
    "discountValue": 20,
    "minOrderAmount": 50000,
    "description": "Giảm 20% cho đơn từ 50k"
  }
}
```

**Response 400 — không hợp lệ:**
```json
{ "valid": false, "error": "Mã giảm giá đã hết hạn" }
```

**Response 404:**
```json
{ "valid": false, "error": "Mã giảm giá không tồn tại" }
```

---

## Wishlist

> **Status: DISABLED** — Wishlist API trả `410 Gone` cho mọi request kể từ 2026-05-17. Client phía web/mobile lưu wishlist cục bộ qua zustand (localStorage). Endpoint sẽ được mở lại khi user authentication được thêm. Xem `docs/HONEST_SCOPE.md`.

### GET / POST / DELETE /wishlist

**Auth:** N/A (disabled)

**Response 410 Gone:**
```json
{
  "success": false,
  "error": "Wishlist API is disabled until per-user authentication is implemented. Wishlist hiện được lưu cục bộ trong trình duyệt qua zustand. Xem docs/HONEST_SCOPE.md."
}
```

---

## Newsletter

### POST /newsletter

Đăng ký nhận bản tin.

**Auth:** Không cần | **Rate limit:** 5 req / 60s

**Request body:**
```json
{ "email": "user@example.com" }
```

**Response 201 — đăng ký thành công:**
```json
{ "message": "Đăng ký thành công! Cảm ơn bạn đã quan tâm." }
```

**Response 200 — đã đăng ký trước đó:**
```json
{ "message": "Email này đã đăng ký nhận tin rồi!" }
```

**Response 400:**
```json
{ "error": "Email không hợp lệ" }
```

---

## Contact

### POST /contact

Gửi form liên hệ.

**Auth:** Không cần | **Rate limit:** 3 req / 60s

**Request body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "phone": "0901234567",
  "subject": "general",
  "message": "Tôi muốn hỏi về chương trình khuyến mãi..."
}
```

| Field | Validation |
|-------|-----------|
| `name` | Tối thiểu 2 ký tự |
| `email` | Email hợp lệ |
| `phone` | Optional |
| `subject` | Optional, default `"general"` |
| `message` | Tối thiểu 20 ký tự |

**Response 201:**
```json
{ "message": "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24 giờ.", "id": "clx..." }
```

---

## Chatbot

### POST /chatbot

Gửi tin nhắn đến chatbot. Proxy đến n8n webhook nếu `N8N_WEBHOOK_URL` được cấu hình; fallback message nếu không.

**Auth:** Không cần | **Rate limit:** 10 req / 60s

**Request body:**
```json
{ "message": "Menu hôm nay có gì?" }
```

**Response 200 — n8n hoạt động:**
```json
{ "reply": "Hôm nay chúng tôi có...", "source": "n8n" }
```

**Response 200 — fallback (N8N_WEBHOOK_URL chưa cấu hình):**
```json
{
  "reply": "Xin chào! Tôi là trợ lý ảo của MilkTea Iku. Hiện tại hệ thống chatbot đang được cấu hình. Vui lòng liên hệ hotline 1900-xxxx để được hỗ trợ.",
  "source": "fallback"
}
```

---

## Stats

### GET /stats

Thống kê công khai: tổng sản phẩm, tổng đơn hàng, doanh thu, đơn hàng hôm nay, top 5 sản phẩm bán chạy.

**Auth:** Không cần

**Response 200:**
```json
{
  "totalProducts": 24,
  "totalOrders": 1250,
  "totalRevenue": 45000000,
  "ordersToday": 12,
  "popularProducts": [
    {
      "id": "clx...",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "basePrice": 35000,
      "category": { "name": "Trà Sữa", "slug": "tra-sua" },
      "_count": { "orderItems": 142 }
    }
  ]
}
```

---

## Admin — Orders

### GET /admin/orders **[Admin]**

Danh sách tất cả đơn hàng với phân trang và lọc theo status.

**Auth:** Basic Auth hoặc Bearer token

**Query params:**

| Param | Type | Default | Mô tả |
|-------|------|---------|-------|
| `status` | string | — | Lọc theo status |
| `page` | integer | `1` | |
| `limit` | integer | `20` | |

**Response 200:**
```json
{
  "orders": [ /* Order objects với items */ ],
  "pagination": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}
```

---

### PATCH /admin/orders **[Admin]**

Cập nhật status đơn hàng (bulk — theo orderId trong body).

**Auth:** Basic Auth hoặc Bearer token

**Request body:**
```json
{ "orderId": "clx...", "status": "confirmed" }
```

Giá trị hợp lệ: `pending`, `confirmed`, `preparing`, `delivering`, `delivered`, `cancelled`

**Response 200:** Updated order object

---

### PATCH /admin/orders/[id] **[Admin]**

Cập nhật status đơn hàng theo ID trong path.

**Auth:** Basic Auth hoặc Bearer token

**Path params:** `id` — order ID

**Request body:**
```json
{ "status": "completed" }
```

Giá trị hợp lệ: `pending`, `confirmed`, `preparing`, `delivering`, `completed`

**Response 200:** Updated order object

---

## Admin — Coupons

### GET /admin/coupons **[Admin]**

Danh sách tất cả coupons, mới nhất trước.

**Auth:** Basic Auth hoặc Bearer token

**Response 200:** Array of Coupon objects

---

### POST /admin/coupons **[Admin]**

Tạo coupon mới.

**Auth:** Basic Auth hoặc Bearer token

**Request body:**
```json
{
  "code": "SUMMER20",
  "description": "Giảm 20% mùa hè",
  "discountType": "percentage",
  "discountValue": 20,
  "minOrderAmount": 50000,
  "maxUses": 100,
  "expiresAt": "2026-08-31T23:59:59.000Z"
}
```

| Field | Validation |
|-------|-----------|
| `code` | 3–30 ký tự, `[A-Za-z0-9_-]` — tự động uppercase |
| `discountType` | `"percentage"` hoặc `"fixed"` |
| `discountValue` | Số dương, tối đa 100000 |
| `minOrderAmount` | Integer >= 0, default 0 |
| `maxUses` | Integer 1–100000, default 100 |
| `expiresAt` | ISO datetime string, optional (default: 30 ngày từ lúc tạo) |

**Response 201:** Coupon object đã tạo

**Response 409:**
```json
{ "error": "Mã coupon đã tồn tại" }
```

---

## Admin — Stats

### GET /admin/stats **[Admin]**

Dashboard statistics: overview, recent orders, popular products.

**Auth:** Basic Auth hoặc Bearer token

**Response 200:**
```json
{
  "overview": {
    "totalProducts": 24,
    "totalOrders": 1250,
    "todayOrders": 12,
    "totalRevenue": 45000000
  },
  "recentOrders": [
    {
      "id": "clx...",
      "customerName": "Nguyễn Văn A",
      "total": 90000,
      "status": "delivering",
      "createdAt": "2026-05-17T10:00:00.000Z"
    }
  ],
  "popularProducts": [
    {
      "id": "clx...",
      "name": "Trà Sữa Truyền Thống",
      "slug": "tra-sua-truyen-thong",
      "basePrice": 35000,
      "orderCount": 142
    }
  ]
}
```

---

## Admin — Newsletter Subscribers

### GET /newsletter/subscribers **[Admin]**

Danh sách người đăng ký newsletter, mới nhất trước.

**Auth:** Basic Auth hoặc Bearer token

**Query params:**

| Param | Type | Default |
|-------|------|---------|
| `page` | integer | `1` |
| `limit` | integer | `20` (tối đa 100) |

**Response 200:**
```json
{
  "success": true,
  "data": [
    { "id": "clx...", "email": "user@example.com", "createdAt": "2026-05-17T00:00:00.000Z" }
  ],
  "meta": { "total": 250, "page": 1, "limit": 20, "totalPages": 13 }
}
```

---

## Error codes

| HTTP Status | Ý nghĩa |
|-------------|---------|
| 400 | Dữ liệu không hợp lệ (Zod validation failed) |
| 401 | Chưa xác thực (admin endpoints) |
| 404 | Không tìm thấy resource |
| 409 | Conflict (ví dụ: coupon code đã tồn tại) |
| 422 | Unprocessable Entity (sản phẩm không tồn tại khi tạo order) |
| 429 | Rate limit exceeded |
| 500 | Lỗi server |
| 503 | Service unavailable (database disconnected) |
