"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, CreditCard, ShoppingBag, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const amounts = [100000, 200000, 300000, 500000];

export default function GiftCardPage() {
  const [selectedAmount, setSelectedAmount] = useState(200000);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-100 flex items-center justify-center"
            >
              <Gift className="w-8 h-8 text-brand-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-gray-900 mb-4"
            >
              Thẻ quà tặng Iku
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg"
            >
              Tặng người thân yêu niềm vui thưởng thức trà sữa premium
            </motion.p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-12">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-10"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                <Send className="w-9 h-9 text-green-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Đã gửi thẻ quà tặng!
              </h2>
              <p className="text-gray-500 mb-6">
                Thẻ quà tặng {selectedAmount.toLocaleString("vi-VN")}đ đã được gửi đến {recipientEmail}
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
              >
                Gửi thêm thẻ khác
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSend}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chọn mệnh giá
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                        selectedAmount === amount
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-gray-200 text-gray-600 hover:border-brand-300"
                      }`}
                    >
                      {amount.toLocaleString("vi-VN")}đ
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tên người nhận
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email người nhận
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Lời nhắn (tùy chọn)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm resize-none"
                  placeholder="Chúc bạn ngày mới vui vẻ! Thưởng thức trà sữa nhé"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CreditCard className="w-4 h-4" />
                  <span>Thanh toán qua MoMo, ZaloPay, VNPay</span>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Mua thẻ {selectedAmount.toLocaleString("vi-VN")}đ
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
