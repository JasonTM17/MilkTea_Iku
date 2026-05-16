import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AboutContent from "./AboutContent";

export const metadata = {
  title: "Về chúng tôi | MilkTea Iku",
  description: "Câu chuyện thương hiệu trà sữa Iku - Mỗi ngụm là một trải nghiệm",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
