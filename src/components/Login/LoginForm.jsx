import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { SiGoogle } from "react-icons/si";

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
        Login
      </h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: "400px", height: "250px", marginTop: "20px" }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input style={{ height: "50px" }} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password style={{ height: "50px" }} placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginBottom: "16px", color: "white" }}>
        <p>Or</p>
        <Button
          type="default"
          style={{
            width: "200px",
            backgroundColor: "red",
            color: "white",
            border: "none",
          }}
        >
          <SiGoogle style={{ marginRight: "8px" }} />
          Login with Google
        </Button>
      </div>
      <div style={{ textAlign: "center", color: "white" }}>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
