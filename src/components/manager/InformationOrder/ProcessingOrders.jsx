import React, { useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import useOrderStore from '../../../store/useOrderStore'; // Sử dụng store order

const ProcessingOrders = () => {
  const { orders, setOrders } = useOrderStore(); // Lấy dữ liệu orders từ store

  useEffect(() => {
    const fetchProcessingOrders = async () => {
      // Giả lập API lấy danh sách đơn hàng đang xử lý
      const data = [
        { id: 1, customer: 'John Doe', status: 'Processing', total: 100 },
        { id: 3, customer: 'Michael Smith', status: 'Processing', total: 200 },
      ];
      setOrders(data);
    };

    fetchProcessingOrders();
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
        <Tag color="blue">
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
    <div className="processing-orders">
      <h2 className="text-2xl font-bold mb-4">Đơn hàng đang xử lý</h2>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default ProcessingOrders;
