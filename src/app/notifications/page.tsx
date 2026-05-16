"use client";

import { motion } from "framer-motion";
import { Bell, Mail, Smartphone, Gift, Tag, Megaphone } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

interface NotificationPref {
  id: string;
  icon: typeof Bell;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<NotificationPref[]>([
    {
      id: "promo",
      icon: Tag,
      title: "Khuyến mãi",
      description: "Nhận thông báo về chương trình giảm giá và ưu đãi",
      enabled: true,
    },
    {
      id: "order",
      icon: Bell,
      title: "Đơn hàng",
      description: "Thông báo khi đơn hàng thay đổi trạng thái",
      enabled: true,
    },
    {
      id: "new",
      icon: Megaphone,
      title: "Sản phẩm mới",
      description: "Thông báo khi có menu mới ra mắt",
      enabled: false,
    },
    {
      id: "newsletter",
      icon: Mail,
      title: "Newsletter",
      description: "Nhận email về tin tức, công thức và ưu đãi hàng tuần",
      enabled: false,
    },
    {
      id: "loyalty",
      icon: Gift,
      title: "Iku Stars",
      description: "Cập nhật điểm thưởng và quà tặng",
      enabled: true,
    },
    {
      id: "sms",
      icon: Smartphone,
      title: "SMS",
      description: "Nhận tin nhắn SMS về đơn hàng",
      enabled: true,
    },
  ]);

  const togglePref = (id: string) => {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

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
              className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Cài đặt thông báo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Tùy chỉnh thông báo theo sở thích của bạn
            </motion.p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="space-y-3">
            {prefs.map((pref, i) => (
              <motion.div
                key={pref.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                    <pref.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {pref.title}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {pref.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => togglePref(pref.id)}
                  role="switch"
                  aria-checked={pref.enabled}
                  aria-label={`Toggle ${pref.title}`}
                  className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    pref.enabled
                      ? "bg-brand-600"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      pref.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
