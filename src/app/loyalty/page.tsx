"use client";

import { motion } from "framer-motion";
import { Star, Crown, Gem, Gift, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import LoyaltyTiers from "@/components/LoyaltyTiers";

const CURRENT_POINTS = 140;
const NEXT_TIER_POINTS = 300;
const CURRENT_TIER = "Gold";

export default function LoyaltyPage() {
  const progress = Math.min((CURRENT_POINTS / NEXT_TIER_POINTS) * 100, 100);

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center"
            >
              <Crown className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Chương trình{" "}
              <span className="text-brand-600 dark:text-brand-400">thành viên</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
            >
              Tích điểm mỗi đơn hàng, đổi quà hấp dẫn và nhận ưu đãi độc quyền
            </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">
          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-8"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hạng hiện tại</p>
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5">
                  <Crown className="w-5 h-5" />
                  {CURRENT_TIER}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Điểm hiện tại</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {CURRENT_POINTS}{" "}
                  <span className="text-base font-medium text-brand-600 dark:text-brand-400">
                    Stars
                  </span>
                </p>
              </div>
            </div>

            <div className="relative h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-yellow-500 rounded-full"
              />
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
              <span>{CURRENT_POINTS} Stars</span>
              <span>
                Còn {NEXT_TIER_POINTS - CURRENT_POINTS} Stars để lên{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  Diamond
                </span>
              </span>
              <span>{NEXT_TIER_POINTS} Stars</span>
            </div>
          </motion.div>

          {/* Membership tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 text-center">
              Hạng thành viên
            </h2>
            <LoyaltyTiers />
          </motion.div>

          {/* How to earn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-8"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 text-center">
              Cách tích điểm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Gift, title: "Mua hàng", desc: "10.000đ = 1 Star" },
                { icon: Star, title: "Đánh giá", desc: "+2 Stars mỗi đánh giá" },
                { icon: Gem, title: "Giới thiệu bạn", desc: "+10 Stars mỗi lần" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              Bắt đầu tích điểm
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
