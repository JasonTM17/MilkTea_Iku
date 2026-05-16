import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistContent from "./WishlistContent";

export const metadata = {
  title: "Yêu thích | MilkTea Iku",
  description: "Danh sách sản phẩm yêu thích của bạn tại MilkTea Iku",
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <WishlistContent />
      </main>
      <Footer />
    </>
  );
}
