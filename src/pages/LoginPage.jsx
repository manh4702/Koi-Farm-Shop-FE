import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/login.png";
import axios from "../API/axios"; // Import axios instance
import useAuthStore from "../store/store"; // Zustand store
import LoginForm from "../components/Login/LoginForm"; // Gọi LoginForm từ components

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    try {
      const response = await axios.post("/login", {
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
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LoginForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
      />
    </div>
  );
};

export default LoginPage;
