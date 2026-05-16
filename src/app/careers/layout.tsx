import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển dụng | Iku Milk Tea",
  description: "Gia nhập đội ngũ Iku Milk Tea – nơi đam mê trà sữa gặp gỡ cơ hội nghề nghiệp",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
