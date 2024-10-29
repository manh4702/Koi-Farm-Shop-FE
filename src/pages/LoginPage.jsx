import React, {useState} from "react";
import {message} from "antd";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "../api/axios";
import useAuthStore from "../store/store"; // Zustand store
import LoginForm from "../components/Login/LoginForm"; // Gọi LoginForm từ components
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
import CryptoJS from "crypto-js";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);


  const onFinish = async (values) => {
    setLoading(true);
    try {
      // const hashedPassword = hashPassword(values.password);

      const response = await axios.post("/api/User/login", {
        email: values.email,
        password: values.password,
        // password: hashedPassword,
      });

      if (response.status === 200) {
        const {token, role} = response.data;
        // localStorage.setItem("authToken", token);

        setAuth({
          username: values.username,
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
      }
      // else {
      //   message.error(response.data.message()||"Đăng nhập thất bại!");
      // }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        switch (error.response.data.message) {
          case "Email Not Found":
            message.error("Email không tìm thấy");
            break;
          case "Invalid password.":
            message.error("Sai mật khẩu, vui lòng nhập lại");
            break;
          default:
            message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
            break;
        }
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
