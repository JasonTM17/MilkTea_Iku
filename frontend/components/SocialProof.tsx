"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Minh Anh",
    avatar: "MA",
    rating: 5,
    text: "Brown Sugar Boba ngon xuất sắc! Trân châu dẻo, đường nâu thơm lừng. Sẽ quay lại mỗi ngày.",
    product: "Brown Sugar Boba",
  },
  {
    id: 2,
    name: "Thanh Hà",
    avatar: "TH",
    rating: 5,
    text: "Matcha Latte ở đây chuẩn vị Nhật, không quá ngọt. Đóng gói đẹp, giao hàng nhanh.",
    product: "Matcha Latte",
  },
  {
    id: 3,
    name: "Đức Phong",
    avatar: "DP",
    rating: 5,
    text: "Taro Milk Tea béo ngậy, topping phong phú. App đặt hàng tiện lợi, tích điểm nhanh.",
    product: "Taro Milk Tea",
  },
  {
    id: 4,
    name: "Ngọc Trâm",
    avatar: "NT",
    rating: 5,
    text: "Trà đào cam sả mát lạnh, vị chua ngọt hài hòa. Uống là ghiền luôn!",
    product: "Trà Đào Cam Sả",
  },
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Khách hàng nói gì?
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-gray-500">4.9/5 từ 2,000+ đánh giá</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <Quote className="w-6 h-6 text-brand-200 mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-700">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{review.name}</p>
                  <p className="text-[10px] text-gray-400">{review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
