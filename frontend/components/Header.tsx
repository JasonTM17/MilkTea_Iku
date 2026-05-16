"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/order", label: "Đặt hàng" },
];

function MilkTeaLogo() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cup body */}
      <path
        d="M9 13h20l-2.8 16.5A2 2 0 0 1 24.2 31H13.8a2 2 0 0 1-2-1.5L9 13z"
        fill="#d4792a"
      />
      {/* Highlight on cup */}
      <path
        d="M12 13h4l-1.8 16.5a2 2 0 0 1-.4 1H13.8a2 2 0 0 1-2-1.5L9 13h3z"
        fill="#df9a48"
        opacity="0.5"
      />
      {/* Cream top */}
      <ellipse cx="19" cy="13" rx="10" ry="3.2" fill="#fdf9f0" />
      <ellipse cx="19" cy="12.5" rx="8" ry="2" fill="#faf0dc" />
      {/* Straw */}
      <rect x="21.5" y="4" width="2.8" height="15" rx="1.4" fill="#3a170c" opacity="0.75" />
      {/* Tapioca pearls */}
      <circle cx="14.5" cy="23" r="2.2" fill="#3a170c" opacity="0.55" />
      <circle cx="20" cy="25.5" r="2.2" fill="#3a170c" opacity="0.55" />
      <circle cx="24.5" cy="22" r="2.2" fill="#3a170c" opacity="0.55" />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, itemCount } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-100/95 dark:bg-gray-900/95 backdrop-blur-md shadow-[0_2px_24px_rgba(212,121,42,0.13)]"
          : "bg-gradient-to-b from-cream-100/85 dark:from-gray-900/85 to-cream-100/0 dark:to-gray-900/0 backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
              transition={{ duration: 0.4 }}
              className="flex-shrink-0"
            >
              <MilkTeaLogo />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold text-brand-800 group-hover:text-brand-600 transition-colors duration-200">
                Iku
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] text-brand-400 uppercase">
                Milk Tea
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-brand-800/75 hover:text-brand-600 transition-colors duration-200 rounded-full hover:bg-brand-500/10 group"
                >
                  {link.label}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-500 rounded-full transition-all duration-200 group-hover:w-3/4" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Cart button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleCart}
              aria-label="Giỏ hàng"
              className="relative flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white transition-colors duration-200 shadow-sm shadow-brand-500/25"
            >
              <ShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline text-sm font-medium">Giỏ hàng</span>
              {count > 0 && (
                <motion.div
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                >
                  <Badge className="bg-white text-brand-600 border-0 font-bold h-5 min-w-[1.25rem] px-1.5 text-xs">
                    {count > 99 ? "99+" : count}
                  </Badge>
                </motion.div>
              )}
            </motion.button>

            {/* Mobile hamburger via Sheet */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="md:hidden p-2 rounded-full text-brand-800 hover:bg-brand-500/10 transition-colors duration-200"
                aria-label="Mở menu"
              >
                <Menu className="w-5 h-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-cream-100 dark:bg-gray-900 border-l border-brand-100 dark:border-gray-800 w-[280px] p-0 flex flex-col"
              >
                {/* Sheet header / logo */}
                <SheetHeader className="px-6 pt-6 pb-4">
                  <div className="flex items-center gap-2.5">
                    <MilkTeaLogo />
                    <div className="flex flex-col leading-none">
                      <SheetTitle className="font-display text-xl font-bold text-brand-800">
                        Iku
                      </SheetTitle>
                      <span className="text-[9px] font-semibold tracking-[0.2em] text-brand-400 uppercase">
                        Milk Tea
                      </span>
                    </div>
                  </div>
                </SheetHeader>

                <Separator className="bg-brand-100" />

                {/* Nav links */}
                <nav className="flex flex-col px-3 py-3 gap-0.5 flex-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.25, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-800 font-medium hover:bg-brand-500/10 hover:text-brand-600 transition-colors duration-150"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-300 flex-shrink-0" />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <Separator className="bg-brand-100 mx-3" />

                {/* Cart CTA in sheet */}
                <div className="px-4 py-4">
                  <button
                    onClick={() => {
                      toggleCart();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-medium transition-colors duration-200 shadow-sm shadow-brand-500/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Giỏ hàng</span>
                    {count > 0 && (
                      <Badge className="bg-white text-brand-600 border-0 font-bold h-5 min-w-[1.25rem] px-1.5 text-xs ml-0.5">
                        {count > 99 ? "99+" : count}
                      </Badge>
                    )}
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
