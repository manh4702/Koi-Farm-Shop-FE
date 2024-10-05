import React from "react";
import { Card, Button } from "antd";
import { useHistory } from "react-router-dom";
const FishCard = ({ fish }) => {
  const history = useHistory();

  const handleViewDetails = () => {
    history.push(`/products/${fish.id}`);
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={fish.name}
          src={fish.image}
          style={{
            height: "100%",
            objectFit: "cover",
          }}
        />
      }
      style={{
        width: "100%",
        maxWidth: "20rem", // 320px (max-w-sm)
        margin: "0 auto",
        position: "relative",
        transition: "transform 0.3s",
      }}
      className="fish-card"
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
        {fish.price}
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
      {/* Button "Xem chi tiết" hiển thị khi hover */}
      <Button
        type="default"
        onClick={handleViewDetails}
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          opacity: 0,
          transition: "opacity 0.3s ease",
          backgroundColor: "#FFFFFF",
          borderColor: "#3B82F6",
          color: "#3B82F6",
        }}
        className="view-details-button"
      >
        Xem chi tiết
      </Button>
      <style jsx="true">{`
        .fish-card:hover .view-details-button {
          opacity: 1;
        }
      `}</style>
    </Card>
  );
};

export default FishCard;
