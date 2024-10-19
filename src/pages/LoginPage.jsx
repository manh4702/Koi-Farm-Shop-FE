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
        // localStorage.setItem("authToken", token);

        setAuth({
          username: values.username,
          role: role,
          token: token,
        });

        message.success("Login successful!");

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
        message.error("Login failed!");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again.");
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
