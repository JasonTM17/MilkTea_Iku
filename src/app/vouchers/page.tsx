"use client";

import { motion } from "framer-motion";
import { Percent, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface Voucher {
  id: number;
  code: string;
  title: string;
  description: string;
  discount: string;
  minOrder: string;
  expiry: string;
  isUsed: boolean;
}

const vouchers: Voucher[] = [
  { id: 1, code: "IKU20", title: "Giảm 20%", description: "Áp dụng cho đơn từ 100K", discount: "20%", minOrder: "100.000đ", expiry: "31/05/2024", isUsed: false },
  { id: 2, code: "FREESHIP", title: "Miễn phí ship", description: "Đơn hàng từ 50K", discount: "Free ship", minOrder: "50.000đ", expiry: "30/06/2024", isUsed: false },
  { id: 3, code: "NEWBIE30", title: "Giảm 30K", description: "Dành cho khách hàng mới", discount: "30.000đ", minOrder: "80.000đ", expiry: "15/06/2024", isUsed: false },
  { id: 4, code: "BOGO", title: "Mua 1 tặng 1", description: "Áp dụng Brown Sugar Boba", discount: "Buy 1 Get 1", minOrder: "0đ", expiry: "20/05/2024", isUsed: true },
];

export default function VouchersPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-5"
            >
              <Percent className="w-6 h-6 text-brand-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Voucher của tôi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Sử dụng voucher để tiết kiệm hơn
            </motion.p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {vouchers.map((voucher, i) => (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl border shadow-sm overflow-hidden ${
                  voucher.isUsed ? "border-gray-200 dark:border-gray-600 opacity-60" : "border-gray-100 dark:border-gray-700"
                }`}
              >
                <div className="flex">
                  <div className={`w-24 flex items-center justify-center ${
                    voucher.isUsed ? "bg-gray-100 dark:bg-gray-700" : "bg-gradient-to-b from-brand-500 to-brand-600"
                  }`}>
                    <span className={`text-sm font-bold ${voucher.isUsed ? "text-gray-400 dark:text-gray-500" : "text-white"}`}>
                      {voucher.discount}
                    </span>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm">{voucher.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{voucher.description}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2">
                          Đơn tối thiểu: {voucher.minOrder} • HSD: {voucher.expiry}
                        </p>
                      </div>
                      {!voucher.isUsed && (
                        <button
                          onClick={() => copyCode(voucher.id, voucher.code)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-600 rounded-lg text-xs font-medium hover:bg-brand-100 transition-colors"
                        >
                          {copiedId === voucher.id ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Đã copy
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              {voucher.code}
                            </>
                          )}
                        </button>
                      )}
                      {voucher.isUsed && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Đã dùng</span>
                      )}
                    </div>
                  </div>
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
