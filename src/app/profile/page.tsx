"use client";

import { motion } from "framer-motion";
import { User, MapPin, Phone, Mail, Edit2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-950">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-900 dark:to-gray-950 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mx-auto mb-4"
            >
              <User className="w-8 h-8 text-brand-600 dark:text-brand-300" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-1"
            >
              Nguyễn Văn A
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 text-sm"
            >
              Gold Member • 1,250 Stars
            </motion.p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">Thông tin cá nhân</h2>
              <button className="flex items-center gap-1.5 min-h-11 px-2 text-sm text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 font-medium">
                <Edit2 className="w-3.5 h-3.5" />
                Chỉnh sửa
              </button>
            </div>

            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {[
                { icon: User, label: "Họ tên", value: "Nguyễn Văn A" },
                { icon: Phone, label: "Số điện thoại", value: "0901 234 567" },
                { icon: Mail, label: "Email", value: "nguyenvana@email.com" },
                { icon: MapPin, label: "Địa chỉ", value: "123 Nguyễn Huệ, Q.1, TP.HCM" },
              ].map((field, i) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="px-6 py-4 flex items-center gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-cream-100 dark:bg-gray-700 flex items-center justify-center">
                    <field.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{field.label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{field.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6"
          >
            <h2 className="font-semibold text-gray-900 dark:text-gray-50 mb-4">Thống kê</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "28", label: "Đơn hàng" },
                { value: "1.2M", label: "Tổng chi tiêu" },
                { value: "Gold", label: "Hạng thành viên" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-cream-50 dark:bg-gray-900">
                  <p className="text-lg font-bold text-brand-600 dark:text-brand-400">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
