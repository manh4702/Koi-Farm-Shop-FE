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
  Upload, Checkbox, Divider, Descriptions, Tag, Image,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  MoreOutlined,
  SettingOutlined,
  PlusOutlined,
  PlusSquareOutlined, FilterOutlined,
} from "@ant-design/icons";
import {useFishStore} from "../../../store/fishStore.js";
import useCategoryStore from "../../../store/categoryStore.js";
import SubMenu from "antd/es/menu/SubMenu.js";

const {TabPane} = Tabs;

const FishInfo = (categoryId) => {
  const [selectedFish, setSelectedFish] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editFish, setEditFish] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [visibleFilters, setVisibleFilters] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const {fishes, loadFishes, createFish, updateFish, removeFish, loading} = useFishStore();
  const {fetchCategories} = useCategoryStore();

  useEffect(() => {
    loadFishes();
    fetchCategories()
  }, [loadFishes, fetchCategories]);

  const handleView = (fish) => {
    setSelectedFish(fish);
  };

  const handleEdit = (fish) => {
    setEditFish(fish);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditFish(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditFish(null);
  };

  const onFinish = async (values) => {
    setLoadingButton(true);

    const formData = {
      ...values,
      image: values.image?.file,
      productStatus: editFish ? values.productStatus : "",
      age: parseInt(values.age),
      size: parseFloat(values.size),
      price: parseFloat(values.price),
      dailyFood: parseFloat(values.dailyFood),
    };
    try {
      if (editFish) {
        // Update the fish if it is being edited
        await updateFish(editFish.fishId, formData);
        message.success("Cập nhật cá thành công!");
      } else {
        // Add new fish
        await createFish(formData);
        message.success("Thêm mới cá thành công!");
      }
      loadFishes();
      handleCancel();
    } catch (error) {
      message.error("Đã xảy ra lỗi khi thêm cá. Vui lòng thử lại!");
    } finally {
      setLoadingButton(false);

    }
  };


  const handleDelete = async (fishId) => {
    try {
      await removeFish(fishId);
      loadFishes()
      message.success("Cá đã được xóa thành công");
    } catch (error) {
      message.error("Đã xảy ra lỗi khi xóa cá. Vui lòng thử lại!");
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedStatus(null);
  };

  const filteredFishes = fishes.filter((fish) => {
    return (
      (selectedCategory === null || fish.categoryName === selectedCategory) &&
      (selectedStatus === null || fish.status === selectedStatus)
    );
  });

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      render: (url) => <img src={url} alt="fish" style={{width: "100px", height: "auto", borderRadius: "10px"}}/>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
    },
    {
      title: "Tuổi (năm)",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (gender) => (gender === "Male" ? "Đực" : "Cái"), // Giả sử 1 là Đực, 0 là Cái
    },
    {
      title: "Kích thước (cm)",
      dataIndex: "size",
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: "Loại cá",
      dataIndex: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      render: (price) => formatCurrency(price),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Lượng thức ăn/ngày (gram)",
      dataIndex: "dailyFood",
      width: 150,
      sorter: (a, b) => a.dailyFood - b.dailyFood,
    },
    {
      title: "Tình trạng cá",
      dataIndex: "status",
      render: (status) => (status === "GOOD" ? "Khoẻ mạnh" : "Sắp chết"), // Giả sử 0 là có sẵn, 1 là hết hàng
    },
    {
      title: "Trạng thái",
      dataIndex: "productStatus",
      render: (productStatus) => (productStatus === "AVAILABLE" ? "Có sẵn" : "Hết hàng"), // Giả sử 0 là có sẵn, 1 là hết hàng
      sorter: (a, b) => a.productStatus === "AVAILABLE" ? -1 : 1,
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
              onClick={() => handleDelete(record.fishId)}
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

  const menu = (
    <Menu>
      <SubMenu key="category" title="Loại cá">
        {Array.from(new Set(fishes.map((fish) => fish.categoryName))).map((categoryName) => (
          <Menu.Item key={categoryName}>
            <Checkbox
              checked={selectedCategory === categoryName}
              onChange={() => setSelectedCategory(selectedCategory === categoryName ? null : categoryName)}
            >
              {categoryName}
            </Checkbox>
          </Menu.Item>
        ))}
      </SubMenu>
      <SubMenu key="status" title="Trạng thái">
        <Menu.Item key="available">
          <Checkbox
            checked={selectedStatus === 0}
            onChange={() => setSelectedStatus(selectedStatus === 0 ? null : 0)}
          >
            Có sẵn
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="out-of-stock">
          <Checkbox
            checked={selectedStatus === 1}
            onChange={() => setSelectedStatus(selectedStatus === 1 ? null : 1)}
          >
            Hết hàng
          </Checkbox>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="reset" onClick={resetFilters}>
        <Button type="default">Reset</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{padding: "24px", background: "#fff"}}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Thông tin Cá</h1>
          <div style={{display: "flex", justifyContent: "flex-end", marginBottom: "10px"}}>
            <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
              Thêm mới cá
            </Button>
            <Dropdown overlay={menu} trigger={['click']} open={visibleFilters} onVisibleChange={setVisibleFilters}>
              <Button
                type="default"
                icon={<FilterOutlined/>}
                style={{marginLeft: "10px"}}
              >
                Bộ lọc
              </Button>
            </Dropdown>
          </div>
          {/*<Table columns={columns} dataSource={fishes} pagination={false} scroll={{y: 325}}/>*/}
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={filteredFishes}
            pagination={false}
            // scroll={{y: 425}}
          />
        </Col>

        {isModalVisible && (
          <Modal
            title={editFish ? "Sửa Thông tin Cá" : "Thêm mới Cá"}
            open={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              layout="vertical"
              // initialValues={editFish}
              initialValues={{
                ...editFish,
                gender: editFish?.gender?.toString(), // Chuyển đổi sang string
                categoryId: editFish?.categoryId?.toString(), // Chuyển đổi sang string
                productStatus: editFish?.productStatus || 'AVAILABLE'
              }}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Thêm ảnh cá"
                    name="image"
                  >
                    <Upload
                      listType="picture-card"
                      beforeUpload={() => false}
                    >
                      <PlusSquareOutlined/> Upload
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tên cá"
                    name="name"
                  >
                    <Input/>
                  </Form.Item>
                  <Form.Item
                    label="Giá (VND)"
                    name="price"
                  >
                    <InputNumber
                      min={0}
                      style={{width: "100%"}}
                      formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      parser={(value) => value.replace(/\./g, "")}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>

                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Giới tính"
                    name="gender"
                  >
                    <Select placeholder="Chọn giới tính">
                      <Select.Option value="0">Đực</Select.Option>
                      <Select.Option value="1">Cái</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Tuổi (năm)"
                    name="age"
                  >
                    <InputNumber
                      min={0}
                      style={{width: "100%"}}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Kích thước (cm)"
                    name="size"
                  >
                    <InputNumber
                      min={0}
                      style={{width: "100%"}}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Loại cá" name="categoryId">
                    <Select>
                      {JSON.parse(sessionStorage.getItem("categories"))?.map(category => (
                        <Select.Option key={category.categoryId} value={category.categoryId}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Lượng thức ăn/ngày (gram)"
                    name="dailyFood"
                  >
                    <InputNumber
                      min={0}
                      style={{width: "100%"}}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                {editFish && (
                  <Col span={12}>
                    <Form.Item
                      label="Trạng thái"
                      name="productStatus"
                    >
                      <Select>
                        <Select.Option value="AVAILABLE">Có sẵn</Select.Option>
                        <Select.Option value="UNAVAILABLE">Hết hàng</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                )}
                {/*<Col span={12}>*/}
                {/*  <Form.Item*/}
                {/*    label="Trạng thái"*/}
                {/*    name="productStatus"*/}
                {/*    initialValue={editFish?.productStatus || 'AVAILABLE'}*/}
                {/*  >*/}
                {/*    <Select placeholder="Chọn trạng thái">*/}
                {/*      <Select.Option value="AVAILABLE">Có sẵn</Select.Option>*/}
                {/*      <Select.Option value="UNAVAILABLE">Hết hàng</Select.Option>*/}
                {/*    </Select>*/}
                {/*  </Form.Item>*/}
                {/*</Col>*/}
              </Row>

              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{required: true, message: "Vui lòng nhập mô tả về cá"}]}
              >
                <Input.TextArea rows={3} placeholder="Nhập mô tả về cá"/>
              </Form.Item>
              <Form.Item style={{textAlign: "right"}}>
                <Button type="primary" htmlType="submit" loading={loadingButton}>
                  <SaveOutlined/> {editFish ? "Lưu" : "Thêm mới"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}

        {
          selectedFish && (
            <Modal
              title={`Chi tiết của ${selectedFish.name}`}
              visible={!!selectedFish}
              onCancel={() => setSelectedFish(null)}
              footer={null}
              width={800}
            >
              <div style={{padding: "20px"}}>
                {/* Phần hình ảnh */}
                <div style={{textAlign: "center", marginBottom: "24px"}}>
                  <Image
                    src={selectedFish.imageUrl}
                    alt={selectedFish.name}
                    style={{
                      maxWidth: "300px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                <Divider orientation="left">Thông tin cơ bản</Divider>

                <Descriptions
                  bordered
                  column={{xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1}}
                >
                  <Descriptions.Item label="Tên cá" span={2}>
                    <strong>{selectedFish.name}</strong>
                  </Descriptions.Item>

                  <Descriptions.Item label="Giá">
                    <span style={{color: "#f50"}}>
                      {formatCurrency(selectedFish.price)}
                    </span>
                  </Descriptions.Item>

                  <Descriptions.Item label="Trạng thái">
                    <Tag color={selectedFish.productStatus === "AVAILABLE" ? "green" : "red"}>
                      {selectedFish.productStatus === "AVAILABLE" ? "Có sẵn" : "Hết hàng"}
                    </Tag>
                  </Descriptions.Item>

                  <Descriptions.Item label="Loại cá">
                    {selectedFish.categoryName}
                  </Descriptions.Item>

                  <Descriptions.Item label="Thức ăn/ngày">
                    {selectedFish.dailyFood} gram
                  </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Thông số chi tiết</Divider>

                <Descriptions
                  bordered
                  column={{xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1}}
                >
                  <Descriptions.Item label="Tuổi">
                    {selectedFish.age} năm
                  </Descriptions.Item>

                  <Descriptions.Item label="Kích thước">
                    {selectedFish.size} cm
                  </Descriptions.Item>

                  <Descriptions.Item label="Giới tính">
                    {selectedFish.gender === 1 ? "Đực" : "Cái"}
                  </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Mô tả chi tiết</Divider>

                <div
                  style={{
                    padding: "16px",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    minHeight: "100px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedFish.description || "Không có mô tả"}
                </div>
              </div>
            </Modal>
          )
        }
      </Row>
    </div>
  )
    ;
};

export default FishInfo;
