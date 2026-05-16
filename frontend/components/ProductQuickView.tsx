"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingCart, ArrowRight } from "lucide-react";

interface Product {
  name: string;
  price: number;
  description: string;
  slug: string;
}

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
}: ProductQuickViewProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Xem nhanh: ${product.name}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Đóng"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="p-6 pt-5">
                {/* Product name */}
                <h2 className="pr-10 text-xl font-bold text-gray-900 dark:text-gray-50">
                  {product.name}
                </h2>

                {/* Price */}
                <p className="mt-2 text-2xl font-bold text-brand-600 dark:text-brand-400">
                  {formatPrice(product.price)}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      // Add to cart logic can be wired here
                      onClose();
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Thêm vào giỏ
                  </button>

                  <Link
                    href={`/menu/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Xem chi tiết
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
