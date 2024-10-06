// src/components/user/pages/ProductPage.jsx
import React from "react";
import { Row, Col } from "antd";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FishCard from "../Product/FishCard";

const fishes = [
  {
    id: 1,
    name: "Karashigoi",
    description:
      "Koi Karashigoi 60 cm, 2 tuổi, màu vàng tươi đặc trưng, rất hiếm và được ưa chuộng trong các hồ cá Koi.",
    price: "300,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
  },
  {
    id: 2,
    name: "Goshiki",
    description:
      "Koi Goshiki với sự kết hợp tinh tế giữa năm màu sắc trên cơ thể, kích thước 55 cm, 2 tuổi.",
    price: "500,000 VND",
    image: "https://koilover.vn/uploads/thumbs/goshiki_20190801092826524.jpg",
  },
  {
    id: 3,
    name: "Asagi",
    description:
      "Koi Asagi 50 cm, 1.5 tuổi, màu xanh xám đặc trưng với các họa tiết lưới trên lưng, phần bụng màu đỏ tươi.",
    price: "400,000 VND",
    image: "https://koilover.vn/uploads/thumbs/Asagi_20190801092355819.jpg",
  },
  {
    id: 4,
    name: "Kohaku",
    description:
      "Koi Kohaku 70 cm, 3 tuổi, là giống Koi phổ biến với hai màu đỏ trắng, thường được coi là 'vua' của các giống Koi.",
    price: "600,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kohaku_20190801092416968.jpg",
  },
  {
    id: 5,
    name: "Showa",
    description:
      "Koi Showa 65 cm, 2.5 tuổi, có ba màu chủ đạo là đỏ, trắng, và đen, với các họa tiết loang đặc sắc.",
    price: "750,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.6Vs0Oo2wsWAF5FtPVTRHZwHaLH?w=135&h=204&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 6,
    name: "Shiro Utsuri",
    description:
      "Koi Shiro Utsuri 55 cm, 2 tuổi, là giống Koi đen trắng với hoa văn đậm nét trên nền trắng.",
    price: "450,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.QweGuNY3xoLztgP99hL2-AHaMr?w=191&h=327&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 7,
    name: "Sanke",
    description:
      "Koi Sanke 70 cm, 3 tuổi, mang vẻ đẹp của hai màu đỏ và trắng với đốm đen lạ mắt.",
    price: "800,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.iQfjAgZSl6tCTFf6T4AS8QHaKs?w=131&h=190&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 8,
    name: "Tancho",
    description:
      "Koi Tancho 60 cm, 2.5 tuổi, nổi bật với đốm tròn màu đỏ trên đầu, được xem là biểu tượng may mắn.",
    price: "1,000,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.1CiBj7IMyAUNgClKWx8ajwHaLG?w=115&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 8,
    name: "Tancho",
    description:
      "Koi Tancho 60 cm, 2.5 tuổi, nổi bật với đốm tròn màu đỏ trên đầu, được xem là biểu tượng may mắn.",
    price: "1,000,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.1CiBj7IMyAUNgClKWx8ajwHaLG?w=115&h=180&c=7&r=0&o=5&pid=1.7",
  },
];

const ProductPage = () => {
  return (
    <div
      style={{ minHeight: "100px", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main
        style={{
          flexGrow: 1,
          maxWidth: "100%",
          margin: "0 190px",
          padding: "32px 16px",
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "32px",
          }}
        >
          Các loại cá Koi
        </h1>
        <Row gutter={[16, 16]}>
          {fishes.map((fish) => (
            <Col key={fish.id} xs={24} sm={12} md={6}>
              {" "}
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
