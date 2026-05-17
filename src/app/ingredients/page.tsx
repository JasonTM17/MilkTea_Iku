"use client";

import { motion } from "framer-motion";
import { Leaf, Droplets, Mountain, Award, Heart, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const ingredients = [
  {
    icon: Leaf,
    title: "Trà nhập khẩu",
    origin: "Đài Loan & Nhật Bản",
    description: "Lá trà Oolong, Assam, Matcha được chọn lọc từ những vùng trà nổi tiếng nhất.",
  },
  {
    icon: Droplets,
    title: "Sữa tươi organic",
    origin: "Hokkaido, Nhật Bản",
    description: "Sữa tươi nguyên chất không chất bảo quản, béo ngậy tự nhiên.",
  },
  {
    icon: Mountain,
    title: "Đường mía thủ công",
    origin: "Okinawa, Nhật Bản",
    description: "Đường nâu Okinawa lên men tự nhiên, tạo vị caramel đặc trưng.",
  },
  {
    icon: Award,
    title: "Trân châu tươi",
    origin: "Làm tại cửa hàng",
    description: "Trân châu được nấu mới mỗi 4 giờ, đảm bảo độ dai mềm hoàn hảo.",
  },
  {
    icon: Heart,
    title: "Trái cây tươi",
    origin: "Vườn Đà Lạt & Bến Tre",
    description: "Đào, vải, chanh dây, dừa tươi được giao mỗi sáng từ vườn.",
  },
  {
    icon: Sparkles,
    title: "Cream cheese",
    origin: "New Zealand",
    description: "Cream cheese nhập khẩu, đánh bông mịn với công thức riêng của Iku.",
  },
];

export default function IngredientsPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-5"
            >
              Nguyên liệu
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Nguyên liệu <span className="text-brand-600">tươi sạch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
            >
              Chúng tôi chỉ sử dụng nguyên liệu cao cấp nhập khẩu trực tiếp, không chất bảo quản
            </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">{item.title}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-3">{item.origin}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-10 text-center text-white"
          >
            <h3 className="text-2xl font-display font-bold mb-3">
              Cam kết chất lượng
            </h3>
            <p className="text-green-100 max-w-lg mx-auto mb-6">
              100% nguyên liệu có chứng nhận an toàn thực phẩm. Kiểm tra chất lượng nghiêm ngặt
              từ nguồn cung đến ly trà sữa trên tay bạn.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-green-200">Tự nhiên</p>
              </div>
              <div className="w-px h-10 bg-green-400/30" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-green-200">Chất bảo quản</p>
              </div>
              <div className="w-px h-10 bg-green-400/30" />
              <div>
                <p className="text-2xl font-bold">6+</p>
                <p className="text-green-200">Quốc gia nhập khẩu</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
