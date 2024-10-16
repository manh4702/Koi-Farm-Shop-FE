import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/login.png";
import axios from "../api/axios"; // Import axios instance
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
      const response = await axios.post("/User/Login", {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        message.success("Login successful!");
        login(values.username); // Update Zustand state
        navigate("/admin");
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
      <Header/>
      <LoginForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
      />
      <Footer/>
    </div>
  );
};

export default LoginPage;
