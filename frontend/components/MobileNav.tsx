"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, ClipboardList, Grid3X3, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";

const navItems = [
  { href: "/", icon: Home, label: "Trang chủ" },
  { href: "/menu", icon: Grid3X3, label: "Menu" },
  { href: "/promotions", icon: ShoppingBag, label: "Ưu đãi" },
  { href: "/tracking", icon: ClipboardList, label: "Đơn hàng" },
  { href: "/stores", icon: MapPin, label: "Cửa hàng" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className="relative flex flex-col items-center gap-0.5 py-2 px-3 min-h-11 min-w-11 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <div className="relative">
                    <item.icon
                      className={`w-5 h-5 transition-colors ${
                        active ? "text-brand-600 dark:text-brand-300" : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                    {item.href === "/promotions" && items.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium transition-colors ${
                      active ? "text-brand-600 dark:text-brand-300" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="mobileNavIndicator"
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
