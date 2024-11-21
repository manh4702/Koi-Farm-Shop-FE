import React, {useEffect, useState} from "react";
import {Table, Button, Space, Menu, Dropdown, message} from "antd";
import {DeleteOutlined, EditOutlined, MoreOutlined, SettingOutlined, PlusOutlined} from "@ant-design/icons";
import UpdateConsignment from "./UpdateConsignment";
import AddConsignment from "./AddConsignmentModal";
import fishConsignmentStore from "@/store/fishConsignmentStore.jsx";
import fishConsignment from "@/components/user/pages/FishConsignment.jsx";

const ConsignmentCare = () => {
  const [consignments, setConsignments] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const {fetchFishConsignments, loading, error, createFishConsignmentSell, fishConsignments } = fishConsignmentStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFishConsignments();
      } catch (err) {
        message.error('Có lỗi xảy ra khi tải danh sách kí gửi.');
      }
    };

    fetchData();
  }, [fetchFishConsignments]);

  console.log("data", fishConsignments);

  // Hàm mở modal sửa
  const handleEdit = (record) => {
    setCurrentConsignment(record);
    setIsEditing(true);
  };

  // Hàm mở modal thêm
  const handleAdd = () => {
    setIsAdding(true);
  };

  // Hàm xóa đơn ký gửi
  const handleDelete = (id) => {
    setConsignments(consignments.filter((item) => item.id !== id));
  };

  // Hàm cập nhật đơn ký gửi
  const handleUpdateSubmit = (values) => {
    const updatedConsignment = {
      ...currentConsignment,
      price: values.price,
      receivedDate: values.receivedDate.toISOString(),
      returnDate: values.returnDate.toISOString(),
      purpose: values.purpose,
    };

    setConsignments(
      consignments.map((item) =>
        item.id === currentConsignment.id ? updatedConsignment : item
      )
    );
    setIsEditing(false);
  };

  // Hàm thêm đơn ký gửi mới
  const handleAddSubmit = (values) => {
    const newConsignment = {
      id: consignments.length + 1,
      name: values.name,
      type: values.type,
      price: values.price,
      owner: values.owner,
      receivedDate: values.receivedDate.toISOString(),
      returnDate: values.returnDate.toISOString(),
      purpose: values.purpose,
    };

    setConsignments([...consignments, newConsignment]);
    setIsAdding(false);
  };

  const columns = [
    {
      title: "Tên cá Koi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Loại cá",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => `${parseFloat(text).toLocaleString()} VND`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "receivedDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : ""),
    },
    {
      title: "Mục đích ký gửi",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: <SettingOutlined/>,
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" icon={<EditOutlined/>} onClick={() => handleEdit(record)}>
              Sửa
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined/>} onClick={() => handleDelete(record.id)}>
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
    <div>
      <h1 style={{fontSize: "20px", marginBottom: "20px"}}>Quản lý ký gửi</h1>

      <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd} style={{marginBottom: 16, float: "right"}}>
        Thêm đơn ký gửi
      </Button>

      <Table columns={columns} dataSource={fishConsignments} pagination={{pageSize: 20}}/>

      {/* Modal thêm đơn ký gửi */}
      <AddConsignment
        visible={isAdding}
        onCancel={() => setIsAdding(false)}
        onSubmit={handleAddSubmit}
      />

      {/* Modal sửa đơn ký gửi */}
      <UpdateConsignment
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onSubmit={handleUpdateSubmit}
        consignment={currentConsignment}
      />
    </div>
  );
};

export default ConsignmentCare;
