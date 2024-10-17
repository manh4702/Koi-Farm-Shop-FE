import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "../Shared/ZaloIcon";
import FBIconts from "../Shared/FacebookIcon";
import YTIconts from "../Shared/YoutubeIcon";

const ReturnPolicy = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container mx-auto my-4 p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Chính Sách Đổi Trả Hàng</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">1. Phương thức đổi trả hàng</h2>
          <p className="text-gray-600 mt-2">
            Quý khách có thể liên hệ trực tiếp qua số điện thoại hoặc gửi email để yêu cầu đổi trả hàng. Vui lòng chụp ảnh sản phẩm trước khi đổi trả để hỗ trợ quá trình này.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">2. Kiểm tra tình trạng đổi hàng</h2>
          <p className="text-gray-600 mt-2">
            Sau khi sản phẩm về đến kho, KoiFish sẽ kiểm tra và đánh giá sản phẩm trong vòng 3-5 ngày, sau đó thông báo kết quả qua điện thoại hoặc email.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">3. Phí vận chuyển cho đổi trả hàng</h2>
          <p className="text-gray-600 mt-2">
            Phí vận chuyển sẽ tùy thuộc vào khoảng cách và thỏa thuận giữa khách hàng và KoiFish. Khách hàng sẽ chịu phí vận chuyển theo bảng giá của bưu điện.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700">4. Thời gian phản hồi</h2>
          <p className="text-gray-600 mt-2">
            KoiFish sẽ phản hồi yêu cầu đổi trả hàng của khách hàng sau 1-2 ngày kể từ khi nhận được yêu cầu.
          </p>
        </section>
      </main>

      <ZaloIcon />
      <FBIconts />
      <YTIconts />
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
