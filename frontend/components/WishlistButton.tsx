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
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
      }}
      className={`p-2 rounded-full transition-colors ${
        active
          ? "bg-red-50 text-red-500"
          : "bg-white/80 text-gray-400 hover:text-red-400 hover:bg-red-50"
      } ${className}`}
      aria-label={active ? "Bỏ yêu thích" : "Thêm yêu thích"}
    >
      <Heart className={`w-4 h-4 ${active ? "fill-red-500" : ""}`} />
    </motion.button>
  );
}
