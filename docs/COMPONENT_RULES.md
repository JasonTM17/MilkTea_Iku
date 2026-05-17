# Component Rules — MilkTea Iku

> Last updated: 2026-05-17
> Author: Nguyễn Sơn (jasonbmt06@gmail.com)

---

## Mục lục (Table of Contents)

1. [Server Component vs Client Component](#1-server-component-vs-client-component)
2. [Props Interface](#2-props-interface)
3. [Default Props vs Required Props](#3-default-props-vs-required-props)
4. [Composition over Configuration](#4-composition-over-configuration)
5. [React.memo — Khi nào dùng](#5-reactmemo)
6. [Image Component Rules](#6-image-component-rules)
7. [Link Component Rules](#7-link-component-rules)
8. [State Management](#8-state-management)
9. [Error Handling trong Components](#9-error-handling)

---

## 1. Server Component vs Client Component

Next.js 14 App Router mặc định mọi component là **Server Component**. Chỉ thêm `"use client"` khi thực sự cần.

### Dùng Server Component khi

- Fetch data từ database hoặc API (không cần state)
- Render static content, SEO content
- Component không có event handlers, hooks, browser APIs

```tsx
// Đúng — Server Component fetch data
// src/app/menu/page.tsx
import { prisma } from "@/lib/prisma";

export default async function MenuPage() {
  const products = await prisma.product.findMany({ where: { isActive: true } });
  return <ProductGrid products={products} />;
}
```

### Dùng Client Component (`"use client"`) khi

- Dùng React hooks: `useState`, `useEffect`, `useRef`, `useContext`
- Dùng browser APIs: `window`, `localStorage`, `navigator`
- Dùng event handlers: `onClick`, `onChange`, `onSubmit`
- Dùng framer-motion animations
- Dùng next-themes `useTheme`
- Dùng zustand store

```tsx
// Đúng — Client Component vì dùng useState, useEffect, framer-motion
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // ...
}
```

### Ranh giới Server/Client

- Đẩy `"use client"` xuống càng sâu càng tốt — giữ parent là Server Component
- Server Component có thể pass data xuống Client Component qua props
- Client Component không thể import Server Component

```tsx
// Đúng — Server Component truyền data xuống Client Component
// page.tsx (Server)
export default async function MenuPage() {
  const products = await prisma.product.findMany();
  return <ProductGrid products={products} />;  // ProductGrid là Client Component
}

// ProductGrid.tsx (Client — vì cần animation)
"use client";
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div ...>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </motion.div>
  );
}
```

---

## 2. Props Interface

### Quy tắc

- Mọi component phải có interface cho props
- Interface phải được **export** để có thể dùng ở nơi khác
- Tên interface: `ComponentNameProps`

```tsx
// Đúng
export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    basePrice: number;
    image: string | null;
    isNew?: boolean;
    isBestSeller?: boolean;
    category?: { name: string };
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  // ...
}
```

```tsx
// Sai — không có interface, không export
function ProductCard({ product, index }: any) {
  // ...
}
```

### Extend HTML element props

Khi component wrap một HTML element, extend props của element đó:

```tsx
// Đúng — Button extend ButtonHTMLAttributes
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <button aria-label={label} className={cn("...", className)} {...props}>
      {icon}
    </button>
  );
}
```

---

## 3. Default Props vs Required Props

### Quy tắc

- Props bắt buộc: không có default value, TypeScript sẽ báo lỗi nếu thiếu
- Props tùy chọn: dùng `?` trong interface và default value trong destructuring

```tsx
export interface ProductCardProps {
  product: Product;    // bắt buộc
  index?: number;      // tùy chọn
  className?: string;  // tùy chọn
}

export default function ProductCard({
  product,
  index = 0,           // default value
  className,
}: ProductCardProps) {
  // ...
}
```

### Không dùng `defaultProps` (deprecated trong React 18+)

```tsx
// Sai — defaultProps deprecated
ProductCard.defaultProps = { index: 0 };

// Đúng — default trong destructuring
function ProductCard({ index = 0 }: ProductCardProps) {
```

---

## 4. Composition over Configuration

Ưu tiên composition (truyền children, render props) thay vì thêm nhiều props cấu hình.

### Ví dụ tốt — Composition

```tsx
// Đúng — flexible qua children
<Card>
  <CardHeader>
    <CardTitle>Trà Sữa Thái</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Mô tả sản phẩm</p>
  </CardContent>
  <CardFooter>
    <Button>Thêm vào giỏ</Button>
  </CardFooter>
</Card>
```

### Ví dụ xấu — Over-configuration

```tsx
// Sai — quá nhiều props cấu hình
<Card
  title="Trà Sữa Thái"
  description="Mô tả sản phẩm"
  footerContent={<Button>Thêm vào giỏ</Button>}
  showHeader={true}
  headerVariant="default"
/>
```

### Slot pattern

```tsx
// Đúng — slot pattern cho layout linh hoạt
export interface SectionProps {
  heading: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Section({ heading, action, children }: SectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        {heading}
        {action}
      </div>
      {children}
    </section>
  );
}
```

---

## 5. React.memo

### Quy tắc

- **Không** dùng `React.memo` mặc định cho mọi component
- Chỉ dùng khi có **bằng chứng** về performance issue (profiler, re-render quá nhiều)
- Memo chỉ có ý nghĩa khi parent re-render thường xuyên và component render tốn kém

```tsx
// Đúng — memo cho component render tốn kém trong list dài
const ProductCard = React.memo(function ProductCard({ product, index }: ProductCardProps) {
  // component phức tạp với animation, image
}, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});

// Sai — memo không cần thiết cho component đơn giản
const Badge = React.memo(function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
});
```

### useMemo và useCallback

Tương tự — chỉ dùng khi có bằng chứng cần thiết:

```tsx
// Đúng — memoize expensive calculation
const sortedProducts = useMemo(
  () => products.sort((a, b) => a.basePrice - b.basePrice),
  [products]
);

// Đúng — stable callback cho child component đã memo
const handleAddToCart = useCallback((productId: string) => {
  addItem(productId);
}, [addItem]);
```

---

## 6. Image Component Rules

### Luôn dùng `next/image`, không dùng `<img>`

```tsx
// Đúng
import Image from "next/image";
<Image src={url} alt={description} fill className="object-cover" sizes="..." />

// Sai
<img src={url} alt={description} />
```

### `alt` text bắt buộc và có nghĩa

```tsx
// Đúng — mô tả nội dung ảnh
<Image alt={`Ảnh sản phẩm ${product.name}`} ... />
<Image alt="Logo MilkTea Iku" ... />

// Đúng — ảnh decorative
<Image alt="" aria-hidden="true" ... />

// Sai — alt không có nghĩa
<Image alt="image" ... />
<Image alt="photo" ... />
```

### `sizes` attribute bắt buộc cho `fill` images

```tsx
// Đúng — sizes giúp browser chọn đúng resolution
<Image
  src={product.image}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>

// Sai — thiếu sizes
<Image src={product.image} alt={product.name} fill className="object-cover" />
```

### Fallback image

```tsx
// Luôn có fallback khi src có thể null
const imageSrc = product.image
  || "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400";

<Image src={imageSrc} alt={product.name} fill className="object-cover" sizes="..." />
```

### `priority` cho above-the-fold images

```tsx
// Hero image, first product card — thêm priority để tải trước
<Image src={heroImage} alt="Hero" fill priority sizes="100vw" />
```

---

## 7. Link Component Rules

### Luôn dùng `next/link` cho internal navigation

```tsx
// Đúng — next/link cho internal routes
import Link from "next/link";
<Link href="/menu">Xem menu</Link>
<Link href={`/menu/${product.slug}`}>Chi tiết</Link>

// Đúng — <a> cho external links
<a href="https://facebook.com/milktea-iku" target="_blank" rel="noopener noreferrer">
  Facebook
</a>

// Sai — <a> cho internal routes (mất client-side navigation)
<a href="/menu">Xem menu</a>
```

### External links

```tsx
// Luôn có rel="noopener noreferrer" cho target="_blank"
<a
  href="https://external.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Mở trong tab mới"
>
  Link ngoài
</a>
```

### Link với Button style

```tsx
// Dùng Button asChild pattern của shadcn
import { Button } from "@/components/ui/button";
import Link from "next/link";

<Button asChild>
  <Link href="/order">Đặt hàng ngay</Link>
</Button>
```

---

## 8. State Management

### Phân loại state

| Loại state | Tool | Ví dụ |
|------------|------|-------|
| UI state local | `useState` | Modal open/close, tab active, form input |
| UI state shared | `useState` + prop drilling hoặc Context | Theme (đã có next-themes) |
| Server state | React Server Components + fetch | Product list, order data |
| Global client state | Zustand | Cart, user preferences |

### Zustand — Cart store

```tsx
// src/store/cart.ts — đã có
import { useCartStore } from "@/store/cart";

// Trong component
const { addItem, removeItem, itemCount, toggleCart } = useCartStore();

// Ngoài component (event handler, utility)
const { addItem } = useCartStore.getState();
```

### Quy tắc Zustand

- Chỉ dùng Zustand cho state cần chia sẻ giữa nhiều component không liên quan
- Không dùng Zustand cho UI state local (modal, hover, form)
- Store phải có TypeScript types đầy đủ

### useState cho UI state

```tsx
// Đúng — local UI state
const [isOpen, setIsOpen] = useState(false);
const [activeTab, setActiveTab] = useState("all");
const [quantity, setQuantity] = useState(1);
```

---

## 9. Error Handling

### Error boundary (Next.js App Router)

Mỗi route segment nên có `error.tsx`:

```tsx
// src/app/menu/error.tsx
"use client";

export default function MenuError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h2 className="text-xl font-semibold">Không thể tải menu</h2>
      <p className="text-muted-foreground text-sm">{error.message}</p>
      <button onClick={reset} className="...">Thử lại</button>
    </div>
  );
}
```

### Try/catch trong async operations

```tsx
// Đúng — xử lý lỗi và thông báo user
async function handleSubmitOrder(data: OrderFormData) {
  try {
    await submitOrder(data);
    toast.success("Đặt hàng thành công!");
    router.push("/order/success");
  } catch (error) {
    toast.error("Không thể đặt hàng. Vui lòng thử lại.");
    console.error("Order submission failed:", error);
  }
}
```

---

## Related

- [UI_UX_GUIDELINES.md](./UI_UX_GUIDELINES.md) — Naming conventions, animation rules
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Design tokens
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — A11y trong components
- [MOBILE_RESPONSIVE.md](./MOBILE_RESPONSIVE.md) — Responsive patterns
- [TESTING.md](./TESTING.md) — Testing components
