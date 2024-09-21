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
  Popconfirm,
  message,
  Dropdown,
  Menu,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  DownOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

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
      address: "123 Main Street, City A",
      orders: [
        { orderId: "1001", date: "2023-01-15", total: "$100" },
        { orderId: "1002", date: "2023-02-10", total: "$200" },
      ],
      points: 120,
      feedback: [{ rating: 4, comment: "Great service!" }],
    },
    {
      key: "1",
      username: "Leo_Messi",
      fullName: "Leo Messi",
      dob: "1990-01-01",
      phone: "0123456789",
      email: "Messi@example.com",
      address: "123 Main Street, City A",
      orders: [
        { orderId: "1001", date: "2024-01-15", total: "$100" },
        { orderId: "1002", date: "2024-02-10", total: "$200" },
      ],
      points: 120,
      feedback: [{ rating: 4, comment: "Great service!" }],
    },
    {
      key: "1",
      username: "Minh_Nhua",
      fullName: "Minh Nhua",
      dob: "1990-01-01",
      phone: "0123456389",
      email: "Minhnhua@example.com",
      address: "123 Main Street, City A",
      orders: [
        { orderId: "1001", date: "2024-01-15", total: "$100" },
        { orderId: "1002", date: "2024-02-10", total: "$200" },
      ],
      points: 120,
      feedback: [{ rating: 4, comment: "Great service!" }],
    },
    {
      key: "1",
      username: "Putin_Phan",
      fullName: "Phan Putin",
      dob: "1999-01-01",
      phone: "7123456789",
      email: "Putin@example.com",
      address: "17 Mascova, Pluxembua",
      orders: [
        { orderId: "1001", date: "2023-01-15", total: "$100" },
        { orderId: "1002", date: "2023-02-10", total: "$200" },
      ],
      points: 120,
      feedback: [{ rating: 4, comment: "Great service!" }],
    },
    {
      key: "1",
      username: "Ronalodo",
      fullName: "Ronal Dang",
      dob: "1990-04-12",
      phone: "0123456789",
      email: "john@example.com",
      address: "123 Main Street, City A",
      orders: [
        { orderId: "1001", date: "2023-01-15", total: "$100" },
        { orderId: "1002", date: "2023-02-10", total: "$200" },
      ],
      points: 120,
      feedback: [{ rating: 4, comment: "Great service!" }],
    },
    {
      key: "1",
      username: "Peter_Croud",
      fullName: "Peter Croud",
      dob: "1990-01-09",
      phone: "0123453289",
      email: "john@example.com",
      address: "123 Main Street, City A",
      orders: [
        { orderId: "1001", date: "2023-01-15", total: "$100" },
        { orderId: "1002", date: "2023-02-10", total: "$200" },
      ],
      points: 120,
      feedback: [{ rating: 4, comment: "Great service!" }],
    },
    // Thêm khách hàng khác...
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
        customer.key === editCustomer.key
          ? { ...customer, ...values }
          : customer
      )
    );
    handleCancel();
  };

  const handleDelete = (keyToDelete) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc chắn muốn xóa khách hàng này?",
      onOk() {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer, index) => index !== keyToDelete)
        );
        message.success("Đã xóa khách hàng thành công");
      },
    });
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
      title: "Địa Chỉ",
      dataIndex: "address",
    },
    {
      title: "Điểm tích luỹ",
      dataIndex: "points",
    },
    {
      // title: "Hành Động",
      title: <SettingOutlined />,
      key: "action",
      render: (_, record, index) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Sửa
            </Menu.Item>
            <Menu.Item
              key="view"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            >
              Xem
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(index)}
            >
              Xóa
            </Menu.Item>
          </Menu>
        );

        return (
          <Space size="middle">
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button
                type="ghost"
                style={{  paddingLeft: 0 }}
              >
                <MoreOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Quản Lý Khách Hàng</h1>
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
                address: editCustomer.address,
              }}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Tên Tài Khoản"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoản",
                      },
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
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số Điện Thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                      {
                        len: 10,
                        message: "Số điện thoại phải có đúng 10 chữ số",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      onInput={(e) => {
                        e.target.value = e.target.value.slice(0, 10);
                      }}
                    />
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
                  <Form.Item
                    label="Địa Chỉ"
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px", marginTop: "10px" }}
                >
                  <SaveOutlined />
                  Lưu
                </Button>
                {/* <Popconfirm
                  title="Bạn có chắc chắn muốn xóa khách hàng này không?"
                  onConfirm={handleDelete}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button
                    type="primary"
                    ghost
                    style={{
                      marginTop: "10px",
                      color: "white",
                      backgroundColor: "red",
                      border: "1px solid red",
                    }}
                  >
                    <DeleteOutlined />
                    Xóa
                  </Button>
                </Popconfirm> */}
              </Form.Item>
            </Form>
          </Modal>
        )}

        {selectedCustomer && (
          <Col span={24}>
            <Card title={`Thông tin chi tiết của ${selectedCustomer.fullName}`}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Hồ Sơ Khách Hàng" key="1">
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      margin: "-10px 0 10px 0",
                    }}
                  >
                    Thông Tin
                  </h3>

                  <Row gutter={16}>
                    <Col span={12}>
                      <p>
                        <strong>Họ và Tên:</strong> {selectedCustomer.fullName}
                      </p>
                      <p>
                        <strong>Ngày Sinh:</strong> {selectedCustomer.dob}
                      </p>
                      <p>
                        <strong>Số Điện Thoại:</strong> {selectedCustomer.phone}
                      </p>
                    </Col>
                    <Col span={12}>
                      <p>
                        <strong>Email:</strong> {selectedCustomer.email}
                      </p>
                      <p>
                        <strong>Địa Chỉ:</strong> {selectedCustomer.address}
                      </p>
                      <p>
                        <strong>Tích Điểm:</strong> {selectedCustomer.points}
                      </p>
                    </Col>
                  </Row>
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
  );
};

export default CustomerManagement;
