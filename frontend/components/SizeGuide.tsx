"use client";

import { motion } from "framer-motion";
import { Ruler } from "lucide-react";

const sizes = [
  { name: "S", ml: "350ml", description: "Vừa đủ cho 1 người", price: "+0đ" },
  { name: "M", ml: "500ml", description: "Size phổ biến nhất", price: "+6.000đ" },
  { name: "L", ml: "700ml", description: "Cho ai thích uống nhiều", price: "+12.000đ" },
];

export default function SizeGuide() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="w-4 h-4 text-brand-600" />
        <h3 className="font-semibold text-gray-900 text-sm">Hướng dẫn chọn size</h3>
      </div>
      <div className="space-y-3">
        {sizes.map((size, i) => (
          <motion.div
            key={size.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-cream-50 border border-cream-100"
          >
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-700 text-sm">
              {size.name}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{size.ml}</span>
                <span className="text-xs text-brand-600 font-medium">{size.price}</span>
              </div>
              <p className="text-xs text-gray-500">{size.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
