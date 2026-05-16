"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, User, FileText } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

export default function CheckoutForm() {
  const { items, total, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    note: "",
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
            sugarLevel: item.sugarLevel,
            iceLevel: item.iceLevel,
            toppings: item.toppings,
            subtotal: item.subtotal,
          })),
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      setOrderSuccess(true);
      toast.success("Đặt hàng thành công!");
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
          Đặt hàng thành công!
        </h2>
        <p className="text-gray-500 mb-8">
          Đơn hàng của bạn đang được chuẩn bị. Chúng tôi sẽ giao trong 30 phút.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại menu
      </Link>

      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
        Thanh toán
      </h1>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Họ tên
            </label>
            <input
              type="text"
              required
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4" />
              Số điện thoại
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              placeholder="0901 234 567"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              Địa chỉ giao hàng
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              placeholder="123 Nguyễn Huệ, Q.1, TP.HCM"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Ghi chú
            </label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
              placeholder="Ghi chú thêm cho đơn hàng..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="w-full py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang xử lý..." : `Xác nhận đặt hàng — ${formatPrice(total())}`}
          </button>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-cream-50 rounded-2xl p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">
              Đơn hàng ({items.length} món)
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-1">x{item.quantity}</span>
                    <div className="text-xs text-gray-400">
                      Size {item.size} • {item.sugarLevel}% đường
                    </div>
                  </div>
                  <span className="font-medium">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-xl font-bold text-brand-600">
                {formatPrice(total())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
