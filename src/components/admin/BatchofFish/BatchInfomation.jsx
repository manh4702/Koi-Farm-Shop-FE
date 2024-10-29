// BatchInfo.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal, Space, Dropdown, Menu, Row, Col } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
// import {
//   getFishPackages,
//   deleteFishPackage,
// } from "../../../services/fishPackageService.js";
import { useFishPackageStore } from "../../../store/fishPackageStore.js";
import CreateFishPackageForm from "./CreateFishPackageForm";
import UpdateFishPackageForm from "./UpdateFishPackageForm";
import FishPackageDetail from "./FishPackageDetail";

const BatchInfo = () => {
  const {
    fishPackages,
    fetchFishPackages,
    deleteFishPackage,
  } = useFishPackageStore();
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [editBatch, setEditBatch] = useState(null);

  useEffect(() => {
    fetchFishPackages();
  }, [fetchFishPackages]);

  useEffect(() => {
    setBatches(fishPackages); // Ensure state is updated on fishPackages change
  }, [fishPackages]);

  const handleAdd = () => {
    setIsCreateModalVisible(true);
  };

  const handleEdit = (batch) => {
    setEditBatch(batch);
    setIsUpdateModalVisible(true);
  };

  const handleView = (batch) => {
    setSelectedBatch(batch);
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
              dataSource={fishPackages}
              columns={[
                  {
                    title: "Ảnh",
                    dataIndex: "imageUrl",
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
                  render: (status) => {
                    return status === "AVAILABLE" ? "Có sẵn" : "Đã bán";
                  },
                },
                {
                  title: <SettingOutlined />,
                  key: "action",
                  render: (_, record) => {
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

        {selectedBatch && <FishPackageDetail fishPackage={selectedBatch} />}
      </Row>
    </div>
  );
};

export default BatchInfo;
