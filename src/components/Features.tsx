"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Shield, Leaf, Sparkles, Heart } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    desc: "Giao trong 30 phút nội thành",
    color: "from-orange-100 to-amber-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Clock,
    title: "Pha chế tươi",
    desc: "Mỗi ly được pha khi có đơn",
    color: "from-green-100 to-emerald-50",
    iconColor: "text-green-600",
  },
  {
    icon: Shield,
    title: "An toàn vệ sinh",
    desc: "Đạt chuẩn ATTP nghiêm ngặt",
    color: "from-blue-100 to-sky-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Leaf,
    title: "Nguyên liệu sạch",
    desc: "100% tự nhiên, không phụ gia",
    color: "from-emerald-100 to-teal-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Sparkles,
    title: "Công thức độc quyền",
    desc: "Hương vị riêng biệt, khó quên",
    color: "from-purple-100 to-violet-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Heart,
    title: "Yêu thương từng ly",
    desc: "Tận tâm trong mỗi sản phẩm",
    color: "from-pink-100 to-rose-50",
    iconColor: "text-pink-600",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-100 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cream-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Tại sao chọn <span className="text-brand-500">Iku</span>?
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm trà sữa tốt nhất cho bạn
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50"
            >
              <div
                className={`w-14 h-14 mb-4 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
