"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Shield, Leaf } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Giao hàng nhanh",
    desc: "Giao trong 30 phút nội thành",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Pha chế tươi",
    desc: "Mỗi ly được pha khi có đơn",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "An toàn vệ sinh",
    desc: "Đạt chuẩn ATTP nghiêm ngặt",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Nguyên liệu sạch",
    desc: "100% tự nhiên, không phụ gia",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-cream-50 border-y border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
