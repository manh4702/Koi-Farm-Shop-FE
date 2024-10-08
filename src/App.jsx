import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import HomePage from "./pages/HomePage";
import AboutPage from "./components/user/pages/AboutPage";
import ProductPage from "./components/user/pages/ProductPage";
import ProductDetailPage from "./components/user/pages/ProductDetailPage";
import CartPage from "./components/user/pages/CartPage";
import FishConsignment from "./components/user/pages/FishConsignment";
import NewsPage from "./components/user/pages/NewsPage";
import NewsDetailPage from "./components/user/pages/NewsDetailPage";
import NotFoundPage from "./components/user/pages/NotFoundPage"; // Trang 404 Not Found

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />
        {/* Đăng nhập và đăng ký */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Dashboard admin và quản lý */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        {/* Trang thông tin và sản phẩm */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        {/* Trang giỏ hàng và ký gửi cá */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/fish-consignment" element={<FishConsignment />} />
        {/* Tin tức và chi tiết tin tức */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        {/* Điều hướng sai hoặc không tìm thấy trang */}
        <Route path="*" element={<NotFoundPage />} /> {/* Trang 404 */}
      </Routes>
    </Router>
  );
};

export default App;
