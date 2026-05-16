"use client";

import { motion } from "framer-motion";
import { Clock, Flame, Leaf, Snowflake } from "lucide-react";

interface Ingredient {
  name: string;
  origin: string;
  icon: string;
}

const ingredients: Ingredient[] = [
  { name: "Trà Oolong", origin: "Đài Loan", icon: "🍃" },
  { name: "Matcha Uji", origin: "Kyoto, Nhật Bản", icon: "🍵" },
  { name: "Đường nâu", origin: "Okinawa, Nhật Bản", icon: "🍯" },
  { name: "Sữa tươi", origin: "TH True Milk, Việt Nam", icon: "🥛" },
  { name: "Trân châu", origin: "Tự làm mỗi ngày", icon: "⚫" },
  { name: "Trà đen", origin: "Assam, Ấn Độ", icon: "🫖" },
];

const features = [
  { icon: Leaf, title: "100% tự nhiên", desc: "Không phẩm màu, không hương liệu nhân tạo" },
  { icon: Snowflake, title: "Bảo quản lạnh", desc: "Nguyên liệu luôn được giữ ở nhiệt độ tối ưu" },
  { icon: Flame, title: "Nấu tươi", desc: "Trân châu và topping nấu mới mỗi 4 giờ" },
  { icon: Clock, title: "Nhập mới mỗi ngày", desc: "Sữa tươi và trái cây nhập hàng ngày" },
];

export default function IngredientsShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Nguyên liệu cao cấp
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Chọn lọc kỹ lưỡng từ những nguồn cung uy tín nhất
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {ingredients.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-4 rounded-2xl bg-cream-50 border border-cream-100 hover:border-brand-200 transition-colors"
            >
              <span className="text-3xl block mb-2">{item.icon}</span>
              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
              <p className="text-[10px] text-gray-400 mt-1">{item.origin}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-gray-100"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <feature.icon className="w-4 h-4 text-brand-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{feature.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
