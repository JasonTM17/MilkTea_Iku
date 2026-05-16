"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

interface TrendingItem {
  id: string;
  name: string;
  slug: string;
  orders: number;
}

const trendingItems: TrendingItem[] = [
  { id: "1", name: "Brown Sugar Boba", slug: "brown-sugar-boba", orders: 1250 },
  { id: "2", name: "Trà Sữa Oolong", slug: "tra-sua-oolong", orders: 980 },
  { id: "3", name: "Matcha Latte", slug: "matcha-latte-da-xay", orders: 870 },
  { id: "4", name: "Trà Đào Cam Sả", slug: "tra-dao-cam-sa", orders: 750 },
  { id: "5", name: "Dirty Matcha", slug: "dirty-matcha-latte", orders: 620 },
];

export default function TrendingProducts() {
  return (
    <section className="py-10">
      <div className="flex items-center gap-2 mb-5">
        <Flame className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-display font-bold text-gray-900">
          Đang hot tuần này
        </h3>
      </div>

      <div className="space-y-2">
        {trendingItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              href={`/menu/${item.slug}`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-100 transition-colors group"
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                i === 0 ? "bg-red-100 text-red-600" :
                i === 1 ? "bg-orange-100 text-orange-600" :
                i === 2 ? "bg-yellow-100 text-yellow-600" :
                "bg-gray-100 text-gray-500"
              }`}>
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 group-hover:text-brand-600 transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.orders} đơn tuần này
                </p>
              </div>
              <svg className="w-7 h-7 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8H7l1.5 12h7L17 8z"/><path d="M6 8h12l-.5-2H6.5L6 8z"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="10" cy="17" r="1" fill="currentColor" stroke="none"/></svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
