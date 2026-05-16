import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | Iku Milk Tea",
  description: "Điều khoản và điều kiện sử dụng dịch vụ Iku Milk Tea",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
            Điều khoản sử dụng
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10">
            Cập nhật lần cuối: Tháng 5, 2024
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                1. Điều khoản chung
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Khi sử dụng dịch vụ của Iku Milk Tea, bạn đồng ý tuân thủ toàn bộ các điều khoản
                được nêu trong tài liệu này. Chúng tôi có quyền cập nhật điều khoản bất kỳ lúc
                nào và sẽ thông báo qua email hoặc thông báo trên website. Việc tiếp tục sử dụng
                dịch vụ sau khi điều khoản được cập nhật đồng nghĩa với việc bạn chấp nhận các
                thay đổi đó.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                2. Đặt hàng &amp; Thanh toán
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Đơn hàng được xác nhận sau khi thanh toán thành công hoặc xác nhận COD. Giá sản
                phẩm có thể thay đổi mà không cần báo trước. Chúng tôi hỗ trợ các phương thức
                thanh toán: MoMo, ZaloPay, VNPay, chuyển khoản ngân hàng và thanh toán khi nhận
                hàng (COD). Mọi giao dịch đều được bảo mật bằng công nghệ mã hóa tiêu chuẩn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                3. Giao hàng
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Thời gian giao hàng dự kiến từ 30–45 phút trong khu vực nội thành. Phí giao hàng
                miễn phí cho đơn từ 100.000đ trong bán kính 5km tính từ cửa hàng gần nhất. Chúng
                tôi không chịu trách nhiệm cho các trường hợp bất khả kháng như thời tiết xấu,
                tắc đường hoặc thiên tai ảnh hưởng đến thời gian giao hàng.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                4. Đổi trả
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Bạn có thể hủy đơn trong vòng 5 phút sau khi đặt. Sau thời gian này, đơn hàng đã
                được chế biến và không thể hủy. Trong trường hợp sản phẩm bị lỗi hoặc không đúng
                yêu cầu, vui lòng liên hệ trong vòng 2 giờ kể từ khi nhận hàng kèm hình ảnh minh
                chứng. Hoàn tiền sẽ được xử lý trong 3–5 ngày làm việc qua phương thức thanh toán
                ban đầu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                5. Quyền sở hữu trí tuệ
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Tất cả nội dung trên website và ứng dụng Iku Milk Tea bao gồm logo, hình ảnh, văn
                bản, thiết kế và mã nguồn đều thuộc quyền sở hữu trí tuệ của Iku Milk Tea. Nghiêm
                cấm sao chép, phân phối, chỉnh sửa hoặc sử dụng cho mục đích thương mại mà không
                có sự đồng ý bằng văn bản từ chúng tôi.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
