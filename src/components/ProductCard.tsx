"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    basePrice: number;
    image: string | null;
    isNew?: boolean;
    isBestSeller?: boolean;
    category?: { name: string };
  };
  index?: number;
}

// Variant maps propagate from the parent whileHover to all child motion elements
const cardVariants = {
  rest: {
    y: 0,
    boxShadow: "0 2px 12px rgba(194, 120, 60, 0.08)",
  },
  hover: {
    y: -6,
    boxShadow: "0 20px 40px rgba(194, 120, 60, 0.22)",
  },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const addToCartVariants = {
  rest: { y: 14, opacity: 0 },
  hover: { y: 0, opacity: 1 },
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        <Card className="gap-0 overflow-hidden rounded-2xl border-0 bg-white py-0 ring-1 ring-brand-100">
          {/* ── Image ── */}
          <div className="relative aspect-square overflow-hidden bg-cream-100">
            {/* Zoom on hover */}
            <motion.div
              variants={imageVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={
                  product.image ||
                  "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400"
                }
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>

            {/* Permanent bottom gradient for depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Warm tint overlay on hover */}
            <motion.div
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute inset-0 bg-brand-900/10"
            />

            {/* Badges — top-left */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.category && (
                <Badge className="border-0 bg-white/90 text-[11px] font-semibold text-brand-700 shadow-sm backdrop-blur-sm">
                  {product.category.name}
                </Badge>
              )}
              {product.isNew && (
                <Badge className="border-0 bg-green-500 text-[11px] font-semibold text-white">
                  Mới
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="border-0 bg-brand-500 text-[11px] font-semibold text-white">
                  Best Seller
                </Badge>
              )}
            </div>

            {/* Add-to-cart button — slides up on hover */}
            <motion.div
              variants={addToCartVariants}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-3 left-3 right-3"
            >
              <Button
                className="h-9 w-full gap-2 rounded-xl border-0 bg-white text-sm font-semibold text-brand-700 shadow-lg hover:bg-brand-50"
                variant="outline"
                onClick={(e) => e.preventDefault()}
              >
                <ShoppingCart className="size-4" />
                Thêm vào giỏ
              </Button>
            </motion.div>
          </div>

          {/* ── Body ── */}
          <CardContent className="px-4 pb-0 pt-3">
            <h3 className="line-clamp-1 text-sm font-semibold leading-snug text-gray-900">
              {product.name}
            </h3>
            {product.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400">
                {product.description}
              </p>
            )}
          </CardContent>

          {/* ── Footer ── */}
          <CardFooter className="flex items-center justify-between border-t-0 bg-transparent px-4 py-3">
            <span className="text-base font-bold text-brand-600">
              {formatPrice(product.basePrice)}
            </span>
            <Link
              href={`/menu/${product.slug}`}
              className="flex items-center gap-1 text-xs font-medium text-gray-400 transition-colors hover:text-brand-600"
            >
              Xem chi tiết
              <ArrowRight className="size-3" />
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
