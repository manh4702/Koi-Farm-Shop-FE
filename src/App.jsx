import React, { useEffect } from "react";
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
import StaffDashboard from "./pages/StaffDashboard";
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
import TermsOfService from "./components/user/Rules/TermsOfService";
import PurchaseGuide from "./components/user/Rules/PurchaseGuide";
import PaymentMethods from "./components/user/Rules/PaymentMethods";
import PrivacyPolicy from "./components/user/Rules/PrivacyPolicy";
import ReturnPolicy from "./components/user/Rules/ReturnPolicy";
import PrivateRoute from "./routes/PrivateRoute";
import useAuthStore from "./store/store";
import ResetPasswordPage from "./pages/ResetPasswordPage";
const App = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const username = localStorage.getItem("username");

    if (token && role && username) {
      setAuth({ username, role, token });
    }
  }, [setAuth]);

  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />
        {/* Đăng nhập và đăng ký */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ResetPasswordPage />} />
        {/* Dashboard admin và quản lý */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <PrivateRoute allowedRoles={["Manager"]}>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <PrivateRoute allowedRoles={["Staff"]}>
              <StaffDashboard />
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
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/purchase-guide" element={<PurchaseGuide />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
