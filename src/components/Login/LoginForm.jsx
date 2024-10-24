import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginForm = ({ onFinish, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onFinish với dữ liệu email và password
    onFinish({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <button
              style={{
                width: "220px",
                marginTop: "26px",
                backgroundColor: "red",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Đăng ký tài khoản
            </button>
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
                  marginTop: "4px",
                  border: "1px solid black",
                  borderRadius: "8px",
                  padding: "5px",
                }}
                placeholder="Nhập Email"
                required
              />
            </div>

            <div style={{ marginTop: "16px", position: "relative" }}>
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Mật khẩu<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
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
                  paddingRight: "60px", // Thêm khoảng cách để đủ chỗ cho icon
                }}
                placeholder="Nhập mật khẩu"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                title={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(40%)", // Căn giữa theo chiều dọc
                  cursor: "pointer",
                  fontSize: "18px", // Điều chỉnh kích thước icon nếu cần
                  color: "#000", // Thay đổi màu sắc nếu cần
                }}
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
            <div style={{ marginTop: 0, textAlign: "left" }}>
              <Link
                to="/forgot-password"
                style={{ color: "black", textDecoration: "none" }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div style={{ marginTop: "16px" }}>
              <button
                type="submit"
                style={{
                  width: "220px",
                  marginTop: "24px",
                  backgroundColor: "red",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: "8px",
                  height: "31px",
                  border: "none",
                  cursor: "pointer",
                }}
                
                disabled={loading}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
