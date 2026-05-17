"use client";

import { motion } from "framer-motion";
import { Timer, Flame, Snowflake, Droplets } from "lucide-react";

interface SizeOption {
  id: string;
  label: string;
  price: string;
  active: boolean;
  onClick: () => void;
}

interface CustomizationPanelProps {
  sizes: SizeOption[];
  sugarLevel: number;
  iceLevel: number;
  onSugarChange: (level: number) => void;
  onIceChange: (level: number) => void;
}

const sugarOptions = [
  { value: 0, label: "0%" },
  { value: 30, label: "30%" },
  { value: 50, label: "50%" },
  { value: 70, label: "70%" },
  { value: 100, label: "100%" },
];

const iceOptions = [
  { value: 0, label: "Không đá" },
  { value: 30, label: "Ít" },
  { value: 50, label: "50%" },
  { value: 70, label: "70%" },
  { value: 100, label: "Bình thường" },
];

export default function CustomizationPanel({
  sizes,
  sugarLevel,
  iceLevel,
  onSugarChange,
  onIceChange,
}: CustomizationPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Timer className="w-4 h-4 text-brand-500" />
          Kích cỡ
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={size.onClick}
              className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                size.active
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300"
                  : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-brand-300"
              }`}
            >
              <span className="block font-semibold">{size.label}</span>
              <span className="block text-xs mt-0.5 opacity-70">{size.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Droplets className="w-4 h-4 text-brand-500" />
          Độ ngọt
        </h4>
        <div className="flex gap-1.5">
          {sugarOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSugarChange(option.value)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                sugarLevel === option.value
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Snowflake className="w-4 h-4 text-brand-500" />
          Đá
        </h4>
        <div className="flex gap-1.5">
          {iceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onIceChange(option.value)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                iceLevel === option.value
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
