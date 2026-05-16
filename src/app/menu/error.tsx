"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MenuError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[MenuError]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-sm"
      >
        {/* Boba cup illustration */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex justify-center"
        >
          <svg
            width="96"
            height="112"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Cup body */}
            <path
              d="M25 40 L30 120 Q30 130 40 130 L80 130 Q90 130 90 120 L95 40 Z"
              fill="#FDE8D0"
              stroke="#E8A87C"
              strokeWidth="2"
            />
            {/* Cup top rim */}
            <rect
              x="20"
              y="32"
              width="80"
              height="12"
              rx="6"
              fill="#F5C49A"
              stroke="#E8A87C"
              strokeWidth="2"
            />
            {/* Liquid */}
            <path
              d="M28 70 L32 120 Q32 126 40 126 L80 126 Q88 126 88 120 L92 70 Z"
              fill="#C2783C"
              opacity="0.35"
            />
            {/* Bubbles */}
            <circle cx="48" cy="108" r="7" fill="#7C3D12" opacity="0.55" />
            <circle cx="62" cy="115" r="6" fill="#7C3D12" opacity="0.55" />
            <circle cx="74" cy="107" r="7" fill="#7C3D12" opacity="0.55" />
            {/* Straw */}
            <rect x="56" y="4" width="8" height="60" rx="4" fill="#F97316" opacity="0.7" />
            {/* Sad eyes */}
            <circle cx="50" cy="58" r="3" fill="#7C3D12" opacity="0.7" />
            <circle cx="70" cy="58" r="3" fill="#7C3D12" opacity="0.7" />
            {/* Sad mouth */}
            <path
              d="M48 72 Q60 66 72 72"
              stroke="#7C3D12"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Warning mark */}
            <text x="88" y="30" fontSize="22" fill="#F97316" opacity="0.85">!</text>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Không thể tải menu
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Có sự cố khi tải danh sách sản phẩm. Vui lòng thử lại hoặc quay về
            trang chủ nhé!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            onClick={reset}
            className="bg-brand-600 hover:bg-brand-700 text-white rounded-full px-6 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="w-full rounded-full px-6 gap-2 border-brand-200 text-brand-700 hover:bg-brand-50"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
