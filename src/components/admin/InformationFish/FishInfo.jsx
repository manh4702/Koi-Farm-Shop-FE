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
  Upload, Checkbox,
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
import axios from "../../../api/axios.jsx";
const {TabPane} = Tabs;

const FishInfo = (categoryId) => {
  const [selectedFish, setSelectedFish] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editFish, setEditFish] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [visibleFilters, setVisibleFilters] = useState(false);

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
    const formData  = {
      ...values,
      image: values.image?.file,
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
      console.error("Lỗi: ", error);
      message.error("Đã xảy ra lỗi khi cập nhật/thêm cá. Vui lòng thử lại!");
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

  // const handleFilterCancel = () => {
  //   setIsFilterModalVisible(false);
  // };
  //
  // const handleCategoryFilterChange = (value) => {
  //   setSelectedCategory(value);
  // };
  //
  // const handleStatusFilterChange = (value) => {
  //   setSelectedStatus(value);
  // };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedStatus(null);
  };

  // const applyFilters = () => {
  //   setIsFilterModalVisible(false);
  //   loadFishes();
  // };

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
      render: (gender) => (gender === 1 ? "Đực" : "Cái"), // Giả sử 1 là Đực, 0 là Cái
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
      render: (price) => price.toLocaleString("vi-VN"),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Lượng thức ăn/ngày (gram)",
      dataIndex: "dailyFood",
      sorter: (a, b) => a.dailyFood - b.dailyFood,
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "quantityInStock",
      sorter: (a, b) => a.quantityInStock - b.quantityInStock,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (status === 0 ? "Có sẵn" : "Hết hàng"), // Giả sử 0 là có sẵn, 1 là hết hàng
      sorter: (a, b) => a.status - b.status,
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
                icon={<FilterOutlined />}
                style={{ marginLeft: "10px" }}
              >
                Bộ lọc
              </Button>
            </Dropdown>
          </div>
          {/*<Table columns={columns} dataSource={fishes} pagination={false} scroll={{y: 325}}/>*/}
        </Col>
        <Col span={24}>
          <Table columns={columns} dataSource={filteredFishes} pagination={false} scroll={{y: 425}}/>
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
              initialValues={editFish}
              onFinish={onFinish}
            >
              <Form.Item
                label="Thêm ảnh cá"
                name="image"
                rules={[{required: true, message: "Vui lòng thêm ảnh của cá"}]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                >
                  <PlusSquareOutlined/> Upload
                </Upload>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tên cá" name="name" rules={[{required: true, message: "Vui lòng nhập tên cá"}]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Loại cá" name="categoryId"
                             rules={[{required: true, message: "Vui lòng chọn loại cá"}]}>
                    <Select>
                      {JSON.parse(sessionStorage.getItem("categories"))?.map(category => (
                        <Select.Option key={category.categoryId} value={category.categoryId}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[{required: true, message: "Vui lòng nhập giới tính của cá"}]}>
                    <Select>
                      <Select.Option value="1">Đực</Select.Option>
                      <Select.Option value="0">Cái</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Tuổi (năm)"
                    name="age"
                    rules={[{required: true, message: "Vui lòng nhập tuổi của cá"}]}>
                    <InputNumber min={0}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Kích thước (cm)" name="size"
                             rules={[{required: true, message: "Vui lòng nhập kích thước của cá"}]}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label="Giá (VND)" name="price"
                             rules={[{required: true, message: "Vui lòng nhập giá của cá"}]}>
                    <InputNumber min={0}/>
                  </Form.Item>
                  <Form.Item label="Lượng thức ăn/ngày (gram)" name="dailyFood"
                             rules={[{required: true, message: "Vui lòng nhập lượng thức ăn của cá"}]}>
                    <InputNumber min={0}/>
                  </Form.Item>
                  <Form.Item label="Số lượng trong kho" name="quantityInStock"
                             rules={[{required: true, message: "Vui lòng nhập số lượng có sẵn của cá"}]}>
                    <InputNumber min={0}/>
                  </Form.Item>
                  <Form.Item label="Trạng thái" name="status"
                             rules={[{required: true, message: "Vui lòng nhập trạng thái của cá"}]}>
                    <Select>
                      <Select.Option value={0}>Có sẵn</Select.Option>
                      <Select.Option value={1}>Hết hàng</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{required: true, message: "Vui lòng nhập mô tả về cá"}]}
              >
                <Input.TextArea rows={3} placeholder="Nhập mô tả về cá"/>
              </Form.Item>
              <Form.Item style={{textAlign: "right"}}>
                <Button type="primary" htmlType="submit">
                  <SaveOutlined/> {editFish ? "Lưu" : "Thêm mới"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}

        {
          selectedFish && (
            <Col span={24}>
              <Card title={`Chi tiết của ${selectedFish.name}`}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Thông tin Cá" key="1">
                    <Row gutter={16}>
                      <Col span={8}>
                        <img src={selectedFish.imageUrl} alt="fish"
                             style={{width: "60%", height: "auto", marginBottom: "20px", borderRadius: "10px"}}/>
                      </Col>
                      <Col span={8}>
                        <p><strong>Tên:</strong> {selectedFish.name}</p>
                        <p><strong>Loại cá:</strong> {selectedFish.categoryName}</p>
                        <p><strong>Giới tính:</strong> {selectedFish.gender === 1 ? "Đực" : "Cái"}</p>
                        <p><strong>Tuổi (năm):</strong> {selectedFish.age}</p>
                      </Col>
                      <Col span={8}>
                        <p><strong>Kích thước (cm):</strong> {selectedFish.size}</p>
                        <p><strong>Giá (VND):</strong> {selectedFish.price.toLocaleString("vi-VN")}</p>
                        <p><strong>Lượng thức ăn/ngày (gram):</strong> {selectedFish.dailyFood}</p>
                        <p><strong>Số lượng trong kho:</strong> {selectedFish.quantityInStock}</p>
                        <p><strong>Trạng thái:</strong> {selectedFish.status === 0 ? "Có sẵn" : "Hết hàng"}</p>
                      </Col>
                      <Col span={24}>
                        <p><strong>Mô tả:</strong> {selectedFish.description}</p>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          )
        }
      </Row>
    </div>
  )
    ;
};

export default FishInfo;
