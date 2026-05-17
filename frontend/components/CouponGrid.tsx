"use client";

import { motion } from "framer-motion";
import { Gift, Copy, Check, Clock, Percent, Truck, Star } from "lucide-react";
import { useState } from "react";

interface Coupon {
  id: number;
  code: string;
  title: string;
  description: string;
  discount: string;
  minOrder: string;
  expiry: string;
  icon: typeof Gift;
  color: string;
}

const coupons: Coupon[] = [
  {
    id: 1,
    code: "IKUFIRST",
    title: "Giảm 20% đơn đầu",
    description: "Áp dụng cho khách hàng mới",
    discount: "20%",
    minOrder: "Không giới hạn",
    expiry: "31/12/2024",
    icon: Gift,
    color: "from-brand-500 to-brand-700",
  },
  {
    id: 2,
    code: "FREESHIP",
    title: "Miễn phí giao hàng",
    description: "Đơn từ 80.000đ nội thành",
    discount: "Free ship",
    minOrder: "80.000đ",
    expiry: "30/06/2024",
    icon: Truck,
    color: "from-green-500 to-green-700",
  },
  {
    id: 3,
    code: "WEEKEND3",
    title: "Mua 2 tặng 1",
    description: "Áp dụng thứ 7 & CN",
    discount: "Tặng 1",
    minOrder: "2 sản phẩm",
    expiry: "31/12/2024",
    icon: Percent,
    color: "from-purple-500 to-purple-700",
  },
  {
    id: 4,
    code: "IKUSTAR50",
    title: "Giảm 50K cho thành viên",
    description: "Hạng Gold trở lên",
    discount: "50.000đ",
    minOrder: "150.000đ",
    expiry: "31/12/2024",
    icon: Star,
    color: "from-yellow-500 to-yellow-700",
  },
];

export default function CouponGrid() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {coupons.map((coupon, i) => (
        <motion.div
          key={coupon.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className={`h-2 bg-gradient-to-r ${coupon.color}`} />
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${coupon.color} flex items-center justify-center shrink-0`}>
                  <coupon.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm line-clamp-1">{coupon.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1">{coupon.description}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-brand-600 dark:text-brand-400 shrink-0">{coupon.discount}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>Tối thiểu: {coupon.minOrder}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {coupon.expiry}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm font-mono font-semibold text-gray-800 dark:text-gray-100 border border-dashed border-gray-200 dark:border-gray-700 truncate">
                {coupon.code}
              </code>
              <button
                onClick={() => copyCode(coupon.id, coupon.code)}
                aria-label={copiedId === coupon.id ? `Đã sao chép mã ${coupon.code}` : `Sao chép mã ${coupon.code}`}
                className={`min-w-11 min-h-11 px-3 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 ${
                  copiedId === coupon.id
                    ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                    : "bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800 dark:hover:bg-brand-800/50"
                }`}
              >
                {copiedId === coupon.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
