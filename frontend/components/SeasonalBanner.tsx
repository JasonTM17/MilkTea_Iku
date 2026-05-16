"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function SeasonalBanner() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 dark:from-amber-500 dark:via-orange-500 dark:to-rose-500 shadow-xl"
        >
          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-white/5 rounded-full blur-2xl" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10 md:py-12">
            {/* Text content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Giới hạn mùa hè 2024
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3 leading-tight">
                Menu Mùa Hè
              </h2>
              <p className="text-white/85 text-base max-w-md leading-relaxed">
                Bộ sưu tập thức uống mới — mát lạnh, tươi trái cây, và đầy màu
                sắc. Chỉ có trong mùa hè này, đừng bỏ lỡ!
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/menu?season=summer"
                  className="inline-flex items-center gap-2 bg-white text-orange-500 font-semibold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm"
                >
                  Khám phá ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
