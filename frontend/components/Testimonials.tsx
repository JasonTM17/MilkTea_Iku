"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Minh Anh",
    avatar: "MA",
    rating: 5,
    text: "Trà sữa Iku ngon nhất mình từng uống! Trân châu dẻo, trà thơm, giao hàng nhanh. Sẽ quay lại nhiều lần nữa.",
    drink: "Brown Sugar Boba Milk",
    color: "bg-brand-200",
  },
  {
    name: "Thanh Hà",
    avatar: "TH",
    rating: 5,
    text: "Mình rất thích Dirty Matcha Latte, sự kết hợp giữa matcha và espresso thật sự độc đáo. Quán decor cũng rất xinh!",
    drink: "Dirty Matcha Latte",
    color: "bg-green-200",
  },
  {
    name: "Hoàng Nam",
    avatar: "HN",
    rating: 5,
    text: "Đặt hàng online rất tiện, app dễ dùng. Trà đào cam sả luôn là lựa chọn số 1 của mình mỗi khi trời nóng.",
    drink: "Trà Đào Cam Sả",
    color: "bg-amber-200",
  },
  {
    name: "Phương Linh",
    avatar: "PL",
    rating: 5,
    text: "Taro Milk Tea ở đây cực kỳ béo ngậy mà không ngán. Topping phô mai tươi là must-try luôn nha mọi người!",
    drink: "Taro Milk Tea",
    color: "bg-purple-200",
  },
  {
    name: "Đức Minh",
    avatar: "ĐM",
    rating: 5,
    text: "Mỗi tuần đặt ít nhất 3 lần. Chương trình tích điểm rất hời, đã đổi được mấy ly free rồi. Highly recommend!",
    drink: "Tiger Sugar Boba",
    color: "bg-orange-200",
  },
  {
    name: "Thu Trang",
    avatar: "TT",
    rating: 5,
    text: "Trà oolong sữa ở Iku có vị trà rất đậm đà, không bị ngọt gắt như mấy quán khác. Packaging cũng xinh nữa!",
    drink: "Oolong Milk Tea",
    color: "bg-yellow-200",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream-50 dark:from-gray-900 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50">
            Khách hàng yêu thích <span className="text-brand-500">Iku</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Hơn 10,000+ khách hàng hài lòng và quay lại mỗi tuần
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100/80 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-brand-200" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div
                      className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center`}
                    >
                      <span className="text-gray-700 dark:text-gray-200 font-semibold text-xs">
                        {t.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-50">
                        {t.name}
                      </div>
                      <div className="text-xs text-brand-500 font-medium">
                        {t.drink}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
