import React from "react";
import {Table, Button, InputNumber, message} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../../store/store.js";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const CartPage = () => {
  const { removeItem, updateQuantity} = useCartStore();
  // const { cartItems } = useAuthStore();
  const items = useCartStore(state => state.items);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "fishName",
      key: "fishName",
      render: (text, record) => (
        <div style={{display: "flex", alignItems: "center"}}>
          <img src={record.fishImage || record.packageImage || "placeholder.png"} alt={text || record.packageName}
               style={{width: 100, marginRight: 10, borderRadius: "10px"}}/>
          {text || record.packageName}
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "totalPricePerItem",
      key: "price",
      render: text => text ? formatCurrency(parseInt(text)) : "Đang cập nhật",
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          max={1}
          defaultValue={record.quantity}
          onChange={(value) => updateQuantity(record.cartItemId, value)}
        />
      ),
    },
    {
      title: "Tổng",
      key: "total",
      render: (_, record) => {
        const price = record.totalPricePerItem || 0;
        const total = price * record.quantity;
        return formatCurrency(total);
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined/>}
          onClick={async () => {
            await removeItem(record.cartItemId);
            message.success("Đã xóa sản phẩm khỏi giỏ hàng");
          }}
        />
      ),
    },
  ];

  const total = items.reduce(
    (sum, item) => sum + (item.totalPricePerItem || 0) * item.quantity,
    0
  );
  const handleCheckout = () => {
    if (items.length === 0) {
      message.warning("Giỏ hàng trống, không thể thanh toán");
      return;
    }
    navigate("/checkout", { state: { cartItems: items } }); // Chuyển hướng đến CheckoutPage và truyền dữ liệu giỏ hàng
  };
  return (
    <>
      <Header/>
      <div style={{maxWidth: 1200, margin: "0 auto", padding: "20px"}}>
        <h1>Giỏ hàng</h1>
        <Table columns={columns} dataSource={items} rowKey="cartItemId"/>
        <div style={{textAlign: "right", marginTop: 20}}>
          <h2>Tổng cộng: {formatCurrency(total)}</h2>
          <Button type="primary" size="large" style={{marginTop: 10}} onClick={() => handleCheckout()}>
            Thanh toán
          </Button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CartPage;
