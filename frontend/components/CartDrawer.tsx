"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DELIVERY_FEE = 15_000;
const FREE_DELIVERY_THRESHOLD = 150_000;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price
  );

function BobaCupIllustration() {
  return (
    <svg
      width="110"
      height="130"
      viewBox="0 0 110 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Straw */}
      <rect x="50" y="0" width="10" height="46" rx="5" fill="#fdba74" />
      {/* Lid */}
      <rect x="15" y="26" width="80" height="12" rx="6" fill="#fb923c" />
      {/* Cup body */}
      <path
        d="M22 38 L28 118 Q28 128 38 128 L72 128 Q82 128 82 118 L88 38 Z"
        fill="#fff7ed"
        stroke="#fed7aa"
        strokeWidth="2"
      />
      {/* Liquid fill */}
      <path
        d="M26 65 L28 118 Q28 128 38 128 L72 128 Q82 128 82 118 L84 65 Z"
        fill="#fed7aa"
        opacity="0.6"
      />
      {/* Bubbles */}
      <circle cx="42" cy="100" r="8" fill="#c2410c" opacity="0.55" />
      <circle cx="55" cy="110" r="8" fill="#c2410c" opacity="0.55" />
      <circle cx="68" cy="100" r="8" fill="#c2410c" opacity="0.55" />
      <circle cx="48" cy="116" r="6.5" fill="#c2410c" opacity="0.45" />
      <circle cx="62" cy="116" r="6.5" fill="#c2410c" opacity="0.45" />
    </svg>
  );
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } =
    useCartStore();

  const subtotal = total();
  const totalItems = itemCount();
  const deliveryFee = subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full max-w-md p-0 flex flex-col gap-0 bg-cream-50 border-l border-brand-100"
      >
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-brand-100 bg-white shrink-0">
          <SheetTitle className="flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-brand-600" />
            </div>
            <span className="font-semibold text-gray-900">Giỏ hàng</span>
            {totalItems > 0 && (
              <span className="ml-auto text-sm font-normal text-gray-400 pr-8">
                {totalItems} món
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
              <div className="opacity-70">
                <BobaCupIllustration />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-700 text-lg">Giỏ hàng trống</p>
                <p className="text-sm text-gray-400">
                  Hãy thêm món yêu thích vào giỏ hàng nhé!
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-1 border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-700 rounded-full"
                onClick={closeCart}
              >
                Khám phá thực đơn
              </Button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              <div className="space-y-3">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 60, scale: 0.94 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-brand-50"
                  >
                    {/* Product image */}
                    <div className="relative w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 bg-cream-100">
                      <Image
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1558857563-b371033873b8?w=200"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="68px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Size {item.size} · Đường {item.sugarLevel}% · Đá {item.iceLevel}%
                      </p>
                      {item.toppings.length > 0 && (
                        <p className="text-xs text-brand-500 mt-0.5 truncate">
                          {item.toppings.join(", ")}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2.5">
                        <span className="font-bold text-sm text-brand-600">
                          {formatPrice(item.subtotal)}
                        </span>

                        {/* Quantity + remove controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center hover:bg-brand-100 transition-colors"
                            aria-label="Giảm số lượng"
                          >
                            <Minus className="w-3 h-3 text-brand-600" />
                          </button>

                          {/* Animated quantity number */}
                          <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={item.quantity}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                                transition={{ duration: 0.14 }}
                                className="text-sm font-semibold text-gray-800 block"
                              >
                                {item.quantity}
                              </motion.span>
                            </AnimatePresence>
                          </div>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center hover:bg-brand-100 transition-colors"
                            aria-label="Tăng số lượng"
                          >
                            <Plus className="w-3 h-3 text-brand-600" />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors ml-0.5"
                            aria-label="Xóa sản phẩm"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <SheetFooter className="flex-col gap-0 p-0 border-t border-brand-100 bg-white shrink-0">
            {/* Price breakdown */}
            <div className="px-5 pt-4 pb-2 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tạm tính</span>
                <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Phí giao hàng</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium">Miễn phí</span>
                ) : (
                  <span className="font-medium text-gray-800">{formatPrice(deliveryFee)}</span>
                )}
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-brand-400">
                  Mua thêm{" "}
                  <span className="font-medium text-brand-600">
                    {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)}
                  </span>{" "}
                  để được miễn phí giao hàng
                </p>
              )}
            </div>

            <Separator className="bg-brand-50" />

            {/* Grand total */}
            <div className="px-5 py-3 flex items-center justify-between">
              <span className="font-semibold text-gray-900">Tổng cộng</span>
              <motion.span
                key={grandTotal}
                initial={{ scale: 0.92, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="text-xl font-bold text-brand-600"
              >
                {formatPrice(grandTotal)}
              </motion.span>
            </div>

            {/* Actions */}
            <div className="px-5 pb-6 pt-1 space-y-2.5">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full h-12 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base shadow-md shadow-brand-200/60 transition-all flex items-center justify-center"
              >
                Thanh toán
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <button
                onClick={closeCart}
                className="w-full text-sm text-center text-brand-500 hover:text-brand-700 py-1 transition-colors"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
