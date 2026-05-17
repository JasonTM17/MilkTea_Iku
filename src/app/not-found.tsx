"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none" className="mx-auto">
            <path d="M30 35h60l-6 85c-1 8-6 13-14 13H50c-8 0-13-5-14-13L30 35z" fill="#f2d7b0" />
            <rect x="25" y="28" width="70" height="10" rx="5" fill="#3a170c" />
            <rect x="72" y="8" width="5" height="55" rx="2.5" fill="#c25f20" transform="rotate(8 74 35)" />
            <path d="M34 35c0-6 10-12 26-12s26 6 26 12" fill="#fdf9f0" opacity="0.9" />
            <circle cx="45" cy="90" r="7" fill="#3a170c" opacity="0.6" />
            <circle cx="60" cy="100" r="6" fill="#3a170c" opacity="0.5" />
            <circle cx="75" cy="88" r="7" fill="#3a170c" opacity="0.6" />
            <circle cx="50" cy="55" r="3" fill="#3a170c" opacity="0.7" />
            <circle cx="70" cy="55" r="3" fill="#3a170c" opacity="0.7" />
            <path d="M48 68c4 3 10 3 14 0" stroke="#3a170c" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
          </svg>
        </motion.div>

        <h1 className="text-6xl font-display font-bold text-brand-600 dark:text-brand-400 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Oops! Trang không tồn tại</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Có vẻ ly trà sữa này đã bị uống hết rồi. Hãy quay lại trang chủ nhé!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-brand-600 hover:bg-brand-700 text-white rounded-full px-6 gap-2">
              <Home className="w-4 h-4" />
              Về trang chủ
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" className="rounded-full px-6 gap-2 border-brand-200 text-brand-700 hover:bg-brand-50">
              <ArrowLeft className="w-4 h-4" />
              Xem menu
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
