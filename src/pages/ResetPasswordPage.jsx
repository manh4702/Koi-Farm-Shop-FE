// src/pages/ResetPasswordPage.jsx
import React, { useState } from "react";
import { Button, Input, message } from "antd";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make a request to your backend to send the reset password email
      const response = await axios.post("/api/User/ResetPassword", { email });

      if (response.status === 200) {
        message.success("Đã gửi email khôi phục mật khẩu!");
      } else {
        message.error("Không tìm thấy tài khoản với email này.");
      }
    } catch (error) {
      console.error("Error sending reset password email:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <div style={{ maxWidth: "400px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            Quên mật khẩu
          </h1>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Vui lòng nhập địa chỉ email của bạn để nhận liên kết khôi phục mật
            khẩu.
          </p>
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: "16px" }}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                required
                style={{ height: "40px", borderRadius: "8px" }}
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                backgroundColor: "red",
                borderColor: "red",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu khôi phục"}
            </Button>
          </form>
          <div style={{ marginTop: "20px" }}>
            <Link
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Trở về trang đăng nhập
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
