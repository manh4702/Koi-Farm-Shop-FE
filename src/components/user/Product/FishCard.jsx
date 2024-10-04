import React from "react";
import { Card, Button } from "antd";

const FishCard = ({ fish }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={fish.name}
          src={fish.image}
          style={{
            height: "100%", // 48px * 3 (12rem = 192px)
            objectFit: "fill",
          }}
        />
      }
      style={{
        width: "100%",
        maxWidth: "20rem", // 320px (max-w-sm)
        margin: "0 auto",
      }}
    >
      <h3
        style={{
          fontSize: "1.125rem", // text-lg
          fontWeight: "bold", // font-bold
          marginBottom: "0.5rem", // mb-2
        }}
      >
        {fish.name}
      </h3>
      <p
        style={{
          color: "#718096", // text-gray-600
          marginBottom: "0.5rem", // mb-2
        }}
      >
        {fish.description}
      </p>
      <p
        style={{
          fontSize: "1.25rem", // text-xl
          fontWeight: "bold", // font-bold
          color: "#2563EB", // text-blue-600
          marginBottom: "1rem", // mb-4
        }}
      >
        ${fish.price}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#3B82F6", // bg-blue-500
          }}
        >
          Add to Cart
        </Button>
        <Button type="default">Buy Now</Button>
      </div>
    </Card>
  );
};

export default FishCard;
