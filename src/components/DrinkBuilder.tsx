"use client";

import { motion } from "framer-motion";
import { Palette, Droplets, Thermometer, Plus } from "lucide-react";
import { useState } from "react";

const sizes = [
  { id: "S", label: "S", ml: "350ml", extra: 0 },
  { id: "M", label: "M", ml: "500ml", extra: 6000 },
  { id: "L", label: "L", ml: "700ml", extra: 12000 },
];

const sugarLevels = [
  { id: "0", label: "0%", desc: "Không đường" },
  { id: "30", label: "30%", desc: "Ít ngọt" },
  { id: "50", label: "50%", desc: "Nửa đường" },
  { id: "70", label: "70%", desc: "Bình thường" },
  { id: "100", label: "100%", desc: "Ngọt đầy đủ" },
];

const iceLevels = [
  { id: "0", label: "Không đá" },
  { id: "30", label: "Ít đá" },
  { id: "50", label: "Nửa đá" },
  { id: "100", label: "Đầy đá" },
];

export default function DrinkBuilder() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedSugar, setSelectedSugar] = useState("70");
  const [selectedIce, setSelectedIce] = useState("100");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-brand-600" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm">Chọn size</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedSize === size.id
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-brand-200"
              }`}
            >
              <span className="block text-lg font-bold text-gray-900 dark:text-gray-50">{size.label}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">{size.ml}</span>
              {size.extra > 0 && (
                <span className="block text-[10px] text-brand-600 mt-1">+{size.extra.toLocaleString("vi-VN")}đ</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="w-4 h-4 text-brand-600" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm">Độ ngọt</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {sugarLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedSugar(level.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedSugar === level.id
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Thermometer className="w-4 h-4 text-brand-600" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm">Đá</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {iceLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedIce(level.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedIce === level.id
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
