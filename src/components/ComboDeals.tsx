"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const combos = [
  { id: 1, name: "Combo Đôi", items: "2 ly bất kỳ size M", price: 89000, originalPrice: 110000 },
  { id: 2, name: "Combo Gia Đình", items: "4 ly bất kỳ size M + 2 topping", price: 169000, originalPrice: 230000 },
  { id: 3, name: "Combo Văn Phòng", items: "5 ly bất kỳ size L", price: 245000, originalPrice: 325000 },
];

export default function ComboDeals() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <span className="text-sm font-medium text-brand-600">Tiết kiệm hơn</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Combo ưu đãi
            </h2>
          </div>
          <Link href="/menu" className="text-sm text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1">
            Xem menu
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {combos.map((combo, i) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
            >
              <div className="w-full aspect-[3/2] rounded-xl bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center mb-4">
                <span className="text-5xl group-hover:scale-110 transition-transform">🧋</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">{combo.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{combo.items}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xl font-bold text-brand-600">
                  {combo.price.toLocaleString("vi-VN")}đ
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {combo.originalPrice.toLocaleString("vi-VN")}đ
                </span>
                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-full">
                  -{Math.round((1 - combo.price / combo.originalPrice) * 100)}%
                </span>
              </div>
              <button className="w-full mt-4 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors">
                Thêm vào giỏ
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
