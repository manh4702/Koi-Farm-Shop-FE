import React, { useState } from "react";
import { Table, Button, Form, Input, Select, Modal, DatePicker } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment"; // Thêm moment để xử lý thời gian
import { MdOutlineSettings } from "react-icons/md"; // Import icon
const { Option } = Select;

const ConsignmentManagement = () => {
  const [consignments, setConsignments] = useState([
    {
      id: 1,
      name: "Kohaku",
      type: "Koi Nhật Bản",
      price: 1000000,
      owner: "Nguyen Van A",
      receivedDate: new Date("2023-12-10").toISOString(),
      returnDate: new Date("2024-01-10").toISOString(),
      purpose: "Cá gửi để bán",
    },
    {
      id: 2,
      name: "Shousui",
      type: "Koi Trung Quốc",
      price: 500000,
      owner: "Tran Van B",
      receivedDate: new Date("2023-12-15").toISOString(),
      returnDate: new Date("2024-01-15").toISOString(),
      purpose: "Cá gửi chăm sóc",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);

  // Hàm mở modal sửa dữ liệu
  const handleEdit = (record) => {
    setCurrentConsignment(record); // Lưu bản ghi hiện tại vào state
    setIsEditing(true); // Hiển thị modal
  };

  // Hàm xóa cá Koi
  const handleDelete = (id) => {
    const updatedConsignments = consignments.filter((item) => item.id !== id);
    setConsignments(updatedConsignments);
  };

  // Hàm submit khi nhấn "Cập nhật"
  const handleFormSubmit = (values) => {
    const receivedDate = values.receivedDate.toISOString();
    const returnDate = values.returnDate.toISOString();

    // Tạo đối tượng cập nhật với các giá trị đã thay đổi
    const updatedConsignment = {
      ...currentConsignment, // Giữ nguyên các giá trị cũ
      price: values.price, // Cập nhật giá mới
      receivedDate, // Cập nhật ngày nhập
      returnDate, // Cập nhật ngày trả
      purpose: values.purpose, // Cập nhật mục đích ký gửi
    };

    // Cập nhật lại danh sách
    const updatedConsignments = consignments.map((item) =>
      item.id === currentConsignment.id ? updatedConsignment : item
    );
    setConsignments(updatedConsignments);

    // Đóng modal
    setIsEditing(false);
  };

  const columns = [
    {
      title: "Tên cá Koi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "owner",
      key: "owner",
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
      render: (text) => `${text.toLocaleString()} VND`, // Hiển thị giá với định dạng tiền tệ
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
      title: "Mục đích ký gửi",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: <MdOutlineSettings />,
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
      <h1 style={{ fontSize: "20px" }}>Quản lý ký gửi</h1>
      <Table
        columns={columns}
        dataSource={consignments}
        loading={isLoading}
        pagination={{ pageSize: 20 }}
      />

      {/* Modal sửa cá Koi */}
      <Modal
        title="Sửa cá Koi"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form
          name="edit-consignment"
          onFinish={handleFormSubmit}
          initialValues={{
            price: currentConsignment?.price,
            receivedDate: currentConsignment
              ? moment(currentConsignment.receivedDate)
              : null,
            returnDate: currentConsignment
              ? moment(currentConsignment.returnDate)
              : null,
            purpose: currentConsignment?.purpose,
          }}
        >
          {/* Trường chỉnh sửa Giá */}
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input
              type="number"
              addonAfter="VND" // Thêm "VND" vào sau giá trị
            />
          </Form.Item>

          {/* Trường chỉnh sửa Ngày nhập */}
          <Form.Item
            name="receivedDate"
            label="Ngày nhập"
            rules={[{ required: true, message: "Vui lòng chọn ngày nhập!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          {/* Trường chỉnh sửa Ngày trả */}
          <Form.Item
            name="returnDate"
            label="Ngày trả"
            rules={[{ required: true, message: "Vui lòng chọn ngày trả!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          {/* Trường chỉnh sửa Mục đích ký gửi */}
          <Form.Item
            name="purpose"
            label="Mục đích ký gửi"
            rules={[{ required: true, message: "Vui lòng chọn mục đích!" }]}
          >
            <Select>
              <Option value="Cá gửi chăm sóc">Cá gửi chăm sóc</Option>
              <Option value="Cá gửi để bán">Cá gửi để bán</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConsignmentManagement;
