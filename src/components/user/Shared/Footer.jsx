// src/user/Shared/Footer.jsx
import { Col, Row } from "antd";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "black", color: "white", padding: "2rem 0" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            GIỚI THIỆU CHUNG
          </h3>
          <img
            src="src/assets/logoKoi.png"
            alt="KoiFishLogo"
            style={{
              width: "70%",
              height: "70%",
              marginBottom: "1rem",
              marginLeft: "-37px",
            }}
          />
        </div>

        <div>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            THÔNG TIN TÀI KHOẢN
          </h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "1rem" }}>
            <li>Danh sách các shop, cá nhân ký gửi cá Koi</li>
            <li>Đăng ký & Đăng nhập</li>
            <li>Mất mật khẩu</li>
            <li>Đăng nhập bán buôn</li>
            <li>Đăng ký bán buôn</li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            DÀNH CHO NHỮNG NGƯỜI YÊU THÍCH KOI
          </h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "1rem" }}>
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

      <div>
        <div
          style={{
            maxWidth: "1200px",
            margin: "2rem auto 0 auto",
            padding: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          <div>
            <h3 style={{ fontWeight: "bold" }}>BẢN ĐỒ & BẢN QUYỀN</h3>

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
          <div
            style={{
              height: "200px",
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "35px",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA4kGszgb6NL-qz4uDEcApxGKQpEXfchzI&q=Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000" // Thay bằng link nhúng Google Maps của bạn
              width="500px"
              height="100%"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              style={{ borderRadius: "10px" }}
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