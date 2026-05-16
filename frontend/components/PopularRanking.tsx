"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Clock, Heart } from "lucide-react";

interface PopularItem {
  rank: number;
  name: string;
  orders: string;
  trend: "up" | "stable";
}

const popularItems: PopularItem[] = [
  { rank: 1, name: "Brown Sugar Boba", orders: "2,340", trend: "up" },
  { rank: 2, name: "Matcha Latte", orders: "1,890", trend: "up" },
  { rank: 3, name: "Taro Milk Tea", orders: "1,650", trend: "stable" },
  { rank: 4, name: "Trà Đào Cam Sả", orders: "1,420", trend: "up" },
  { rank: 5, name: "Oolong Milk Tea", orders: "1,200", trend: "stable" },
];

export default function PopularRanking() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50">
              Bảng xếp hạng tuần
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Được đặt nhiều nhất tuần này</p>
          </div>
        </div>

        <div className="space-y-3">
          {popularItems.map((item, i) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-cream-50 dark:bg-gray-800 border border-cream-100 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-700 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                item.rank <= 3
                  ? "bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}>
                {item.rank}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-50 text-sm">{item.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.orders} đơn</span>
                {item.trend === "up" && (
                  <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
