import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | Iku Milk Tea",
  description: "Chính sách bảo mật và quyền riêng tư của Iku Milk Tea",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
            Chính sách bảo mật
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10">
            Cập nhật lần cuối: Tháng 5, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                1. Thu thập thông tin
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Chúng tôi thu thập thông tin cá nhân khi bạn đặt hàng, đăng ký tài khoản, hoặc
                liên hệ với chúng tôi. Thông tin bao gồm: họ tên, số điện thoại, địa chỉ email,
                địa chỉ giao hàng và lịch sử giao dịch. Chúng tôi chỉ thu thập những thông tin
                cần thiết để cung cấp dịch vụ tốt nhất cho bạn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                2. Sử dụng thông tin
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Thông tin của bạn được sử dụng để: xử lý và giao đơn hàng, liên hệ hỗ trợ khách
                hàng, gửi thông tin khuyến mãi (nếu bạn đồng ý), cải thiện chất lượng dịch vụ và
                cá nhân hóa trải nghiệm mua sắm. Chúng tôi không sử dụng thông tin của bạn cho
                bất kỳ mục đích nào khác ngoài những mục đích đã nêu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                3. Bảo mật dữ liệu
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin cá
                nhân của bạn, bao gồm mã hóa SSL/TLS cho mọi kết nối, kiểm soát truy cập nghiêm
                ngặt và giám sát hệ thống liên tục. Dữ liệu thanh toán được mã hóa và không lưu
                trữ trực tiếp trên hệ thống của chúng tôi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                4. Quyền của bạn
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Bạn có đầy đủ quyền đối với dữ liệu cá nhân của mình, bao gồm: quyền xem và
                chỉnh sửa thông tin, quyền yêu cầu xóa tài khoản và dữ liệu, quyền hủy đăng ký
                nhận email marketing, và quyền yêu cầu xuất toàn bộ dữ liệu. Để thực hiện các
                quyền này, vui lòng liên hệ với chúng tôi qua email bên dưới.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                5. Liên hệ
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:
              </p>
              <ul className="mt-3 space-y-1 text-gray-600 dark:text-gray-400">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:hello@milktea-iku.vn"
                    className="text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    hello@milktea-iku.vn
                  </a>
                </li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
