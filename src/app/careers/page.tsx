"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Barista",
    location: "TP.HCM - Nhiều chi nhánh",
    type: "Full-time / Part-time",
    department: "Cửa hàng",
    description: "Pha chế đồ uống, phục vụ khách hàng, đảm bảo chất lượng sản phẩm.",
  },
  {
    id: 2,
    title: "Quản lý cửa hàng",
    location: "TP.HCM - Quận 1",
    type: "Full-time",
    department: "Quản lý",
    description: "Quản lý vận hành cửa hàng, đào tạo nhân viên, đảm bảo doanh thu.",
  },
  {
    id: 3,
    title: "Marketing Executive",
    location: "TP.HCM - Văn phòng",
    type: "Full-time",
    department: "Marketing",
    description: "Lên kế hoạch và triển khai chiến dịch marketing, quản lý social media.",
  },
  {
    id: 4,
    title: "Nhân viên giao hàng",
    location: "TP.HCM & Hà Nội",
    type: "Part-time",
    department: "Vận hành",
    description: "Giao hàng nhanh chóng, đảm bảo chất lượng sản phẩm khi đến tay khách.",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    location: "Remote / TP.HCM",
    type: "Full-time",
    department: "Công nghệ",
    description: "Thiết kế giao diện app và website, nghiên cứu trải nghiệm người dùng.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-5"
            >
              Tuyển dụng
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
            >
              Gia nhập đội ngũ <span className="text-brand-600">Iku</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-xl mx-auto"
            >
              Cùng chúng tôi mang đến trải nghiệm trà sữa tuyệt vời cho hàng triệu khách hàng
            </motion.p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-brand-50 text-brand-600 text-xs font-medium rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{job.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
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
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-brand-50 text-brand-600 rounded-xl text-sm font-medium hover:bg-brand-100 transition-colors"
                  >
                    Ứng tuyển
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-10"
          >
            <Briefcase className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
              Không tìm thấy vị trí phù hợp?
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
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
