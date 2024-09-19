import React from "react";
import { Space, Table } from "antd";

const FishInfo = () => {
  const data = [
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
    // Thêm dữ liệu cá khác nếu cần
  ];

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
      <div style={{ padding: "24px", background: "#fff" }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default FishInfo;
