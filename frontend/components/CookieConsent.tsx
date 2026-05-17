"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("iku-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:bottom-6 md:max-w-sm"
        >
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
                <Cookie className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="flex-1">
                <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Cookie &amp; Quyền riêng tư
                </p>
                <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  Chúng tôi dùng cookie để cải thiện trải nghiệm của bạn. Xem{" "}
                  <a
                    href="/privacy"
                    className="text-brand-600 underline dark:text-brand-400 py-1"
                  >
                    chính sách bảo mật
                  </a>
                  .
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={accept}
                    className="rounded-lg bg-brand-600 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
                  >
                    Chấp nhận
                  </button>
                  <button
                    onClick={decline}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
