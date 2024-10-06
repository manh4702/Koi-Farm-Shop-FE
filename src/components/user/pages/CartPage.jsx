import React from "react";
import { Table, Button, InputNumber, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const CartPage = () => {
  const { items, removeItem, updateQuantity } = useCartStore();

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image}
            alt={text}
            style={{ width: 50, marginRight: 10 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value)}
        />
      ),
    },
    {
      title: "Tổng",
      key: "total",
      render: (_, record) => (record.price * record.quantity).toFixed(2),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => {
            removeItem(record.id);
            message.success("Đã xóa sản phẩm khỏi giỏ hàng");
          }}
        />
      ),
    },
  ];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <h1>Giỏ hàng</h1>
        <Table columns={columns} dataSource={items} rowKey="id" />
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <h2>Tổng cộng: {total.toFixed(2)}</h2>
          <Button type="primary" size="large" style={{ marginTop: 10 }}>
            Thanh toán
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
