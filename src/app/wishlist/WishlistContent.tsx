"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";

export default function WishlistContent() {
  const { items, removeItem, clearAll } = useWishlistStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center"
          >
            <Heart className="w-10 h-10 text-red-300" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Chưa có sản phẩm yêu thích
          </h2>
          <p className="text-gray-500 mb-8">
            Hãy khám phá menu và thêm những món bạn thích vào danh sách nhé!
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Khám phá menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Sản phẩm yêu thích
            </h1>
            <p className="text-gray-500 mt-1">{items.length} sản phẩm</p>
          </div>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Xóa tất cả
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center relative">
                  <span className="text-5xl">🧋</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Bỏ yêu thích"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link href={`/menu/${item.slug}`} className="block">
                    <h3 className="font-semibold text-gray-900 hover:text-brand-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-brand-600 font-bold mt-1">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>
                  <button
                    onClick={() =>
                      addItem({
                        productId: item.id,
                        name: item.name,
                        image: item.image || "",
                        size: "M",
                        quantity: 1,
                        sugarLevel: 100,
                        iceLevel: 100,
                        toppings: [],
                        basePrice: item.price,
                        toppingPrice: 0,
                      })
                    }
                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Thêm vào giỏ
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
