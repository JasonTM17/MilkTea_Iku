"use client";

import { motion } from "framer-motion";
import { Zap, Users, TrendingUp, Award, Coffee, Heart } from "lucide-react";

const stats = [
  { icon: Coffee, value: "500K+", label: "Ly trà sữa đã bán", color: "text-brand-600" },
  { icon: Users, value: "100K+", label: "Khách hàng thân thiết", color: "text-blue-600" },
  { icon: TrendingUp, value: "6", label: "Chi nhánh toàn quốc", color: "text-green-600" },
  { icon: Award, value: "4.8/5", label: "Đánh giá trung bình", color: "text-yellow-600" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
