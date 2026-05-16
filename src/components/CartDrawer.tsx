"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
    useCartStore();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-600" />
                <h2 className="font-semibold text-lg">
                  Giỏ hàng ({items.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="text-gray-500 mb-2">Giỏ hàng trống</p>
                  <p className="text-sm text-gray-400">
                    Hãy thêm món yêu thích vào giỏ hàng
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 bg-gray-50 rounded-xl p-3"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Size {item.size} • Đường {item.sugarLevel}% • Đá{" "}
                        {item.iceLevel}%
                      </p>
                      {item.toppings.length > 0 && (
                        <p className="text-xs text-brand-600 mt-0.5">
                          +{item.toppings.length} topping
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-sm text-brand-600">
                          {formatPrice(item.subtotal)}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-white border flex items-center justify-center hover:bg-brand-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-white border flex items-center justify-center hover:bg-brand-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-6 h-6 rounded-full bg-white border flex items-center justify-center hover:bg-red-50 ml-1"
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tổng cộng</span>
                  <span className="text-xl font-bold text-brand-700">
                    {formatPrice(total())}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3.5 bg-brand-600 text-white text-center rounded-full font-medium hover:bg-brand-700 transition-colors"
                >
                  Đặt hàng ngay
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
