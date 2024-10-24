// src/components/user/Product/FishCard.jsx
import React from "react";
import { Card, Button, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";

const FishCard = ({ fish }) => {
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
        <div style={{ height: "300px" }}>
          <img
            alt={fish.name}
            src={fish.image}
            style={{
              // height: "450px",
              height: "100%",
              objectFit: "contain",
              width: "100%",
            }}
          />
        </div>
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
          marginBottom: "0.5rem",
          height: "80px",
          width: "100%",
          // display: "-webkit-box",
          // WebkitLineClamp: 2,
          // WebkitBoxOrient: "vertical",
          // overflow: "hidden",
          // // textOverflow: "ellipsis"
        }}
      >
        {fish.description}
      </p>
      <p
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        Đánh giá:{" "}
        {Array.from({ length: fish.rating }, (_, index) => (
          <span key={index}>⭐️</span>
        ))}
      </p>

      {fish.isLot ? (
        <div style={{ height: "200px" }}>
          <p>
            <strong>Năm sinh:</strong> {fish.birthYear}
          </p>
          <p>
            <strong>Số lượng:</strong> {fish.quantity} con
          </p>
          <div style={{ marginBottom: "0.5rem" }}>
            Các loại cá trong lô: <br />
            {fish.fishes.map((type, index) => (
              <Tag
                key={index}
                color="gold"
                style={{ margin: "0.25rem 0.25rem 0.25rem 0" }}
              >
                {type.name} ({type.quantity} con)
              </Tag>
            ))}
          </div>
        </div>
      ) : null}

      <p
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: "red",
          marginBottom: "1rem",
        }}
      >
        {fish.price}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button
          type="primary"
          style={{
            backgroundColor: "red",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          // onClick={handleAddToCart}
        >
          Mua ngay
        </Button>
        <Button
          type="default"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "border 0.3s",
            border: "2px solid black",
            color: "black",
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
      </div>
    </Card>
  );
};

export default FishCard;
