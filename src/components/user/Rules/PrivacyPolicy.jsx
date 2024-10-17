import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "../Shared/ZaloIcon";
import FBIconts from "../Shared/FacebookIcon";
import YTIconts from "../Shared/YoutubeIcon";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container mx-auto my-4 p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Chính Sách Bảo Mật</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">1. Thu thập thông tin cá nhân</h2>
          <p className="text-gray-600 mt-2">
            Khi bạn đăng ký tài khoản hoặc mua hàng tại KoiFish.vn, chúng tôi có thể yêu cầu cung cấp các thông tin cá nhân bao gồm tên, số điện thoại, email, và địa chỉ. Các thông tin này giúp chúng tôi cung cấp dịch vụ và chăm sóc khách hàng tốt hơn.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">2. Sử dụng thông tin</h2>
          <p className="text-gray-600 mt-2">
            Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, liên hệ giao hàng, cũng như thông báo về các chương trình khuyến mãi. Chúng tôi cam kết không chia sẻ thông tin của bạn cho bên thứ ba khi chưa có sự đồng ý.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">3. Bảo mật thông tin</h2>
          <p className="text-gray-600 mt-2">
            Tất cả các thông tin cá nhân của khách hàng đều được mã hóa và lưu trữ an toàn. Chúng tôi sử dụng các biện pháp bảo mật tiên tiến để ngăn chặn truy cập trái phép.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">4. Quyền của khách hàng</h2>
          <p className="text-gray-600 mt-2">
            Khách hàng có quyền yêu cầu chỉnh sửa, cập nhật hoặc xóa thông tin cá nhân khỏi hệ thống bất cứ lúc nào bằng cách liên hệ với chúng tôi qua hotline hoặc email.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">5. Thay đổi chính sách</h2>
          <p className="text-gray-600 mt-2">
            Chúng tôi có quyền cập nhật, thay đổi chính sách bảo mật mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
          </p>
        </section>

        <p className="text-gray-600 mt-4">
          Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách bảo mật, vui lòng liên hệ với chúng tôi qua hotline: 0907.832.421 hoặc email: koifish.vn.
        </p>
      </main>

      <ZaloIcon />
      <FBIconts />
      <YTIconts />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
