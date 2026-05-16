import { z } from "zod";

export const phoneSchema = z.string().regex(/^(0[3-9])\d{8}$/, "Số điện thoại không hợp lệ");

export const emailSchema = z.string().email("Email không hợp lệ");

export const orderItemSchema = z.object({
  productId: z.number().positive(),
  quantity: z.number().min(1).max(20),
  size: z.enum(["S", "M", "L"]),
  sugarLevel: z.string(),
  iceLevel: z.string(),
  toppings: z.array(z.number()).optional().default([]),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(100),
  phone: phoneSchema,
  address: z.string().min(10, "Địa chỉ phải có ít nhất 10 ký tự").max(200),
  items: z.array(orderItemSchema).min(1, "Đơn hàng phải có ít nhất 1 sản phẩm"),
  paymentMethod: z.enum(["cod", "momo", "zalopay", "vnpay", "bank"]).default("cod"),
  note: z.string().max(500).optional().default(""),
  couponCode: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: emailSchema,
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
});

export const newsletterSchema = z.object({
  email: emailSchema,
});

export const reviewSchema = z.object({
  productId: z.number().positive(),
  rating: z.number().min(1).max(5),
  name: z.string().min(2).max(100),
  comment: z.string().min(5).max(1000),
});
