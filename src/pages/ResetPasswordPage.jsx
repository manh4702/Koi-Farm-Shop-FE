import React, { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset form fields when switching forms
    form.resetFields();
  }, [isEmailSent]);

  const [form] = Form.useForm();

  const handleResetPassword = async (values) => {
    setLoading(true);

    try {
      if (!isEmailSent) {
        // Make a request to send the reset password email
        const response = await axios.post("/api/User/forgot-password", {
          email: values.email,
        });

        if (response.status === 200) {
          message.success("Đã gửi email khôi phục mật khẩu!");
          setIsEmailSent(true);
        } else {
          message.error("Không tìm thấy tài khoản với email này.");
        }
      } else {
        // Make a request to reset the password
        if (values.newPassword !== values.confirmPassword) {
          message.error("Mật khẩu xác nhận không khớp.");
          setLoading(false);
          return;
        }

        const response = await axios.post("/api/User/reset-password", {
          token: values.token,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });

        if (response.status === 200) {
          message.success("Mật khẩu đã được thay đổi thành công!");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          message.error("Có lỗi xảy ra, vui lòng thử lại.");
        }
      }
    } catch (error) {
      console.error("Error processing request:", error);
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
            {isEmailSent ? "Đặt lại mật khẩu" : "Quên mật khẩu"}
          </h1>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            {isEmailSent
              ? "Vui lòng nhập mã token và mật khẩu mới của bạn."
              : "Vui lòng nhập địa chỉ email của bạn để nhận liên kết khôi phục mật khẩu."}
          </p>
          <Form
            form={form}
            onFinish={handleResetPassword}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            {!isEmailSent ? (
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  placeholder="Nhập email"
                  title="Nhập địa chỉ email của bạn"
                  style={{ height: "40px", borderRadius: "8px" }}
                />
              </Form.Item>
            ) : (
              <>
                <Form.Item
                  name="token"
                  rules={[{ required: true, message: "Vui lòng nhập mã token!" }]}
                >
                  <Input
                    placeholder="Nhập mã token"
                    title="Nhập mã token đã được gửi đến email của bạn"
                    style={{ height: "40px", borderRadius: "8px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    title="Nhập mật khẩu mới của bạn"
                    style={{ height: "40px", borderRadius: "8px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Xác nhận mật khẩu mới"
                    title="Nhập lại mật khẩu mới để xác nhận"
                    style={{ height: "40px", borderRadius: "8px" }}
                  />
                </Form.Item>
              </>
            )}
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
              {loading
                ? "Đang gửi..."
                : isEmailSent
                ? "Đổi mật khẩu"
                : "Gửi yêu cầu khôi phục"}
            </Button>
          </Form>
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
