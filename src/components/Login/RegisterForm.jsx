import React from "react";
import { Form, Input, Button, Checkbox } from "antd";

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
        Register
      </h2>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: "400px", height: "400px", marginTop: "20px" }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input style={{ height: "45px" }} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input style={{ height: "45px" }} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password style={{ height: "45px" }} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
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
          <Input.Password style={{ height: "45px" }} placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          rules={[{ required: true, message: "Please accept the terms!" }]}
        >
          <Checkbox style={{ color: "white" }}>
            I agree to the terms and conditions
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%", height: "45px" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "white" }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
