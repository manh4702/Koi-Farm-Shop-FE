import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import backgroundImage from "../assets/login.png";
import RegisterForm from "../components/Login/RegisterForm";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);

    try {
      const response = await axios.post("/User", {
        name: values.username,       // Sử dụng "username" để map với "name" trên API
        email: values.email,
        password: values.password,
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
      console.error("Error during registration:", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
