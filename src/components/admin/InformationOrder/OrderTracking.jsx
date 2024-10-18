// src/components/admin/InformationOrder/OrderTracking.jsx

import React, { useEffect } from 'react';
import { Table, Tag, Button, Steps } from 'antd';
import useOrderStore from '../../../store/useOrderStore';

const { Step } = Steps;

const OrderTracking = () => {
  const { orders, setOrders } = useOrderStore();

  useEffect(() => {
    const fetchOrders = async () => {
      // Giả lập API lấy danh sách đơn hàng với trạng thái chi tiết
      const data = [
        {
          id: 1,
          customer: 'John Doe',
          status: 'Đang xử lý',
          total: 100000,
          steps: ['Đã đặt hàng', 'Đang xử lý'],
        },
        {
          id: 2,
          customer: 'Jane Doe',
          status: 'Hoàn thành',
          total: 150000,
          steps: ['Đã đặt hàng', 'Đang xử lý', 'Đã vận chuyển', 'Đã giao hàng'],
        },
        // Các đơn hàng khác
      ];
      setOrders(data);
    };

    fetchOrders();
  }, [setOrders]);

  const handleOrderDetail = (orderId) => {
    console.log('Xem chi tiết đơn hàng:', orderId);
  };

  const expandedRowRender = (record) => {
    const { steps } = record;
    const currentStep = steps.length - 1;

    return (
      <Steps current={currentStep} size="small">
        {steps.map((step, index) => (
          <Step key={index} title={step} />
        ))}
      </Steps>
    );
  };

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
      render: (status) => {
        let color = 'blue';
        if (status === 'Hoàn thành') color = 'green';
        else if (status === 'Đang chờ xử lý') color = 'volcano';
        return <Tag color={color}>{status}</Tag>;
      },
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

  return (
    <div className="order-tracking">
      <h2 className="text-2xl font-bold mb-4">Theo dõi trạng thái đơn hàng</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        expandable={{ expandedRowRender }}
      />
    </div>
  );
};

export default OrderTracking;
