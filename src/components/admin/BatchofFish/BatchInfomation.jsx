// BatchInfo.jsx
import React, {useEffect, useState} from "react";
import {Table, Button, message, Modal, Space, Dropdown, Menu, Row, Col, Checkbox} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  MoreOutlined, FilterOutlined,
} from "@ant-design/icons";
import {useFishPackageStore} from "../../../store/fishPackageStore.js";
import CreateFishPackageForm from "./CreateFishPackageForm";
import FishPackageDetail from "./FishPackageDetail";
import SubMenu from "antd/es/menu/SubMenu.js";
import useCategoryStore from "@/store/categoryStore.js";
import UpdateFishPackageForm from "@/components/admin/BatchofFish/UpdateFishPackageForm.jsx";

const BatchInfo = () => {
  const {
    fishPackages,
    fetchFishPackages,
    deleteFishPackage,
  } = useFishPackageStore();
  const {fetchCategories, categories} = useCategoryStore();
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [editBatch, setEditBatch] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [visibleFilters, setVisibleFilters] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);


  useEffect(() => {
    fetchFishPackages();
    fetchCategories();
  }, [fetchFishPackages, fetchCategories]);

  useEffect(() => {
    setBatches(fishPackages); // Ensure state is updated on fishPackages change
  }, [fishPackages]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);
    return category ? category.name : "Không xác định";
  };

  const handleAdd = () => {
    setIsCreateModalVisible(true);
  };

  const handleEdit = (batch) => {
    setEditBatch(batch);
    setIsUpdateModalVisible(true);
  };

  const handleView = (batch) => {
    setSelectedBatch(batch); // Lưu lô cá đã chọn
    setIsDetailModalVisible(true); // Mở Modal hiển thị chi tiết
  };

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Trạng thái mở/đóng Modal

  const handleCancelDetailModal = () => {
    setIsDetailModalVisible(false); // Đóng Modal khi hủy
  };

  const handleDelete = async (fishPackageId) => {
    Modal.confirm({
      title: "Xác nhận Xóa",
      content: "Bạn có chắc chắn muốn xóa lô cá này không?",
      onOk: async () => {
        try {
          await deleteFishPackage(fishPackageId);
          fetchFishPackages();
          message.success("Lô cá đã được xóa thành công");
          if (selectedBatch && selectedBatch.fishPackageId === fishPackageId) {
            setSelectedBatch(null);
          }
        } catch (error) {
          message.error("Xóa lô cá thất bại");
        }
      },
    });
  };

  const formatCurrency = (value) => {
    // Loại bỏ "VND" từ chuỗi nếu có
    const numericValue = typeof value === 'string'
      ? parseInt(value.replace(/[^\d]/g, ''))
      : value;

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numericValue);
  };

  const menu = (
    <Menu>
      <SubMenu key="status" title="Trạng thái">
        <Menu.Item key="available">
          <Checkbox
            checked={selectedStatus === "AVAILABLE"}
            onChange={() => setSelectedStatus(selectedStatus === "AVAILABLE" ? null : "AVAILABLE")}
          >
            Có sẵn
          </Checkbox>
        </Menu.Item>
        <Menu.Item key="sold">
          <Checkbox
            checked={selectedStatus === "SOLD"}
            onChange={() => setSelectedStatus(selectedStatus === "SOLD" ? null : "SOLD")}
          >
            Đã bán
          </Checkbox>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="size" title="Kích thước">
        {Array.from(new Set(batches.map((batch) => batch.size))).map((size) => (
          <Menu.Item key={size}>
            <Checkbox
              checked={selectedSize === size}
              onChange={() => setSelectedSize(selectedSize === size ? null : size)}
            >
              {size} cm
            </Checkbox>
          </Menu.Item>
        ))}
      </SubMenu>
      <Menu.Item key="reset" onClick={() => resetFilters()}>
        <Button type="default">Reset</Button>
      </Menu.Item>
    </Menu>
  );

  const resetFilters = () => {
    setSelectedStatus(null);
    setSelectedSize(null);
  };

  const filteredBatches = batches.filter((batch) => {
    return (
      (selectedStatus === null || batch.status === selectedStatus) &&
      (selectedSize === null || batch.size === selectedSize)
    );
  });


  return (
    <div style={{padding: "24px", background: "#fff"}}>
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
            <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
              Thêm mới lô cá
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
          <div style={{maxHeight: "800px"}}>
            <Table
              dataSource={fishPackages}
              columns={[
                {
                  title: "Ảnh",
                  dataIndex: "imageUrl",
                  width: 200,
                  render: (image) => (
                    <img
                      src={image}
                      alt="batch"
                      style={{width: "100px", height: "100px", borderRadius: "10px"}}
                    />
                  ),
                },
                {
                  title: "Tên Lô Cá",
                  dataIndex: "name",
                },
                {
                  title: "Giá",
                  dataIndex: "totalPrice",
                  render: (price) => formatCurrency(price),
                  sorter: (a, b) => a.totalPrice - b.totalPrice,
                },
                {
                  title: "Thức ăn/ngày (gram)",
                  dataIndex: "dailyFood",
                  sorter: (a, b) => a.dailyFood - b.dailyFood,
                },
                {
                  title: "Kích thước (cm)",
                  dataIndex: "size",
                  width: '100px',
                  render: (_, record) => `${record.minSize} - ${record.maxSize}`,
                },
                {
                  title: "Tuổi cá",
                  dataIndex: "age",
                },
                {
                  title: "Số lượng",
                  dataIndex: "numberOfFish",
                  sorter: (a, b) => a.numberOfFish - b.numberOfFish,
                },
                {
                  title: "Số lượng trong kho",
                  dataIndex: "quantityInStock",
                  sorter: (a, b) => a.quantityInStock - b.quantityInStock,
                },
                // {
                //   title: "Sức chứa",
                //   dataIndex: "capacity",
                //   render: (capacity) => `${capacity} con`,
                //   sorter: (a, b) => a.capacity - b.capacity,
                // },
                {
                  title: "Loại cá",
                  dataIndex: "categories",
                  width: '250px',
                  render: (categories) =>
                    categories.map((category) => (
                      <div key={category.categoryId}>
                        <strong>Loại cá:</strong> {getCategoryName(category.categoryId)} - {category.quantityOfEach} con
                      </div>
                    )),
                },
                {
                  title: "Trạng thái",
                  dataIndex: "productStatus",
                  render: (status) => {
                    const statusMap = {
                      NOTFULL: "Chưa đủ số lượng",
                      FULL: "Đủ số lượng",
                      EMPTY: "Không có",
                      AVAILABLE: "Có sẵn",
                      SOLDOUT: "Đã bán hết"
                    };
                    return statusMap[status] || "Không xác định";
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
              ]}
            />
          </div>
        </Col>

        <CreateFishPackageForm
          visible={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          onSuccess={fetchFishPackages}
        />

        <UpdateFishPackageForm
          visible={isUpdateModalVisible}
          onCancel={() => setIsUpdateModalVisible(false)}
          fishPackage={editBatch}
          onSuccess={fetchFishPackages}
        />

        <Modal
          title={`Chi tiết của ${selectedBatch?.name}`}
          open={isDetailModalVisible}
          onCancel={handleCancelDetailModal}
          footer={null}
          width={800}
        >
          {selectedBatch && <FishPackageDetail 
            fishPackage={selectedBatch}
            getCategoryName={getCategoryName}
          />}
        </Modal>

        {/*{selectedBatch && <FishPackageDetail fishPackage={selectedBatch} />}*/}
      </Row>
    </div>
  );
};

export default BatchInfo;
