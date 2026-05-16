"use client";

import { motion } from "framer-motion";
import { Smartphone, Bell, Gift, Star } from "lucide-react";

export default function AppPromo() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Tải app Iku ngay
            </h2>
            <p className="text-brand-100 text-lg mb-8 max-w-md">
              Đặt hàng nhanh hơn, nhận ưu đãi độc quyền và theo dõi đơn hàng real-time
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Bell, text: "Thông báo khuyến mãi sớm nhất" },
                { icon: Gift, text: "Ưu đãi độc quyền chỉ trên app" },
                { icon: Star, text: "Tích điểm Iku Stars tự động" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-brand-200" />
                  </div>
                  <span className="text-brand-100">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <a href="#" className="px-5 py-3 bg-white text-brand-700 rounded-xl font-medium text-sm hover:bg-cream-100 transition-colors">
                App Store
              </a>
              <a href="#" className="px-5 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-medium text-sm hover:bg-white/20 transition-colors">
                Google Play
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center"
          >
            <div className="w-56 h-[420px] rounded-[2.5rem] bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <Smartphone className="w-12 h-12 text-white/60 mx-auto mb-3" />
                <p className="text-white/80 font-medium">Iku App</p>
                <p className="text-white/50 text-sm mt-1">Sắp ra mắt</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
