// src/components/user/pages/ProductPage.jsx
import React from "react";
import { Row, Col } from "antd";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FishCard from "../Product/FishCard";

const fishes = [
  {
    id: 1,
    name: "Salmon",
    description: "Fresh Atlantic Salmon",
    price: 15.99,
    image:
      "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
  },
  {
    id: 2,
    name: "Tuna",
    description: "Yellowfin Tuna Steak",
    price: 18.99,
    image: "https://koilover.vn/uploads/thumbs/goshiki_20190801092826524.jpg",
  },
  {
    id: 3,
    name: "Cod",
    description: "Wild-caught Cod Fillet",
    price: 12.99,
    image: "https://koilover.vn/uploads/thumbs/Asagi_20190801092355819.jpg",
  },
  {
    id: 4,
    name: "Trout",
    description: "Rainbow Trout",
    price: 14.99,
    image: "https://koilover.vn/uploads/thumbs/kohaku_20190801092416968.jpg",
  },
];

const ProductPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Fish Products</h1>
        <Row gutter={[16, 16]}>
          {fishes.map((fish) => (
            <Col key={fish.id} xs={24} sm={12} md={6}>
              <FishCard fish={fish} />
            </Col>
          ))}
        </Row>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
