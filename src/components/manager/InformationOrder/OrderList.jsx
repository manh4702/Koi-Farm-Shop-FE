import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Tooltip, Modal, message } from "antd";
import {
  CheckOutlined,
  PrinterOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useOrderStore from "../../../store/useOrderStore";
import OrderTable from "./component/OrderTable";
import OrderDetailModal from "./component/OrderDetailModal";

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
  }, [ setOrders ]);

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

  return (
    <div className="order-list">
      <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
      <OrderTable
        orders={orders}
        showModal={showModal}
        handleCancelOrder={handleCancelOrder}
      />
      {selectedOrder && (
        <OrderDetailModal
          selectedOrder={selectedOrder}
          isModalVisible={isModalVisible}
          handleAcceptAndPrintOrder={handleAcceptAndPrintOrder}
          handleCancelModal={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default OrderList;
