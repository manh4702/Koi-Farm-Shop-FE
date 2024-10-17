import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/store"; // Import từ Zustand

const PrivateRoute = ({ children, allowedRoles }) => {
  const { role } = useAuthStore(); // Lấy role từ Zustand

  if (!role) {
    // Nếu không có role, điều hướng về trang đăng nhập
    return <Navigate to="/login" />;
  }

  // Nếu vai trò của người dùng không nằm trong danh sách allowedRoles, điều hướng về trang 403 (hoặc 404)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="*" />; // Hoặc trang khác như 404
  }

  // Nếu người dùng có quyền, render children (component được bảo vệ)
  return children;
};

export default PrivateRoute;
