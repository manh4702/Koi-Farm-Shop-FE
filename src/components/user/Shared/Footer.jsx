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
            src="src/assets/logoKoi.png" // Đặt link logo của bạn ở đây
            alt="KoiFishLogo"
            width="50%"
            height="100"
            className="mb-4"
          />
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

      <div className="container mx-auto mt-8">
        {/* Phần bản đồ và bản quyền */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold">BẢN ĐỒ & BẢN QUYỀN</h3>
            <iframe
              src="https://maps.app.goo.gl/dY5y1nsyeox6Za726" // Thay bằng link nhúng Google Maps của bạn
              width="50%"
              height="100"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>

          <div className="text-center">
            <p className="mb-4">Nội dung được bảo vệ bởi DMCA</p>
            <img
              src="https://your-dmca-link.com/dmca_protected.png" // Thay bằng link ảnh DMCA
              alt="DMCA Protected"
            />
          </div>
        </div>
        <p className="text-center mt-4">
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
