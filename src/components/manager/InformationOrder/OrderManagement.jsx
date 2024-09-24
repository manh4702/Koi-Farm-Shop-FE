import React, { useEffect } from 'react';
import { Table, Button, Tag } from 'antd';
import useOrderStore from '../../../store/orderStore';

const OrderManagement = () => {
  const { orders, setOrders } = useOrderStore();

  useEffect(() => {
    // Giả lập lấy danh sách đơn hàng từ API
    const fetchOrders = async () => {
      const data = [
        { id: 1, customer: 'John Doe', status: 'Pending', total: 100 },
        { id: 2, customer: 'Jane Doe', status: 'Completed', total: 150 },
      ];
      setOrders(data);
    };

    fetchOrders();
  }, [setOrders]);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Completed' ? 'green' : 'volcano'}>{status}</Tag>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleOrderDetail(record.id)}>
          View
        </Button>
      ),
    },
  ];

  const handleOrderDetail = (orderId) => {
    // Thực hiện điều hướng hoặc hiển thị chi tiết đơn hàng
    console.log("View order detail: ", orderId);
  };

  return (
    <div className="order-management">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default OrderManagement;
