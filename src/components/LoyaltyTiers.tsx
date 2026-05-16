"use client";

import { motion } from "framer-motion";
import { Star, Crown, Gem, Sparkles } from "lucide-react";

interface Tier {
  name: string;
  icon: typeof Star;
  minStars: number;
  benefits: string[];
  color: string;
  bgColor: string;
}

const tiers: Tier[] = [
  {
    name: "Silver",
    icon: Star,
    minStars: 0,
    benefits: ["Tích điểm 1x", "Ưu đãi sinh nhật", "Thông báo khuyến mãi sớm"],
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  },
  {
    name: "Gold",
    icon: Crown,
    minStars: 100,
    benefits: ["Tích điểm 1.5x", "Giảm 10% mỗi đơn", "Free topping", "Ưu đãi sinh nhật x2"],
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Diamond",
    icon: Gem,
    minStars: 300,
    benefits: ["Tích điểm 2x", "Giảm 15% mỗi đơn", "Free ship mọi đơn", "Quà tặng hàng tháng", "Ưu tiên giao hàng"],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export default function LoyaltyTiers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          {i === 2 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Cao nhất
            </div>
          )}
          <div className={`w-14 h-14 rounded-2xl ${tier.bgColor} flex items-center justify-center mb-4`}>
            <tier.icon className={`w-7 h-7 ${tier.color}`} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
          <p className="text-sm text-gray-500 mb-4">Từ {tier.minStars} stars</p>
          <ul className="space-y-2">
            {tier.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
