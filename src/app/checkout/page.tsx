import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Thanh toán | MilkTea Iku",
  description: "Hoàn tất đơn hàng trà sữa của bạn",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
