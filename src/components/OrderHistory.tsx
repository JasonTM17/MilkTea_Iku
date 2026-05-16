"use client";

import { motion } from "framer-motion";
import { ShoppingBag, RotateCcw, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "completed" | "delivering" | "cancelled" | "processing";
  itemsCount: number;
  items: string[];
}

const STATUS_CONFIG = {
  completed: {
    label: "Hoàn thành",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  delivering: {
    label: "Đang giao",
    icon: Truck,
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  cancelled: {
    label: "Đã huỷ",
    icon: XCircle,
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  processing: {
    label: "Đang xử lý",
    icon: Clock,
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
};

const SAMPLE_ORDERS: Order[] = [
  {
    id: "IKU-20240512-001",
    date: "12/05/2024",
    total: 135000,
    status: "completed",
    itemsCount: 3,
    items: ["Trà Sữa Truyền Thống", "Matcha Latte", "Trân châu đen"],
  },
  {
    id: "IKU-20240510-002",
    date: "10/05/2024",
    total: 85000,
    status: "delivering",
    itemsCount: 2,
    items: ["Hồng Trà Sữa", "Pudding"],
  },
  {
    id: "IKU-20240508-003",
    date: "08/05/2024",
    total: 65000,
    status: "cancelled",
    itemsCount: 1,
    items: ["Matcha Latte Premium"],
  },
  {
    id: "IKU-20240505-004",
    date: "05/05/2024",
    total: 210000,
    status: "completed",
    itemsCount: 4,
    items: ["Trà Đào", "Trà Vải", "Trà Sữa Truyền Thống", "Kem cheese"],
  },
];

interface OrderHistoryProps {
  orders?: Order[];
  onReorder?: (orderId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function OrderHistory({
  orders = SAMPLE_ORDERS,
  onReorder,
}: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center max-w-lg w-full">
        <ShoppingBag className="w-14 h-14 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="font-display font-bold text-gray-700 dark:text-gray-300 text-lg mb-2">
          Chưa có đơn hàng nào
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Hãy đặt đơn đầu tiên và tận hưởng trà sữa Iku ngay hôm nay!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full">
      <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-5">
        Lịch sử đơn hàng
      </h3>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {orders.map((order) => {
          const cfg = STATUS_CONFIG[order.status];
          const StatusIcon = cfg.icon;
          const canReorder = order.status !== "processing";

          return (
            <motion.li
              key={order.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-gray-500 dark:text-gray-400">
                      #{order.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.className}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {order.items.join(", ")}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
                    <span>{order.date}</span>
                    <span>·</span>
                    <span>{order.itemsCount} món</span>
                    <span>·</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {order.total.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>

                {canReorder && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onReorder?.(order.id)}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 border border-brand-300 dark:border-brand-700 px-3 py-1.5 rounded-full hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Đặt lại
                  </motion.button>
                )}
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
