import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "../Shared/ZaloIcon";
import FBIconts from "../Shared/FacebookIcon";
import YTIconts from "../Shared/YoutubeIcon";

const PurchaseGuide = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container mx-auto my-4 p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Hướng Dẫn Mua Hàng</h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Bước 1: Truy cập website OnKoi.vn</h2>
          <p className="text-gray-600 mt-2">
            Khách hàng truy cập vào website <a href="https://KoiFish.vn" className="text-blue-600 underline">OnKoi.vn</a> và ở góc trên bên phải, chọn mục "Đăng nhập" hoặc "Đăng ký" để bắt đầu quá trình mua hàng.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Bước 2: Đăng ký tài khoản</h2>
          <p className="text-gray-600 mt-2">
            Nếu chưa có tài khoản, vui lòng điền các thông tin cá nhân như: tên đăng nhập, email, số điện thoại, và mật khẩu. Đảm bảo các thông tin cung cấp là chính xác để nhận thông báo liên quan đến đơn hàng.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Bước 3: Đặt hàng</h2>
          <p className="text-gray-600 mt-2">
            Sau khi đăng nhập, khách hàng có thể lựa chọn các sản phẩm mình muốn mua, thêm vào giỏ hàng, và kiểm tra giỏ hàng trước khi thanh toán.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Bước 4: Xác nhận đơn hàng</h2>
          <p className="text-gray-600 mt-2">
            Khi hoàn tất việc chọn sản phẩm, khách hàng sẽ nhận được email xác nhận đơn hàng. Vui lòng kiểm tra kỹ thông tin đơn hàng và liên hệ nếu có bất kỳ sai sót nào.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Bước 5: Phương thức thanh toán</h2>
          <p className="text-gray-600 mt-2">
            OnKoi.vn hỗ trợ nhiều phương thức thanh toán, bao gồm chuyển khoản ngân hàng và các hình thức khác. Vui lòng chọn phương thức thanh toán phù hợp khi hoàn tất đơn hàng.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Bước 6: Nhận hàng và liên hệ</h2>
          <p className="text-gray-600 mt-2">
            Sau khi đơn hàng được xử lý, khách hàng sẽ nhận được thông tin giao hàng. Trong trường hợp cần hỗ trợ, vui lòng liên hệ qua hotline: 0907.832.421.
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

export default PurchaseGuide;
