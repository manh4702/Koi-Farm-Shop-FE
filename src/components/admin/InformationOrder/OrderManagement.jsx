import React, { useEffect } from 'react';
import { Table, Button, Tag } from 'antd';
import useOrderStore from '../../../store/orderStore';

const OrderManagement = () => {
  const { orders, setOrders } = useOrderStore();

  useEffect(() => {
    // Giả lập lấy danh sách đơn hàng từ API
    const fetchOrders = async () => {
      const data = [
        { id: 1, customer: 'John Doe', status: 'Đang chờ xử lý', total: 100000 },
        { id: 2, customer: 'Jane Doe', status: 'Hoàn thành', total: 150000 },
      ];
      setOrders(data);
    };

    fetchOrders();
  }, [setOrders]);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Hoàn thành' ? 'green' : 'volcano'}>{status}</Tag>
      ),
    },
    {
      title: 'Tổng tiền (VND)',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `${total.toLocaleString()} VND`,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleOrderDetail(record.id)}>
          Xem
        </Button>
      ),
    },
  ];

  const handleOrderDetail = (orderId) => {
    // Thực hiện điều hướng hoặc hiển thị chi tiết đơn hàng
    console.log("Xem chi tiết đơn hàng: ", orderId);
  };

  return (
    <div className="order-management">
      <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h2>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default OrderManagement;
