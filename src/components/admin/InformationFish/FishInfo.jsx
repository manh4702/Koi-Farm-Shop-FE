import React, { useState } from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Modal,
  message,
  Row,
  Col,
  Select,
  Menu,
  Dropdown,
} from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const FishInfo = () => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "Cá Koi Kohaku",
      origin: "Nhật Bản",
      gender: "Đực",
      age: "2 năm",
      size: "30 cm",
      breed: "Kohaku",
      foodPerDay: "10 gram",
      screeningRate: "95%",
      image:
        "https://www.bing.com/th?id=OIP.Ya3VaVVCB_Y_3Y-5KTaKTwHaGR&w=189&h=150&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2", // Hình ảnh đại diện
    },
    {
      key: "2",
      name: "Cá Koi Taisho Sanke",
      origin: "Nhật Bản",
      gender: "Cái",
      age: "3 năm",
      size: "40 cm",
      breed: "Taisho Sanke",
      foodPerDay: "12 gram",
      screeningRate: "92%",
      image:
        "https://th.bing.com/th/id/OIP.vtcssOYbyaiGOuVEhsGP4wHaGT?w=203&h=180&c=7&r=0&o=5&pid=1.7", // Hình ảnh đại diện
    },
    {
      key: "3",
      name: "Cá Koi Showa",
      origin: "Nhật Bản",
      gender: "Đực",
      age: "1.5 năm",
      size: "35 cm",
      breed: "Showa",
      foodPerDay: "15 gram",
      screeningRate: "94%",
      image:
        "https://www.bing.com/th?id=OIP.cpWRibJrzkJ3cCgFQza5FAHaNk&w=120&h=185&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2", // Hình ảnh đại diện
    },
    {
      key: "4",
      name: "Cá Koi Asagi",
      origin: "Nhật Bản",
      gender: "Cái",
      age: "4 năm",
      size: "45 cm",
      breed: "Asagi",
      foodPerDay: "18 gram",
      screeningRate: "96%",
      image:
        "https://th.bing.com/th/id/OIP.lMX80zGUNsx9E1jOlIaNGgHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7", // Hình ảnh đại diện
    },
    {
      key: "5",
      name: "Cá Koi Shusui",
      origin: "Nhật Bản",
      gender: "Đực",
      age: "2.5 năm",
      size: "50 cm",
      breed: "Shusui",
      foodPerDay: "20 gram",
      screeningRate: "90%",
      image:
        "https://th.bing.com/th/id/OIP.eBk5_laeQXvAe-rVaOGe2AHaE7?w=267&h=180&c=7&r=0&o=5&pid=1.7", // Hình ảnh đại diện
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewFish, setViewFish] = useState(null); // State cho modal "Xem chi tiết"
  const [editFish, setEditFish] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (editFish) {
      const updatedFish = {
        ...editFish,
        ...values,
        image: imageUrl || editFish.image,
      };
      setData(
        data.map((fish) => (fish.key === editFish.key ? updatedFish : fish))
      );
      message.success("Cập nhật cá thành công!");
    } else {
      const newFish = {
        key: (data.length + 1).toString(),
        image: imageUrl,
        ...values,
      };
      setData([...data, newFish]);
      message.success("Thêm cá mới thành công!");
    }
    form.resetFields();
    setImageUrl("");
    setIsModalVisible(false);
  };

  const handleDelete = (keyToDelete) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc chắn muốn xoá thông tin cá này?",
      onOk() {
        setData((prevData) =>
          prevData.filter((fish, index) => index !== keyToDelete)
        );
        message.success("Đã xóa thành công!");
      },
    });
  };

  const handleUpdate = (fish) => {
    setEditFish(fish);
    form.setFieldsValue(fish);
    setImageUrl(fish.image);
    setIsModalVisible(true);
  };

  // Hàm để mở modal "Xem chi tiết"
  const handleViewDetails = (fish) => {
    setViewFish(fish);
  };

  // Hàm tìm kiếm theo nhiều trường
  const filteredData = data.filter((fish) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      fish.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      fish.origin.toLowerCase().includes(lowerCaseSearchTerm) ||
      fish.gender.toLowerCase().includes(lowerCaseSearchTerm) ||
      fish.age.toLowerCase().includes(lowerCaseSearchTerm) ||
      fish.size.toLowerCase().includes(lowerCaseSearchTerm) ||
      fish.breed.toLowerCase().includes(lowerCaseSearchTerm) ||
      fish.foodPerDay.toLowerCase().includes(lowerCaseSearchTerm) ||
      fish.screeningRate.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

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
      title: "Nguồn gốc",
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
      title: "Lượng thức ăn/ngày",
      dataIndex: "foodPerDay",
    },
    {
      title: "Tỉ lệ sàng lọc",
      dataIndex: "screeningRate",
    },
    {
      title: <SettingOutlined />,
      key: "action",
      render: (_, record, index) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="view"
              onClick={() => handleViewDetails(record)} // Mở modal "Xem chi tiết"
            >
              Xem chi tiết
            </Menu.Item>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => handleUpdate(record)} // Chú ý sử dụng handleUpdate ở đây
            >
              Sửa
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
          placeholder="Tìm kiếm"
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: "300px" }}
          onSearch={(value) => setSearchTerm(value)}
          allowClear
        />
        <Button
          type="primary"
          onClick={() => {
            setEditFish(null);
            setIsModalVisible(true);
          }}
          style={{ marginLeft: "10px" }}
        >
          <AiOutlinePlusCircle />
          Thêm Cá
        </Button>
      </div>
      <div style={{ padding: "24px", background: "#fff" }}>
        <Table columns={columns} dataSource={filteredData} />
      </div>

      {/* Modal "Xem chi tiết" */}
      <Modal
        title="Thông tin chi tiết cá"
        visible={!!viewFish}
        footer={null}
        onCancel={() => setViewFish(null)}
      >
        {viewFish && (
          <>
            <img
              src={viewFish.image}
              alt={viewFish.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />
            <p>
              <strong>Tên:</strong> {viewFish.name}
            </p>
            <p>
              <strong>Nguồn gốc xuất xứ:</strong> {viewFish.origin}
            </p>
            <p>
              <strong>Giới tính:</strong> {viewFish.gender}
            </p>
            <p>
              <strong>Tuổi:</strong> {viewFish.age}
            </p>
            <p>
              <strong>Kích thước:</strong> {viewFish.size}
            </p>
            <p>
              <strong>Giống:</strong> {viewFish.breed}
            </p>
            <p>
              <strong>Lượng thức ăn/ngày (gram):</strong> {viewFish.foodPerDay}
            </p>
            <p>
              <strong>Tỉ lệ sàng lọc:</strong> {viewFish.screeningRate}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default FishInfo;
