"use client";

import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: QuantitySelectorProps) {
  const buttonSize = size === "sm" ? "min-w-9 min-h-9 w-9 h-9" : "min-w-11 min-h-11 w-11 h-11";
  const textSize = size === "sm" ? "text-sm w-8" : "text-base w-12";

  return (
    <div className="flex items-center gap-1.5">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${buttonSize} rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
        aria-label="Giảm số lượng"
      >
        <Minus className="w-4 h-4" />
      </motion.button>
      <span className={`${textSize} text-center font-semibold text-gray-900 dark:text-gray-50`}>
        {value}
      </span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${buttonSize} rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
        aria-label="Tăng số lượng"
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
