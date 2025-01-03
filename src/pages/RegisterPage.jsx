import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import backgroundImage from "../assets/login.png";
import RegisterForm from "../components/Login/RegisterForm";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
import CryptoJS from "crypto-js";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);

    try {
      // const hashedPassword = CryptoJS.SHA256(values.password).toString();

      const response = await axios.post("/User/createAccount", {
        name: values.username,       // Sử dụng "username" để map với "name" trên API
        email: values.email,
        password: values.password,
        // password: hashedPassword,
        phone: values.phone,
        dateOfBirth: `${values.dateOfBirth}T00:00:00.000Z`,  // Định dạng ngày sinh
      });

      if (response.data && response.data.success) {
        message.success("Đăng ký thành công!");
        navigate("/login");  // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        message.error("Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data === "User with this phone already exists."
      ) {
        message.error("Người dùng với số điện thoại này đã tồn tại.");
      } else {
        message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Thất bại:", errorInfo);
  };

  return (
    <div>
      <Header />
      <RegisterForm onFinish={onFinish} onFinishFailed={onFinishFailed} loading={loading} />
      <Footer />
    </div>
  );
};

export default RegisterPage;
