"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
}

interface RecommendationsProps {
  products: Product[];
  title?: string;
}

export default function Recommendations({ products, title = "Có thể bạn sẽ thích" }: RecommendationsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          {title}
        </h3>
        <Link
          href="/menu"
          className="text-sm text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1"
        >
          Xem tất cả
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="shrink-0 w-40"
          >
            <Link href={`/menu/${product.slug}`} className="block group">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center mb-2 group-hover:shadow-md transition-shadow">
                <span className="text-3xl">🧋</span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                {product.name}
              </h4>
              <p className="text-sm font-bold text-brand-600 mt-0.5">
                {product.basePrice.toLocaleString("vi-VN")}đ
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
