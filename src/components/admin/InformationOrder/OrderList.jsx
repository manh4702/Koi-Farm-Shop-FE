import React, { useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import useOrderStore from '../../../store/orderStore';

const OrderList = () => {
  const { orders, setOrders } = useOrderStore();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = [
        { id: 1, customer: 'John Doe', status: 'Pending', total: 100 },
        { id: 2, customer: 'Jane Doe', status: 'Completed', total: 150 },
        { id: 3, customer: 'Michael Smith', status: 'Processing', total: 200 },
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
        <Tag color={status === 'Completed' ? 'green' : status === 'Pending' ? 'volcano' : 'blue'}>
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
        <div>
          <Button
            type="primary"
            onClick={() => handleOrderDetail(record.id)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          {record.status === 'Pending' && (
            <>
              <Button
                type="default"
                onClick={() => handleAcceptOrder(record.id)}
                style={{ marginRight: 8 }}
              >
                Chấp nhận
              </Button>
              <Button
                type="danger"
                onClick={() => handleCancelOrder(record.id)}
              >
                Hủy
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleOrderDetail = (orderId) => {
    console.log('Xem chi tiết đơn hàng:', orderId);
  };

  return (
    <div className="order-list">
      <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default OrderList;
