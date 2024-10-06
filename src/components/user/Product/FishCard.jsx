import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";
const FishCard = ({ fish }) => {
  // const history = useHistory();

  // const handleViewDetails = () => {
  //   history.push(`/products/${fish.id}`);
  // };
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleViewDetails = () => {
    navigate(`/products/${fish.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(fish);
    message.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={fish.name}
          src={fish.image}
          style={{
            height: "450px",
            objectFit: "initial",
            width: "100%",
          }}
        />
      }
      style={{
        width: "100%",
        maxWidth: "20rem",
        margin: "0 auto",
        position: "relative",
        transition: "transform 0.3s",
        height: "auto",
      }}
      onClick={handleViewDetails}
      className="fish-card"
    >
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {fish.name}
      </h3>
      <p
        style={{
          color: "#718096",
          marginBottom: "0.5rem",
          height: "70px",
        }}
      >
        {fish.description}
      </p>
      <p
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: "#2563EB",
          marginBottom: "1rem",
        }}
      >
        {fish.price}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "-10px",
          flexDirection: "column", // Chuyển đổi sang cột
          gap: "10px", //
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "red",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleAddToCart}
        >
          <ShoppingCartOutlined /> Thêm vào giỏ hàng
        </Button>
        <Button
          type="default"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "border 0.3s",
            border: "2px solid transparent",
            color: "black",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = "2px solid red";
            e.currentTarget.style.color = "red";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = "2px solid transparent";
            e.currentTarget.style.color = "black";
          }}
        >
          <DollarOutlined /> Mua ngay
        </Button>
      </div>
    </Card>
  );
};

export default FishCard;
