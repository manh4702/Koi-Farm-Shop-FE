import React, { useState } from "react";
import { Table, Button, Space, Menu, Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import UpdateConsignment from "./UpdateConsignment";
import AddConsignment from "./AddConsignmentModal";

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

  const [isAdding, setIsAdding] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentConsignment, setCurrentConsignment] = useState(null); 

  // Hàm mở modal sửa
  const handleEdit = (record) => {
    setCurrentConsignment(record);
    setIsEditing(true);
  };

  // Hàm mở modal thêm
  const handleAdd = () => {
    setIsAdding(true);
  };

  // Hàm xóa đơn ký gửi
  const handleDelete = (id) => {
    setConsignments(consignments.filter((item) => item.id !== id));
  };

  // Hàm cập nhật đơn ký gửi
  const handleUpdateSubmit = (values) => {
    const updatedConsignment = {
      ...currentConsignment,
      price: values.price,
      receivedDate: values.receivedDate.toISOString(),
      returnDate: values.returnDate.toISOString(),
      purpose: values.purpose,
    };

    setConsignments(
      consignments.map((item) =>
        item.id === currentConsignment.id ? updatedConsignment : item
      )
    );
    setIsEditing(false);
  };

  // Hàm thêm đơn ký gửi mới
  const handleAddSubmit = (values) => {
    const newConsignment = {
      id: consignments.length + 1,
      name: values.name,
      type: values.type,
      price: values.price,
      owner: values.owner,
      receivedDate: values.receivedDate.toISOString(),
      returnDate: values.returnDate.toISOString(),
      purpose: values.purpose,
    };

    setConsignments([...consignments, newConsignment]);
    setIsAdding(false);
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
      render: (text) => `${text.toLocaleString()} VND`,
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
      title: <SettingOutlined />,
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              Sửa
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
              Xóa
            </Menu.Item>
          </Menu>
        );

        return (
          <Space size="middle">
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button type="ghost" style={{ paddingLeft: 0 }}>
                <MoreOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>Quản lý ký gửi</h1>

      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16, float: "right" }}>
        Thêm đơn ký gửi
      </Button>

      <Table columns={columns} dataSource={consignments} pagination={{ pageSize: 20 }} />

      {/* Modal thêm đơn ký gửi */}
      <AddConsignment
        visible={isAdding}
        onCancel={() => setIsAdding(false)}
        onSubmit={handleAddSubmit}
      />

      {/* Modal sửa đơn ký gửi */}
      <UpdateConsignment
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onSubmit={handleUpdateSubmit}
        consignment={currentConsignment}
      />
    </div>
  );
};

export default ConsignmentManagement;
