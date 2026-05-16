"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  gradient: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Bí quyết chọn trà sữa phù hợp với khẩu vị",
    excerpt:
      "Hướng dẫn chi tiết cách chọn loại trà, độ ngọt, và topping phù hợp với sở thích cá nhân của bạn.",
    date: "15/05/2024",
    category: "Mẹo hay",
    readTime: "5 phút",
    gradient: "from-amber-100 to-orange-200",
  },
  {
    id: 2,
    title: "Matcha Nhật Bản: Từ vườn trà đến ly Iku",
    excerpt:
      "Hành trình của lá matcha Uji từ Kyoto đến cửa hàng Iku tại Việt Nam — câu chuyện về chất lượng và đam mê.",
    date: "10/05/2024",
    category: "Nguyên liệu",
    readTime: "7 phút",
    gradient: "from-green-100 to-emerald-200",
  },
  {
    id: 3,
    title: "Top 5 combo trà sữa cho mùa hè 2024",
    excerpt:
      "Những sự kết hợp trà sữa và topping giải nhiệt hoàn hảo cho những ngày nắng nóng oi bức.",
    date: "05/05/2024",
    category: "Gợi ý",
    readTime: "4 phút",
    gradient: "from-sky-100 to-blue-200",
  },
  {
    id: 4,
    title: "Câu chuyện đằng sau Brown Sugar Boba",
    excerpt:
      "Tại sao trân châu đường đen lại trở thành hiện tượng toàn cầu và bí mật công thức đặc biệt của Iku.",
    date: "28/04/2024",
    category: "Câu chuyện",
    readTime: "6 phút",
    gradient: "from-yellow-100 to-amber-200",
  },
];

const categoryColors: Record<string, string> = {
  "Mẹo hay": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Nguyên liệu": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "Gợi ý": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "Câu chuyện": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium mb-5"
            >
              <Newspaper className="w-3.5 h-3.5" />
              Blog
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Tin tức &amp; Công thức
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
            >
              Khám phá thế giới trà sữa, công thức pha chế và câu chuyện thú vị cùng Iku
            </motion.p>
          </div>
        </section>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
              >
                {/* Gradient image placeholder */}
                <div
                  className={`aspect-[16/9] bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,white,transparent_60%)]" />
                  <svg className="relative w-10 h-10 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8H7l1.5 12h7L17 8z"/><path d="M6 8h12l-.5-2H6.5L6 8z"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/></svg>
                </div>

                <div className="p-5">
                  {/* Category + meta */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${
                        categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
                    Đọc thêm
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
