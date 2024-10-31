import React, {useEffect, useState} from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tabs,
  Space,
  Col,
  Row,
  Card,
  message,
  Dropdown,
  Menu,
  Select,
  InputNumber,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  MoreOutlined,
  SettingOutlined,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

const {TabPane} = Tabs;

const FishInfo = (categoryId) => {
  const [fishes, setFishes] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editFish, setEditFish] = useState(null);
  const [addFish, setAddFish] = useState(null);

  useEffect(() => {
    if (categoryId) {
      // Sử dụng dữ liệu giả thay vì fetch từ server
      setFishes(mockFishes);
    }
  }, [categoryId]);
  
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
      description: "",
      secondaryImages: [],
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditFish(null);
    setAddFish(null);
  };

  const onFinish = (values) => {
    const newFish = {
      ...values,
      key: editFish ? editFish.key : (fishes.length + 1).toString(),
      secondaryImages: values.secondaryImages || [],
    };
    if (editFish) {
      setFishes((prev) =>
        prev.map((fish) => (fish.key === editFish.key ? newFish : fish))
      );
    } else {
      setFishes((prev) => [...prev, newFish]);
    }
    handleCancel();
    message.success(editFish ? "Cập nhật cá thành công!" : "Thêm mới cá thành công!");
  };

  const handleDelete = (keyToDelete) => {
    setFishes((prevFishes) => prevFishes.filter((fish) => fish.key !== keyToDelete));
    message.success("Cá đã được xóa thành công");
  };

  const columns = [
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
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        return status === "AVAILABLE" ? "Có sẵn" : "Đã bán";
      },
    },
    {
      title: <SettingOutlined/>,
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined/>}
              onClick={() => handleEdit(record)}
            >
              Sửa
            </Menu.Item>
            <Menu.Item
              key="view"
              icon={<EyeOutlined/>}
              onClick={() => handleView(record)}
            >
              Xem
            </Menu.Item>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined/>}
              onClick={() => handleDelete(record.fishPackageId)}
            >
              Xóa
            </Menu.Item>
          </Menu>
        );

        return (
          <Space size="middle">
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button type="ghost" style={{paddingLeft: 0}}>
                <MoreOutlined/>
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{padding: "24px", background: "#fff"}}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Thông tin Cá</h1>
          <div style={{display: "flex", justifyContent: "flex-end", marginBottom: "10px"}}>
            <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
              Thêm mới cá
            </Button>
          </div>
          <Table columns={columns} dataSource={fishes} pagination={false} scroll={{y: 325}}/>
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
              initialValues={editFish || addFish}
              onFinish={onFinish}
            >
              <Form.Item
                label="Thêm ảnh cá chính"
                name="image"
                rules={[{required: true, message: "Vui lòng thêm ảnh chính của cá"}]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={({fileList}) => {
                    const image = fileList[0]?.thumbUrl || "";
                    editFish ? setEditFish({...editFish, image}) : setAddFish({...addFish, image});
                  }}
                >
                  <PlusSquareOutlined/> Upload
                </Upload>
                <Input placeholder="Hoặc nhập URL ảnh"/>
              </Form.Item>

              <Form.Item label="Thêm ảnh phụ (không bắt buộc)" name="secondaryImages">
                <Upload
                  listType="picture-card"
                  multiple
                  beforeUpload={() => false}
                  onChange={({fileList}) => {
                    const secondaryImages = fileList.map((file) => file.thumbUrl);
                    editFish ? setEditFish({...editFish, secondaryImages}) : setAddFish({...addFish, secondaryImages});
                  }}
                >
                  <PlusSquareOutlined/> Upload
                </Upload>
                <Input placeholder="Hoặc nhập URL các ảnh phụ, phân cách bằng dấu phẩy"/>
              </Form.Item>

              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{required: true, message: "Vui lòng nhập mô tả về cá"}]}
              >
                <Input.TextArea rows={3} placeholder="Nhập mô tả về cá"/>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tên" name="name" rules={[{required: true, message: "Vui lòng nhập tên cá"}]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Nguồn gốc" name="origin"
                             rules={[{required: true, message: "Vui lòng nhập nguồn gốc của cá"}]}>
                    <Select>
                      <Select.Option value="Nhật Bản">Nhật Bản</Select.Option>
                      <Select.Option value="Việt Nam">Việt Nam</Select.Option>
                      <Select.Option value="Trung Quốc">Trung Quốc</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Giới tính" name="gender"
                             rules={[{required: true, message: "Vui lòng nhập giới tính của cá"}]}>
                    <Select>
                      <Select.Option value="Đực">Đực</Select.Option>
                      <Select.Option value="Cái">Cái</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Tuổi (năm)" name="age"
                             rules={[{required: true, message: "Vui lòng nhập tuổi của cá"}]}>
                    <InputNumber min={0}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Kích thước (cm)" name="size"
                             rules={[{required: true, message: "Vui lòng nhập kích thước của cá"}]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Giống" name="breed"
                             rules={[{required: true, message: "Vui lòng nhập giống của cá"}]}>
                    <Select>
                      <Select.Option value="Kohaku">Kohaku</Select.Option>
                      <Select.Option value="Taisho Sanke">Taisho Sanke</Select.Option>
                      <Select.Option value="Showa">Showa</Select.Option>
                      <Select.Option value="Asagi">Asagi</Select.Option>
                      <Select.Option value="Shusui">Shusui</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Lượng thức ăn/ngày (gram)" name="foodQuantity"
                             rules={[{required: true, message: "Vui lòng nhập lượng thức ăn của cá"}]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Tỉ lệ sàng lọc" name="screeningRate"
                             rules={[{required: true, message: "Vui lòng nhập tỉ lệ sàng lọc của cá"}]}>
                    <Input/>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{textAlign: "right"}}>
                <Button type="primary" htmlType="submit">
                  <SaveOutlined/> {editFish ? "Lưu" : "Thêm mới"}
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
                  <Row gutter={16}>
                    <Col span={24}>
                      <img src={selectedFish.image} alt="fish"
                           style={{width: "20%", height: "auto", marginBottom: "20px"}}/>
                    </Col>
                    <Col span={12}>
                      <p><strong>Tên:</strong> {selectedFish.name}</p>
                      <p><strong>Nguồn gốc:</strong> {selectedFish.origin}</p>
                      <p><strong>Giới tính:</strong> {selectedFish.gender}</p>
                      <p><strong>Tuổi (năm):</strong> {selectedFish.age}</p>
                    </Col>
                    <Col span={12}>
                      <p><strong>Kích thước (cm):</strong> {selectedFish.size}</p>
                      <p><strong>Giống:</strong> {selectedFish.breed}</p>
                      <p><strong>Lượng thức ăn/ngày (gram):</strong> {selectedFish.foodQuantity}</p>
                      <p><strong>Tỉ lệ sàng lọc:</strong> {selectedFish.screeningRate}</p>
                    </Col>
                    <Col span={24}>
                      <p><strong>Mô tả:</strong> {selectedFish.description}</p>
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
