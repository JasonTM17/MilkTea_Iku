"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

const categories = ["Tất cả", "Đặt hàng", "Thanh toán", "Giao hàng", "Sản phẩm", "Khác"];

const faqs = [
  {
    id: 1,
    category: "Đặt hàng",
    question: "Tôi có thể đặt hàng trước bao lâu?",
    answer:
      "Bạn có thể đặt hàng trước tối đa 7 ngày. Đối với đơn hàng số lượng lớn (trên 20 ly), chúng tôi khuyến khích đặt trước ít nhất 24 giờ để đảm bảo chất lượng phục vụ tốt nhất.",
  },
  {
    id: 2,
    category: "Đặt hàng",
    question: "Tôi có thể thay đổi hoặc hủy đơn hàng không?",
    answer:
      "Bạn có thể thay đổi hoặc hủy đơn hàng trong vòng 15 phút sau khi đặt. Sau khoảng thời gian này, đơn hàng đã được chuyển sang bộ phận pha chế và không thể thay đổi. Vui lòng liên hệ hotline 1800-IKU để được hỗ trợ.",
  },
  {
    id: 3,
    category: "Đặt hàng",
    question: "Tôi có thể tùy chỉnh đồ uống theo ý thích không?",
    answer:
      "Hoàn toàn có thể! Bạn có thể tùy chỉnh mức đường (0%, 30%, 50%, 70%, 100%), mức đá (không đá, ít đá, bình thường, nhiều đá), và thêm topping theo sở thích. Một số sản phẩm đặc biệt có thể có giới hạn tùy chỉnh để giữ nguyên hương vị đặc trưng.",
  },
  {
    id: 4,
    category: "Thanh toán",
    question: "MilkTea Iku chấp nhận những phương thức thanh toán nào?",
    answer:
      "Chúng tôi chấp nhận đa dạng phương thức thanh toán: tiền mặt (COD), chuyển khoản ngân hàng, ví điện tử MoMo, ZaloPay, VNPay, và thẻ tín dụng/ghi nợ Visa/Mastercard. Tất cả giao dịch trực tuyến đều được mã hóa bảo mật.",
  },
  {
    id: 5,
    category: "Thanh toán",
    question: "Tôi có thể sử dụng nhiều mã giảm giá cùng lúc không?",
    answer:
      "Mỗi đơn hàng chỉ áp dụng được một mã giảm giá. Tuy nhiên, bạn vẫn có thể kết hợp mã giảm giá với điểm thưởng từ chương trình khách hàng thân thiết Iku Stars để tiết kiệm tối đa.",
  },
  {
    id: 6,
    category: "Thanh toán",
    question: "Chương trình khách hàng thân thiết Iku Stars hoạt động như thế nào?",
    answer:
      "Với mỗi 10.000đ chi tiêu, bạn nhận được 1 Iku Star. Tích lũy đủ sao để đổi quà: 50 sao = giảm 10%, 100 sao = 1 ly miễn phí, 200 sao = combo đặc biệt. Điểm có hiệu lực trong 12 tháng kể từ ngày tích lũy.",
  },
  {
    id: 7,
    category: "Giao hàng",
    question: "Phạm vi giao hàng của MilkTea Iku là bao nhiêu?",
    answer:
      "Chúng tôi giao hàng trong bán kính 5km từ mỗi chi nhánh. Phí giao hàng từ 15.000đ – 30.000đ tùy khoảng cách. Đơn hàng từ 150.000đ được miễn phí giao hàng trong bán kính 3km.",
  },
  {
    id: 8,
    category: "Giao hàng",
    question: "Thời gian giao hàng trung bình là bao lâu?",
    answer:
      "Thời gian giao hàng trung bình từ 20–40 phút tùy khoảng cách và tình trạng giao thông. Trong giờ cao điểm (11h–13h và 17h–19h), thời gian có thể kéo dài hơn. Bạn sẽ nhận được thông báo theo dõi đơn hàng theo thời gian thực.",
  },
  {
    id: 9,
    category: "Sản phẩm",
    question: "Sản phẩm của Iku có chứa chất bảo quản không?",
    answer:
      "Không. Tất cả sản phẩm của Iku được làm từ nguyên liệu tươi tự nhiên, không chứa chất bảo quản hay phẩm màu nhân tạo. Trân châu được nấu thủ công mỗi ngày, trà được pha mới mỗi 4 giờ để đảm bảo hương vị tươi ngon nhất.",
  },
  {
    id: 10,
    category: "Sản phẩm",
    question: "Sản phẩm nào phù hợp cho người dị ứng sữa hoặc lactose?",
    answer:
      "Chúng tôi có dòng sản phẩm Iku Pure sử dụng sữa yến mạch và sữa hạnh nhân thay thế sữa bò. Các sản phẩm trà trái cây và trà xanh thuần túy cũng không chứa sữa. Vui lòng thông báo cho nhân viên về dị ứng của bạn khi đặt hàng.",
  },
  {
    id: 11,
    category: "Sản phẩm",
    question: "Giờ mở cửa của các chi nhánh Iku là mấy giờ?",
    answer:
      "Tất cả chi nhánh Iku mở cửa từ 7:00 – 22:00 hàng ngày, kể cả cuối tuần và ngày lễ. Riêng chi nhánh Quận 1 (Nguyễn Huệ) mở cửa đến 23:00 vào thứ Sáu và thứ Bảy.",
  },
  {
    id: 12,
    category: "Khác",
    question: "Iku có bán thẻ quà tặng không?",
    answer:
      "Có! Thẻ quà tặng Iku Gift Card có mệnh giá từ 100.000đ đến 1.000.000đ, có thể mua trực tiếp tại cửa hàng hoặc đặt online. Thẻ không có hạn sử dụng và có thể dùng tại tất cả chi nhánh.",
  },
  {
    id: 13,
    category: "Khác",
    question: "Tôi có thể đặt hàng số lượng lớn cho sự kiện không?",
    answer:
      "Chúng tôi rất vui được phục vụ các sự kiện doanh nghiệp, tiệc sinh nhật, hội nghị... Đơn hàng từ 50 ly trở lên được hưởng ưu đãi đặc biệt và có thể tùy chỉnh bao bì theo yêu cầu. Liên hệ email event@milkteaiku.vn để được tư vấn.",
  },
  {
    id: 14,
    category: "Khác",
    question: "Chính sách hoàn trả và đổi hàng của Iku như thế nào?",
    answer:
      "Nếu sản phẩm không đúng yêu cầu hoặc có vấn đề về chất lượng, chúng tôi sẽ làm lại miễn phí hoặc hoàn tiền 100%. Vui lòng liên hệ trong vòng 30 phút kể từ khi nhận hàng và cung cấp ảnh chụp sản phẩm để được xử lý nhanh nhất.",
  },
];

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-cream-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-brand-500"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-cream-100 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "Tất cả" || faq.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-cream-100 to-cream-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6"
          >
            Hỗ trợ khách hàng
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
          >
            Câu hỏi{" "}
            <span className="text-brand-600">thường gặp</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Tìm câu trả lời nhanh cho mọi thắc mắc về đặt hàng, giao hàng,
            thanh toán và sản phẩm của chúng tôi.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-cream-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-300 text-gray-700 placeholder-gray-400"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Body */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-10 justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-brand-600 text-white shadow-md"
                    : "bg-cream-100 text-gray-600 hover:bg-cream-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* FAQ items */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((faq, i) => (
                <FAQItem key={faq.id} faq={faq} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <HelpCircle size={48} className="mx-auto text-cream-300 mb-4" />
              <p className="text-gray-500 text-lg">
                Không tìm thấy câu hỏi phù hợp.
              </p>
              <p className="text-gray-400 mt-2">
                Hãy thử từ khóa khác hoặc{" "}
                <a href="/contact" className="text-brand-600 hover:underline">
                  liên hệ với chúng tôi
                </a>
                .
              </p>
            </motion.div>
          )}

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-gradient-to-br from-brand-50 to-cream-100 rounded-3xl p-10 text-center"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
              Vẫn còn thắc mắc?
            </h3>
            <p className="text-gray-600 mb-6">
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi câu hỏi
              của bạn.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors shadow-md hover:shadow-lg"
            >
              Liên hệ ngay
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
