"use client";

import { motion } from "framer-motion";
import { Mail, Gift, Sparkles } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-6 h-6 text-brand-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
            Nhận ưu đãi độc quyền
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Đăng ký nhận tin để không bỏ lỡ khuyến mãi, menu mới và quà tặng đặc biệt
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-full font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Đăng ký thành công! Kiểm tra email nhé
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-brand-600 text-white rounded-xl font-medium text-sm hover:bg-brand-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                {status === "loading" ? "Đang gửi..." : "Đăng ký"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-sm text-red-500 mt-3">Có lỗi xảy ra, vui lòng thử lại.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
