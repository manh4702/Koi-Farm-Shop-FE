import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { SiGoogle } from "react-icons/si";
import { Link } from "react-router-dom";

const LoginForm = ({ onFinish, onFinishFailed, loading }) => {
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
        Đăng nhập
      </h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: "400px", height: "300px", marginTop: "20px" }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <label style={{ color: "white", fontSize: "16px" }}>
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <Input style={{ height: "50px" }} placeholder="Nhập Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <label style={{ color: "white", fontSize: "16px" }}>
            Mật khẩu<span style={{ color: "red" }}>*</span>
          </label>
          <Input.Password
            style={{ height: "50px" }}
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox style={{ color: "white" }}>Ghi nhớ mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%", fontSize: "16px", height: "40px" }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div
        style={{ textAlign: "center", marginBottom: "16px", color: "white" }}
      >
        <p style={{ marginBottom: "8px" }}>- Hoặc -</p>
        <Button
          type="default"
          style={{
            width: "250px",
            height: "40px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            fontSize: "16px",
          }}
        >
          <SiGoogle style={{ marginRight: "8px" }} />
          Đăng nhập với Google
        </Button>
      </div>
      <div style={{ textAlign: "center", color: "white" }}>
        <p>
          Bạn không có tài khoản?{" "}
          <a
            href="/register"
            style={{
              textDecoration: "none", // Bỏ gạch chân mặc định
              color: "white",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Đăng kí tại đây
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
