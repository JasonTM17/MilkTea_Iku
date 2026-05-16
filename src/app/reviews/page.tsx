"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  likes: number;
  replies: number;
}

const reviews: Review[] = [
  { id: 1, user: "Minh Anh", avatar: "MA", rating: 5, date: "14/05/2024", product: "Brown Sugar Boba", comment: "Trân châu dẻo mềm, đường nâu thơm lừng. Ly nào cũng ngon như ly đầu tiên!", likes: 12, replies: 2 },
  { id: 2, user: "Thanh Hà", avatar: "TH", rating: 5, date: "13/05/2024", product: "Matcha Latte", comment: "Matcha đậm vị, không bị đắng. Uống lạnh hay nóng đều tuyệt. Sẽ order lại!", likes: 8, replies: 1 },
  { id: 3, user: "Đức Phong", avatar: "DP", rating: 4, date: "12/05/2024", product: "Taro Milk Tea", comment: "Vị khoai môn béo ngậy, topping đa dạng. Chỉ hơi ngọt một chút so với khẩu vị mình.", likes: 5, replies: 0 },
  { id: 4, user: "Ngọc Trâm", avatar: "NT", rating: 5, date: "11/05/2024", product: "Trà Đào Cam Sả", comment: "Mát lạnh, chua ngọt vừa phải. Uống mùa hè là chuẩn bài!", likes: 15, replies: 3 },
  { id: 5, user: "Hoàng Nam", avatar: "HN", rating: 5, date: "10/05/2024", product: "Oolong Milk Tea", comment: "Trà oolong thơm, sữa béo vừa. Giao hàng nhanh, đóng gói cẩn thận.", likes: 7, replies: 1 },
  { id: 6, user: "Phương Linh", avatar: "PL", rating: 4, date: "09/05/2024", product: "Strawberry Smoothie", comment: "Dâu tươi ngon, blend mịn. Hơi ít so với giá nhưng chất lượng ổn.", likes: 3, replies: 0 },
];

export default function ReviewsPage() {
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
              Đánh giá từ khách hàng
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500">4.9/5 từ 2,000+ đánh giá</span>
            </motion.div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-sm font-semibold text-brand-700 shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{review.user}</h4>
                        <p className="text-xs text-gray-400">{review.date} • {review.product}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {review.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600 transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {review.replies}
                      </button>
                    </div>
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
