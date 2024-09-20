import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Tooltip, Modal, message } from "antd";
import {
  CheckOutlined,
  PrinterOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useOrderStore from "../../../store/useOrderStore";

const OrderList = () => {
  const { orders, setOrders } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = [
        {
          id: 1,
          customer: "John Doe",
          status: "Pending",
          total: 100,
          address: "123 Main St, New York, NY",
          phone: "123-456-7890",
          products: [
            { name: "Koi Fish A", quantity: 2, price: 50 },
            { name: "Koi Fish B", quantity: 1, price: 100 },
          ],
          description: "Đơn hàng bao gồm 2 loại cá Koi loại A và B.",
        },
        {
          id: 2,
          customer: "Jane Doe",
          status: "Completed",
          total: 150,
          address: "456 Elm St, Los Angeles, CA",
          phone: "987-654-3210",
          products: [{ name: "Koi Fish C", quantity: 3, price: 50 }],
          description: "Cá Koi loại C đã hoàn thành giao dịch.",
        },
        {
          id: 3,
          customer: "Michael Smith",
          status: "Processing",
          total: 200,
          address: "789 Oak St, Chicago, IL",
          phone: "555-555-5555",
          products: [{ name: "Koi Fish D", quantity: 4, price: 50 }],
          description: "Đang xử lý đơn hàng 4 con cá Koi loại D.",
        },
      ];
      setOrders(data);
    };

    fetchOrders();
  }, [setOrders]);

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // Hàm xử lý khi nhấn nút "Chấp nhận và In"
  const handleAcceptAndPrintOrder = () => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: "Accepted" } : order
    );
    setOrders(updatedOrders);
    setIsModalVisible(false);

    // Hiển thị thông báo chấp nhận đơn hàng
    message.success(`Đơn hàng ${selectedOrder.id} đã được chấp nhận.`);

    // Thực hiện in đơn hàng
    console.log("In đơn hàng:", selectedOrder);
    message.info(`Đang in đơn hàng ${selectedOrder.id}.`);
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Canceled" } : order
    );
    setOrders(updatedOrders);
    message.error(`Đơn hàng ${orderId} đã bị hủy.`);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <ul>
          {products.map((product) => (
            <li key={product.name}>
              {product.name} - {product.quantity} - ${product.price}
            </li>
          ))}
        </ul>
      ),
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
          {/* <Tooltip title="Xem chi tiết đơn hàng">
            <Button
              icon={<EyeOutlined />}
              onClick={() => console.log("Xem chi tiết đơn hàng:", record.id)}
              style={{ marginRight: 8 }}
            />
          </Tooltip> */}
          {record.status === "Pending" && (
            <>
              <Tooltip title="Chấp nhận và In">
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => showModal(record)}
                  style={{ marginRight: 8 }}
                ></Button>
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

  return (
    <div className="order-list">
      <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
      <Table columns={columns} dataSource={orders} rowKey="id" />
      {selectedOrder && (
        <Modal
          title={`Chi tiết đơn hàng #${selectedOrder.id}`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button
              key="acceptAndPrint"
              type="primary"
              icon={<PrinterOutlined />}
              onClick={handleAcceptAndPrintOrder}
            >
              Chấp nhận và In
            </Button>,
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Đóng
            </Button>,
          ]}
        >
          <p>
            <strong>Khách hàng:</strong> {selectedOrder.customer}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {selectedOrder.address}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {selectedOrder.phone}
          </p>
          <p>
            <strong>Tổng tiền:</strong> ${selectedOrder.total}
          </p>
          <h3>
            <strong>Chi tiết sản phẩm:</strong>
          </h3>
          <ul>
            {selectedOrder.products.map((product, index) => (
              <li key={index}>
                {product.name} - Số lượng: {product.quantity} - Giá: $
                {product.price}
              </li>
            ))}
          </ul>

          <p>
            <strong>Mô tả:</strong> {selectedOrder.description}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default OrderList;
