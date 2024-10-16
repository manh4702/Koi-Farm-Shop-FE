import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { SiGoogle } from "react-icons/si";
import { Link } from "react-router-dom";

const LoginForm = ({ onFinish, onFinishFailed, loading }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <div style={{ display: "flex", gap: "50px", maxWidth: "1200px" }}>
        <div style={{ maxWidth: "400px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#333" }}>
            Đối với khách hàng mới
          </h1>
          <h2
            style={{
              marginTop: "20px",
              color: "#555",
              lineHeight: "2",
              width: "350px",
            }}
          >
            Bằng cách tạo tài khoản, bạn sẽ có thể mua sắm nhanh hơn, cập nhật
            trạng thái của đơn hàng và theo dõi các đơn hàng bạn đã thực hiện
            trước đó. Bạn muốn tham gia đấu giá bạn cũng phải là thành viên để
            có những quyền lợi của mình.
          </h2>
          <Link to="/register">
            <Button
              style={{
                width: "220px",
                marginTop: "28px",
                backgroundColor: "red",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                borderRadius: "8px",
              }}
            >
              Đăng ký tài khoản
            </Button>
          </Link>
        </div>

        <div
          style={{
            maxWidth: "500px",
            marginLeft: "30px",
          }}
        >
          <h1
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "20px",
              // padding: "5px",
              borderRadius: "8px",
            }}
          >
            Đăng nhập
          </h1>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "400px", height: "18rem", marginTop: "22px" }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
              ]}
            >
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <Input
                style={{
                  height: "35px",
                  border: "1px solid black",
                  marginTop: "8px",
                }}
                placeholder="Nhập Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
              ]}
            >
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Mật khẩu<span style={{ color: "red" }}>*</span>
              </label>
              <Input.Password
                style={{
                  height: "35px",
                  border: "1px solid black",
                  marginTop: "8px",
                }}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: "220px",
                  marginTop: "5px",
                  backgroundColor: "red",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
