"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    role: "Khách hàng thân thiết",
    quote:
      "Trà sữa Iku ngon nhất mình từng uống! Topping trân châu dai mềm, trà thơm tự nhiên. Mình order mỗi ngày luôn.",
    rating: 5,
    gradient: "from-brand-400 via-brand-500 to-brand-700",
    thumbBg: "bg-brand-100 dark:bg-brand-900",
  },
  {
    id: 2,
    name: "Trần Minh Khoa",
    role: "Food Blogger",
    quote:
      "Đã thử qua rất nhiều thương hiệu trà sữa nhưng Iku vẫn là số 1. Nguyên liệu tươi, không dùng bột pha sẵn.",
    rating: 5,
    gradient: "from-cream-400 via-amber-400 to-orange-500",
    thumbBg: "bg-amber-100 dark:bg-amber-900",
  },
  {
    id: 3,
    name: "Phạm Thu Hà",
    role: "Sinh viên ĐH Bách Khoa",
    quote:
      "Giá cả hợp lý, chất lượng premium. Mỗi lần stress học bài là mình lại order Iku để lấy lại năng lượng.",
    rating: 5,
    gradient: "from-pink-400 via-rose-400 to-brand-500",
    thumbBg: "bg-pink-100 dark:bg-pink-900",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function VideoTestimonial() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Khách hàng nói gì?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và yêu thích MilkTea Iku. Nghe
            họ chia sẻ trải nghiệm thực tế.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Video placeholder */}
              <div
                className={`relative h-52 bg-gradient-to-br ${t.gradient} flex items-center justify-center`}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Xem video của ${t.name}`}
                  className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/60 shadow-lg"
                >
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </motion.button>
                <span className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/30 px-2 py-0.5 rounded-full">
                  0:45
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.thumbBg} flex items-center justify-center font-bold text-brand-600 dark:text-brand-300 text-sm`}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
