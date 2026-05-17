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
import JsonLd from "@/components/JsonLd";
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
  metadataBase: new URL("https://milktea-iku.vercel.app"),
  title: "MilkTea Iku | Trà Sữa Premium",
  description:
    "Thưởng thức trà sữa cao cấp với nguyên liệu tươi ngon nhất. Đặt hàng online, giao tận nơi.",
  keywords: ["trà sữa", "milk tea", "boba", "topping", "đặt hàng online"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://milktea-iku.vercel.app",
    siteName: "MilkTea Iku",
    title: "MilkTea Iku | Trà Sữa Premium",
    description:
      "Thưởng thức trà sữa cao cấp với nguyên liệu tươi ngon nhất. Đặt hàng online, giao tận nơi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MilkTea Iku - Trà Sữa Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MilkTea Iku | Trà Sữa Premium",
    description:
      "Thưởng thức trà sữa cao cấp với nguyên liệu tươi ngon nhất. Đặt hàng online, giao tận nơi.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn(inter.variable, playfair.variable, "font-sans overflow-x-hidden")} suppressHydrationWarning>
      <body className="antialiased bg-cream-50 dark:bg-gray-900 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <JsonLd />
          <SkipLink />
          <PromoBanner />
          <div id="main-content">
            {children}
          </div>
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
