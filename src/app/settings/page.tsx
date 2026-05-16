"use client";

import { motion } from "framer-motion";
import { Settings, Moon, Sun, Globe, Bell, Shield, LogOut } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Link from "next/link";

const settingsGroups = [
  {
    title: "Giao diện",
    items: [
      { icon: Sun, label: "Chế độ sáng", description: "Giao diện mặc định", active: true },
      { icon: Moon, label: "Chế độ tối", description: "Dễ chịu cho mắt vào ban đêm", active: false },
    ],
  },
  {
    title: "Tài khoản",
    items: [
      { icon: Globe, label: "Ngôn ngữ", description: "Tiếng Việt", active: true },
      { icon: Bell, label: "Thông báo", description: "Quản lý cài đặt thông báo", href: "/notifications" },
      { icon: Shield, label: "Bảo mật", description: "Mật khẩu và xác thực 2 lớp" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-5"
            >
              <Settings className="w-6 h-6 text-brand-600" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-display font-bold text-gray-900 mb-4"
            >
              Cài đặt
            </motion.h1>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="space-y-6">
            {settingsGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-3 bg-cream-50 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-700">{group.title}</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {group.items.map((item) => {
                    const content = (
                      <div className="px-6 py-4 flex items-center justify-between hover:bg-cream-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.description}</p>
                          </div>
                        </div>
                        {"active" in item && (
                          <div className={`w-3 h-3 rounded-full ${item.active ? "bg-brand-500" : "bg-gray-200"}`} />
                        )}
                      </div>
                    );

                    if ("href" in item && item.href) {
                      return <Link key={item.label} href={item.href}>{content}</Link>;
                    }
                    return <div key={item.label}>{content}</div>;
                  })}
                </div>
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-red-100 text-red-600 font-medium text-sm hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </motion.button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
