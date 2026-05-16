"use client";

import { motion } from "framer-motion";
import { Newspaper, Calendar, ArrowRight, Tag } from "lucide-react";
import { BobaCupIcon } from "@/components/icons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Bí quyết chọn trà sữa phù hợp với khẩu vị",
    excerpt: "Hướng dẫn chi tiết cách chọn loại trà, độ ngọt, và topping phù hợp với sở thích cá nhân.",
    date: "15/05/2024",
    category: "Mẹo hay",
    readTime: "5 phút",
  },
  {
    id: 2,
    title: "Matcha Nhật Bản: Từ vườn trà đến ly Iku",
    excerpt: "Hành trình của lá matcha Uji từ Kyoto đến cửa hàng Iku tại Việt Nam.",
    date: "10/05/2024",
    category: "Nguyên liệu",
    readTime: "7 phút",
  },
  {
    id: 3,
    title: "Top 5 combo trà sữa cho mùa hè 2024",
    excerpt: "Những sự kết hợp trà sữa + topping giải nhiệt hoàn hảo cho ngày nắng nóng.",
    date: "05/05/2024",
    category: "Gợi ý",
    readTime: "4 phút",
  },
  {
    id: 4,
    title: "Câu chuyện đằng sau Brown Sugar Boba",
    excerpt: "Tại sao trân châu đường đen lại trở thành hiện tượng toàn cầu và bí mật công thức của Iku.",
    date: "28/04/2024",
    category: "Câu chuyện",
    readTime: "6 phút",
  },
  {
    id: 5,
    title: "Iku Stars: Cách tích điểm và đổi quà hiệu quả",
    excerpt: "Hướng dẫn tận dụng tối đa chương trình khách hàng thân thiết Iku Stars.",
    date: "20/04/2024",
    category: "Hướng dẫn",
    readTime: "3 phút",
  },
];

const categoryColors: Record<string, string> = {
  "Mẹo hay": "bg-blue-50 text-blue-600",
  "Nguyên liệu": "bg-green-50 text-green-600",
  "Gợi ý": "bg-purple-50 text-purple-600",
  "Câu chuyện": "bg-brand-50 text-brand-600",
  "Hướng dẫn": "bg-yellow-50 text-yellow-600",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-5"
            >
              <Newspaper className="w-3.5 h-3.5 inline mr-1" />
              Blog
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-gray-900 mb-4"
            >
              Tin tức & Bài viết
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg"
            >
              Khám phá thế giới trà sữa cùng Iku
            </motion.p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-xl bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center">
                    <BobaCupIcon className="w-8 h-8 text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${categoryColors[post.category] || "bg-gray-50 text-gray-600"}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="text-xs text-gray-400">{post.readTime} đọc</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
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
