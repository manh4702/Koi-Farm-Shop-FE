// src/App.jsx
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
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/fish-consignment" element={<FishConsignment />} />
        {/* Thêm route chi tiết sản phẩm */}
      </Routes>
    </Router>
  );
};

export default App;
