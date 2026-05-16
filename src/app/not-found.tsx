import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
        <div className="text-center px-4">
          <div className="text-8xl mb-6">🧋</div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Oops! Không tìm thấy trang
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
