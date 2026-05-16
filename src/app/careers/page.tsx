"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Barista",
    type: "Full-time",
    location: "TP.HCM – Nhiều chi nhánh",
    department: "Cửa hàng",
    description:
      "Pha chế đồ uống theo công thức chuẩn Iku, đảm bảo chất lượng và trải nghiệm khách hàng xuất sắc tại quầy.",
  },
  {
    id: 2,
    title: "Nhân viên phục vụ",
    type: "Part-time",
    location: "TP.HCM & Hà Nội",
    department: "Cửa hàng",
    description:
      "Tiếp đón và phục vụ khách hàng tại cửa hàng, hỗ trợ thu ngân và duy trì không gian sạch sẽ, thân thiện.",
  },
  {
    id: 3,
    title: "Marketing Executive",
    type: "Full-time",
    location: "TP.HCM – Văn phòng",
    department: "Marketing",
    description:
      "Lên kế hoạch và triển khai chiến dịch marketing đa kênh, quản lý mạng xã hội và phân tích hiệu quả truyền thông.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium mb-5"
            >
              Tuyển dụng
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Gia nhập đội ngũ{" "}
              <span className="text-brand-600 dark:text-brand-400">Iku</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
            >
              Cùng chúng tôi mang đến trải nghiệm trà sữa tuyệt vời cho hàng triệu khách hàng
            </motion.p>
          </div>
        </section>

        {/* Job listings */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 text-xs font-medium rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {job.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@milktea-iku.vn?subject=Ứng tuyển: ${job.title}`}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 rounded-xl text-sm font-medium hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
                  >
                    Ứng tuyển
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Open application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-10"
          >
            <Briefcase className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
              Không tìm thấy vị trí phù hợp?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Gửi CV của bạn đến careers@milktea-iku.vn và chúng tôi sẽ liên hệ khi có vị trí phù hợp.
            </p>
            <a
              href="mailto:careers@milktea-iku.vn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
            >
              Gửi CV
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
