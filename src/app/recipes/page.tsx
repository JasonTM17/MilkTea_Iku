"use client";

import { motion } from "framer-motion";
import { Heart, Share2, Clock, Users } from "lucide-react";
import { BobaCupIcon } from "@/components/icons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Recipe {
  id: number;
  title: string;
  description: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  time: string;
  servings: string;
  likes: number;
}

const recipes: Recipe[] = [
  { id: 1, title: "Brown Sugar Boba tại nhà", description: "Hướng dẫn làm trân châu đường nâu chuẩn vị Iku ngay tại nhà.", difficulty: "Trung bình", time: "45 phút", servings: "2 ly", likes: 234 },
  { id: 2, title: "Matcha Latte đơn giản", description: "Công thức matcha latte mát lạnh cho ngày hè.", difficulty: "Dễ", time: "10 phút", servings: "1 ly", likes: 189 },
  { id: 3, title: "Trà đào cam sả homemade", description: "Cách nấu trà đào cam sả thơm ngon, giải nhiệt.", difficulty: "Dễ", time: "20 phút", servings: "4 ly", likes: 312 },
  { id: 4, title: "Taro Milk Tea từ khoai môn tươi", description: "Bí quyết làm trà sữa khoai môn béo ngậy từ nguyên liệu tươi.", difficulty: "Khó", time: "60 phút", servings: "3 ly", likes: 156 },
];

const difficultyColors = {
  "Dễ": "bg-green-50 text-green-600",
  "Trung bình": "bg-yellow-50 text-yellow-600",
  "Khó": "bg-red-50 text-red-600",
};

export default function RecipesPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-display font-bold text-gray-900 mb-4"
            >
              Công thức tại nhà
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg"
            >
              Tự tay pha chế trà sữa Iku ngay tại nhà
            </motion.p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe, i) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center">
                  <BobaCupIcon className="w-14 h-14 text-brand-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.time}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {recipe.servings}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                      {recipe.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600 transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                      Chia sẻ
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
