"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-cream-100 to-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.span
            {...fadeInUp}
            className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6"
          >
            Câu chuyện của chúng tôi
          </motion.span>
          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
          >
            Mỗi ly trà sữa là một{" "}
            <span className="text-brand-600">tác phẩm nghệ thuật</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Iku ra đời từ niềm đam mê tạo ra những ly trà sữa hoàn hảo nhất,
            nơi mỗi nguyên liệu được chọn lọc kỹ càng và mỗi công thức là kết
            quả của hàng trăm lần thử nghiệm.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Image
                src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop"
                alt="Iku story"
                width={600}
                height={400}
                className="rounded-3xl object-cover shadow-lg"
              />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Khởi nguồn từ đam mê
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Năm 2020, giữa lòng Sài Gòn nhộn nhịp, Iku được sinh ra từ
                  một ý tưởng đơn giản: tạo ra trà sữa ngon nhất có thể với
                  nguyên liệu tốt nhất.
                </p>
                <p>
                  Chúng tôi tin rằng một ly trà sữa không chỉ là thức uống — đó
                  là khoảnh khắc thư giãn, là niềm vui nhỏ trong ngày bận rộn,
                  là cầu nối giữa những người bạn.
                </p>
                <p>
                  Từ việc chọn lá trà Ô Long từ vùng cao Đài Loan, đến trân
                  châu được nấu thủ công mỗi ngày — mọi chi tiết đều được chăm
                  chút tỉ mỉ.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Giá trị cốt lõi
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Nguyên liệu tươi",
                desc: "100% nguyên liệu tự nhiên, không chất bảo quản. Trà nhập khẩu trực tiếp từ vùng trồng.",
              },
              {
                icon: "🎨",
                title: "Sáng tạo không ngừng",
                desc: "Menu được cập nhật theo mùa với những sáng tạo mới, kết hợp hương vị truyền thống và hiện đại.",
              },
              {
                icon: "💚",
                title: "Bền vững",
                desc: "Sử dụng ly giấy và ống hút tre. Cam kết giảm thiểu rác thải nhựa trong mọi hoạt động.",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "20+", label: "Hương vị" },
              { value: "10K+", label: "Khách hàng" },
              { value: "5", label: "Chi nhánh" },
              { value: "50+", label: "Nhân viên" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-600">
                  {stat.value}
                </div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
