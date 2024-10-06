import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tabs,
  Rate,
  Space,
  Col,
  Row,
  Card,
  Popconfirm,
  message,
  Dropdown,
  Menu,
  Select,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  DownOutlined,
  MoreOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const FishInfo = () => {
  const [fishes, setFishes] = useState([
    
    {
      key: "1",
      name: "Cá Koi Kohaku",
      origin: "Nhật Bản",
      gender: "Đực",
      age: 2.0,
      size: "30",
      breed: "Kohaku",
      foodQuantity: "10",
      screeningRate: "95%",
      image:
        "https://www.bing.com/th?id=OIP.Ya3VaVVCB_Y_3Y-5KTaKTwHaGR&w=189&h=150&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2", // Hình ảnh đại diện
    },
    {
      key: "2",
      name: "Cá Koi Taisho Sanke",
      origin: "Nhật Bản",
      gender: "Cái",
      age: 3.0,
      size: "40",
      breed: "Taisho Sanke",
      foodQuantity: "12",
      screeningRate: "92%",
      image:
        "https://th.bing.com/th/id/OIP.vtcssOYbyaiGOuVEhsGP4wHaGT?w=203&h=180&c=7&r=0&o=5&pid=1.7", // Hình ảnh đại diện
    },
    {
      key: "3",
      name: "Cá Koi Showa",
      origin: "Nhật Bản",
      gender: "Đực",
      age: 1.5,
      size: "35",
      breed: "Showa",
      foodQuantity: "15",
      screeningRate: "94%",
      image:
        "https://www.bing.com/th?id=OIP.cpWRibJrzkJ3cCgFQza5FAHaNk&w=120&h=185&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2", // Hình ảnh đại diện
    },
    {
      key: "4",
      name: "Cá Koi Asagi",
      origin: "Nhật Bản",
      gender: "Cái",
      age: 4.0,
      size: "45",
      breed: "Asagi",
      foodQuantity: "18",
      screeningRate: "96%",
      image:
        "https://th.bing.com/th/id/OIP.lMX80zGUNsx9E1jOlIaNGgHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7", // Hình ảnh đại diện
    },
    {
      key: "5",
      name: "Cá Koi Shusui",
      origin: "Nhật Bản",
      gender: "Đực",
      age: 2.5,
      size: "50",
      breed: "Shusui",
      foodQuantity: "20",
      screeningRate: "90%",
      image:
        "https://th.bing.com/th/id/OIP.eBk5_laeQXvAe-rVaOGe2AHaE7?w=267&h=180&c=7&r=0&o=5&pid=1.7",
    },
    // Add more fish...
  ]);

  const [selectedFish, setSelectedFish] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editFish, setEditFish] = useState(null);
  const [addFish, setAddFish] = useState(null);

  const handleView = (fish) => {
    setSelectedFish(fish);
  };

  const handleEdit = (fish) => {
    setEditFish(fish);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setAddFish({
      key: (fishes.length + 1).toString(),
      name: "",
      origin: "",
      gender: "",
      age: "",
      size: "",
      breed: "",
      foodQuantity: "",
      screeningRate: "",
      image: "",
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditFish(null);
    setAddFish(null);
  };

  const onFinish = (values) => {
    if (editFish) {
      setFishes((prev) =>
        prev.map((fish) =>
          fish.key === editFish.key
            ? { ...fish, ...values, age: parseFloat(values.age), size: `${values.size}` }
            : fish
        )
      );
    } else if (addFish) {
      setFishes((prev) => [...prev, { ...values, key: (prev.length + 1).toString() }]);
    }
    handleCancel();
  };

  const handleDelete = (keyToDelete) => {
    Modal.confirm({
      title: "Xác nhận Xóa",
      content: "Bạn có chắc chắn muốn xóa cá này không?",
      onOk() {
        setFishes((prevFishes) =>
          prevFishes.filter((fish, index) => index !== keyToDelete)
        );
        message.success("Cá đã được xóa thành công");
      },
    });
  };
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image) => <img src={image} alt="fish" style={{ width: '50px', height: '50px' }} />,
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
      title: "Tuổi (năm)",
      dataIndex: "age",
    },
    {
      title: "Kích thước (cm)",
      dataIndex: "size",
    },
    {
      title: "Giống",
      dataIndex: "breed",
    },
    {
      title: "Lượng thức ăn/ngày (gram)",
      dataIndex: "foodQuantity",
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
              onClick={() => handleEdit(record)}
            >
              Sửa
            </Menu.Item>
            <Menu.Item
              key="view"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            >
              Xem
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
              <Button
                type="ghost"
                style={{  paddingLeft: 0 }}
              >
                <MoreOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Thông tin Cá</h1>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm mới cá
            </Button>
          </div>
          <div style={{ maxHeight: "400px" }}>
            <Table
              columns={columns}
              dataSource={fishes}
              pagination={false}
              scroll={{ y: 325 }}
            />
          </div>
        </Col>

        {(editFish || addFish) && (
          <Modal
            title={editFish ? "Sửa Thông tin Cá" : "Thêm mới Cá"}
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              layout="vertical"
              initialValues={{
                name: editFish ? editFish.name : "",
                origin: editFish ? editFish.origin : "",
                gender: editFish ? editFish.gender : "",
                age: editFish ? editFish.age : "",
                size: editFish ? editFish.size : "",
                breed: editFish ? editFish.breed : "",
                foodQuantity: editFish ? editFish.foodQuantity : "",
                screeningRate: editFish ? editFish.screeningRate : "",
                image: editFish ? editFish.image : "",
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Link ảnh cá"
                name="image"
                rules={[
                  { required: true, message: "Vui lòng nhập link ảnh cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Tên"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên cá",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Nguồn gốc"
                    name="origin"
                    rules={[
                      { required: true, message: "Vui lòng nhập nguồn gốc của cá" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Nhật Bản">Nhật Bản</Select.Option>
                      <Select.Option value="Việt Nam">Việt Nam</Select.Option>
                      <Select.Option value="Trung Quốc">Trung Quốc</Select.Option>
                      
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                      { required: true, message: "Vui lòng nhập giới tính của cá" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Đực">Đực</Select.Option>
                      <Select.Option value="Cái">Cái</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Tuổi (năm)"
                    name="age"
                  rules={[
                    { required: true, message: "Vui lòng nhập tuổi của cá" },
                    { type: "number", message: "Vui lòng nhập số" },
                  ]}
                  >
                    <InputNumber min={0} placeholder="Tuổi của cá" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Kích thước (cm)"
                    name="size"
                  rules={[
                    { required: true, message: "Vui lòng nhập kích thước của cá" },
                    { type: "string", pattern: /^\d+$/, message: "Vui lòng nhập số" },
                  ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Giống"
                    name="breed"
                    rules={[
                      { required: true, message: "Vui lòng nhập giống của cá" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Kohaku">Kohaku</Select.Option>
                      <Select.Option value="Taisho Sanke">Taisho Sanke</Select.Option>
                      <Select.Option value="Showa">Showa</Select.Option>
                      <Select.Option value="Asagi">Asagi</Select.Option>
                      <Select.Option value="Shusui">Shusui</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Lượng thức ăn/ngày (gram)"
                    name="foodQuantity"
                    rules={[
                      { required: true, message: "Vui lòng nhập lượng thức ăn của cá" },
                      { type: "string", pattern: /^\d+$/, message: "Vui lòng nhập số" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Tỉ lệ sàng lọc"
                    name="screeningRate"
                    rules={[
                      { required: true, message: "Vui lòng nhập tỉ lệ sàng lọc của cá" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px", marginTop: "10px" }}
                >
                  <SaveOutlined />
                  {editFish ? "Lưu" : "Thêm mới"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}

        {selectedFish && (
          <Col span={24}>
            <Card title={`Chi tiết của ${selectedFish.name}`}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Thông tin Cá" key="1">
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      margin: "-10px 0 10px 0",
                    }}
                  >
                    Thông tin
                  </h3>
                  <Row gutter={16} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                      <img src={selectedFish.image} alt="fish" style={{ width: '20%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                    </Col>
                    <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Tên:</strong> {selectedFish.name}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Nguồn gốc:</strong> {selectedFish.origin}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Giới tính:</strong> {selectedFish.gender}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Tuổi (năm):</strong> {selectedFish.age}
                      </p>
                    </Col>
                    <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Kích thước (cm):</strong> {selectedFish.size}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Giống:</strong> {selectedFish.breed}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Lượng thức ăn/ngày (gram):</strong> {selectedFish.foodQuantity}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Tỉ lệ sàng lọc:</strong> {selectedFish.screeningRate}
                      </p>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FishInfo;
