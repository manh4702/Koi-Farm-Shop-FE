import React, { useState } from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Modal,
  Upload,
  message,
} from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";

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
      image: "https://via.placeholder.com/50",
    },
    {
      key: "2",
      name: "Cá Koi Kohaku",
      origin: "Nhật Bản",
      gender: "Đực",
      age: "2 năm",
      size: "30 cm",
      breed: "Koi",
      temperament: "Hòa đồng",
      foodPerDay: "10 viên",
      screeningRate: "98%",
      image: "https://via.placeholder.com/50",
    },
    {
      key: "3",
      name: "Cá Koi Taisho Sanke",
      origin: "Nhật Bản",
      gender: "Cái",
      age: "3 năm",
      size: "40 cm",
      breed: "Koi",
      temperament: "Hiền lành",
      foodPerDay: "12 viên",
      screeningRate: "97%",
      image: "https://via.placeholder.com/50",
    },
    {
      key: "4",
      name: "Cá Koi Showa",
      origin: "Nhật Bản",
      gender: "Đực",
      age: "1.5 năm",
      size: "35 cm",
      breed: "Koi",
      temperament: "Hòa đồng",
      foodPerDay: "8 viên",
      screeningRate: "96%",
      image: "https://via.placeholder.com/50",
    },
    {
      key: "5",
      name: "Cá Koi Utsurimono",
      origin: "Nhật Bản",
      gender: "Cái",
      age: "2 năm",
      size: "32 cm",
      breed: "Koi",
      temperament: "Hòa đồng",
      foodPerDay: "9 viên",
      screeningRate: "94%",
      image: "https://via.placeholder.com/50",
    },
    // Thêm dữ liệu cá khác...
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editFish, setEditFish] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Xử lý khi nhấn nút "Thêm Cá"
  const onFinish = (values) => {
    if (editFish) {
      // Update fish
      const updatedFish = {
        ...editFish,
        ...values,
        image: imageUrl || editFish.image, // Sử dụng ảnh mới hoặc giữ ảnh cũ
      };
      setData((prevData) =>
        prevData.map((fish) => (fish.key === editFish.key ? updatedFish : fish))
      );
      message.success("Cập nhật cá thành công!");
    } else {
      // Add new fish
      const newFish = {
        key: (data.length + 1).toString(),
        image: imageUrl,
        ...values,
      };
      setData([...data, newFish]);
      message.success("Thêm cá mới thành công!");
    }
    setIsModalVisible(false); // Đóng modal sau khi thêm hoặc cập nhật
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredData = data.filter((fish) =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý xóa cá
  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((fish) => fish.key !== key));
    message.success("Xóa cá thành công!");
  };

  // Xử lý cập nhật cá
  const handleUpdate = (fish) => {
    setEditFish(fish);
    setImageUrl(fish.image); // Đặt URL hình ảnh của cá
    setIsModalVisible(true); // Hiển thị modal để chỉnh sửa
  };

  // Xử lý tải ảnh lên
  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  // Định nghĩa cột trong bảng
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image}
          alt="fish"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
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
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record)}>Cập nhật</a>
          <a onClick={() => handleDelete(record.key)}>Xóa</a>
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
          onClick={() => {
            setEditFish(null); // Reset trạng thái khi thêm mới
            setIsModalVisible(true);
          }}
          style={{ marginLeft: "10px" }}
        >
          <AiOutlinePlusCircle />
          Thêm Cá
        </Button>
      </div>

      {/* Bảng hiển thị thông tin cá */}
      <div style={{ padding: "24px", background: "#fff" }}>
        <Table columns={columns} dataSource={filteredData} />
      </div>

      {/* Modal thêm/cập nhật cá */}
      <Modal
        title={editFish ? "Cập Nhật Cá" : "Thêm Cá Mới"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={editFish ? editFish : {}}
        >
          <Form.Item
            label="Ảnh"
            name="image"
            rules={[{ required: !editFish, message: "Vui lòng thêm ảnh" }]}
          >
            <Upload
              name="image"
              listType="picture"
              showUploadList={false}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
            </Upload>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="uploaded fish"
                style={{
                  marginTop: "10px",
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            )}
          </Form.Item>
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
              {editFish ? "Cập Nhật" : "Thêm Cá"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FishInfo;
