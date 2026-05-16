"use client";

import { motion } from "framer-motion";
import { Truck, Clock, MapPin, BadgeCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const deliveryZones = [
  {
    city: "TP. Hồ Chí Minh",
    districts: ["Quận 1", "Quận 3", "Quận 7", "Bình Thạnh", "Phú Nhuận", "Tân Bình", "Gò Vấp"],
  },
  {
    city: "Hà Nội",
    districts: ["Cầu Giấy", "Thanh Xuân", "Đống Đa", "Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng"],
  },
];

const feeTable = [
  { range: "0 – 2 km", fee: "Miễn phí (đơn từ 100.000đ)", time: "15 – 20 phút" },
  { range: "2 – 5 km", fee: "Miễn phí (đơn từ 100.000đ)", time: "25 – 35 phút" },
  { range: "5 – 10 km", fee: "15.000đ", time: "35 – 50 phút" },
  { range: "Trên 10 km", fee: "Liên hệ hotline", time: "Thoả thuận" },
];

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium mb-5"
            >
              Giao hàng
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Thông tin{" "}
              <span className="text-brand-600 dark:text-brand-400">giao hàng</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Nhận trà sữa tươi ngon tận nơi – nhanh chóng, an toàn và tiện lợi
            </motion.p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">
          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { icon: Truck, label: "Giao hàng tận nơi", value: "Toàn quốc" },
              { icon: Clock, label: "Thời gian trung bình", value: "30 phút" },
              { icon: MapPin, label: "Bán kính freeship", value: "5 km" },
              { icon: BadgeCheck, label: "Đơn tối thiểu freeship", value: "100.000đ" },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 text-center"
              >
                <Icon className="w-8 h-8 text-brand-600 dark:text-brand-400 mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Fee table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
              Phí giao hàng
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cream-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left px-6 py-3 font-semibold text-gray-700 dark:text-gray-300">
                      Khoảng cách
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700 dark:text-gray-300">
                      Phí giao hàng
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-700 dark:text-gray-300">
                      Thời gian dự kiến
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeTable.map((row, i) => (
                    <tr
                      key={row.range}
                      className={`border-b border-gray-50 dark:border-gray-700/50 last:border-0 ${
                        i % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-gray-700/20"
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {row.range}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{row.fee}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Delivery zones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
              Khu vực giao hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliveryZones.map((zone) => (
                <div
                  key={zone.city}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                    {zone.city}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {zone.districts.map((district) => (
                      <span
                        key={district}
                        className="px-3 py-1 bg-cream-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {district}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Free delivery highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/40 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6"
          >
            <BadgeCheck className="w-12 h-12 text-brand-600 dark:text-brand-400 shrink-0" />
            <div>
              <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-50 mb-1">
                Miễn phí giao hàng
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Đơn hàng từ <strong>100.000đ</strong> trong bán kính <strong>5km</strong> được
                miễn phí giao hàng hoàn toàn. Áp dụng cho tất cả các chi nhánh Iku trên toàn
                quốc.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
