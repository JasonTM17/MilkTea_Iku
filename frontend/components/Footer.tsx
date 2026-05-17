"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Clock, Heart } from "lucide-react";
import Newsletter from "@/components/Newsletter";

const menuLinks = [
  { href: "/menu?category=tra-sua-truyen-thong", label: "Trà Sữa Truyền Thống" },
  { href: "/menu?category=tra-trai-cay", label: "Trà Trái Cây" },
  { href: "/menu?category=dac-biet", label: "Đặc Biệt Premium" },
  { href: "/menu?category=tra-xanh-matcha", label: "Matcha Series" },
  { href: "/menu?category=ca-phe", label: "Cà Phê Sữa" },
];

const aboutLinks = [
  { href: "/about", label: "Câu chuyện thương hiệu" },
  { href: "/about", label: "Nguyên liệu tươi sạch" },
  { href: "/about", label: "Tuyển dụng" },
  { href: "/order", label: "Tra cứu đơn hàng" },
];

const policyLinks = [
  { href: "/privacy", label: "Chính sách bảo mật" },
  { href: "/terms", label: "Điều khoản sử dụng" },
  { href: "/delivery", label: "Chính sách giao hàng" },
  { href: "/faq", label: "Câu hỏi thường gặp" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cream-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-display font-bold text-xl">I</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold block leading-tight">MilkTea Iku</span>
                <span className="text-xs text-brand-300">Premium Boba Tea</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Thương hiệu trà sữa premium với nguyên liệu tươi ngon nhập khẩu,
              mang đến trải nghiệm thưởng thức đẳng cấp cho giới trẻ Việt Nam.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white">Menu</h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white">Về Iku</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white">Chính sách</h4>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>hello@milktea-iku.vn</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>8:00 - 22:00 hàng ngày</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-10">
          <Newsletter />
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MilkTea Iku. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-brand-400 fill-brand-400" /> in Saigon
          </p>
        </div>
      </div>
    </footer>
  );
}
