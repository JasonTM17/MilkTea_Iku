# Hướng dẫn UI/UX — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

## Mục lục (Table of Contents)

1. [Quy tắc đặt tên (Naming Conventions)](#1-quy-tắc-đặt-tên)
2. [Cấu trúc thư mục (Folder Structure)](#2-cấu-trúc-thư-mục)
3. [shadcn primitive vs Custom Component](#3-shadcn-primitive-vs-custom-component)
4. [Quy tắc Animation](#4-quy-tắc-animation)
5. [Loading States, Empty States, Error Boundaries](#5-loading-states-empty-states-error-boundaries)
6. [Toast / Notification Patterns](#6-toast--notification-patterns)
7. [Form Validation (Zod + React Hook Form)](#7-form-validation)
8. [SEO Checklist](#8-seo-checklist)

---

## 1. Quy tắc đặt tên

### Components

- Tên component dùng **PascalCase**: `ProductCard`, `ThemeToggle`, `CartDrawer`
- Tên file component dùng **PascalCase.tsx**: `ProductCard.tsx`, `ThemeToggle.tsx`
- Không dùng `index.tsx` cho component có tên — dùng tên file rõ ràng để dễ tìm kiếm

```
// Đúng
frontend/components/ProductCard.tsx
frontend/components/ui/button.tsx

// Sai
frontend/components/productCard.tsx
frontend/components/product-card.tsx
```

### Hooks

- Tên hook dùng **camelCase** với tiền tố `use`: `useCartStore`, `useTheme`, `useScrollPosition`
- Tên file hook dùng **camelCase**: `useCartStore.ts`, `useScrollPosition.ts`
- Đặt trong `src/hooks/` hoặc cạnh component nếu chỉ dùng một nơi

### Utilities & Helpers

- Tên file dùng **camelCase**: `formatPrice.ts`, `cn.ts`
- Đặt trong `src/lib/`

### Pages (App Router)

- Tên thư mục dùng **kebab-case**: `src/app/about/`, `src/app/menu/[slug]/`
- File page luôn là `page.tsx`, layout là `layout.tsx`

### Constants & Types

- Constants dùng **SCREAMING_SNAKE_CASE**: `MAX_CART_ITEMS`, `DEFAULT_IMAGE_URL`
- Types/Interfaces dùng **PascalCase**: `ProductCardProps`, `CartItem`
- Export interface của props luôn có hậu tố `Props`: `ProductCardProps`

---

## 2. Cấu trúc thư mục

```
D:\MilkTea_Iku\
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (ThemeProvider, fonts, SkipLink)
│   │   ├── globals.css         # CSS variables, Tailwind base
│   │   ├── page.tsx            # Homepage
│   │   ├── menu/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/
│   │   ├── order/
│   │   └── admin/
│   ├── lib/
│   │   └── utils.ts            # cn(), formatPrice(), v.v.
│   ├── hooks/                  # Custom hooks dùng chung
│   └── store/
│       └── cart.ts             # Zustand cart store
├── frontend/
│   └── components/
│       ├── ui/                 # shadcn primitives (button, card, badge, v.v.)
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── ProductCard.tsx
│       ├── ThemeToggle.tsx
│       └── ...
├── backend/
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
├── tests/                      # Playwright E2E tests
├── tailwind.config.ts
├── components.json             # shadcn config
└── playwright.config.ts
```

**Quy tắc phân tách:**
- `frontend/components/ui/` — chỉ chứa shadcn primitives, không có business logic
- `frontend/components/` — composite components có thể dùng store, hooks
- `src/app/` — page components, layouts, route handlers
- `backend/` — Prisma schema, seed, API logic

---

## 3. shadcn Primitive vs Custom Component

### Dùng shadcn primitive khi:

- Component là UI thuần túy không có business logic (Button, Card, Badge, Input, Sheet, Dialog)
- Cần accessibility built-in (focus management, aria attributes)
- Cần theming qua CSS variables

```tsx
// Đúng — dùng shadcn Button cho action thông thường
import { Button } from "@/components/ui/button";
<Button variant="default" size="lg">Đặt hàng</Button>
```

### Tạo custom component khi:

- Cần kết hợp nhiều primitives với logic riêng (ProductCard = Card + Image + Button + store)
- Cần animation phức tạp với framer-motion
- Component có state hoặc side effects riêng

```tsx
// Đúng — ProductCard là custom vì kết hợp Card + Image + motion + cart store
export default function ProductCard({ product, index }: ProductCardProps) { ... }
```

### Không được:

- Override shadcn component bằng cách sửa trực tiếp file trong `ui/` — thay vào đó wrap hoặc extend
- Tạo custom button/input từ đầu khi shadcn đã có

---

## 4. Quy tắc Animation

### Nguyên tắc chung

- **CSS transitions** cho hover, focus, color change — nhanh, không cần JS
- **framer-motion** cho entrance animations, page transitions, phức tạp hơn hover đơn giản
- Không dùng framer-motion cho `hover:` đơn giản — dùng Tailwind `transition-*`

### Khi nào dùng framer-motion

```tsx
// Đúng — entrance animation phức tạp
<motion.header
  initial={{ y: -72, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
>

// Đúng — variant system cho card hover với nhiều child elements
const cardVariants = {
  rest: { y: 0, boxShadow: "0 2px 12px rgba(194,120,60,0.08)" },
  hover: { y: -6, boxShadow: "0 20px 40px rgba(194,120,60,0.22)" },
};

// Sai — dùng framer-motion cho hover đơn giản
<motion.div whileHover={{ backgroundColor: "#f5e3c0" }}>  // dùng Tailwind thay
```

### Khi nào dùng CSS transition (Tailwind)

```tsx
// Đúng — hover color, opacity, scale đơn giản
<Link className="text-brand-800/75 hover:text-brand-600 transition-colors duration-200">

// Đúng — hover background
<button className="hover:bg-brand-500/10 transition-colors duration-200">
```

### Duration chuẩn

| Loại | Duration | Tailwind class |
|------|----------|----------------|
| Hover nhanh | 150ms | `duration-150` |
| Transition thông thường | 200–300ms | `duration-200`, `duration-300` |
| Entrance animation | 400–550ms | framer-motion |
| Float/loop | 3s | `animate-float` |

### Luôn tôn trọng `prefers-reduced-motion`

```tsx
// Trong framer-motion — dùng useReducedMotion()
import { useReducedMotion } from "framer-motion";
const shouldReduce = useReducedMotion();
const transition = shouldReduce ? { duration: 0 } : { duration: 0.5 };
```

---

## 5. Loading States, Empty States, Error Boundaries

### Loading State

- Dùng skeleton (shimmer) thay vì spinner cho content blocks
- Spinner chỉ dùng cho action buttons (submit, add to cart)
- Skeleton phải match layout của content thật

```tsx
// Skeleton cho ProductCard
function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-brand-100 animate-pulse">
      <div className="aspect-square bg-cream-200 dark:bg-gray-700" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-cream-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-cream-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}
```

### Empty State

- Luôn có icon + tiêu đề + mô tả + CTA
- Không để trang trống hoàn toàn

```tsx
function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <ShoppingBag className="w-12 h-12 text-brand-300" />
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Giỏ hàng trống</h3>
      <p className="text-sm text-muted-foreground">Thêm sản phẩm để bắt đầu đặt hàng</p>
      <Button asChild><Link href="/menu">Xem menu</Link></Button>
    </div>
  );
}
```

### Error Boundary

- Mỗi route segment nên có `error.tsx` (Next.js App Router)
- Error boundary phải có nút "Thử lại" và link về trang chủ
- Không expose stack trace ra UI production

---

## 6. Toast / Notification Patterns

Dự án dùng **react-hot-toast** (import từ `react-hot-toast`). `ToastProvider` đã được mount trong root layout.

### Quy tắc

- Success: xanh lá, icon check, tự dismiss sau 3s
- Error: đỏ, icon X, tự dismiss sau 5s (cần đọc kỹ hơn)
- Loading: spinner, dismiss thủ công khi xong

```tsx
import toast from "react-hot-toast";

// Success
toast.success("Đã thêm vào giỏ hàng");

// Error
toast.error("Không thể kết nối. Vui lòng thử lại.");

// Loading + resolve
const id = toast.loading("Đang xử lý...");
// sau khi xong:
toast.success("Đặt hàng thành công!", { id });
// hoặc:
toast.error("Đặt hàng thất bại.", { id });
```

### Không được

- Dùng `alert()` hoặc `confirm()` — luôn dùng toast hoặc Dialog
- Stack quá nhiều toast cùng lúc — dismiss toast cũ trước khi show mới nếu cùng loại action

---

## 7. Form Validation

Dự án dùng **zod** cho schema validation. Kết hợp với `react-hook-form` cho form state.

### Pattern chuẩn

```tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const orderSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(10, "Địa chỉ quá ngắn"),
});

type OrderFormData = z.infer<typeof orderSchema>;

function OrderForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });
  // ...
}
```

### Hiển thị lỗi

- Lỗi hiển thị ngay dưới field, màu `text-destructive`, text-sm
- Không dùng alert hay toast cho lỗi validation — inline error
- Field có lỗi: `aria-invalid="true"` (shadcn Input tự xử lý qua `aria-invalid`)

---

## 8. SEO Checklist

Mỗi page trong `src/app/` phải có:

- [ ] `export const metadata: Metadata` với `title`, `description`, `keywords`
- [ ] `metadataBase` đặt ở root layout (đã có: `https://milktea-iku.vercel.app`)
- [ ] `<h1>` duy nhất, mô tả nội dung trang
- [ ] Hệ thống heading đúng thứ tự: h1 → h2 → h3 (không nhảy cấp)
- [ ] Tất cả `<Image>` có `alt` text mô tả
- [ ] `lang="vi"` trên `<html>` (đã có trong root layout)
- [ ] Canonical URL nếu có duplicate content
- [ ] JSON-LD structured data cho trang sản phẩm (component `JsonLd` đã có)
- [ ] Open Graph tags cho social sharing

```tsx
// Ví dụ metadata cho trang menu
export const metadata: Metadata = {
  title: "Menu Trà Sữa | MilkTea Iku",
  description: "Khám phá menu trà sữa premium với hơn 30 loại đồ uống. Trà sữa truyền thống, trà trái cây, matcha series.",
  keywords: ["menu trà sữa", "boba tea", "milk tea iku"],
  openGraph: {
    title: "Menu Trà Sữa | MilkTea Iku",
    description: "Khám phá menu trà sữa premium",
    images: ["/og-menu.jpg"],
  },
};
```

---

## Related

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Color tokens, typography, spacing
- [DARK_MODE.md](./DARK_MODE.md) — Dark mode implementation rules
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — WCAG 2.1 AA standards
- [MOBILE_RESPONSIVE.md](./MOBILE_RESPONSIVE.md) — Mobile-first patterns
- [COMPONENT_RULES.md](./COMPONENT_RULES.md) — Server vs Client components
- [TESTING.md](./TESTING.md) — Playwright E2E strategy
- [CONTRIBUTING_UI.md](./CONTRIBUTING_UI.md) — PR checklist
