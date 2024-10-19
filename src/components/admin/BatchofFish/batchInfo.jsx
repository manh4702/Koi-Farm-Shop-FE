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

const BatchInfo = () => {
  const [batches, setBatches] = useState([
    {
      key: "1",
      name: "Lô Koi Sanke & Showa",
      description:
        "Bộ sưu tập 5 con cá Koi gồm 3 Sanke và 2 Showa, đều sinh năm 2021. Lý tưởng cho việc bắt đầu một hồ Koi đa dạng.",
      price: "3,500,000 VND",
      image:
        "https://th.bing.com/th/id/OIP.9wxu3jj4OLWUS8AfTCpPwQHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7",
      year: 2021,
      origin: "Nhật Bản",
      seller: "On Koi Farm",
      age: 2, // Tuổi (năm)
      foodPerDay: 100, // Lượng thức ăn/ngày (gram)
      quantity: 5,
      fishes: [
        { name: "Sanke", quantity: 3 },
        { name: "Showa", quantity: 2 },
      ],
      video: "https://www.youtube.com/watch?v=showa_video_link",
    },
    {
      key: "2",
      name: "Lô cá Gosanke Premium",
      description:
        "Bộ 3 cá Koi cao cấp gồm Kohaku, Sanke, và Showa, sinh năm 2020. Đây là bộ sưu tập hoàn hảo cho những người yêu thích Gosanke.",
      price: "5,000,000 VND",
      image:
        "https://cdn11.bigcommerce.com/s-upcqwyrrdy/images/stencil/1280x1280/products/12349/31213/japanese-premium-gosanke-8-10inch-koi-4pack-1000__59378.1680885854.jpg?c=1",
      year: 2019,
      origin: "Nhật Bản",
      seller: "On Koi Farm",
      age: 2, // Tuổi (năm)
      foodPerDay: 100, // Lượng thức ăn/ngày (gram)
      quantity: 3,
      fishes: [
        { name: "Kohaku", quantity: 1 },
        { name: "Sanke", quantity: 1 },
        { name: "Showa", quantity: 1 },
      ],
      video: "https://www.youtube.com/watch?v=gosanke_premium_video_link",
    },
    {
      key: "3",
      name: "Lô Koi Butterfly",
      description:
        "Bộ sưu tập 4 con cá Koi Butterfly đẹp mắt, sinh năm 2022. Bao gồm các giống Koi có vây dài và đuôi bướm đặc trưng.",
      price: "2,800,000 VND",
      image:
        "https://cdn11.bigcommerce.com/s-kkon4imfg5/images/stencil/1280x1280/products/405/667/KOI_BUTTERFLY_6_-8___59746.1522374966.jpg?c=2",
      year: 2019,
      origin: "Nhật Bản",
      seller: "On Koi Farm",
      age: 2, // Tuổi (năm)
      foodPerDay: 150, // Lượng thức ăn/ngày (gram)
      quantity: 4,
      fishes: [
        { name: "Butterfly Kohaku", quantity: 1 },
        { name: "Butterfly Showa", quantity: 1 },
        { name: "Butterfly Sanke", quantity: 1 },
        { name: "Butterfly Goshiki", quantity: 1 },
      ],
      video: "https://www.youtube.com/watch?v=butterfly_video_link",
    },
    {
      key: "4",
      name: "Lô cá Koi Premium",
      description:
        "Bộ 3 cá Koi cao cấp gồm Kohaku, Sanke, và Showa, sinh năm 2021. Đây là bộ sưu tập hoàn hảo cho những người yêu thích Koi.",
      price: "3,000,000 VND",
      image:
        "data:image/webp;base64,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",
      year: 2021,
      origin: "Nhật Bản",
      seller: "On Koi Farm",
      age: 1, // Tuổi (năm)
      foodPerDay: 120, // Lượng thức ăn/ngày (gram)
      quantity: 3,
      fishes: [
        { name: "Kohaku", quantity: 1 },
        { name: "Sanke", quantity: 1 },
        { name: "Showa", quantity: 1 },
      ],
      video: "https://www.youtube.com/watch?v=koi_premium_video_link",
    },
    {
      key: "5",
      name: "Lô cá Koi Standard",
      description:
        "Bộ 3 cá Koi tiêu chuẩn gồm Kohaku, Sanke, và Showa, sinh năm 2022. Đây là bộ sưu tập phổ biến cho những người mới bắt đầu.",
      price: "1,500,000 VND",
      image:
        "data:image/jpeg;base64,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",
      year: 2022,
      origin: "Nhật Bản",
      seller: "On Koi Farm",
      age: 0, // Tuổi (năm)
      foodPerDay: 80, // Lượng thức ăn/ngày (gram)
      quantity: 3,
      fishes: [
        { name: "Kohaku", quantity: 1 },
        { name: "Sanke", quantity: 1 },
        { name: "Showa", quantity: 1 },
      ],
      video: "https://www.youtube.com/watch?v=koi_standard_video_link",
    },
  ]);

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editBatch, setEditBatch] = useState(null);
  const [addBatch, setAddBatch] = useState(null);

  const handleView = (batch) => {
    setSelectedBatch(batch);
  };

  const handleEdit = (batch) => {
    setEditBatch(batch);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setAddBatch({
      key: (batches.length + 1).toString(),
      name: "",
      description: "",
      price: "",
      image: "",
      year: 2022,
      origin: "Nhật Bản",
      seller: "On Koi Farm",
      age: 2,
      foodPerDay: 100,
      quantity: 1,
      fishes: [],
      video: "",
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditBatch(null);
    setAddBatch(null);
  };

  const onFinish = (values) => {
    if (editBatch) {
      setBatches((prev) =>
        prev.map((batch) =>
          batch.key === editBatch.key
            ? { ...batch, ...values, age: parseFloat(values.age), size: `${values.size}` }
            : batch
        )
      );
    } else if (addBatch) {
      setBatches((prev) => [...prev, { ...values, key: (prev.length + 1).toString() }]);
    }
    handleCancel();
  };

  const handleDelete = (keyToDelete) => {
    Modal.confirm({
      title: "Xác nhận Xóa",
      content: "Bạn có chắc chắn muốn xóa lô cá này không?",
      onOk() {
        setBatches((prevBatches) =>
          prevBatches.filter((batch) => batch.key !== keyToDelete)
        );
        message.success("Lô cá đã được xóa thành công");
      },
    });
  };
  const columns = [
    {
      title: "Tên Lô Cá",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (description) => <div style={{ whiteSpace: 'normal' }}>{description}</div>,
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image) => <img src={image} alt="batch" style={{ width: '100px', height: '100px' }} />,
    },
    {
      title: "Năm sinh",
      dataIndex: "year",
    },
    {
      title: "Nguồn gốc",
      dataIndex: "origin",
    },
    {
      title: "Người bán",
      dataIndex: "seller",
    },
    {
      title: "Tuổi (năm)",
      dataIndex: "age",
    },
    {
      title: "Lượng thức ăn/ngày (gram)",
      dataIndex: "foodPerDay",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Các loại cá",
      dataIndex: "fishes",
      render: (fishes) => (
        <ul>
          {fishes.map((fish) => (
            <li key={fish.name}>
              {fish.name}: {fish.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Video",
      dataIndex: "video",
      render: (video) => <a href={video} target="_blank" rel="noopener noreferrer">Xem video</a>,
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
              onClick={() => handleDelete(record.key)}
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
          <h1>Thông tin Lô Cá</h1>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm mới lô cá
            </Button>
          </div>
          <div style={{ maxHeight: "800px" }}>
            <Table
              columns={columns}
              dataSource={batches}
              pagination={false}
              scroll={{ y: 600 }}
            />
          </div>
        </Col>

        {(editBatch || addBatch) && (
          <Modal
            title={editBatch ? "Sửa Thông tin Lô Cá" : "Thêm mới Lô Cá"}
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              layout="vertical"
              initialValues={{
                name: editBatch ? editBatch.name : "",
                description: editBatch ? editBatch.description : "",
                price: editBatch ? editBatch.price : "",
                image: editBatch ? editBatch.image : "",
                year: editBatch ? editBatch.year : "",
                origin: editBatch ? editBatch.origin : "Nhật Bản",
                seller: editBatch ? editBatch.seller : "On Koi Farm",
                age: editBatch ? editBatch.age : 2,
                foodPerDay: editBatch ? editBatch.foodPerDay : 100,
                quantity: editBatch ? editBatch.quantity : 1,
                fishes: editBatch ? editBatch.fishes : [],
                video: editBatch ? editBatch.video : "",
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Tên Lô Cá"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giá"
                name="price"
                rules={[
                  { required: true, message: "Vui lòng nhập giá lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Ảnh"
                name="image"
                rules={[
                  { required: true, message: "Vui lòng nhập link ảnh lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Năm sinh"
                name="year"
                rules={[
                  { required: true, message: "Vui lòng nhập năm sinh lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nguồn gốc"
                name="origin"
                rules={[
                  { required: true, message: "Vui lòng nhập nguồn gốc lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Người bán"
                name="seller"
                rules={[
                  { required: true, message: "Vui lòng nhập người bán lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tuổi (năm)"
                name="age"
                rules={[
                  { required: true, message: "Vui lòng nhập tuổi lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Lượng thức ăn/ngày (gram)"
                name="foodPerDay"
                rules={[
                  { required: true, message: "Vui lòng nhập lượng thức ăn lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Các loại cá"
                name="fishes"
                rules={[
                  { required: true, message: "Vui lòng nhập các loại cá lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Video"
                name="video"
                rules={[
                  { required: true, message: "Vui lòng nhập link video lô cá" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px", marginTop: "10px" }}
                >
                  <SaveOutlined />
                  {editBatch ? "Lưu" : "Thêm mới"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}

        {selectedBatch && (
          <Col span={24}>
            <Card title={`Chi tiết của ${selectedBatch.name}`}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Thông tin Lô Cá" key="1">
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
                      <img src={selectedBatch.image} alt="batch" style={{ width: '20%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                    </Col>
                    <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Tên:</strong> {selectedBatch.name}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Mô tả:</strong> {selectedBatch.description}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Giá:</strong> {selectedBatch.price}
                      </p>
                      
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Năm :</strong> {selectedBatch.year}
                      </p>
                    </Col>
                    <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Nguồn gốc:</strong> {selectedBatch.origin}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Người bán:</strong> {selectedBatch.seller}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Tuổi (năm):</strong> {selectedBatch.age}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Lượng thức ăn/ngày (gram):</strong> {selectedBatch.foodPerDay}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Số lượng:</strong> {selectedBatch.quantity}
                      </p>
                      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                        <strong>Các loại cá:</strong> {selectedBatch.fishes.map(fish => `${fish.name}: ${fish.quantity}`).join(', ')}
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

export default BatchInfo;
