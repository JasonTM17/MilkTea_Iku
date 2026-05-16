"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Clock, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Giao hàng miễn phí",
    description: "Đơn từ 100.000đ trong bán kính 5km",
  },
  {
    icon: Clock,
    title: "Giao nhanh 30 phút",
    description: "Cam kết giao đúng giờ hoặc hoàn tiền",
  },
  {
    icon: Shield,
    title: "Đảm bảo chất lượng",
    description: "Nguyên liệu tươi mới mỗi ngày",
  },
  {
    icon: CreditCard,
    title: "Thanh toán linh hoạt",
    description: "MoMo, ZaloPay, VNPay, COD",
  },
];

export default function DeliveryBenefits() {
  return (
    <section className="py-10 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <benefit.icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
