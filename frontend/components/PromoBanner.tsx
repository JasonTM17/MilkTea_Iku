"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const promos = [
  "Miễn phí giao hàng cho đơn từ 100K",
  "Mua 2 tặng 1 mỗi thứ 3 hàng tuần",
  "Thành viên mới giảm 20% đơn đầu tiên",
];

export default function PromoBanner() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-600 text-white relative z-[60]">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPromo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-center"
          >
            {promos[currentPromo]}
          </motion.p>
        </AnimatePresence>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 rounded-full hover:bg-brand-500 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
