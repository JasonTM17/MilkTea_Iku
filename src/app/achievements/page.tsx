"use client";

import { motion } from "framer-motion";
import { Award, PartyPopper, Trophy, Crown, Heart, Star, Gem, Coffee, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const achievements = [
  { id: 1, title: "Người mới", description: "Đặt đơn hàng đầu tiên", icon: <PartyPopper className="w-6 h-6" />, unlocked: true },
  { id: 2, title: "Tín đồ trà sữa", description: "Đặt 10 đơn hàng", icon: <Coffee className="w-6 h-6" />, unlocked: true },
  { id: 3, title: "Sành điệu", description: "Thử 5 loại trà khác nhau", icon: <Sparkles className="w-6 h-6" />, unlocked: true },
  { id: 4, title: "Topping Master", description: "Thử tất cả topping", icon: <Trophy className="w-6 h-6" />, unlocked: false },
  { id: 5, title: "VIP", description: "Chi tiêu trên 1 triệu", icon: <Crown className="w-6 h-6" />, unlocked: false },
  { id: 6, title: "Chia sẻ yêu thương", description: "Giới thiệu 3 bạn bè", icon: <Heart className="w-6 h-6" />, unlocked: false },
  { id: 7, title: "Đánh giá viên", description: "Viết 5 đánh giá", icon: <Star className="w-6 h-6" />, unlocked: true },
  { id: 8, title: "Collector", description: "Sưu tập 20 Stars", icon: <Gem className="w-6 h-6" />, unlocked: false },
];

export default function AchievementsPage() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-5"
            >
              <Award className="w-7 h-7 text-brand-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Thành tựu
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Đã mở khóa {unlockedCount}/{achievements.length} thành tựu
            </motion.p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl border shadow-sm p-5 flex items-center gap-4 ${
                  achievement.unlocked ? "border-brand-200 dark:border-brand-700" : "border-gray-100 dark:border-gray-700 opacity-60"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  achievement.unlocked ? "bg-brand-50 dark:bg-brand-900/30" : "bg-gray-50 dark:bg-gray-700 grayscale"
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-50 text-sm">{achievement.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <span className="text-[10px] font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                    Đã mở
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
