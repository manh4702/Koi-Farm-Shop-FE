import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Tabs, Rate, Space } from "antd";

const { TabPane } = Tabs;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      key: "1",
      username: "john_doe",
      fullName: "John Doe",
      dob: "1990-01-01",
      phone: "0123456789",
      email: "john@example.com",
      orders: [
        { orderId: "1001", date: "2023-01-15", total: "$100" },
        { orderId: "1002", date: "2023-02-10", total: "$200" },
      ],
      points: 120,
      feedback: [{ rating: 4, comment: "Great service!" }],
    },
    // Add more customer data as needed
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
  };

  const onFinish = (values) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.key === selectedCustomer.key
          ? { ...customer, ...values }
          : customer
      )
    );
    handleCancel();
  };

  const columns = [
    {
      title: "Tên Tài Khoản",
      dataIndex: "username",
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <h1>Quản Lý Khách Hàng</h1>
      <Table columns={columns} dataSource={customers} />

      {selectedCustomer && (
        <Modal
          title="Chỉnh Sửa Thông Tin Khách Hàng"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            layout="vertical"
            initialValues={{
              username: selectedCustomer.username,
              fullName: selectedCustomer.fullName,
              dob: selectedCustomer.dob,
              phone: selectedCustomer.phone,
              email: selectedCustomer.email,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên Tài Khoản"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Họ và Tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngày Tháng Năm Sinh"
              name="dob"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Số Điện Thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {selectedCustomer && (
        <Tabs defaultActiveKey="1" style={{ marginTop: "20px" }}>
          <TabPane tab="Hồ Sơ Khách Hàng" key="1">
            <h3>Thông Tin</h3>
            <p>
              <strong>Họ và Tên:</strong> {selectedCustomer.fullName}
            </p>
            <p>
              <strong>Ngày Sinh:</strong> {selectedCustomer.dob}
            </p>
            <p>
              <strong>Số Điện Thoại:</strong> {selectedCustomer.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Tích Điểm:</strong> {selectedCustomer.points}
            </p>
          </TabPane>
          <TabPane tab="Lịch Sử Đơn Hàng" key="2">
            <Table
              columns={[
                { title: "Mã Đơn", dataIndex: "orderId" },
                { title: "Ngày", dataIndex: "date" },
                { title: "Tổng", dataIndex: "total" },
              ]}
              dataSource={selectedCustomer.orders}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Đánh Giá & Phản Hồi" key="3">
            {selectedCustomer.feedback.map((item, index) => (
              <div key={index}>
                <Rate disabled value={item.rating} />
                <p>{item.comment}</p>
              </div>
            ))}
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default CustomerManagement;
