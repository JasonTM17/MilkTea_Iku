"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ShoppingBag, Leaf, Zap } from "lucide-react";

// Boba pearl data — positions, sizes, colors
const bobaPearls = [
  { id: 1, cx: "8%",  cy: "15%", r: 18, color: "#6b301c", delay: 0,    duration: 6 },
  { id: 2, cx: "92%", cy: "20%", r: 12, color: "#a1471d", delay: 0.8,  duration: 5 },
  { id: 3, cx: "5%",  cy: "70%", r: 22, color: "#3a170c", delay: 1.2,  duration: 7 },
  { id: 4, cx: "88%", cy: "75%", r: 16, color: "#82391f", delay: 0.4,  duration: 5.5 },
  { id: 5, cx: "50%", cy: "5%",  r: 10, color: "#c25f20", delay: 1.6,  duration: 4.5 },
  { id: 6, cx: "15%", cy: "45%", r: 8,  color: "#a1471d", delay: 2,    duration: 6.5 },
  { id: 7, cx: "80%", cy: "50%", r: 14, color: "#6b301c", delay: 0.6,  duration: 5.8 },
  { id: 8, cx: "35%", cy: "92%", r: 20, color: "#3a170c", delay: 1.4,  duration: 6.2 },
  { id: 9, cx: "70%", cy: "88%", r: 9,  color: "#c25f20", delay: 0.2,  duration: 4.8 },
];

const trustItems: { icon: React.ReactNode; value: string; label: string }[] = [
  { icon: <ShoppingBag className="w-5 h-5 text-brand-600" />, value: "1000+", label: "đơn hàng mỗi ngày" },
  { icon: <Leaf className="w-5 h-5 text-brand-600" />, value: "100%", label: "Nguyên liệu tươi" },
  { icon: <Zap className="w-5 h-5 text-brand-600" />, value: "30 phút", label: "Giao hàng nhanh" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers
  const bgY      = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY    = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageY   = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const pearlsY  = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Background gradient ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-200 to-brand-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
      />

      {/* Soft radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none dark:opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-brand-200/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-cream-400/40 blur-[100px]" />
        <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-brand-300/20 blur-[80px]" />
      </div>

      {/* ── Floating boba pearls (SVG) ── */}
      <motion.div
        style={{ y: pearlsY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {bobaPearls.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={p.color}
              fillOpacity={0.18}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.12, 0.22, 0.12],
                translateY: [0, -12, 0],
              }}
              transition={{
                opacity:    { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
                translateY: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ── Left: Text ── */}
            <motion.div
              style={{ y: textY }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 dark:bg-brand-900/40 border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                  Thương hiệu trà sữa premium
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-50 leading-[1.08] tracking-tight mb-6"
              >
                Trà Sữa Tươi{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700">
                    Mỗi Ngày
                  </span>
                  {/* Underline squiggle */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 5 Q50 1 100 5 Q150 9 198 5"
                      stroke="#d4792a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
                    />
                  </svg>
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-md"
              >
                Được pha chế từ nguyên liệu tươi ngon nhất, mỗi ly trà sữa Iku
                là một hành trình hương vị — đậm đà, thơm ngát, và luôn mới mẻ
                mỗi ngày.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/menu"
                  className={buttonVariants({ size: "lg", className: "rounded-full px-8 bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5 transition-all duration-200 text-base font-semibold" })}
                >
                  Xem Menu
                </Link>

                <Link
                  href="/checkout"
                  className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8 border-2 border-brand-300 dark:border-brand-600 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/40 hover:border-brand-400 hover:-translate-y-0.5 transition-all duration-200 text-base font-semibold bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm" })}
                >
                  Đặt Hàng Ngay
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 pt-8 border-t border-brand-100 dark:border-gray-700"
              >
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-700 dark:text-brand-300 leading-tight">
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Image ── */}
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.88, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Decorative ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="w-[90%] h-[90%] rounded-full border-2 border-dashed border-brand-200/50"
                />
              </div>

              {/* Glow behind image */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-brand-300/40 to-cream-400/40 blur-3xl" />

              {/* Main image container */}
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1558857563-b371033873b8?w=700&h=700&fit=crop"
                  alt="Ly trà sữa Iku thơm ngon"
                  width={700}
                  height={700}
                  className="relative rounded-[2.5rem] object-cover shadow-2xl shadow-brand-900/20 w-full h-full"
                  priority
                />

                {/* Warm overlay tint */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-brand-900/10 via-transparent to-cream-100/10 pointer-events-none" />

                {/* Floating badge — Best Seller */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-brand-900/15 p-3.5 sm:p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8H7l1.5 12h7L17 8z"/><path d="M6 8h12l-.5-2H6.5L6 8z"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/></svg>
                    </div>
                    <div>
                      <div className="text-xs text-brand-500 font-semibold uppercase tracking-wide">
                        Best Seller
                      </div>
                      <div className="text-sm font-bold text-gray-800 dark:text-gray-50 leading-tight">
                        Brown Sugar Boba
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge — Rating */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-5 -right-5 sm:-top-6 sm:-right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-brand-900/15 px-4 py-3"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-50">4.9</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 text-center">10K+ đánh giá</div>
                </motion.div>

                {/* Floating badge — Fresh daily */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -right-8 sm:-right-10 -translate-y-1/2 bg-brand-600 text-white rounded-2xl shadow-xl shadow-brand-700/40 px-3.5 py-2.5"
                >
                  <div className="text-xs font-semibold leading-tight text-center">
                    <div className="text-lg mb-0.5"><svg className="w-5 h-5 text-white inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><path d="M4 3h16"/><path d="M12 16v5"/><path d="M8 21h8"/></svg></div>
                    <div>Tươi mỗi ngày</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom wave divider ── */}
      <div className="relative w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            className="fill-white dark:fill-gray-900"
            fillOpacity="0.9"
          />
        </svg>
      </div>
    </section>
  );
}
