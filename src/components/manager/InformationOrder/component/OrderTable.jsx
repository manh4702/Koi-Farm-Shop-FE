// components/OrderTable.jsx
import React from "react";
import { Table, Tag, Button, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const OrderTable = ({ orders, showModal, handleCancelOrder }) => {
  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products) => {
        // Kiểm tra nếu products là mảng hợp lệ
        if (!Array.isArray(products) || products.length === 0) {
          return <span>Không có sản phẩm</span>;
        }

        return (
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.name} - Số lượng: {product.quantity} - Giá: $
                {product.price}
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Pending"
              ? "volcano"
              : status === "Processing"
              ? "blue"
              : status === "Canceled"
              ? "red"
              : "geekblue"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${total}`,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          {record.status === "Pending" && (
            <>
              <Tooltip title="Chấp nhận và In">
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => showModal(record)}
                  style={{ marginRight: 8 }}
                />
              </Tooltip>
              <Tooltip title="Hủy đơn hàng">
                <Button
                  icon={<CloseOutlined />}
                  danger
                  onClick={() => handleCancelOrder(record.id)}
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={orders} rowKey="id" />;
};

export default OrderTable;
