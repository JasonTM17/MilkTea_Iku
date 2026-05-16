import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FAQContent from "./FAQContent";

export const metadata = {
  title: "Câu hỏi thường gặp | MilkTea Iku",
  description: "Giải đáp mọi thắc mắc về đặt hàng, giao hàng, thanh toán và sản phẩm của MilkTea Iku",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20">
        <FAQContent />
      </main>
      <Footer />
    </>
  );
}
