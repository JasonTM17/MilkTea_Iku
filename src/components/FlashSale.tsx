"use client";

import { motion } from "framer-motion";
import { Ticket, ArrowRight, Clock } from "lucide-react";
import { BobaCupIcon } from "@/components/icons";
import Link from "next/link";

interface FlashDeal {
  id: number;
  name: string;
  slug: string;
  originalPrice: number;
  salePrice: number;
  endsIn: string;
}

const deals: FlashDeal[] = [
  { id: 1, name: "Brown Sugar Boba", slug: "brown-sugar-boba", originalPrice: 55000, salePrice: 39000, endsIn: "2:30:00" },
  { id: 2, name: "Matcha Latte Đá Xay", slug: "matcha-latte-da-xay", originalPrice: 55000, salePrice: 42000, endsIn: "2:30:00" },
  { id: 3, name: "Trà Đào Cam Sả", slug: "tra-dao-cam-sa", originalPrice: 40000, salePrice: 29000, endsIn: "2:30:00" },
];

export default function FlashSale() {
  return (
    <section className="py-10 bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Flash Sale</h3>
              <div className="flex items-center gap-1 text-xs text-red-600">
                <Clock className="w-3 h-3" />
                <span>Kết thúc sau 2:30:00</span>
              </div>
            </div>
          </div>
          <Link
            href="/promotions"
            className="text-sm text-red-600 font-medium hover:text-red-700 flex items-center gap-1"
          >
            Xem tất cả
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 w-52"
            >
              <Link href={`/menu/${deal.slug}`} className="block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-100 to-cream-200 flex items-center justify-center relative">
                  <BobaCupIcon className="w-10 h-10 text-brand-600" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                    -{Math.round((1 - deal.salePrice / deal.originalPrice) * 100)}%
                  </span>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{deal.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-red-600">
                      {deal.salePrice.toLocaleString("vi-VN")}đ
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {deal.originalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
