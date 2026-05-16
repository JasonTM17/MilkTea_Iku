export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  image: string;
  categoryId: string;
  isAvailable: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  size: string;
  quantity: number;
  sugarLevel: number;
  iceLevel: number;
  toppings: string;
  subtotal: number;
  product?: Product;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "PERCENT" | "FIXED";
  minOrder: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiresAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationMeta;
}

export interface ApiError {
  error: string;
  details?: unknown;
}
