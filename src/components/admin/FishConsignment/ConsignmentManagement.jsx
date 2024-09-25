import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  Input,
  Select,
  Modal,
  message,
  DatePicker,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const ConsignmentManagement = () => {
  const [consignments, setConsignments] = useState([
    {
      id: 1,
      name: "Kohaku",
      type: "Koi Nhật Bản",
      price: 1000000,
      receivedDate: new Date("2023-12-10").toISOString(),
      returnDate: new Date("2024-01-10").toISOString(),
      status: "Chờ duyệt",
    },
    {
      id: 2,
      name: "Shousui",
      type: "Koi Trung Quốc",
      price: 500000,
      receivedDate: new Date("2023-12-15").toISOString(),
      returnDate: new Date("2024-01-15").toISOString(),
      status: "Chấp nhận",
    },
    // ... thêm data fake khác
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);

  // Hàm thêm cá Koi
  const handleAdd = () => {
    setIsAdding(true);
  };

  // Hàm cập nhật cá Koi
  const handleEdit = (record) => {
    setCurrentConsignment(record);
    setIsEditing(true);
  };

  // Hàm xóa cá Koi
  const handleDelete = (id) => {
    const updatedConsignments = consignments.filter((item) => item.id !== id);
    setConsignments(updatedConsignments);
  };

  // Form thêm/sửa cá Koi
  const handleFormSubmit = (values) => {
    // ... (lấy giá trị của form values)

    // Chuyển đổi ngày nhập và ngày trả sang Date
    const receivedDate = new Date(values.receivedDate);
    const returnDate = new Date(values.returnDate);

    // Tạo đối tượng cá Koi mới
    const newConsignment = {
      id: isEditing ? currentConsignment.id : Date.now(), // Sử dụng Date.now() để tạo ID tạm thời
      name: values.name,
      type: values.type,
      price: values.price,
      receivedDate: receivedDate.toISOString(),
      returnDate: returnDate.toISOString(),
      status: isEditing ? currentConsignment.status : "Chờ duyệt", // Giả định trạng thái mới là 'Chờ duyệt'
    };

    // Thêm hoặc cập nhật data fake
    if (isEditing) {
      // Cập nhật data fake
      const updatedConsignments = consignments.map((item) =>
        item.id === currentConsignment.id ? newConsignment : item
      );
      setConsignments(updatedConsignments);
    } else {
      // Thêm data fake
      setConsignments([...consignments, newConsignment]);
    }

    // Đóng modal
    setIsEditing(false);
    setIsAdding(false);
  };

  const columns = [
    {
      title: "Tên cá Koi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại cá",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày nhập",
      dataIndex: "receivedDate",
      key: "receivedDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : ""),
    },
    {
      title: "Ngày trả",
      dataIndex: "returnDate",
      key: "returnDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý Ký gửi</h1>
      <Button type="primary" onClick={handleAdd}>
        Thêm cá Koi
      </Button>
      <Table
        columns={columns}
        dataSource={consignments}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
      {/* Modal thêm/sửa cá Koi */}
      <Modal
        title={isEditing ? "Sửa cá Koi" : "Thêm cá Koi"}
        visible={isAdding || isEditing}
        onCancel={() => {
          setIsAdding(false);
          setIsEditing(false);
        }}
        footer={null}
      >
        <Form
          name="consignment-form"
          onFinish={handleFormSubmit}
          initialValues={isEditing ? currentConsignment : {}}
        >
          <Form.Item
            name="name"
            label="Tên cá Koi"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại cá" rules={[{ required: true }]}>
            <Select>
              <Option value="Koi Nhật Bản">Koi Nhật Bản</Option>
              <Option value="Koi Trung Quốc">Koi Trung Quốc</Option>
              <Option value="Koi Việt Nam">Koi Việt Nam</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="receivedDate"
            label="Ngày nhập"
            rules={[{ required: true }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="returnDate"
            label="Ngày trả"
            rules={[{ required: true }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Lưu" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConsignmentManagement;
