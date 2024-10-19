// components/OrderDetailModal.jsx
import React from "react";
import { Modal, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

const OrderDetailModal = ({
  selectedOrder,
  isModalVisible,
  handleAcceptAndPrintOrder,
  handleCancelModal,
}) => (
  <Modal
    title={`Chi tiết đơn hàng #${selectedOrder?.id}`}
    open={isModalVisible}
    onCancel={handleCancelModal}
    footer={[
      <Button
        key="acceptAndPrint"
        type="primary"
        icon={<PrinterOutlined />}
        onClick={handleAcceptAndPrintOrder}
      >
        Chấp nhận và In
      </Button>,
      <Button key="cancel" onClick={handleCancelModal}>
        Đóng
      </Button>,
    ]}
  >
    <p>
      <strong>Khách hàng:</strong> {selectedOrder?.customer}
    </p>
    <p>
      <strong>Địa chỉ:</strong> {selectedOrder?.address}
    </p>
    <p>
      <strong>Số điện thoại:</strong> {selectedOrder?.phone}
    </p>
    <p>
      <strong>Tổng tiền:</strong> {selectedOrder?.total.toLocaleString()} VND
    </p>
    <h3>
      <strong>Chi tiết sản phẩm:</strong>
    </h3>
    <ul>
      {selectedOrder?.products.map((product, index) => (
        <li key={index}>
          {product.name} - Số lượng: {product.quantity} - Giá:{" "}
          {product.price.toLocaleString()} VND
        </li>
      ))}
    </ul>
    <p>
      <strong>Mô tả:</strong> {selectedOrder?.description}
    </p>
  </Modal>
);

export default OrderDetailModal;
