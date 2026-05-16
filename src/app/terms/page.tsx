import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "Điều khoản sử dụng | MilkTea Iku",
  description: "Điều khoản và điều kiện sử dụng dịch vụ MilkTea Iku",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Điều khoản sử dụng
          </h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Điều kiện chung</h2>
              <p className="text-gray-600 leading-relaxed">
                Khi sử dụng dịch vụ của MilkTea Iku, bạn đồng ý tuân thủ các điều khoản này.
                Chúng tôi có quyền cập nhật điều khoản bất kỳ lúc nào và sẽ thông báo qua email hoặc website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Đặt hàng và thanh toán</h2>
              <p className="text-gray-600 leading-relaxed">
                Đơn hàng được xác nhận sau khi thanh toán thành công hoặc xác nhận COD.
                Giá sản phẩm có thể thay đổi mà không cần báo trước.
                Chúng tôi hỗ trợ: MoMo, ZaloPay, VNPay, chuyển khoản ngân hàng, và COD.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Giao hàng</h2>
              <p className="text-gray-600 leading-relaxed">
                Thời gian giao hàng dự kiến 30-45 phút trong khu vực nội thành.
                Phí giao hàng miễn phí cho đơn từ 100.000đ trong bán kính 5km.
                Chúng tôi không chịu trách nhiệm cho trường hợp bất khả kháng (thời tiết, giao thông).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Hủy đơn và hoàn tiền</h2>
              <p className="text-gray-600 leading-relaxed">
                Bạn có thể hủy đơn trong vòng 5 phút sau khi đặt. Sau thời gian này, đơn hàng
                đã được chế biến và không thể hủy. Hoàn tiền sẽ được xử lý trong 3-5 ngày làm việc
                qua phương thức thanh toán ban đầu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Chương trình khách hàng thân thiết</h2>
              <p className="text-gray-600 leading-relaxed">
                Iku Stars được tích lũy với mỗi đơn hàng (10.000đ = 1 star).
                Stars có hiệu lực 12 tháng kể từ ngày tích lũy.
                Chúng tôi có quyền điều chỉnh chương trình và thông báo trước 30 ngày.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Khiếu nại</h2>
              <p className="text-gray-600 leading-relaxed">
                Mọi khiếu nại về chất lượng sản phẩm cần được gửi trong vòng 2 giờ sau khi nhận hàng,
                kèm hình ảnh minh chứng. Chúng tôi cam kết phản hồi trong 24 giờ.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Sở hữu trí tuệ</h2>
              <p className="text-gray-600 leading-relaxed">
                Tất cả nội dung trên website (logo, hình ảnh, văn bản) thuộc quyền sở hữu của MilkTea Iku.
                Nghiêm cấm sao chép, phân phối mà không có sự đồng ý bằng văn bản.
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
