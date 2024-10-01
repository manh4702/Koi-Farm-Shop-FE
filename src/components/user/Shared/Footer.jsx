// src/user/Shared/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột Giới Thiệu Chung */}
        <div>
          <h3 className="font-bold mb-4">GIỚI THIỆU CHUNG</h3>
          <img
            src="src/assets/logoKoi.png"
            alt="KoiFishLogo"
            width="50%"
            height="100"
            className="mb-4"
          />
          {/* <p>
            Địa chỉ xem cá Koi: Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Long
            Thạnh Mỹ, Hồ Chí Minh.
          </p>
          <p>(Ô tô ra vào thoải mái, đỗ xe trực tiếp tại trại 5000m²)</p>
          <p>Tel: 036988088 - 0907832421 (Zalo)</p>
          <p>Hotline: 036988088 - 0907832421</p>
          <p>Gmail: cakoistore.com</p>
          <p>Email: cakoistore.com</p> */}
        </div>

        {/* Cột Thông Tin Tài Khoản */}
        <div>
          <h3 className="font-bold mb-4">THÔNG TIN TÀI KHOẢN</h3>
          <ul className="list-inside list-disc">
            <li>Danh sách các shop, cá nhân ký gửi cá Koi</li>
            <li>Đăng ký & Đăng nhập</li>
            <li>Mất mật khẩu</li>
            <li>Đăng nhập bán buôn</li>
            <li>Đăng ký bán buôn</li>
          </ul>
        </div>

        {/* Cột Dành Cho Người Yêu Thích Koi */}
        <div>
          <h3 className="font-bold mb-4">DÀNH CHO NHỮNG NGƯỜI YÊU THÍCH KOI</h3>
          <ul className="list-inside list-disc">
            <li>Điều khoản mua hàng</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Phương thức thanh toán</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách đổi trả hàng</li>
            <li>Hướng dẫn bán hàng</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mb-1">
        <h3 className="font-bold">BẢN ĐỒ & BẢN QUYỀN</h3>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p>
              Địa chỉ xem cá Koi: Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Long
              Thạnh Mỹ, Hồ Chí Minh.
            </p>
            <p>(Ô tô ra vào thoải mái, đỗ xe trực tiếp tại trại 5000m²)</p>
            <p>Tel: 036988088 - 0907832421 (Zalo)</p>
            <p>Hotline: 036988088 - 0907832421</p>
            <p>Gmail: cakoistore.com</p>
            <p>Email: cakoistore.com</p>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA4kGszgb6NL-qz4uDEcApxGKQpEXfchzI&q=Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000" // Thay bằng link nhúng Google Maps của bạn
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
        <p className="text-center mt-8">
          Website đang chạy thử nghiệm và chờ cấp phép của BVH - BTTT.
        </p>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Cá Koi Store. Tất cả quyền được bảo
          lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
