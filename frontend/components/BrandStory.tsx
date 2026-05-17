"use client";

import { motion } from "framer-motion";
import { Coffee, Leaf, Sparkles } from "lucide-react";
import { BobaCupIcon } from "@/components/icons";

export default function BrandStory() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-medium mb-4">
              Câu chuyện thương hiệu
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
              Từ đam mê đến <span className="text-brand-600">hương vị</span>
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Iku ra đời từ niềm đam mê mãnh liệt với trà sữa và mong muốn mang đến
                những ly trà chất lượng nhất cho người Việt. Mỗi công thức đều được nghiên
                cứu kỹ lưỡng, kết hợp giữa truyền thống Á Đông và sáng tạo hiện đại.
              </p>
              <p>
                Chúng tôi chọn lọc nguyên liệu từ những vùng trà nổi tiếng: matcha Uji từ
                Kyoto, trà oolong từ Đài Loan, và đường nâu thủ công từ Okinawa. Mỗi ly Iku
                là một hành trình hương vị.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: "50+", label: "Công thức" },
                { value: "10K+", label: "Khách hàng" },
                { value: "4.9★", label: "Đánh giá" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-brand-600">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center">
                  <Coffee className="w-14 h-14 text-brand-600 opacity-60" />
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-cream-100 to-brand-50 flex items-center justify-center">
                  <BobaCupIcon className="w-10 h-10 text-brand-600 opacity-60" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-50 to-brand-50 flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-green-600 opacity-60" />
                </div>
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-50 to-cream-100 flex items-center justify-center">
                  <Sparkles className="w-14 h-14 text-brand-500 opacity-60" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
