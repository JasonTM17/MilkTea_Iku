import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tra cứu đơn hàng | MilkTea Iku",
  description:
    "Theo dõi trạng thái đơn hàng trà sữa của bạn theo thời gian thực. Nhập số điện thoại để kiểm tra đơn hàng.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
