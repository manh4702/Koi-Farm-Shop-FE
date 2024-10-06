// src/components/user/pages/ProductDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const fishes = [
  {
    id: 1,
    name: "Karashigoi",
    description: "Koi Karashigoi 60 cm, 2 tuổi, màu vàng tươi đặc trưng...",
    price: "300,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
  },
  // ... Copy the fish data here as in ProductPage component ...
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const fish = fishes.find((fish) => fish.id === parseInt(id));

  if (!fish) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }

  console.log("Product ID:", id);
  console.log("Fish found:", fish);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{fish.name}</h1>
        <img
          src={fish.image}
          alt={fish.name}
          className="w-full max-w-md mb-4"
        />
        <p className="text-lg mb-4">{fish.description}</p>
        <p className="text-xl font-bold mb-8">{fish.price}</p>
        {/* Bạn có thể thêm các thông tin chi tiết khác về loài cá */}
        <h2 className="text-2xl font-semibold mt-8">
          Thông tin chi tiết về {fish.name}
        </h2>
        <p className="mt-4">
          {/* Giả sử bạn copy và bổ sung thêm mô tả chi tiết giống như nội dung bạn gửi */}
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
