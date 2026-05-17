"use client";

import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Order {
  id: string;
  date: string;
  total: number;
  items: number;
  status: "pending" | "preparing" | "delivering" | "completed" | "cancelled";
}

const orders: Order[] = [
  { id: "IKU-2024-001", date: "15/05/2024", total: 125000, items: 3, status: "completed" },
  { id: "IKU-2024-002", date: "14/05/2024", total: 89000, items: 2, status: "delivering" },
  { id: "IKU-2024-003", date: "12/05/2024", total: 210000, items: 5, status: "completed" },
  { id: "IKU-2024-004", date: "10/05/2024", total: 55000, items: 1, status: "cancelled" },
  { id: "IKU-2024-005", date: "08/05/2024", total: 165000, items: 4, status: "completed" },
];

const statusConfig = {
  pending: { label: "Chờ xác nhận", icon: Clock, color: "text-yellow-600 bg-yellow-50" },
  preparing: { label: "Đang pha chế", icon: Package, color: "text-blue-600 bg-blue-50" },
  delivering: { label: "Đang giao", icon: Truck, color: "text-purple-600 bg-purple-50" },
  completed: { label: "Hoàn thành", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  cancelled: { label: "Đã hủy", icon: XCircle, color: "text-red-600 bg-red-50" },
};

export default function OrderHistoryPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Lịch sử đơn hàng
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Theo dõi tất cả đơn hàng của bạn
            </motion.p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {orders.map((order, i) => {
              const config = statusConfig[order.status];
              const Icon = config.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm">{order.id}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{order.date} • {order.items} món</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-50 text-sm">
                        {order.total.toLocaleString("vi-VN")}đ
                      </p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
