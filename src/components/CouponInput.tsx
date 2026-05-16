"use client";

import { motion } from "framer-motion";
import { Tag, Percent, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface CouponInputProps {
  onApply: (code: string, discount: { type: string; value: number }) => void;
}

export default function CouponInput({ onApply }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (!res.ok || !data.valid) {
        setError(data.error || "Mã không hợp lệ");
        return;
      }

      setApplied(true);
      onApply(code, { type: data.coupon.discountType, value: data.coupon.discountValue });
    } catch {
      setError("Không thể kiểm tra mã giảm giá");
    } finally {
      setLoading(false);
    }
  };

  if (applied) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl"
      >
        <CheckCircle2 className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-700">
          Mã <strong>{code.toUpperCase()}</strong> đã được áp dụng
        </span>
        <button
          onClick={() => { setApplied(false); setCode(""); }}
          className="ml-auto text-xs text-green-600 hover:text-green-800 font-medium"
        >
          Hủy
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
            placeholder="Nhập mã giảm giá"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent uppercase"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Áp dụng"}
        </button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
