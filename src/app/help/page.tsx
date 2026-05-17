"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface HelpItem {
  question: string;
  answer: string;
}

const helpTopics: { title: string; items: HelpItem[] }[] = [
  {
    title: "Đặt hàng",
    items: [
      { question: "Làm sao để đặt hàng?", answer: "Bạn có thể đặt hàng trực tiếp trên website hoặc app Iku. Chọn sản phẩm, tùy chỉnh theo ý thích, thêm vào giỏ hàng và thanh toán." },
      { question: "Tôi có thể hủy đơn hàng không?", answer: "Bạn có thể hủy đơn trong vòng 2 phút sau khi đặt. Sau thời gian này, đơn đã được chuyển sang pha chế và không thể hủy." },
      { question: "Thời gian giao hàng bao lâu?", answer: "Thời gian giao hàng trung bình 20-30 phút trong bán kính 5km. Ngoài phạm vi có thể lâu hơn tùy khoảng cách." },
    ],
  },
  {
    title: "Thanh toán",
    items: [
      { question: "Có những phương thức thanh toán nào?", answer: "Iku hỗ trợ: MoMo, ZaloPay, VNPay, chuyển khoản ngân hàng, và thanh toán khi nhận hàng (COD)." },
      { question: "Có được hoàn tiền không?", answer: "Nếu đơn hàng không đúng yêu cầu hoặc có vấn đề chất lượng, bạn sẽ được hoàn tiền 100% hoặc đổi sản phẩm mới." },
    ],
  },
  {
    title: "Tài khoản & Iku Stars",
    items: [
      { question: "Làm sao để tích điểm?", answer: "Mỗi 10.000đ chi tiêu = 1 Star. Tích đủ Stars để lên hạng và nhận ưu đãi đặc biệt." },
      { question: "Điểm có hết hạn không?", answer: "Stars có hiệu lực 12 tháng kể từ ngày tích. Hạng thành viên được đánh giá lại mỗi 6 tháng." },
    ],
  },
];

function AccordionItem({ item }: { item: HelpItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{item.question}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pb-4"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.answer}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function HelpCenterPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-5"
            >
              <HelpCircle className="w-7 h-7 text-brand-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Trung tâm trợ giúp
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Tìm câu trả lời cho mọi thắc mắc
            </motion.p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {helpTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 bg-cream-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  <h2 className="font-semibold text-gray-900 dark:text-gray-50">{topic.title}</h2>
                </div>
                <div className="px-6">
                  {topic.items.map((item) => (
                    <AccordionItem key={item.question} item={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
