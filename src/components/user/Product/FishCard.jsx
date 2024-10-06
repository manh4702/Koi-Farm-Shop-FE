import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
const FishCard = ({ fish }) => {
  // const history = useHistory();

  // const handleViewDetails = () => {
  //   history.push(`/products/${fish.id}`);
  // };
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/products/${fish.id}`);
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
          }}
        />
      }
      style={{
        width: "100%",
        maxWidth: "20rem",
        margin: "0 auto",
        position: "relative",
        transition: "transform 0.3s",
        height: "100%",
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
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: "#3B82F6",
          }}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button type="default">Mua ngay</Button>
      </div>
      {/* Button "Xem chi tiết" hiển thị khi hover */}
      {/* <Button
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
      </Button> */}
      {/* <style jsx="true">{`
        .fish-card:hover .view-details-button {
          opacity: 1;
        }
      `}</style> */}
    </Card>
  );
};

export default FishCard;
