import React, { useState } from "react";
import { Space, Table, Button, Form, Input, Modal } from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
const FishInfo = () => {
  // State to manage fish data
  const [data, setData] = useState([
    {
      key: "1",
      name: "Cá Betta",
      origin: "Thái Lan",
      gender: "Đực",
      age: "1 năm",
      size: "5 cm",
      breed: "Betta splendens",
      temperament: "Hòa đồng",
      foodPerDay: "2 viên",
      screeningRate: "95%",
    },
    // Add more initial data if needed
  ]);

  // State to manage search query
  const [searchTerm, setSearchTerm] = useState("");

  // State to control modal visibility for adding fish
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form submission handler for adding new fish
  const onFinish = (values) => {
    const newFish = {
      key: (data.length + 1).toString(), // Generate a new key
      ...values, // Spread the form values
    };
    setData([...data, newFish]); // Update the data state with new fish
    setIsModalVisible(false); // Close the modal
  };

  // Filter data based on the search term
  const filteredData = data.filter((fish) =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Nguồn gốc xuất xứ",
      dataIndex: "origin",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
    },
    {
      title: "Giống",
      dataIndex: "breed",
    },
    {
      title: "Tính cách",
      dataIndex: "temperament",
    },
    {
      title: "Lượng thức ăn/ngày",
      dataIndex: "foodPerDay",
    },
    {
      title: "Tỉ lệ sàng lọc",
      dataIndex: "screeningRate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 style={{ fontSize: "20px" }}>Thông Tin Cá</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm cá theo tên"
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: "300px" }}
          onSearch={(value) => setSearchTerm(value)}
          allowClear
        />
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          style={{ marginLeft: "10px" }}
        >
          <AiOutlinePlusCircle />
          Thêm Cá
        </Button>
      </div>

      {/* Table to display fish data */}
      <div style={{ padding: "24px", background: "#fff" }}>
        <Table columns={columns} dataSource={filteredData} />
      </div>

      {/* Modal for adding new fish */}
      <Modal
        title="Thêm Cá Mới"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên cá" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nguồn gốc xuất xứ"
            name="origin"
            rules={[{ required: true, message: "Vui lòng nhập nguồn gốc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng nhập giới tính" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tuổi"
            name="age"
            rules={[{ required: true, message: "Vui lòng nhập tuổi cá" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kích thước"
            name="size"
            rules={[{ required: true, message: "Vui lòng nhập kích thước cá" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giống"
            name="breed"
            rules={[{ required: true, message: "Vui lòng nhập giống cá" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tính cách"
            name="temperament"
            rules={[{ required: true, message: "Vui lòng nhập tính cách cá" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lượng thức ăn/ngày"
            name="foodPerDay"
            rules={[
              { required: true, message: "Vui lòng nhập lượng thức ăn/ngày" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tỉ lệ sàng lọc"
            name="screeningRate"
            rules={[
              { required: true, message: "Vui lòng nhập tỉ lệ sàng lọc" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm Cá
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FishInfo;
