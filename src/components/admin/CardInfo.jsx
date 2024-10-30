import React from "react";
import { Card } from "antd";
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, SyncOutlined, DatabaseOutlined } from "@ant-design/icons";

const CardInfo = ({ title, content, icon, color }) => {
  return (
    <Card
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor: color || "#fff"
      }}
      bordered={false}
    >
      <div style={{ fontSize: "24px", marginBottom: "8px", color: "#fff" }}>
        {React.createElement(icon)}
      </div>
      <h3 style={{ color: "#fff", fontSize: "16px", marginBottom: "4px" }}>{title}</h3>
      <p style={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}>{content}</p>
    </Card>
  );
};

export default CardInfo;
