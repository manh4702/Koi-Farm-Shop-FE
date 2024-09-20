// src/components/admin/InformationOrder/CompletedOrders.js

import React, { useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import useOrderStore from '../../../store/orderStore';

const CompletedOrders = () => {
  const { orders, setOrders } = useOrderStore();

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      // Giả lập API lấy danh sách đơn hàng hoàn thành
      const data = [
        { id: 2, customer: 'Jane Doe', status: 'Completed', total: 150 },
        { id: 4, customer: 'Alice Johnson', status: 'Completed', total: 250 },
      ];
      setOrders(data);
    };

    fetchCompletedOrders();
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
        <Tag color="green">
          {status}
        </Tag>
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
    // Xử lý logic xem chi tiết đơn hàng
    console.log('Xem chi tiết đơn hàng:', orderId);
  };

  return (
    <div className="completed-orders">
      <h2 className="text-2xl font-bold mb-4">Đơn hàng hoàn thành</h2>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default CompletedOrders;
