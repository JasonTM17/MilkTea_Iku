import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông tin giao hàng | Iku Milk Tea",
  description: "Khu vực giao hàng, phí giao hàng và thời gian giao hàng của Iku Milk Tea",
};

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
