"use client";

import { motion } from "framer-motion";
import { Star, Crown, Gem, Gift, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import LoyaltyTiers from "@/components/LoyaltyTiers";

export default function LoyaltyPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-yellow-100 flex items-center justify-center"
            >
              <Crown className="w-8 h-8 text-yellow-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
            >
              Iku <span className="text-brand-600">Stars</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-xl mx-auto"
            >
              Tích điểm mỗi đơn hàng, đổi quà hấp dẫn và nhận ưu đãi độc quyền
            </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-14"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Hạng thành viên
            </h2>
            <LoyaltyTiers />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-14"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Cách tích điểm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-brand-50 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Mua hàng</h3>
                <p className="text-sm text-gray-500">10.000đ = 1 Star</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-brand-50 flex items-center justify-center">
                  <Star className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Đánh giá</h3>
                <p className="text-sm text-gray-500">+2 Stars mỗi đánh giá</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-brand-50 flex items-center justify-center">
                  <Gem className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Giới thiệu bạn</h3>
                <p className="text-sm text-gray-500">+10 Stars mỗi lần</p>
              </div>
            </div>
          </motion.div>

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
