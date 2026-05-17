"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlistStore, WishlistItem } from "@/store/wishlist";

interface WishlistButtonProps {
  product: WishlistItem;
  className?: string;
}

export default function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const active = isInWishlist(product.id);

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
      }}
      className={`min-w-11 min-h-11 w-11 h-11 inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
        active
          ? "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-300"
          : "bg-white/85 dark:bg-gray-800/85 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
      } ${className}`}
      aria-label={active ? "Bỏ yêu thích" : "Thêm yêu thích"}
      aria-pressed={active}
    >
      <Heart className={`w-5 h-5 ${active ? "fill-red-500" : ""}`} />
    </motion.button>
  );
}
