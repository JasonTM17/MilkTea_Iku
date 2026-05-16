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
    { id: "order", icon: Bell, title: "Cập nhật đơn hàng", description: "Thông báo khi đơn hàng thay đổi trạng thái", enabled: true },
    { id: "promo", icon: Tag, title: "Khuyến mãi", description: "Nhận thông báo về chương trình giảm giá", enabled: true },
    { id: "new", icon: Megaphone, title: "Sản phẩm mới", description: "Thông báo khi có menu mới ra mắt", enabled: false },
    { id: "loyalty", icon: Gift, title: "Iku Stars", description: "Cập nhật điểm thưởng và quà tặng", enabled: true },
    { id: "email", icon: Mail, title: "Email marketing", description: "Nhận email về tin tức và ưu đãi", enabled: false },
    { id: "sms", icon: Smartphone, title: "SMS", description: "Nhận tin nhắn SMS về đơn hàng", enabled: true },
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
      <main className="pt-20 min-h-screen bg-cream-50">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-display font-bold text-gray-900 mb-4"
            >
              Cài đặt thông báo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg"
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
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <pref.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{pref.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{pref.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePref(pref.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    pref.enabled ? "bg-brand-600" : "bg-gray-200"
                  }`}
                  aria-label={`Toggle ${pref.title}`}
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
