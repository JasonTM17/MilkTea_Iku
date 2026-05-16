import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sự kiện | Iku Milk Tea",
  description: "Các sự kiện và hoạt động sắp diễn ra của Iku Milk Tea",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
