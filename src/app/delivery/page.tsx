"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Star, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const partners = [
  { name: "GrabFood", description: "Đặt qua Grab, giao nhanh 20 phút", available: true },
  { name: "ShopeeFood", description: "Ưu đãi độc quyền trên Shopee", available: true },
  { name: "Baemin", description: "Freeship cho đơn từ 50K", available: true },
  { name: "GoFood", description: "Tích điểm GoRewards", available: false },
];

const deliveryZones = [
  { city: "TP.HCM", districts: ["Quận 1", "Quận 3", "Quận 7", "Bình Thạnh", "Phú Nhuận", "Tân Bình", "Gò Vấp"] },
  { city: "Hà Nội", districts: ["Cầu Giấy", "Thanh Xuân", "Đống Đa", "Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng"] },
];

export default function DeliveryPage() {
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
              Giao hàng <span className="text-brand-600">tận nơi</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg"
            >
              Nhận trà sữa tươi ngon trong 30 phút tại khu vực nội thành
            </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <Clock className="w-8 h-8 text-brand-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">30 phút</h3>
              <p className="text-sm text-gray-500">Thời gian giao trung bình</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <MapPin className="w-8 h-8 text-brand-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">5km</h3>
              <p className="text-sm text-gray-500">Bán kính freeship</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <Star className="w-8 h-8 text-brand-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">100.000đ</h3>
              <p className="text-sm text-gray-500">Đơn tối thiểu freeship</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Đối tác giao hàng
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className={`bg-white rounded-2xl border shadow-sm p-5 ${
                    partner.available ? "border-gray-100" : "border-gray-100 opacity-60"
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{partner.description}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    partner.available
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    {partner.available ? "Đang hoạt động" : "Sắp ra mắt"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Khu vực giao hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliveryZones.map((zone) => (
                <div key={zone.city} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    {zone.city}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {zone.districts.map((district) => (
                      <span key={district} className="px-3 py-1 bg-cream-100 text-gray-700 text-sm rounded-full">
                        {district}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center"
          >
            <Phone className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
              Đặt hàng qua hotline
            </h3>
            <p className="text-gray-500 mb-4">Gọi ngay để đặt hàng nhanh nhất</p>
            <a
              href="tel:19001234"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              1900 1234
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
