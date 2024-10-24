import React, { useState } from "react";
import { Form, Input, Button, Checkbox, DatePicker } from "antd";
import { FontColorsOutlined } from "@ant-design/icons";
import moment from "moment";

const RegisterForm = ({ onFinish, onFinishFailed, loading }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Chỉ cho phép nhập số và giới hạn độ dài là 10 ký tự
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }

    if (!agreeTerms) {
      message.error("Bạn cần đồng ý với các điều khoản!");
      return;
    }

    const data = {
      email,
      username,
      password,
      phone,
      // dateOfBirth: dateOfBirth.format("YYYY-MM-DD"),
      dateOfBirth: dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : null,
    };

    onFinish(data); // Truyền dữ liệu đã nhập về `onFinish`
  };

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
          <form
            onSubmit={handleSubmit}
            style={{ width: "350px", marginTop: "20px" }}
          >
            <label style={{ fontSize: "16px" }}>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập Email"
              required
              style={{
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            />

            <label style={{ fontSize: "16px" }}>
              Họ và tên <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Họ và tên"
              required
              style={{
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            />

            <label style={{ fontSize: "16px" }}>
              Mật khẩu <span style={{ color: "red" }}>*</span>
            </label>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              style={{
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            />

            <label style={{ fontSize: "16px" }}>
              Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
            </label>
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu"
              required
              style={{
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            />

            <label style={{ fontSize: "16px" }}>
              Số điện thoại <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Số điện thoại"
              required
              maxLength={10}
              style={{
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            />

            <label style={{ fontSize: "16px" }}>
              Ngày sinh <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              value={dateOfBirth ? moment(dateOfBirth) : null} // Hiển thị giá trị đã chọn
              onChange={(date) => setDateOfBirth(date)} // Cập nhật giá trị dateOfBirth
              format="DD-MM-YYYY" // Định dạng hiển thị
              placeholder="Chọn ngày sinh"
              style={{
                width: "100%",
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "8px",
              }}
              disabledDate={(current) => current && current > moment().endOf("day")}
            />

            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ marginBottom: "20px" }}
            >
              Tôi đồng ý với các điều khoản của shop.
            </Checkbox>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!agreeTerms}
              style={{
                width: "220px",
                backgroundColor: agreeTerms ? "red" : "gray",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                borderRadius: "8px",
                cursor: agreeTerms ? "pointer" : "not-allowed",
                // marginTop: "20px",
              }}
            >
              Đăng ký
            </Button>
          </form>

          <div style={{ marginTop: "20px" }}>
            <p style={{}}>
              Bạn đã có tài khoản?{" "}
              <a
                href="/login"
                style={{
                  textDecoration: "none", // Bỏ gạch chân mặc định
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
