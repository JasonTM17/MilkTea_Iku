import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hệ thống cửa hàng | MilkTea Iku",
  description:
    "Tìm cửa hàng Iku gần bạn nhất tại TP.HCM và Hà Nội. Mở cửa từ 8:00 đến 22:00 mỗi ngày.",
};

export default function StoresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
