import React, { useState } from "react";
import { message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuthStore from "../store/store"; // Zustand store
import LoginForm from "../components/Login/LoginForm"; // Gọi LoginForm từ components
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/User/Login", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const { token, role } = response.data;
        localStorage.setItem("authToken", token);

        setAuth({
          username: values.email,
          role: role,
          token: token,
        });

        message.success("Đăng nhập thành công!");

        // navigateBasedOnRole(role);

        // Phân quyền dựa trên role
        if (role === "Admin") {
          navigate("/admin"); // Admin
        } else if (role === "Manager") {
          navigate("/manager"); // Manager
        } else if (role === "Staff") {
          navigate("/staff"); // Staff
        } else if (role === "Customer") {
          navigate("/"); // Customer
        } else {
          navigate("/"); // Khách hàng
        }
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
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
      <LoginForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
      />
      <Footer />
    </div>
  );
};

export default LoginPage;
