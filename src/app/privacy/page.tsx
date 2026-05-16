import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "Chính sách bảo mật | MilkTea Iku",
  description: "Chính sách bảo mật và quyền riêng tư của MilkTea Iku",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Chính sách bảo mật
          </h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Thu thập thông tin</h2>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi thu thập thông tin cá nhân khi bạn đặt hàng, đăng ký tài khoản, hoặc liên hệ với chúng tôi.
                Thông tin bao gồm: họ tên, số điện thoại, email, địa chỉ giao hàng.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Sử dụng thông tin</h2>
              <p className="text-gray-600 leading-relaxed">
                Thông tin của bạn được sử dụng để: xử lý đơn hàng, giao hàng, liên hệ hỗ trợ,
                gửi thông tin khuyến mãi (nếu bạn đồng ý), và cải thiện dịch vụ.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Bảo mật thông tin</h2>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin cá nhân của bạn.
                Dữ liệu thanh toán được mã hóa SSL và không lưu trữ trên hệ thống của chúng tôi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Chia sẻ thông tin</h2>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi không bán hoặc chia sẻ thông tin cá nhân với bên thứ ba, ngoại trừ:
                đối tác giao hàng (chỉ địa chỉ và SĐT), cổng thanh toán (thông tin giao dịch),
                và khi có yêu cầu từ cơ quan pháp luật.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookie</h2>
              <p className="text-gray-600 leading-relaxed">
                Website sử dụng cookie để ghi nhớ giỏ hàng, sở thích của bạn, và cải thiện trải nghiệm.
                Bạn có thể tắt cookie trong trình duyệt nhưng một số tính năng có thể bị ảnh hưởng.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Quyền của bạn</h2>
              <p className="text-gray-600 leading-relaxed">
                Bạn có quyền: xem, chỉnh sửa, xóa thông tin cá nhân; hủy đăng ký nhận email;
                yêu cầu xuất dữ liệu. Liên hệ hello@milktea-iku.vn để thực hiện.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Liên hệ</h2>
              <p className="text-gray-600 leading-relaxed">
                Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:<br />
                Email: hello@milktea-iku.vn<br />
                Hotline: 1900 1234<br />
                Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
              </p>
            </section>

            <p className="text-sm text-gray-400 pt-4 border-t border-gray-200">
              Cập nhật lần cuối: Tháng 5, 2024
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
