"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  FileText,
  CreditCard,
  Wallet,
  Banknote,
  Building2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/store/toast";

const paymentMethods = [
  {
    id: "momo",
    name: "MoMo",
    icon: "💜",
    color: "bg-pink-50 border-pink-200 hover:border-pink-400",
    activeColor: "bg-pink-50 border-pink-500 ring-2 ring-pink-200",
    desc: "Thanh toán qua ví MoMo",
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    icon: "💙",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    activeColor: "bg-blue-50 border-blue-500 ring-2 ring-blue-200",
    desc: "Thanh toán qua ZaloPay",
  },
  {
    id: "vnpay",
    name: "VNPay",
    icon: "🔵",
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
    activeColor: "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200",
    desc: "VNPay QR / Thẻ ATM",
  },
  {
    id: "bank",
    name: "Chuyển khoản",
    icon: "🏦",
    color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
    activeColor: "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200",
    desc: "Chuyển khoản ngân hàng",
  },
  {
    id: "cod",
    name: "Tiền mặt (COD)",
    icon: "💵",
    color: "bg-amber-50 border-amber-200 hover:border-amber-400",
    activeColor: "bg-amber-50 border-amber-500 ring-2 ring-amber-200",
    desc: "Thanh toán khi nhận hàng",
  },
];

export default function CheckoutForm() {
  const { items, total, clearCart } = useCartStore();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
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
    if (!form.customerName || !form.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod,
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
        className="text-center py-20 max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
          Đặt hàng thành công!
        </h2>
        <p className="text-gray-500 mb-2">
          Đơn hàng của bạn đang được chuẩn bị
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Chúng tôi sẽ giao trong 20-30 phút. Bạn có thể theo dõi đơn hàng tại
          trang &quot;Tra cứu đơn hàng&quot;.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/order"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-200 text-brand-700 rounded-full font-medium hover:bg-brand-50 transition-colors"
          >
            Theo dõi đơn hàng
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại menu
      </Link>

      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step >= s
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > s ? "✓" : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 ${
                  step > s ? "bg-brand-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Main form area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Thông tin giao hàng
                </h2>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 text-brand-500" />
                    Họ tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) =>
                      setForm({ ...form, customerName: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-brand-500" />
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    placeholder="0901 234 567"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    Địa chỉ giao hàng
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    placeholder="123 Nguyễn Huệ, Q.1, TP.HCM"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-brand-500" />
                    Ghi chú
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(e) =>
                      setForm({ ...form, note: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                    placeholder="Ít đá, nhiều đường..."
                  />
                </div>

                <button
                  onClick={() => {
                    if (!form.customerName || !form.phone) {
                      toast.error("Vui lòng điền họ tên và số điện thoại!");
                      return;
                    }
                    setStep(2);
                  }}
                  className="w-full py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-all hover:shadow-lg"
                >
                  Tiếp tục chọn thanh toán →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Phương thức thanh toán
                </h2>

                <div className="grid gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        paymentMethod === method.id
                          ? method.activeColor
                          : method.color
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {method.desc}
                        </div>
                      </div>
                      {paymentMethod === method.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-sm text-green-700">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Thanh toán an toàn & bảo mật 100%</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all"
                  >
                    ← Quay lại
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-all hover:shadow-lg"
                  >
                    Xác nhận →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Xác nhận đơn hàng
                </h2>

                {/* Summary info */}
                <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Người nhận</span>
                    <span className="font-medium">{form.customerName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Điện thoại</span>
                    <span className="font-medium">{form.phone}</span>
                  </div>
                  {form.address && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Địa chỉ</span>
                      <span className="font-medium text-right max-w-[200px]">
                        {form.address}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Thanh toán</span>
                    <span className="font-medium">
                      {paymentMethods.find((m) => m.id === paymentMethod)?.name}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white border rounded-xl p-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size {item.size} x{item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-sm text-brand-600">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tạm tính</span>
                    <span>{formatPrice(total())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phí giao hàng</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span className="text-brand-600">
                      {formatPrice(total())}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all"
                  >
                    ← Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="flex-1 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang xử lý...
                      </span>
                    ) : (
                      "Đặt hàng"
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-cream-50 to-brand-50/30 rounded-2xl p-6 sticky top-24 border border-brand-100/50">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-brand-500" />
              Đơn hàng ({items.length} món)
            </h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm gap-2"
                >
                  <div className="min-w-0">
                    <span className="font-medium block truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      Size {item.size} • x{item.quantity}
                    </span>
                  </div>
                  <span className="font-medium text-brand-600 flex-shrink-0">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-100 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phí giao hàng</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng</span>
                <span className="text-brand-600">{formatPrice(total())}</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 pt-4 border-t border-brand-100 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                An toàn
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CreditCard className="w-4 h-4 text-blue-500" />
                Bảo mật
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Banknote className="w-4 h-4 text-emerald-500" />
                Hoàn tiền
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Building2 className="w-4 h-4 text-purple-500" />
                Uy tín
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
