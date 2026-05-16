"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Làm sao để đặt hàng online?",
    answer:
      "Bạn có thể đặt hàng trực tiếp trên website hoặc ứng dụng Iku. Chọn sản phẩm yêu thích, tuỳ chỉnh theo ý muốn, thêm vào giỏ hàng và tiến hành thanh toán. Chúng tôi hỗ trợ thanh toán qua thẻ, ví điện tử và tiền mặt khi nhận hàng.",
  },
  {
    question: "Thời gian giao hàng là bao lâu?",
    answer:
      "Thời gian giao hàng trung bình 20-30 phút tùy theo khoảng cách và tình trạng giao thông. Trong giờ cao điểm có thể mất thêm 10-15 phút. Bạn có thể theo dõi đơn hàng theo thời gian thực trên ứng dụng.",
  },
  {
    question: "Có thể tuỳ chỉnh đồ uống không?",
    answer:
      "Có! Bạn có thể chọn mức đường (0%, 30%, 50%, 70%, 100%), mức đá (không đá, ít đá, bình thường, nhiều đá) và thêm topping theo sở thích. Một số sản phẩm còn cho phép chọn loại sữa (sữa tươi, sữa yến mạch, sữa đậu nành).",
  },
  {
    question: "Chính sách đổi trả như thế nào?",
    answer:
      "Nếu đồ uống không đúng yêu cầu hoặc có vấn đề về chất lượng, vui lòng liên hệ ngay trong vòng 15 phút sau khi nhận hàng. Chúng tôi sẽ hoàn tiền hoặc giao lại sản phẩm mới miễn phí.",
  },
  {
    question: "Có chương trình khách hàng thân thiết không?",
    answer:
      "Có! Tích điểm mỗi đơn hàng với tỷ lệ 1.000đ = 1 điểm. Đổi điểm lấy đồ uống miễn phí, voucher giảm giá và nhiều ưu đãi hấp dẫn khác. Thành viên hạng Vàng và Kim Cương còn được ưu tiên giao hàng và quà sinh nhật đặc biệt.",
  },
  {
    question: "Iku có nhận đặt tiệc/sự kiện không?",
    answer:
      "Có! Liên hệ hotline 1800 xxxx hoặc email events@milkteaiku.vn để được tư vấn gói đặt tiệc và sự kiện. Chúng tôi phục vụ từ 20 ly trở lên với mức giá ưu đãi và có thể tùy chỉnh bao bì theo yêu cầu.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-cream-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50">
            Câu hỏi <span className="text-brand-500">thường gặp</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Giải đáp những thắc mắc phổ biến nhất từ khách hàng
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-gray-900 dark:text-gray-50 text-sm sm:text-base">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-brand-500"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
