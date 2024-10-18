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
        { id: 2, customer: 'Jane Doe', status: 'Hoàn thành', total: 150000 },
        { id: 4, customer: 'Alice Johnson', status: 'Hoàn thành', total: 250000 },
      ];
      setOrders(data);
    };

    fetchCompletedOrders();
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
        <Tag color="green">
          {status}
        </Tag>
      ),
    },
    {
      title: 'Tổng tiền',
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
    // Xử lý logic xem chi tiết đơn hàng
    console.log('Xem chi tiết đơn hàng:', orderId);
  };

  return (
    <div className="completed-orders">
      <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng hoàn thành</h2>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default CompletedOrders;
