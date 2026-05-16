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
  const buttonSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const textSize = size === "sm" ? "text-sm w-8" : "text-base w-10";

  return (
    <div className="flex items-center gap-1">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${buttonSize} rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Giảm số lượng"
      >
        <Minus className="w-3.5 h-3.5" />
      </motion.button>
      <span className={`${textSize} text-center font-semibold text-gray-900`}>
        {value}
      </span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${buttonSize} rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Tăng số lượng"
      >
        <Plus className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}
