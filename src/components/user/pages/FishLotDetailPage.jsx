// src/components/user/pages/FishLotDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { Button, message, Rate } from "antd";
import { ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";

const fishLots = [
  {
    id: 16,
    name: "Lô Koi Sanke & Showa",
    description:
      "Bộ sưu tập 5 con cá Koi gồm 3 Sanke và 2 Showa, đều sinh năm 2021. Lý tưởng cho việc bắt đầu một hồ Koi đa dạng.",
    price: "3,500,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.9wxu3jj4OLWUS8AfTCpPwQHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7",
    isLot: true, // Đây là lô cá
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    age: 2, // Tuổi (năm)
    foodPerDay: 100, // Lượng thức ăn/ngày (gram)
    quantity: 5,
    fishes: [
      { name: "Sanke", quantity: 3 },
      { name: "Showa", quantity: 2 },
    ],
    video: "https://www.youtube.com/watch?v=showa_video_link",
    rating: 4,
  },
  {
    id: 17,
    name: "Lô cá Gosanke Premium",
    description:
      "Bộ 3 cá Koi cao cấp gồm Kohaku, Sanke, và Showa, sinh năm 2020. Đây là bộ sưu tập hoàn hảo cho những người yêu thích Gosanke.",
    price: "5,000,000 VND",
    image:
      "https://cdn11.bigcommerce.com/s-upcqwyrrdy/images/stencil/1280x1280/products/12349/31213/japanese-premium-gosanke-8-10inch-koi-4pack-1000__59378.1680885854.jpg?c=1",
    isLot: true, // Đây là lô cá
    year: 2019,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    age: 2, // Tuổi (năm)
    foodPerDay: 100, // Lượng thức ăn/ngày (gram)
    quantity: 3,
    fishes: [
      { name: "Kohaku", quantity: 1 },
      { name: "Sanke", quantity: 1 },
      { name: "Showa", quantity: 1 },
    ],
    rating: 3,
  },
  {
    id: 18,
    name: "Lô Koi Butterfly",
    description:
      "Bộ sưu tập 4 con cá Koi Butterfly đẹp mắt, sinh năm 2022. Bao gồm các giống Koi có vây dài và đuôi bướm đặc trưng.",
    price: "2,800,000 VND",
    image:
      "https://cdn11.bigcommerce.com/s-kkon4imfg5/images/stencil/1280x1280/products/405/667/KOI_BUTTERFLY_6_-8___59746.1522374966.jpg?c=2",
    isLot: true, // Đây là lô cá
    year: 2019,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    age: 2, // Tuổi (năm)
    foodPerDay: 150, // Lượng thức ăn/ngày (gram)
    quantity: 4,
    fishes: [
      { name: "Butterfly Kohaku", quantity: 1 },
      { name: "Butterfly Showa", quantity: 1 },
      { name: "Butterfly Sanke", quantity: 1 },
      { name: "Butterfly Goshiki", quantity: 1 },
    ],
    rating: 2,
  },
  // Các lô cá khác...
];

const FishLotDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const fishLot = fishLots.find((lot) => lot.id === parseInt(id));

  if (!fishLot) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }

  const handleAddToCart = () => {
    addItem(fishLot);
    message.success("Đã thêm lô cá vào giỏ hàng");
  };

  const handleBuyNow = () => {
    addItem(fishLot);
    navigate("/checkout");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{
        flexGrow: 1,
        padding: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        gap: "16px",
      }}>
        <div style={{ flex: 1 }}>
          <img
            src={fishLot.image}
            alt={fishLot.name}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "600px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px" }}>
            {fishLot.name}
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#c0392b", fontWeight: "bold" }}>
            Giá bán: {fishLot.price}
          </p>
          <p style={{ marginBottom: "24px" }}>{fishLot.description}</p>

          <div>
            <p><strong>Nguồn gốc:</strong> {fishLot.origin}</p>
            <p><strong>Năm sinh:</strong> {fishLot.year}</p>
            <p><strong>Số lượng cá trong lô:</strong> {fishLot.quantity}</p>
            <h3>Chi tiết các loại cá trong lô:</h3>
            <ul>
              {fishLot.fishes.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} con
                </li>
              ))}
            </ul>
            <p><strong>Đánh giá:</strong> <Rate allowHalf defaultValue={fishLot.rating} /></p>
          </div>

          <Button
            type="primary"
            style={{
              backgroundColor: "red",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "10px",
            }}
            onClick={handleBuyNow}
          >
            <DollarOutlined /> Mua ngay
          </Button>

          <Button
            type="default"
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "border 0.3s",
              border: "2px solid black",
              color: "black",
              marginBottom: "30px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "2px solid red";
              e.currentTarget.style.color = "red";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "2px solid black";
              e.currentTarget.style.color = "black";
            }}
            onClick={handleAddToCart}
          >
            <ShoppingCartOutlined /> Thêm vào giỏ hàng
          </Button>

          {fishLot.video && (
            <iframe
              width="100%"
              height="315"
              src={fishLot.video.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ marginBottom: "24px" }}
            ></iframe>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FishLotDetailPage;
