export const SITE_CONFIG = {
  name: "MilkTea Iku",
  tagline: "Premium Boba Tea",
  description: "Thương hiệu trà sữa premium với nguyên liệu tươi ngon nhất",
  url: "https://milktea-iku.vn",
  email: "hello@milktea-iku.vn",
  phone: "1900 1234",
  address: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  hours: "08:00 - 22:00",
  social: {
    facebook: "https://facebook.com/milkteaiku",
    instagram: "https://instagram.com/milkteaiku",
    tiktok: "https://tiktok.com/@milkteaiku",
  },
} as const;

export const DELIVERY_CONFIG = {
  freeShipMinOrder: 100000,
  freeShipRadius: 5,
  estimatedTime: "30-45 phút",
  deliveryFee: 25000,
} as const;

export const ORDER_STATUS = {
  pending: { label: "Chờ xác nhận", color: "yellow" },
  confirmed: { label: "Đã xác nhận", color: "blue" },
  preparing: { label: "Đang pha chế", color: "orange" },
  delivering: { label: "Đang giao", color: "purple" },
  delivered: { label: "Đã giao", color: "green" },
  cancelled: { label: "Đã hủy", color: "red" },
} as const;

export const PAYMENT_METHODS = [
  { id: "momo", name: "MoMo", icon: "💜", description: "Ví điện tử MoMo" },
  { id: "zalopay", name: "ZaloPay", icon: "💙", description: "Ví ZaloPay" },
  { id: "vnpay", name: "VNPay", icon: "🔵", description: "Cổng thanh toán VNPay" },
  { id: "bank", name: "Chuyển khoản", icon: "🏦", description: "Chuyển khoản ngân hàng" },
  { id: "cod", name: "COD", icon: "💵", description: "Thanh toán khi nhận hàng" },
] as const;

export const SIZES = [
  { id: "S", label: "Nhỏ", priceModifier: -5000 },
  { id: "M", label: "Vừa", priceModifier: 0 },
  { id: "L", label: "Lớn", priceModifier: 8000 },
] as const;

export const SUGAR_LEVELS = [
  { value: 0, label: "Không đường" },
  { value: 30, label: "30% đường" },
  { value: 50, label: "50% đường" },
  { value: 70, label: "70% đường" },
  { value: 100, label: "100% đường" },
] as const;

export const ICE_LEVELS = [
  { value: 0, label: "Không đá" },
  { value: 30, label: "Ít đá" },
  { value: 50, label: "50% đá" },
  { value: 70, label: "70% đá" },
  { value: 100, label: "Đá bình thường" },
] as const;
