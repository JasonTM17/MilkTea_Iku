"use client";

import { motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("iku-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("iku-cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("iku-cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-brand-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">Cookie & Quyền riêng tư</p>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn. Xem{" "}
              <a href="/privacy" className="text-brand-600 underline">chính sách bảo mật</a>.
            </p>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Đồng ý
              </button>
              <button
                onClick={decline}
                className="px-4 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Từ chối
              </button>
            </div>
          </div>
          <button onClick={decline} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
