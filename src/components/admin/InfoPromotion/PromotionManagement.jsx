import React, { useState } from 'react';
import { Table, Button, Form, Input, DatePicker, Modal, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const columns = [
    {
      title: 'Tên Chương Trình',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phần Trăm Giảm Giá',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Thời Gian Bắt Đầu',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Thời Gian Kết Thúc',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />}>Sửa</Button>
          <Button onClick={() => handleDelete(record.key)} icon={<DeleteOutlined />} danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedPromotion(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setPromotions(promotions.filter(promo => promo.key !== key));
  };

  const handleOk = (values) => {
    if (selectedPromotion) {
      setPromotions(promotions.map(promo => (promo.key === selectedPromotion.key ? { ...promo, ...values } : promo)));
    } else {
      setPromotions([...promotions, { key: Date.now(), ...values }]);
    }
    setIsModalVisible(false);
    setSelectedPromotion(null);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Thêm Chương Trình
      </Button>
      <Table columns={columns} dataSource={promotions} style={{ marginTop: 20 }} />

      <Modal
        title={selectedPromotion ? 'Chỉnh Sửa Chương Trình' : 'Thêm Chương Trình'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={selectedPromotion || { name: '', discount: '', startDate: '', endDate: '' }}
          onFinish={handleOk}
        >
          <Form.Item name="name" label="Tên Chương Trình" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="discount" label="Phần Trăm Giảm Giá" rules={[{ required: true }]}>
            <Input type="number" min={0} max={100} />
          </Form.Item>
          <Form.Item name="startDate" label="Thời Gian Bắt Đầu" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="endDate" label="Thời Gian Kết Thúc" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedPromotion ? 'Cập Nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionManagement;
