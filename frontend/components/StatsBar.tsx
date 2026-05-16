"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Users, Star } from "lucide-react";

const stats = [
  { icon: ShoppingBag, value: "50,000+", label: "Đơn hàng mỗi tháng", color: "text-brand-600 bg-brand-50" },
  { icon: Users, value: "10,000+", label: "Khách hàng thân thiết", color: "text-blue-600 bg-blue-50" },
  { icon: Star, value: "4.9/5", label: "Đánh giá trung bình", color: "text-yellow-600 bg-yellow-50" },
  { icon: TrendingUp, value: "15+", label: "Chi nhánh toàn quốc", color: "text-green-600 bg-green-50" },
];

export default function StatsBar() {
  return (
    <section className="py-10 bg-cream-50 border-y border-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
