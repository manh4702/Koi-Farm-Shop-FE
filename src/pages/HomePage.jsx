// src/user/HomePage.jsx
import React from "react";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
// import ProductList from './Product/ProductList'; // Gọi ProductList để hiển thị danh sách sản phẩm
import Search from "../components/user/Shared/Search"; //
import ZaloIcon from "../components/user/pages/ZaloIcon";

const HomePage = () => {
  return (
    <div>
      <Header />
      {/* <Search /> Tùy chọn: hiển thị ô tìm kiếm */}
      <main className="container mx-auto my-4">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm cá Koi</h1>
        {/* <ProductList /> Hiển thị danh sách sản phẩm */}
      </main>
      <ZaloIcon />

      <Footer />
    </div>
  );
};

export default HomePage;
