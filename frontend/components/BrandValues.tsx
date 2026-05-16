"use client";

import { motion } from "framer-motion";
import { Users, Heart, Target, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Tận tâm",
    description: "Mỗi ly trà sữa được pha chế với tình yêu và sự tỉ mỉ",
  },
  {
    icon: Target,
    title: "Chất lượng",
    description: "Không thỏa hiệp về nguyên liệu và quy trình",
  },
  {
    icon: Users,
    title: "Cộng đồng",
    description: "Xây dựng không gian kết nối cho giới trẻ",
  },
  {
    icon: Lightbulb,
    title: "Sáng tạo",
    description: "Luôn đổi mới menu và trải nghiệm khách hàng",
  },
];

export default function BrandValues() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Giá trị cốt lõi
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Những giá trị định hình mọi quyết định của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-50 flex items-center justify-center">
                <value.icon className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
