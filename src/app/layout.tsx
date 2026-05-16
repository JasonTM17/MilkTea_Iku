import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import SearchModal from "@/components/SearchModal";
import PromoBanner from "@/components/PromoBanner";
import ScrollToTop from "@/components/ScrollToTop";
import MobileNav from "@/components/MobileNav";
import ThemeProvider from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import SkipLink from "@/components/SkipLink";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "MilkTea Iku | Trà Sữa Premium",
  description:
    "Thưởng thức trà sữa cao cấp với nguyên liệu tươi ngon nhất. Đặt hàng online, giao tận nơi.",
  keywords: ["trà sữa", "milk tea", "boba", "topping", "đặt hàng online"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn(inter.variable, playfair.variable, "font-sans")}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SkipLink />
          <PromoBanner />
          {children}
          <MobileNav />
          <ScrollToTop />
          <ToastProvider />
          <SearchModal />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
