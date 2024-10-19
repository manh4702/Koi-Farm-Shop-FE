// src/components/admin/InformationOrder/OrderList.js

import React, { useEffect, useState } from "react";
import { message } from "antd";
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
          status: "Đang chờ xử lý",
          total: 100000,
          address: "123 Main St, New York, NY",
          phone: "123-456-7890",
          products: [
            { name: "Cá Koi A", quantity: 2, price: 50000 },
            { name: "Cá Koi B", quantity: 1, price: 100000 },
          ],
          description: "Đơn hàng bao gồm 2 loại cá Koi loại A và B.",
        },
        {
          id: 2,
          customer: "Jane Doe",
          status: "Hoàn thành",
          total: 150000,
          address: "456 Elm St, Los Angeles, CA",
          phone: "987-654-3210",
          products: [{ name: "Cá Koi C", quantity: 3, price: 50000 }],
          description: "Cá Koi loại C đã hoàn thành giao dịch.",
        },
        {
          id: 3,
          customer: "Michael Smith",
          status: "Đang xử lý",
          total: 200000,
          address: "789 Oak St, Chicago, IL",
          phone: "555-555-5555",
          products: [{ name: "Cá Koi D", quantity: 4, price: 50000 }],
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

  const handleAcceptAndPrintOrder = () => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: "Đã chấp nhận" } : order
    );
    setOrders(updatedOrders);
    setIsModalVisible(false);
    message.success(`Đơn hàng ${selectedOrder.id} đã được chấp nhận.`);
    console.log("In đơn hàng:", selectedOrder);
    message.info(`Đang in đơn hàng ${selectedOrder.id}.`);
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Đã hủy" } : order
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
