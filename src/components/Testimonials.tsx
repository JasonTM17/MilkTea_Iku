"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Minh Anh",
    avatar: "MA",
    rating: 5,
    text: "Trà sữa Iku ngon nhất mình từng uống! Trân châu dẻo, trà thơm, giao hàng nhanh. Sẽ quay lại nhiều lần nữa.",
    drink: "Brown Sugar Boba Milk",
  },
  {
    name: "Thanh Hà",
    avatar: "TH",
    rating: 5,
    text: "Mình rất thích Dirty Matcha Latte, sự kết hợp giữa matcha và espresso thật sự độc đáo. Quán decor cũng rất xinh!",
    drink: "Dirty Matcha Latte",
  },
  {
    name: "Hoàng Nam",
    avatar: "HN",
    rating: 5,
    text: "Đặt hàng online rất tiện, app dễ dùng. Trà đào cam sả luôn là lựa chọn số 1 của mình mỗi khi trời nóng.",
    drink: "Trà Đào Cam Sả",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Khách hàng nói gì
          </h2>
          <p className="text-gray-500 mt-2">
            Hơn 10,000 khách hàng hài lòng
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-cream-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center">
                  <span className="text-brand-700 font-semibold text-sm">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Đã đặt: {t.drink}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
