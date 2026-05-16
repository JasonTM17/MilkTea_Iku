import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ContactContent from "./ContactContent";

export const metadata = {
  title: "Liên hệ | MilkTea Iku",
  description: "Liên hệ với MilkTea Iku - Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
