"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Decorative boba pearls — scattered around the section
const pearls = [
  { id: 1, x: "4%",  y: "20%", r: 14, color: "#6b301c", delay: 0,   dur: 5.5 },
  { id: 2, x: "94%", y: "15%", r: 10, color: "#a1471d", delay: 0.7, dur: 4.8 },
  { id: 3, x: "2%",  y: "72%", r: 18, color: "#3a170c", delay: 1.1, dur: 6.2 },
  { id: 4, x: "96%", y: "68%", r: 12, color: "#82391f", delay: 0.3, dur: 5.0 },
  { id: 5, x: "48%", y: "4%",  r: 8,  color: "#c25f20", delay: 1.5, dur: 4.2 },
  { id: 6, x: "52%", y: "94%", r: 11, color: "#a1471d", delay: 0.9, dur: 5.8 },
  { id: 7, x: "18%", y: "88%", r: 7,  color: "#d4792a", delay: 1.8, dur: 4.5 },
  { id: 8, x: "82%", y: "82%", r: 9,  color: "#6b301c", delay: 0.5, dur: 6.0 },
];

// Sparkle positions for the success state
const sparkles = [
  { id: 1, x: -40, y: -30, delay: 0 },
  { id: 2, x:  40, y: -35, delay: 0.08 },
  { id: 3, x: -50, y:  10, delay: 0.16 },
  { id: 4, x:  50, y:   5, delay: 0.24 },
  { id: 5, x: -20, y:  40, delay: 0.12 },
  { id: 6, x:  20, y:  42, delay: 0.2 },
];

function validateEmail(value: string): string {
  if (!value.trim()) return "Vui lòng nhập email của bạn.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Địa chỉ email không hợp lệ.";
  return "";
}

export default function Newsletter() {
  const inputId = useId();
  const [email, setEmail]       = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [touched, setTouched]   = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (touched) setError(validateEmail(e.target.value));
  }

  function handleBlur() {
    setTouched(true);
    setError(validateEmail(email));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const err = validateEmail(email);
    if (err) { setError(err); return; }

    setLoading(true);
    // Simulate network request
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setSuccess(true);
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-200 to-brand-100" />

      {/* Soft radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-[-8%] w-[45vw] h-[45vw] rounded-full bg-brand-200/25 blur-[100px]" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[40vw] h-[40vw] rounded-full bg-cream-400/35 blur-[90px]" />
      </div>

      {/* ── Floating boba pearls ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {pearls.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={p.color}
              fillOpacity={0.15}
              animate={{
                opacity:    [0.1, 0.22, 0.1],
                translateY: [0, -10, 0],
              }}
              transition={{
                opacity:    { duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
                translateY: { duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
              }}
            />
          ))}
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 border border-brand-200 text-brand-700 rounded-full text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden="true" />
            Bản tin hàng tuần
          </span>

          {/* Headline */}
          <h2
            id="newsletter-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-50 leading-tight tracking-tight mb-4"
          >
            Nhận ưu đãi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700">
              mỗi tuần
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-md mx-auto">
            Đăng ký để nhận ưu đãi độc quyền, thông báo sản phẩm mới và bí quyết
            pha trà sữa ngay trong hộp thư của bạn.
          </p>

          {/* ── Form / Success ── */}
          <AnimatePresence mode="wait">
            {success ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4"
                role="status"
                aria-live="polite"
              >
                {/* Checkmark with sparkles */}
                <div className="relative inline-flex items-center justify-center">
                  {/* Sparkles */}
                  {sparkles.map((s) => (
                    <motion.span
                      key={s.id}
                      className="absolute text-brand-400 text-lg select-none"
                      style={{ x: s.x, y: s.y }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                      transition={{ duration: 0.7, delay: 0.3 + s.delay, ease: "easeOut" }}
                      aria-hidden="true"
                    >
                      ✦
                    </motion.span>
                  ))}

                  {/* Circle + check */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </motion.div>
                </div>

                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    Cảm ơn bạn đã đăng ký!
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Kiểm tra hộp thư để nhận ưu đãi đầu tiên của bạn
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ── Form state ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  {/* Email input */}
                  <div className="flex-1 flex flex-col gap-1.5 text-left">
                    <label htmlFor={inputId} className="sr-only">
                      Địa chỉ email
                    </label>
                    <input
                      id={inputId}
                      type="email"
                      autoComplete="email"
                      placeholder="email@cua-ban.com"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${inputId}-error` : undefined}
                      className={[
                        "h-11 w-full rounded-xl border bg-white/80 backdrop-blur-sm px-4 text-sm text-gray-800 placeholder:text-gray-400",
                        "outline-none transition-all duration-200",
                        "focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400",
                        "disabled:opacity-60 disabled:cursor-not-allowed",
                        error
                          ? "border-red-400 ring-2 ring-red-300/40"
                          : "border-brand-200 hover:border-brand-300",
                      ].join(" ")}
                    />
                    {error && (
                      <motion.p
                        id={`${inputId}-error`}
                        role="alert"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-medium pl-1"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className={[
                      "h-11 shrink-0 rounded-xl px-6 text-sm font-semibold text-white",
                      "bg-brand-600 hover:bg-brand-700 active:bg-brand-800",
                      "shadow-md shadow-brand-500/25 hover:shadow-brand-500/40",
                      "hover:-translate-y-0.5 transition-all duration-200",
                      "disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0",
                      "sm:self-start",
                    ].join(" ")}
                    aria-label={loading ? "Đang xử lý..." : "Đăng ký nhận bản tin"}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                          aria-hidden="true"
                        />
                        Đang xử lý...
                      </span>
                    ) : (
                      "Đăng ký"
                    )}
                  </Button>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Không spam. Hủy đăng ký bất cứ lúc nào.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
