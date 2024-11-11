// src/components/admin/InformationOrder/OrderList.js

import React, { useEffect, useState } from "react";
import { message } from "antd";
import OrderTable from "./component/OrderTable";
import OrderDetailModal from "./component/OrderDetailModal";
import useOrderStore from "../../../store/orderStore.js";

const OrderList = () => {
  const { orders, setOrders, fetchOrders, deleteOrder, changeOrderStatus } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    fetchOrders(); 
  }, []);

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleAcceptAndPrintOrder = async () => {
    try {
      console.log('Accepting order:', selectedOrder.id); // Debug log
      await changeOrderStatus(selectedOrder.id, "COMPLETED");
      message.success(`Đơn hàng ${selectedOrder.id} đã được chấp nhận.`);
      setIsModalVisible(false);
      // await fetchOrders(); // Refresh danh sách
    } catch (error) {
      console.error('Accept order error:', error);
      message.error("Không thể cập nhật trạng thái đơn hàng.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      console.log('Canceling order:', orderId); // Debug log
      await changeOrderStatus(orderId, "CANCELLED");
      message.success(`Đơn hàng ${orderId} đã bị hủy.`);
      // await fetchOrders(); // Refresh danh sách
    } catch (error) {
      console.error('Cancel order error:', error);
      message.error("Không thể hủy đơn hàng.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      message.success(`Đơn hàng ${orderId} đã bị xóa.`);
    } catch (error) {
      message.error("Không thể xóa đơn hàng.");
    }
  };


  return (
    <div className="order-list">
      <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
      <OrderTable
        orders={orders}
        showModal={showModal}
        handleCancelOrder={handleCancelOrder}
        handleDeleteOrder={handleDeleteOrder}
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
