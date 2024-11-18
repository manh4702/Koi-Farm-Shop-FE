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

  const maskPhoneNumber = (phone) => {
    return phone.replace(/^(\d{7})(\d{3})$/, "*******$2");
  };

  const downloadOrderForm = (order) => {
    const customerInfo = `
    Tên khách hàng: ${order.customer}
    Địa chỉ: ${order.address}
    Số điện thoại: ${maskPhoneNumber(order.phone)}
  `;

    const orderDetails = order.products.map(
      (product) => `${product.name} - Số lượng: ${product.quantity} - Giá: ${formatCurrency(product.price)}`
    ).join("\n");

    const formContent = `
    --- Thông tin khách hàng ---
    ${customerInfo}

    --- Thông tin đơn hàng ---
    ${orderDetails}

    Tổng tiền: ${formatCurrency(order.total)}
  `;

    // Format the date as "YYYYMMDD" (or any preferred format)
    const orderDate = new Date(order.date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\//g, "-");
    // e.g., "2023-11-12"

    // Set the file name as "Order_<customer name>_<order date>.txt"
    const fileName = `Order_${order.customer}_${orderDate}.txt`;

    const blob = new Blob([formContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };


  const columns = [
    {title: "Mã đơn hàng", dataIndex: "id", key: "id", width: 85},
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
                <strong>{product.name}</strong> - Số lượng: {product.quantity} - Giá:{" "}
                {formatCurrency(product.price)}
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => {
        let displayMethod = paymentMethod; // Default to showing the actual value
        let color = "default";
        // Customize the display of specific payment methods
        if (paymentMethod === "ZALOPAY") {
          displayMethod = "ZaloPay";
          color = "blue";
        } else if (paymentMethod === "CASH") {
          displayMethod = "Thanh toán khi nhận hàng (COD)";
          color = "green";
        }

        return (
          <Tag
            color={color}
            style={{
              width: "120px",
              textAlign: "center",
              fontSize: "12px",
              padding: "2px 6px",
              whiteSpace: "normal",
              display: "inline-block",
              wordWrap: "break-word",
            }}
          >
            {displayMethod}
          </Tag>
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
                onClick={() => downloadOrderForm(record)}
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
              {/*<Tooltip title="Xóa đơn hàng">*/}
              {/*  <Button*/}
              {/*    icon={<DeleteOutlined />}*/}
              {/*    onClick={() => handleDeleteOrder(record.id)}*/}
              {/*    style={{ color: "red", border: "1px solid red" }}*/}
              {/*  />*/}
              {/*</Tooltip>*/}
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
