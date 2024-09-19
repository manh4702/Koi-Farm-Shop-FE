import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "../API/axios";
import backgroundImage from "../assets/login.png";
import RegisterForm from "../components/Login/RegisterForm";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);

    // try {
    //   const response = await axios.post("/register", {
    //     email: values.email,
    //     username: values.username,
    //     password: values.password,
    //   });

    //   if (response.status === 201) {
    //     message.success("Registration successful!");
    //     navigate("/login");
    //   } else {
    //     message.error("Registration failed, please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error);
    //   message.error("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
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
      <RegisterForm />

    </div>
  );
};

export default RegisterPage;
