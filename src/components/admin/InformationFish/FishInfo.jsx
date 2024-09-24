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
  UploadOutlined,
} from "@ant-design/icons";

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
    // Thêm các mẫu dữ liệu khác...
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
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
        setData((prevData) => prevData.filter((fish, index) => index !== keyToDelete));
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

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

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
      title: <SettingOutlined />,
      key: "action",
      render: (_, record, index) => {
        const menu = (
          <Menu>
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
        <Table
          columns={columns}
          dataSource={data.filter((fish) =>
            fish.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
        />
      </div>
      <Modal
        title={editFish ? "Chỉnh sửa thông tin cá" : "Thêm cá mới"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditFish(null);
          setImageUrl("");
        }}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
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
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select>
                  <Select.Option value="Male">Đực</Select.Option>
                  <Select.Option value="Female">Cái</Select.Option>
                </Select>
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
                rules={[
                  { required: true, message: "Vui lòng nhập kích thước cá" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                rules={[
                  { required: true, message: "Vui lòng nhập tính cách cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Lượng thức ăn/ngày"
                name="foodPerDay"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lượng thức ăn/ngày",
                  },
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
              <Form.Item
                label="Ảnh"
                name="image"
                rules={[{ required: !editFish, message: "Vui lòng thêm ảnh" }]}
              >
                <Upload
                  name="image"
                  listType="picture"
                  showUploadList={false}
                  beforeUpload={() => false}
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
              <Form.Item style={{ textAlign: "right", marginTop: "54px" }}>
                <Button type="primary" htmlType="submit">
                  <SaveOutlined />
                  {editFish ? "Cập Nhật" : "Thêm Cá"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default FishInfo;
