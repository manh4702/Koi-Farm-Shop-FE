import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { FontColorsOutlined } from "@ant-design/icons";

const RegisterForm = ({ onFinish, onFinishFailed, loading }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <div style={{ display: "flex", gap: "50px", maxWidth: "1200px" }}>
        <div style={{ maxWidth: "400px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#333" }}>
            Điều khoản sử dụng
          </h1>
          <div
            style={{
              marginTop: "20px",
              color: "#555",
              lineHeight: "2",
              width: "400px",
              maxHeight: "590px",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            <p>
              1. Thông tin cá nhân: Bạn phải cung cấp thông tin chính xác và đầy
              đủ khi đăng ký tài khoản. Chúng tôi có quyền từ chối hoặc tạm
              ngừng tài khoản nếu phát hiện thông tin sai lệch.
            </p>
            <p>
              2. Bảo mật tài khoản: Bạn chịu trách nhiệm giữ bí mật thông tin
              đăng nhập của mình. Chúng tôi sẽ không chịu trách nhiệm nếu tài
              khoản của bạn bị xâm phạm do lỗi bảo mật từ phía người dùng.
            </p>
            <p>
              3. Quyền và trách nhiệm của người dùng: Khi sử dụng dịch vụ của
              chúng tôi, bạn cam kết tuân thủ quy định pháp luật và không thực
              hiện các hành vi vi phạm pháp luật hoặc gây ảnh hưởng tiêu cực đến
              trang web và cộng đồng người dùng.
            </p>
            <p>
              4. Chính sách mua bán: Mọi đơn hàng trên trang web sẽ được xử lý
              theo chính sách vận chuyển và bảo hành được quy định trên trang.
              Bạn có trách nhiệm kiểm tra kỹ thông tin trước khi đặt hàng.
            </p>
            <p>
              5. Quyền thay đổi và chấm dứt dịch vụ: Chúng tôi có quyền thay
              đổi, cập nhật hoặc chấm dứt bất kỳ tính năng hoặc dịch vụ nào mà
              không cần thông báo trước. Trong trường hợp dịch vụ bị chấm dứt,
              chúng tôi sẽ thông báo qua email hoặc thông báo trực tiếp trên
              trang web.
            </p>
          </div>
        </div>
        <div
          style={{
            maxWidth: "500px",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "35px",
            }}
          >
            Đăng ký
          </h1>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "400px", height: "450px", marginTop: "20px" }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Email!",
                  type: "email",
                },
              ]}
            >
              <lable
                style={{
                  fontSize: "16px",
                }}
              >
                Email <span style={{ color: "red" }}>*</span>
              </lable>
              <Input style={{ height: "35px" }} placeholder="Nhập Email" />
            </Form.Item>

            <Form.Item
              name="username"
              style={{
                marginTop: "-10px",
              }}
              rules={[{ required: true, message: "Vui lòng nhập Họ và tên!" }]}
            >
              <lable
                style={{
                  fontSize: "16px",
                }}
              >
                Họ và tên <span style={{ color: "red" }}>*</span>
              </lable>
              <Input style={{ height: "35px" }} placeholder="Họ và tên" />
            </Form.Item>

            <Form.Item
              name="password"
              style={{
                marginTop: "-10px",
              }}
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <lable
                style={{
                  fontSize: "16px",
                }}
              >
                Mật khẩu <span style={{ color: "red" }}>*</span>
              </lable>
              <Input.Password
                style={{ height: "35px" }}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              style={{
                marginTop: "-10px",
              }}
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <label style={{ fontSize: "16px" }}>
                Nhập lại mật khẩu! <span style={{ color: "red" }}>*</span>
              </label>
              <Input.Password
                style={{ height: "35px" }}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              rules={[{ required: true, message: "Please accept the terms!" }]}
              style={{ marginTop: "-10px" }}
            >
              <style>
                {`
          /* Đổi màu khi checkbox được chọn */
          .custom-checkbox .ant-checkbox-checked .ant-checkbox-inner {
            background-color: red; /* Màu nền đỏ khi được chọn */
            border-color: red; /* Màu viền đỏ khi được chọn */
          }

          /* Màu viền khi chưa được chọn */
          .custom-checkbox .ant-checkbox-inner {
            border-color: #555; /* Màu viền khi chưa được chọn */
          }

          /* Màu của dấu check */
          .custom-checkbox .ant-checkbox-checked .ant-checkbox-inner::after {
            border-color: white; /* Màu của dấu check */
          }
        `}
              </style>
              <Checkbox className="custom-checkbox">
                Tôi đồng ý với các điều khoản của shop.
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: "220px",
                  marginTop: "-10px",
                  backgroundColor: "red",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white" }}>
              Bạn đã có tài khoản?{" "}
              <a
                href="/login"
                style={{
                  textDecoration: "none", // Bỏ gạch chân mặc định
                  color: "white",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Đăng nhập tại đây.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
