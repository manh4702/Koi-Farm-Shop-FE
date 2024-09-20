import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tabs,
  Rate,
  Space,
  Col,
  Row,
  Card,
} from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

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
    {
      key: "1",
      username: "Quang_Nguyen",
      fullName: "Quang Nguyen",
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
    {
      key: "1",
      username: "Vuong_Nguyen",
      fullName: "Vuong Nguyen",
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
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const handleView = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditCustomer(null);
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
      title: "Điểm tích luỹ",
      dataIndex: "points",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button type="primary" onClick={() => handleEdit(record)}>
              <EditOutlined />
              Sửa
            </Button>
          </Space>
          <Space size="middle">
            <Button type="ghost" onClick={() => handleView(record)}>
              <EyeOutlined />
            </Button>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quản Lý Khách Hàng</h1>
      <div style={{ padding: "24px", background: "#fff" }}>
        <Row gutter={[16, 16]}>
          {/* Nửa trên: Danh sách khách hàng */}
          <Col span={24}>
            <div style={{ maxHeight: "400px" }}>
              <Table
                columns={columns}
                dataSource={customers}
                pagination={false}
                scroll={{ y: 325 }}
              />
            </div>
          </Col>

          {editCustomer && (
            <Modal
              title="Chỉnh Sửa Thông Tin Khách Hàng"
              visible={isModalVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <Form
                layout="vertical"
                initialValues={{
                  username: editCustomer.username,
                  fullName: editCustomer.fullName,
                  dob: editCustomer.dob,
                  phone: editCustomer.phone,
                  email: editCustomer.email,
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
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ngày Tháng Năm Sinh"
                  name="dob"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày sinh" },
                  ]}
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

          {/* Nửa dưới: Chi tiết khách hàng */}
          {selectedCustomer && (
            <Col span={24}>
              <Card
                title={`Thông tin chi tiết của ${selectedCustomer.fullName}`}
              >
                <Tabs defaultActiveKey="1">
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
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default CustomerManagement;
