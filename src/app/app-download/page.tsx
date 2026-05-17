"use client";

import { motion } from "framer-motion";
import { Smartphone, Download, Star, Shield, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const features = [
  { icon: Zap, title: "Đặt hàng nhanh", description: "Chỉ 3 bước để hoàn tất đơn hàng" },
  { icon: Star, title: "Tích điểm tự động", description: "Iku Stars tích lũy mỗi đơn" },
  { icon: Shield, title: "Thanh toán an toàn", description: "Mã hóa SSL, bảo mật tuyệt đối" },
];

export default function AppDownloadPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 overflow-x-hidden">
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-5">
                  Ứng dụng di động
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-5 leading-tight">
                  Đặt trà sữa <br />
                  <span className="text-brand-600">mọi lúc, mọi nơi</span>
                </h1>
                <p className="text-gray-500 text-lg mb-8 max-w-md">
                  Tải app Iku để đặt hàng nhanh hơn, nhận ưu đãi độc quyền và theo dõi đơn hàng real-time.
                </p>

                <div className="space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{feature.title}</p>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    App Store
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Google Play
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-64 h-[500px] rounded-[3rem] bg-gradient-to-b from-brand-100 to-cream-200 border-8 border-gray-900 shadow-2xl flex items-center justify-center">
                    <div className="text-center px-6">
                      <Smartphone className="w-16 h-16 text-brand-400 mx-auto mb-4" />
                      <p className="text-brand-700 font-display font-bold text-xl mb-2">Iku App</p>
                      <p className="text-sm text-brand-500">Sắp ra mắt</p>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
                    <span className="text-white font-bold text-sm text-center leading-tight">Coming<br/>Soon</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
