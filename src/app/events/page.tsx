"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  status: "upcoming" | "ongoing" | "ended";
}

const events: Event[] = [
  {
    id: 1,
    title: "Workshop Pha Chế Trà Sữa",
    date: "25/05/2024",
    time: "14:00 - 16:00",
    location: "Iku Nguyễn Huệ, Q.1",
    capacity: "20 người",
    description: "Học cách pha chế trà sữa chuẩn vị từ barista chuyên nghiệp của Iku.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Iku Tasting Night",
    date: "01/06/2024",
    time: "18:00 - 20:00",
    location: "Iku Phạm Ngọc Thạch, Q.3",
    capacity: "30 người",
    description: "Thử trước menu mới mùa hè với các vị trà trái cây độc quyền.",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Iku x Local Artists",
    date: "15/06/2024",
    time: "10:00 - 18:00",
    location: "Iku Lê Văn Sỹ, Q.3",
    capacity: "Không giới hạn",
    description: "Triển lãm nghệ thuật kết hợp thưởng thức trà sữa cùng nghệ sĩ địa phương.",
    status: "upcoming",
  },
];

const statusConfig = {
  upcoming: { label: "Sắp diễn ra", color: "bg-blue-50 text-blue-700 border-blue-200" },
  ongoing: { label: "Đang diễn ra", color: "bg-green-50 text-green-700 border-green-200" },
  ended: { label: "Đã kết thúc", color: "bg-gray-50 text-gray-500 border-gray-200" },
};

export default function EventsPage() {
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
              Sự kiện
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-gray-900 mb-4"
            >
              Sự kiện & Hoạt động
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg"
            >
              Tham gia các sự kiện thú vị cùng cộng đồng Iku
            </motion.p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  </div>
                  <span className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full border ${statusConfig[event.status].color}`}>
                    {statusConfig[event.status].label}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-brand-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-brand-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-brand-500" />
                    <span>{event.capacity}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                    Đăng ký tham gia
                    <ArrowRight className="w-3.5 h-3.5" />
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
