import React, {useState} from "react";
import {message} from "antd";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "../api/axios";
import useAuthStore from "../store/store"; // Zustand store
import LoginForm from "../components/Login/LoginForm"; // Gọi LoginForm từ components
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
import CryptoJS from "crypto-js";
import {decodeToken} from "../services/tokenDecoder.js";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setCartItems = useAuthStore((state) => state.setCartItems);

  const onFinish = async (values) => {
      setLoading(true);
      try {

        const response = await axios.post("/api/User/login", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          const {token, role} = response.data;
          const decodedUser = decodeToken(token);

          if (decodedUser) {
            const userId = decodedUser.userId;
            setAuth({
              username: values.username,
              role: role,
              token: token,
              userId: userId,
            });
            message.success("Đăng nhập thành công!");

            // if (userId) {
            //   const cartResponse = await axios.get(`/api/Cart/User/${userId}`);
            //   if (cartResponse.data.success) {
            //     setCartItems(cartResponse.data.data.cartItems); // Cập nhật giỏ hàng
            //   }
            // }


            // try {
            //   const cartResponse = await axios.get(`/api/Cart/User/${userId}`);
            //   if (cartResponse.data.success) {
            //     setCartItems(cartResponse.data.data.cartItems); // Cập nhật giỏ hàng
            //   }
            // } catch (cartError) {
            //   console.error("Lỗi khi lấy giỏ hàng:", cartError);
            // }

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
            message.error("Token không hợp lệ, vui lòng đăng nhập lại.");
          }
        }
      } catch
        (error) {
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
    }
  ;

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
