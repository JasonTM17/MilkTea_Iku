"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  gradient: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Workshop Pha Chế Trà Sữa",
    date: "25/05/2024",
    time: "14:00 – 16:00",
    location: "Iku Nguyễn Huệ, Q.1, TP.HCM",
    description:
      "Học cách pha chế trà sữa chuẩn vị từ barista chuyên nghiệp của Iku. Tham gia để khám phá bí quyết tạo nên ly trà sữa hoàn hảo và mang về công thức độc quyền.",
    gradient: "from-pink-400 via-rose-300 to-orange-300",
  },
  {
    id: 2,
    title: "Iku Tasting Night",
    date: "01/06/2024",
    time: "18:00 – 20:00",
    location: "Iku Phạm Ngọc Thạch, Q.3, TP.HCM",
    description:
      "Thử trước menu mới mùa hè với các vị trà trái cây độc quyền chưa từng ra mắt. Cơ hội đặc biệt để trải nghiệm và đóng góp ý kiến cho bộ sưu tập mới nhất của Iku.",
    gradient: "from-violet-400 via-purple-300 to-pink-300",
  },
  {
    id: 3,
    title: "Iku x Local Artists",
    date: "15/06/2024",
    time: "10:00 – 18:00",
    location: "Iku Lê Văn Sỹ, Q.3, TP.HCM",
    description:
      "Triển lãm nghệ thuật kết hợp thưởng thức trà sữa cùng các nghệ sĩ địa phương tài năng. Không gian sáng tạo, âm nhạc acoustic và những tác phẩm nghệ thuật độc đáo.",
    gradient: "from-teal-400 via-cyan-300 to-sky-300",
  },
];

export default function EventsPage() {
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
              Sự kiện
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Sự kiện &amp;{" "}
              <span className="text-brand-600 dark:text-brand-400">Hoạt động</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Tham gia các sự kiện thú vị và kết nối cùng cộng đồng Iku
            </motion.p>
          </div>
        </section>

        {/* Event cards */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Gradient image placeholder */}
                <div
                  className={`h-44 bg-gradient-to-r ${event.gradient} flex items-center justify-center`}
                >
                  <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
                    {event.date}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                      {event.location}
                    </span>
                  </div>

                  <button className="px-5 py-2 bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white rounded-xl text-sm font-medium transition-colors">
                    Đăng ký tham gia
                  </button>
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
