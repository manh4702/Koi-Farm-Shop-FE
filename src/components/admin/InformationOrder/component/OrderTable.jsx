// components/OrderTable.jsx
import React from "react";
import { Table, Tag, Button, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const OrderTable = ({ orders, showModal, handleCancelOrder }) => {
  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Sản phẩm",
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
                {product.name} - Số lượng: {product.quantity} - Giá:{" "}
                {product.price.toLocaleString()} VND
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Hoàn thành"
              ? "green"
              : status === "Đang chờ xử lý"
              ? "volcano"
              : status === "Đang xử lý"
              ? "blue"
              : status === "Đã hủy"
              ? "red"
              : "geekblue"
          }
          style={{ width: "100px", textAlign: "center" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString()} VND`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          {record.status === "Đang chờ xử lý" && (
            <>
              <Tooltip title="Chấp nhận đơn hàng">
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => showModal(record)}
                  style={{ marginRight: 8, color: "green", border: '1px solid green' }}
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
