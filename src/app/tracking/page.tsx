"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface TrackingStep {
  id: number;
  label: string;
  time: string;
  icon: typeof Package;
  completed: boolean;
}

const mockSteps: TrackingStep[] = [
  { id: 1, label: "Đơn hàng đã xác nhận", time: "14:30", icon: CheckCircle2, completed: true },
  { id: 2, label: "Đang pha chế", time: "14:35", icon: Clock, completed: true },
  { id: 3, label: "Đang giao hàng", time: "14:45", icon: Truck, completed: true },
  { id: 4, label: "Đã giao thành công", time: "~15:00", icon: Package, completed: false },
];

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setIsTracking(true);
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Theo dõi đơn hàng
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 dark:text-gray-400 mb-8"
            >
              Nhập mã đơn hàng để xem trạng thái giao hàng
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleTrack}
              className="flex gap-3 max-w-md mx-auto"
            >
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="VD: IKU-2024-001234"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium text-sm transition-colors"
              >
                Tra cứu
              </button>
            </motion.form>
          </div>
        </section>

        {isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto px-4 py-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mã đơn hàng</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-50">{orderId || "IKU-2024-001234"}</p>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200">
                  Đang giao
                </span>
              </div>

              <div className="space-y-0">
                {mockSteps.map((step, i) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-brand-100 text-brand-600"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      {i < mockSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            step.completed ? "bg-brand-200" : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-2 pb-6">
                      <p
                        className={`font-medium text-sm ${
                          step.completed ? "text-gray-900 dark:text-gray-50" : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <span>123 Nguyễn Huệ, Q.1</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-brand-500" />
                  <span>Shipper: 0901 234 567</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </>
  );
}
