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
import CartPage from "./components/user/Cart/CartPage";
import FishConsignment from "./components/user/pages/FishConsignment";
import NewsPage from "./components/user/pages/NewsPage";
import NewsDetailPage from "./components/user/pages/NewsDetailPage";
import NotFoundPage from "./components/user/pages/NotFoundPage"; // Trang 404 Not Found
import LienHe from "./components/user/pages/LienHe";
import PrivateRoute from "./routes/PrivateRoute";
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
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["1"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <PrivateRoute allowedRoles={["2"]}>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        {/* Trang thông tin và sản phẩm */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        {/* Trang giỏ hàng và ký gửi cá */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/fish-consignment" element={<FishConsignment />} />
        {/* Tin tức và chi tiết tin tức */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/contact" element={<LienHe />} />
        {/* Điều hướng sai hoặc không tìm thấy trang */}
        <Route path="*" element={<NotFoundPage />} /> {/* Trang 404 */}
      </Routes>
    </Router>
  );
};

export default App;
