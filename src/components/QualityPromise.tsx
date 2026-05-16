"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Leaf, Clock, Award, Headphones } from "lucide-react";

const promises = [
  { icon: Leaf, title: "100% tự nhiên", description: "Không chất bảo quản, không hương liệu nhân tạo" },
  { icon: Clock, title: "Tươi mỗi ngày", description: "Nguyên liệu nhập mới mỗi sáng" },
  { icon: Shield, title: "An toàn thực phẩm", description: "Chứng nhận HACCP và ISO 22000" },
  { icon: Truck, title: "Giao nhanh 30'", description: "Cam kết giao đúng giờ hoặc hoàn tiền" },
  { icon: Award, title: "Đảm bảo hài lòng", description: "Đổi trả miễn phí nếu không đúng yêu cầu" },
  { icon: Headphones, title: "Hỗ trợ 24/7", description: "Đội ngũ CSKH luôn sẵn sàng hỗ trợ" },
];

export default function QualityPromise() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Cam kết của Iku
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            6 cam kết vàng mà chúng tôi luôn giữ vững
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((promise, i) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <promise.icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{promise.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{promise.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
