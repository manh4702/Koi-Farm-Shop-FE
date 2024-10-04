import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { FontColorsOutlined } from "@ant-design/icons";

const RegisterForm = ({ onFinish, onFinishFailed, loading }) => {
  return (
    <div
      style={{
        maxWidth: "500px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginRight: "100px",
        backgroundColor: "rgba(44, 62, 80, 0.5)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "35px",
          backgroundColor: "#ecf0f1",
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        Đăng ký
      </h2>
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
              color: "white",
            }}
          >
            Email <span style={{ color: "red" }}>*</span>
          </lable>
          <Input style={{ height: "45px" }} placeholder="Nhập Email" />
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
              color: "white",
            }}
          >
            Họ và tên <span style={{ color: "red" }}>*</span>
          </lable>
          <Input style={{ height: "45px" }} placeholder="Họ và tên" />
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
              color: "white",
            }}
          >
            Mật khẩu <span style={{ color: "red" }}>*</span>
          </lable>
          <Input.Password style={{ height: "45px" }} placeholder="Mật khẩu" />
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
          <label style={{ fontSize: "16px", color: "white" }}>
            Nhập lại mật khẩu! <span style={{ color: "red" }}>*</span>
          </label>
          <Input.Password
            style={{ height: "45px" }}
            placeholder="Xác nhận mật khẩu"
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          rules={[{ required: true, message: "Please accept the terms!" }]}
          style={{ marginTop: "-10px" }}
        >
          <Checkbox style={{ color: "white" }}>
            Tôi đồng ý với các điều khoản của shop.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              width: "100%",
              height: "45px",
              fontSize: "16px",
              marginTop: "-10px",
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
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Đăng nhập tại đây.
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
