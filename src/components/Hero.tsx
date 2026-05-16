"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-white" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-20 h-20 rounded-full bg-brand-200/30 blur-xl"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-brand-300/20 blur-xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6"
            >
              Thương hiệu trà sữa premium
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
              Mỗi ngụm là một{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
                trải nghiệm
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Khám phá hương vị trà sữa cao cấp được chế biến từ nguyên liệu
              tươi ngon nhất. Đặt hàng ngay, giao tận nơi trong 30 phút.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center px-8 py-3.5 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5"
              >
                Xem Menu
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-3.5 border-2 border-brand-200 text-brand-700 rounded-full font-medium hover:bg-brand-50 transition-all"
              >
                Câu chuyện Iku
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-brand-100">
              {[
                { value: "20+", label: "Hương vị" },
                { value: "10K+", label: "Khách hàng" },
                { value: "4.9", label: "Đánh giá" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-brand-700">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-200 to-brand-400 rounded-full opacity-20 blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&h=600&fit=crop"
                alt="Trà sữa Iku"
                width={600}
                height={600}
                className="relative rounded-3xl object-cover shadow-2xl"
                priority
              />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🧋</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Best Seller</div>
                    <div className="text-xs text-gray-500">Brown Sugar Boba</div>
                  </div>
                </div>
              </motion.div>

              {/* Rating badge */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3"
              >
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm font-medium ml-1">4.9</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
