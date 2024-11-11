// components/OrderTable.jsx
import React, {useState} from "react";
import {Table, Tag, Button, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, PrinterOutlined} from "@ant-design/icons";

const OrderTable = ({orders, showModal, handleCancelOrder, handleDeleteOrder}) => {
  const [loading, setLoading] = useState(false);
  const ORDER_STATUSES = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  
  const columns = [
    {title: "Mã đơn hàng", dataIndex: "id", key: "id"},
    {title: "Khách hàng", dataIndex: "customer", key: "customer"},
    {title: "Địa chỉ", dataIndex: "address", key: "address"},
    {title: "Số điện thoại", dataIndex: "phone", key: "phone"},
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products) => {
        if (!Array.isArray(products) || products.length === 0) {
          return <span>Không có sản phẩm</span>;
        }

        return (
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.name} - Số lượng: {product.quantity} - Giá:{" "}
                {formatCurrency(product.price)}
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
      render: (status) => {
        const statusConfig = {
          PENDING: { text: "Đang chờ xử lý", color: "volcano" },
          PROCESSING: { text: "Đang xử lý", color: "blue" },
          COMPLETED: { text: "Hoàn thành", color: "green" },
          CANCELLED: { text: "Đã hủy", color: "red" }
        };

        const { text, color } = statusConfig[status] || { text: status, color: "default" };

        return (
          <Tag color={color} style={{ width: "100px", textAlign: "center" }}>
            {text}
          </Tag>
        );
      }
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => formatCurrency(total),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          {record.status === "COMPLETED" ? (
            <Tooltip title="In Bill">
              <Button
                icon={<PrinterOutlined />}
                onClick={() => console.log(`In hóa đơn cho đơn hàng ${record.id}`)}
                style={{ color: "blue", border: '1px solid blue' }}
              />
            </Tooltip>
          ) : (
            <>
              {record.status !== "CANCELLED" && (
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
                      style={{ marginRight: 8 }}
                    />
                  </Tooltip>
                </>
              )}
              <Tooltip title="Xóa đơn hàng">
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteOrder(record.id)}
                  style={{ color: "red", border: "1px solid red" }}
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  // return <Table columns={columns} dataSource={orders} rowKey="id"/>;
  return (
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="id"
      loading={loading}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} của ${total} đơn hàng`
      }}
    />
  );
};

export default OrderTable;
