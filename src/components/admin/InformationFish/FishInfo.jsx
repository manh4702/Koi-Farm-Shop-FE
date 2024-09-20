import React, { useState } from "react";
import {
  Space,
  Table,
  Button,
  Form,
  Input,
  Modal,
  message,
  Select,
  Row,
  Col,
} from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFish, setEditingFish] = useState(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // const newFish = {
    //   key: (data.length + 1).toString(),
    //   ...values,
    // };
    // setData([...data, newFish]);
    // setIsModalVisible(false);
    if (editingFish) {
      const updatedData = data.map((fish) =>
        fish.key === editingFish.key ? { ...fish, ...values } : fish
      );
      setData(updatedData);
      setEditingFish(null);
      message.success("Cập nhật thông tin cá thành công");
    } else {
      const newFish = {
        key: (data.length + 1).toString(),
        ...values,
      };
      setData([...data, newFish]);
      message.success("Tạo thông tin thành công");
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleEdit = (fish) => {
    setEditingFish(fish);
    form.setFieldsValue(fish);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc chắn muốn xoá thông tin cá này?",
      onOk() {
        setData(data.filter((fish) => fish.key !== key));
        message.success("Đã xóa");
      },
    });
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
          {/* <a>Update</a>
          <a>Delete</a> */}

          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          >
            Sửa
          </Button>
          <Button
            type="danger"
            // icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
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
        title={editingFish ? "Chỉnh sửa thông tin cá" : "Thêm cá mới"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingFish(null);
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
              <Form.Item style={{ textAlign: "right", marginTop: "54px" }}>
                <Button type="primary" htmlType="submit">
                  <SaveOutlined />
                  Lưu
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
