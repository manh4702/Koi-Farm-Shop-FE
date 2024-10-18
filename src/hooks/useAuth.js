// src/hooks/useAuth.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/store"; // Adjust import based on your structure
import { message } from "antd";

const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const expiration = useAuthStore((state) => state.expiration);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!token || !expiration || Date.now() > expiration) {
        message.error("Session expired, please login again.");
        navigate("/login");
        return true;
      }
      return false;
    };

    checkTokenExpiration();
  }, [token, expiration, navigate]);
};

export default useAuth;
