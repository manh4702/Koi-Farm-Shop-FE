import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "../Shared/ZaloIcon";
import FBIconts from "../Shared/FacebookIcon";
import YTIconts from "../Shared/YoutubeIcon";

const PaymentMethods = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container mx-auto my-4 p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Phương Thức Thanh Toán</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">1. Chuyển khoản trước khi nhận hàng</h2>
          <p className="text-gray-600 mt-2">
            Quý khách có thể thanh toán bằng cách chuyển khoản 100% giá trị đơn hàng qua tài khoản Tien Phong Bank. Sau khi chuyển khoản, vui lòng liên hệ với chúng tôi để xác nhận.
          </p>
          <ul className="text-gray-600 list-disc ml-5">
            <li>TPBank: 90907832421 (Nguyễn Quốc Vương)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">2. Thanh toán khi nhận hàng (COD)</h2>
          <p className="text-gray-600 mt-2">
            Quý khách có thể thanh toán trực tiếp khi nhận hàng (COD). Phí thu hộ sẽ được áp dụng tùy theo khu vực và hình thức giao hàng. Ngoài ra, khách hàng có thể chọn thanh toán trước bằng chuyển khoản.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">3. Lưu ý khi thanh toán</h2>
          <p className="text-gray-600 mt-2">
            Sau khi đặt hàng, vui lòng chuyển khoản 100% giá trị đơn hàng cùng 1/2 cước phí vận chuyển. Mọi giao dịch thanh toán sẽ được xác minh và đảm bảo tính bảo mật.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">4. Câu hỏi thường gặp</h2>
          <p className="text-gray-600 mt-2">
            KoiFish hỗ trợ thanh toán qua thẻ tín dụng, thẻ ATM nội địa, VISA, và Mastercard. Nếu cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua hotline.
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

export default PaymentMethods;
