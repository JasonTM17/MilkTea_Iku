import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import PromoBanner from "@/components/PromoBanner";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
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
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <PromoBanner />
        {children}
        <ScrollToTop />
        <ToastProvider />
      </body>
    </html>
  );
}
