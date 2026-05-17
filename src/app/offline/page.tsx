"use client";

import { motion } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-cream-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-gray-500 dark:text-gray-400" />
        </div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-3">
          Không có kết nối mạng
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Vui lòng kiểm tra kết nối internet và thử lại. Một số tính năng có thể không khả dụng khi offline.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
