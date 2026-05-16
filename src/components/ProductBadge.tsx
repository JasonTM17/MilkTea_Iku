"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Award, Sparkles } from "lucide-react";

interface ProductBadgeProps {
  type: "bestseller" | "new" | "limited" | "trending";
}

const badgeConfig = {
  bestseller: {
    icon: Award,
    label: "Best Seller",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    iconColor: "text-yellow-500",
  },
  new: {
    icon: Sparkles,
    label: "Mới",
    className: "bg-green-50 text-green-700 border-green-200",
    iconColor: "text-green-500",
  },
  limited: {
    icon: Clock,
    label: "Giới hạn",
    className: "bg-red-50 text-red-700 border-red-200",
    iconColor: "text-red-500",
  },
  trending: {
    icon: TrendingUp,
    label: "Trending",
    className: "bg-brand-50 text-brand-700 border-brand-200",
    iconColor: "text-brand-500",
  },
};

export default function ProductBadge({ type }: ProductBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full border ${config.className}`}
    >
      <Icon className={`w-3 h-3 ${config.iconColor}`} />
      {config.label}
    </motion.span>
  );
}
