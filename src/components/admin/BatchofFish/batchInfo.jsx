import React, { useEffect, useState } from "react";
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
  Upload,
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
import {
  createFishPackage,
  deleteFishPackage,
  getFishPackages,
  updateFishPackage,
} from "../../../services/fishPackageStore";
import TextArea from "antd/es/input/TextArea";
import FishPackageDetail from "./FishPackageDetail";

const { TabPane } = Tabs;

const BatchInfo = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editBatch, setEditBatch] = useState(null);
  const [addBatch, setAddBatch] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [form] = Form.useForm();
  console.log("form:", form);

  useEffect(() => {
    loadFishPackages();
  }, []);

  const loadFishPackages = async () => {
    try {
      const data = await getFishPackages();
      setBatches(data);
      console.log(data);
    } catch (error) {
      message.error("Failed to load fish packages.");
    }
  };

  const handleView = (batch) => {
    setSelectedBatch(batch);
  };

  const handleEdit = (batch) => {
    setEditBatch(batch);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...batch,
    });
  };

  const handleAdd = () => {
    setAddBatch(null);
    setIsModalVisible(true);
    setImageFile(null);
    form.resetFields();
  };

  const handleFileChange = (info) => {
    setImageFile(info.fileList); // Lưu danh sách các tệp hình ảnh vào state
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditBatch(null);
    form.resetFields();
  };

  // const onFinish = async (values) => {
  //   try {
  //     const priceValue = parseFloat(values.price) || 0;
  //     if (editBatch && editBatch.fishPackageId) {
  //       // Cập nhật lô cá
  //       const { fishPackageId } = editBatch;
  //       const { status } = editBatch;

  //       await updateFishPackage(fishPackageId, {
  //         fishPackageId: fishPackageId, // Chuyển id vào request payload
  //         name: values.name,
  //         age: values.age,
  //         gender: values.gender,
  //         size: values.size,
  //         description: values.description,
  //         totalPrice: priceValue,
  //         dailyFood: values.dailyFood,
  //         imageUrl: values.image,
  //         numberOfFish: values.numberOfFish,
  //         status: status,
  //       });
  //       message.success("Cập nhật lô cá thành công");
  //     } else {
  //       await createFishPackage({
  //         name: values.name,
  //         age: values.age,
  //         gender: values.gender,
  //         size: values.size,
  //         description: values.description,
  //         totalPrice: priceValue,
  //         dailyFood: values.dailyFood,
  //         imageFile: values.imageFile,
  //         imageUrl: values.image,
  //         numberOfFish: values.quantity,
  //       });
  //       message.success("Thêm mới lô cá thành công");
  //     }
  //     loadFishPackages(); // Tải lại danh sách sau khi cập nhật thành công
  //     handleCancel(); // Đóng modal
  //   } catch (error) {
  //     console.error("Error updating fish package:", error);
  //     message.error(
  //       editBatch ? "Cập nhật lô cá thất bại" : "Thêm mới lô cá thất bại"
  //     );
  //   }
  // };

  const onFinish = async (values) => {
    try {
      const newData = {
        name: values.name,
        age: values.age,
        gender: values.gender,
        size: values.size,
        description: values.description,
        totalPrice: values.price,
        dailyFood: values.dailyFood,
        numberOfFish: values.numberOfFish,
        imageFiles: imageFile && imageFile.length > 0 ? imageFile : null, // Đảm bảo chứa danh sách file tải lên nếu có
        imageUrl: values.imageUrl || null, // URL hình ảnh nếu có
      };

      if (editBatch) {
        // Cập nhật lô cá
        await updateFishPackage(editBatch.fishPackageId, newData);
        message.success("Lô cá đã được cập nhật thành công!");
      } else {
        // Tạo mới lô cá
        await createFishPackage(newData);
        message.success("Lô cá đã được tạo thành công!");
      }

      loadFishPackages();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi lưu lô cá.");
    }
  };

  const handleDelete = (fishPackageId) => {
    Modal.confirm({
      title: "Xác nhận Xóa",
      content: "Bạn có chắc chắn muốn xóa lô cá này không?",
      onOk: async () => {
        try {
          // Gọi hàm deleteFishPackage để xóa lô cá qua API
          await deleteFishPackage(fishPackageId);

          loadFishPackages();

          message.success("Lô cá đã được xóa thành công");
        } catch (error) {
          console.error("Error deleting fish package:", error);
          message.error("Xóa lô cá thất bại");
        }
      },
    });
  };
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image}
          alt="batch"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Tên Lô Cá",
      dataIndex: "name",
    },
    // {
    //   title: "Mô tả",
    //   dataIndex: "description",
    //   render: (text) => (
    //     <div
    //       style={{
    //         maxWidth: "500px", // Giới hạn chiều rộng của ô mô tả
    //         overflow: "hidden",
    //         whiteSpace: "nowrap",
    //         textOverflow: "ellipsis",
    //       }}
    //       // title={text} // Hiển thị toàn bộ mô tả khi di chuột vào
    //     >
    //       {text}
    //     </div>
    //   ),
    // },
    {
      title: "Giá",
      dataIndex: "price",
    },

    {
      title: "Tuổi",
      dataIndex: "age",
    },
    {
      title: "Kích thước (cm)",
      dataIndex: "size",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Thức ăn/ngày (gram)",
      dataIndex: "dailyFood",
    },
    {
      title: "Số lượng",
      dataIndex: "numberOfFish",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    // {
    //   title: "Các loại cá",
    //   dataIndex: "fishes",
    //   render: (fishes) => (
    //     <ul>
    //       {fishes.map((fish) => (
    //         <li key={fish.name}>
    //           {fish.name}: {fish.quantity}
    //         </li>
    //       ))}
    //     </ul>
    //   ),
    // },
    // {
    //   title: "Video",
    //   dataIndex: "video",
    //   render: (video) => <a href={video} target="_blank" rel="noopener noreferrer">Xem video</a>,
    // },
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
              onClick={() => handleDelete(record.fishPackageId)}
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
    <div style={{ padding: "24px", background: "#fff" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Thông tin Lô Cá</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
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

        {isModalVisible && (
          <Modal
            title={editBatch ? "Sửa Thông tin Lô Cá" : "Thêm mới Lô Cá"}
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tên Lô Cá" name="name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Giá" name="price">
                    <InputNumber
                      min={0}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Form.Item label="Link Ảnh" name="image">
                  <Input />
                </Form.Item>
                <Form.Item label="Ảnh" name="imageFile">
                  <Upload
                    fileList={imageFile}
                    beforeUpload={() => false} // Không tự động upload file
                    onChange={handleFileChange}
                    accept="image/*"
                  >
                    <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                  </Upload>
                </Form.Item>
                <Form.Item label="Tuổi" name="age">
                  <InputNumber
                    min={0}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item label="Giới tính" name="gender">
                  <Select>
                    <Select.Option value="Male">Nam</Select.Option>
                    <Select.Option value="Female">Nữ</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Kích thước" name="size">
                  <InputNumber
                    min={0}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item label="Thức ăn/ngày" name="dailyFood">
                  <InputNumber
                    min={0}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item label="Số lượng" name="numberOfFish">
                  <InputNumber
                    min={0}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
                <Col span={24}>
                  <Form.Item label="Mô tả" name="description">
                    <Input />
                    {/* <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} /> */}
                  </Form.Item>
                </Col>
                {/* <Form.Item label="Trạng thái" name="status">
                <Input />
              </Form.Item> */}
              </Row>
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

        {/* {selectedBatch && (
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
                  <Row
                    gutter={16}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "20px 0",
                    }}
                  >
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={selectedBatch.image}
                        alt="batch"
                        style={{
                          width: "20%",
                          height: "auto",
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </Col>
                    <Col
                      span={12}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Tên:</strong> {selectedBatch.name}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Mô tả:</strong> {selectedBatch.description}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Giá:</strong> {selectedBatch.price}
                      </p>

                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Năm :</strong> {selectedBatch.year}
                      </p>
                    </Col>
                    <Col
                      span={12}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Nguồn gốc:</strong> {selectedBatch.origin}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Người bán:</strong> {selectedBatch.seller}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Tuổi (năm):</strong> {selectedBatch.age}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Lượng thức ăn/ngày (gram):</strong>{" "}
                        {selectedBatch.foodPerDay}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Số lượng:</strong> {selectedBatch.quantity}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "10px 0",
                        }}
                      >
                        <strong>Các loại cá:</strong>{" "}
                        {selectedBatch.fishes
                          .map((fish) => `${fish.name}: ${fish.quantity}`)
                          .join(", ")}
                      </p>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        )} */}
        {selectedBatch && (
          <Col span={24}>
            <FishPackageDetail fishPackage={selectedBatch} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default BatchInfo;
