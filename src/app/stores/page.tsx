"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type City = "Tất cả" | "TP.HCM" | "Hà Nội";

interface Store {
  id: number;
  name: string;
  address: string;
  district: string;
  city: "TP.HCM" | "Hà Nội";
  phone: string;
  hours: string;
  mapsUrl: string;
}

const stores: Store[] = [
  {
    id: 1,
    name: "Iku Nguyễn Huệ",
    address: "12 Nguyễn Huệ, Phường Bến Nghé",
    district: "Quận 1",
    city: "TP.HCM",
    phone: "028 1234 5678",
    hours: "08:00 – 22:00",
    mapsUrl:
      "https://www.google.com/maps/search/12+Nguy%E1%BB%85n+Hu%E1%BB%87,+Q.1,+TP.HCM",
  },
  {
    id: 2,
    name: "Iku Phạm Ngọc Thạch",
    address: "45 Phạm Ngọc Thạch, Phường 6",
    district: "Quận 3",
    city: "TP.HCM",
    phone: "028 2345 6789",
    hours: "08:00 – 22:00",
    mapsUrl:
      "https://www.google.com/maps/search/45+Ph%E1%BA%A1m+Ng%E1%BB%8Dc+Th%E1%BA%A1ch,+Q.3,+TP.HCM",
  },
  {
    id: 3,
    name: "Iku Lê Văn Sỹ",
    address: "78 Lê Văn Sỹ, Phường 13",
    district: "Quận 3",
    city: "TP.HCM",
    phone: "028 3456 7890",
    hours: "08:00 – 22:00",
    mapsUrl:
      "https://www.google.com/maps/search/78+L%C3%AA+V%C4%83n+S%E1%BB%B9,+Q.3,+TP.HCM",
  },
  {
    id: 4,
    name: "Iku Hoàng Đạo Thúy",
    address: "23 Hoàng Đạo Thúy, Phường Trung Hòa",
    district: "Cầu Giấy",
    city: "Hà Nội",
    phone: "024 4567 8901",
    hours: "08:00 – 22:00",
    mapsUrl:
      "https://www.google.com/maps/search/23+Ho%C3%A0ng+%C4%90%E1%BA%A1o+Th%C3%BAy,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i",
  },
  {
    id: 5,
    name: "Iku Trần Duy Hưng",
    address: "56 Trần Duy Hưng, Phường Trung Hòa",
    district: "Cầu Giấy",
    city: "Hà Nội",
    phone: "024 5678 9012",
    hours: "08:00 – 22:00",
    mapsUrl:
      "https://www.google.com/maps/search/56+Tr%E1%BA%A7n+Duy+H%C6%B0ng,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i",
  },
  {
    id: 6,
    name: "Iku Nguyễn Trãi",
    address: "89 Nguyễn Trãi, Phường Thượng Đình",
    district: "Thanh Xuân",
    city: "Hà Nội",
    phone: "024 6789 0123",
    hours: "08:00 – 22:00",
    mapsUrl:
      "https://www.google.com/maps/search/89+Nguy%E1%BB%85n+Tr%C3%A3i,+Thanh+Xu%C3%A2n,+H%C3%A0+N%E1%BB%99i",
  },
];

const cityFilters: City[] = ["Tất cả", "TP.HCM", "Hà Nội"];

const cityBadgeColor: Record<Store["city"], string> = {
  "TP.HCM": "bg-brand-100 text-brand-700 border-brand-200",
  "Hà Nội": "bg-blue-50 text-blue-700 border-blue-200",
};

// SVG icons as inline components to avoid adding a new icon library
function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 text-brand-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 text-brand-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 text-brand-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DirectionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function StoresPage() {
  const [activeCity, setActiveCity] = useState<City>("Tất cả");

  const filtered =
    activeCity === "Tất cả"
      ? stores
      : stores.filter((s) => s.city === activeCity);

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
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-5"
            >
              Tìm cửa hàng
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
            >
              Hệ thống{" "}
              <span className="text-brand-600">cửa hàng</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
            >
              {stores.length} cửa hàng tại TP.HCM và Hà Nội — mở cửa mỗi ngày
              từ 8:00 đến 22:00
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center mb-10"
          >
            {cityFilters.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  activeCity === city
                    ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-brand-400 hover:text-brand-600"
                }`}
              >
                {city}
                {city !== "Tất cả" && (
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      activeCity === city
                        ? "bg-brand-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {stores.filter((s) => s.city === city).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Store grid */}
          <motion.div
            key={activeCity}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
          >
            {filtered.map((store) => (
              <motion.div key={store.id} variants={cardVariants}>
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden">
                  {/* Card top accent */}
                  <div className="h-1.5 bg-gradient-to-r from-brand-400 to-brand-600" />

                  <CardContent className="p-6 flex flex-col gap-4">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 leading-snug">
                          {store.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          {store.district}
                        </p>
                      </div>
                      <Badge
                        className={`shrink-0 text-xs font-medium border ${cityBadgeColor[store.city]}`}
                        variant="outline"
                      >
                        {store.city}
                      </Badge>
                    </div>

                    {/* Info rows */}
                    <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2.5">
                        <MapPinIcon />
                        <span>
                          {store.address}, {store.district}, {store.city}
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <PhoneIcon />
                        <a
                          href={`tel:${store.phone.replace(/\s/g, "")}`}
                          className="hover:text-brand-600 transition-colors"
                        >
                          {store.phone}
                        </a>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <ClockIcon />
                        <span>{store.hours} — Mở cửa hàng ngày</span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <div className="pt-1 mt-auto">
                      <a
                        href={store.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl gap-2 inline-flex items-center justify-center h-10 px-4 font-medium transition-colors"
                      >
                        <DirectionsIcon />
                        Chỉ đường
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Bản đồ cửa hàng Iku
              </span>
            </div>
            <div className="relative bg-gray-200 dark:bg-gray-700 h-72 md:h-96 flex flex-col items-center justify-center gap-4">
              {/* Decorative grid lines */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Decorative pin dots */}
              {[
                { top: "35%", left: "30%" },
                { top: "42%", left: "34%" },
                { top: "38%", left: "38%" },
                { top: "28%", left: "62%" },
                { top: "32%", left: "66%" },
                { top: "36%", left: "70%" },
              ].map((pos, i) => (
                <span
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-brand-500 border-2 border-white shadow-md"
                  style={{ top: pos.top, left: pos.left }}
                />
              ))}
              <div className="relative z-10 text-center px-4">
                <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow">
                  <MapPinIcon />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-base">
                  {stores.length} cửa hàng tại TP.HCM &amp; Hà Nội
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Nhấn &ldquo;Chỉ đường&rdquo; trên từng thẻ để mở Google Maps
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-14 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm px-6 py-10"
          >
            <p className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
              Chưa có cửa hàng gần bạn?
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Đặt hàng online và nhận giao tận nơi trong vòng 30 phút tại khu
              vực nội thành.
            </p>
            <a
              href="/menu"
              className="inline-flex items-center justify-center h-11 px-8 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
            >
              Đặt hàng ngay
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
