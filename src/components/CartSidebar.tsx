"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import Link from "next/link";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, isOpen, toggleCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-600" />
                <h2 className="font-semibold text-gray-900">Giỏ hàng ({items.length})</h2>
              </div>
              <button
                onClick={toggleCart}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Đóng giỏ hàng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-7 h-7 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">Giỏ hàng trống</p>
                  <p className="text-sm text-gray-400 mt-1">Thêm sản phẩm yêu thích nhé!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-3 p-3 rounded-xl bg-cream-50 border border-cream-100"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center shrink-0">
                        <span className="text-2xl">🧋</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.size} • {item.sugarLevel} • {item.iceLevel}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-brand-600">
                            {item.subtotal.toLocaleString("vi-VN")}đ
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center"
                              aria-label="Giảm số lượng"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center"
                              aria-label="Tăng số lượng"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center ml-1"
                              aria-label="Xóa sản phẩm"
                            >
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Tổng cộng</span>
                  <span className="text-lg font-bold text-gray-900">
                    {total().toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="block w-full py-3 bg-brand-600 text-white text-center rounded-xl font-medium hover:bg-brand-700 transition-colors"
                >
                  Thanh toán
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
