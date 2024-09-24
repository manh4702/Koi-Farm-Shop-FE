import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";

const StaffManagement = () => {
  // State to manage staff data
  const [staff, setStaff] = useState([
    {
      key: "1",
      username: "alice_smith",
      fullName: "Alice Smith",
      phone: "0123456789",
      email: "alice@example.com",
    },
    {
      key: "2",
      username: "bob_johnson",
      fullName: "Bob Johnson",
      phone: "9876543210",
      email: "bob@example.com",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleEdit = (staffMember) => {
    setSelectedStaff(staffMember);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setStaff(staff.filter((member) => member.key !== key));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedStaff(null);
  };

  const onFinish = (values) => {
    if (selectedStaff) {
      // Update existing staff
      setStaff((prev) =>
        prev.map((member) =>
          member.key === selectedStaff.key ? { ...member, ...values } : member
        )
      );
    } else {
      // Add new staff
      setStaff((prev) => [
        ...prev,
        { key: (prev.length + 1).toString(), ...values },
      ]);
    }
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
          <Button onClick={() => handleDelete(record.key)} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <h1>Quản Lý Nhân Viên</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div></div> {/* Empty div for alignment */}
        <Button
          type="primary"
          onClick={() => {
            setSelectedStaff(null);
            setIsModalVisible(true);
          }}
        >
          Thêm Nhân Viên
        </Button>
      </div>
      <Table columns={columns} dataSource={staff} />

      <Modal
        title={selectedStaff ? "Chỉnh Sửa Nhân Viên" : "Thêm Nhân Viên"}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          initialValues={{
            username: selectedStaff ? selectedStaff.username : "",
            fullName: selectedStaff ? selectedStaff.fullName : "",
            phone: selectedStaff ? selectedStaff.phone : "",
            email: selectedStaff ? selectedStaff.email : "",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên Tài Khoản"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}
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
            label="Số Điện Thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
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
              {selectedStaff ? "Cập Nhật" : "Thêm Nhân Viên"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffManagement;
