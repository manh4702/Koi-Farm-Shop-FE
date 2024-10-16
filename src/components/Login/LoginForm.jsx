import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { SiGoogle } from "react-icons/si";
import { Link } from "react-router-dom";

const LoginForm = ({ onFinish, onFinishFailed, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onFinish với dữ liệu email và password
    onFinish({ email, password });
  };

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
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: "22px" }}
          >
            <div>
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
                style={{
                  display: "block",
                  width: "100%",
                  height: "35px",
                  marginTop: "8px",
                  border: "1px solid black",
                  borderRadius: "8px",
                  padding: "5px",
                }}
                placeholder="Nhập Email"
                required
              />
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Mật khẩu<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
                style={{
                  display: "block",
                  width: "100%",
                  height: "35px",
                  marginTop: "8px",
                  border: "1px solid black",
                  borderRadius: "8px",
                  padding: "5px",
                }}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <div style={{ marginTop: "16px" }}>
            <Button
              style={{
                width: "220px",
                marginTop: "24px",
                backgroundColor: "red",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                borderRadius: "8px",
              }}
              disabled={loading}
            >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
