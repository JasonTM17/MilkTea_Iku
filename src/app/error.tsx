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

function SadBobaCup() {
  return (
    <svg
      width="120"
      height="140"
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
      <circle cx="55" cy="120" r="5" fill="#7C3D12" opacity="0.45" />
      <circle cx="70" cy="120" r="5" fill="#7C3D12" opacity="0.45" />
      {/* Straw */}
      <rect x="56" y="4" width="8" height="60" rx="4" fill="#F97316" opacity="0.7" />
      {/* Straw stripes */}
      <rect x="56" y="10" width="8" height="6" fill="#EA580C" opacity="0.5" />
      <rect x="56" y="24" width="8" height="6" fill="#EA580C" opacity="0.5" />
      <rect x="56" y="38" width="8" height="6" fill="#EA580C" opacity="0.5" />
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
      {/* Tear drop */}
      <ellipse cx="47" cy="65" rx="2" ry="3" fill="#93C5FD" opacity="0.7" />
      {/* Floating stars / sparkles */}
      <circle cx="18" cy="60" r="3" fill="#FCD34D" opacity="0.5" />
      <circle cx="102" cy="55" r="2.5" fill="#FCD34D" opacity="0.4" />
      <circle cx="14" cy="90" r="2" fill="#FCD34D" opacity="0.35" />
      <circle cx="106" cy="85" r="3" fill="#FCD34D" opacity="0.45" />
    </svg>
  );
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        {/* Animated boba cup */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 flex justify-center"
        >
          <SadBobaCup />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ôi không! Có lỗi xảy ra
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Ly trà sữa của bạn bị đổ mất rồi. Đừng lo, hãy thử lại hoặc quay
            về trang chủ nhé!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
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
