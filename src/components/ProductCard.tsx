"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    basePrice: number;
    image: string | null;
    isNew: boolean;
    isBestSeller: boolean;
    category?: { name: string };
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/menu/${product.slug}`} className="group block">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-cream-100">
            <Image
              src={product.image || "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.isNew && (
                <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  Mới
                </span>
              )}
              {product.isBestSeller && (
                <span className="px-2.5 py-1 bg-brand-500 text-white text-xs font-medium rounded-full">
                  Best Seller
                </span>
              )}
            </div>

            {/* Quick add overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Xem chi tiết
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            {product.category && (
              <span className="text-xs text-brand-600 font-medium">
                {product.category.name}
              </span>
            )}
            <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-brand-600 transition-colors">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-brand-600">
                {formatPrice(product.basePrice)}
              </span>
              <span className="text-xs text-gray-400">Size M</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
