import React, {useEffect, useState} from "react";
import {Table, Button, Space, Menu, Dropdown, message, Tag} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SettingOutlined,
  PlusOutlined,
  EyeOutlined
} from "@ant-design/icons";
import UpdateConsignment from "./UpdateConsignment";
import AddConsignment from "./AddConsignmentModal";
import fishConsignmentStore from "@/store/fishConsignmentStore.jsx";
import fishConsignment from "@/components/user/pages/FishConsignment.jsx";
import ConsignmentDetail from "@/components/admin/FishConsignment/ConsignmentDetail.jsx";

const ConsignmentSell = () => {
  const [consignments, setConsignments] = useState([]);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const {fetchFishConsignments, loading, error, createFishConsignmentSell, fishConsignments} = fishConsignmentStore()

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

  const handleViewDetails = (record) => {
    setCurrentConsignment(record);
    setIsDetailVisible(true);
  };

  // Hàm đóng modal chi tiết
  const closeDetailModal = () => {
    setIsDetailVisible(false);
    setCurrentConsignment(null);
  };

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

  const statusColors = {
    PendingApproval: 'blue',
    Approved: 'green',
    OnProcessing: 'orange',
    Rejected: 'red',
    Completed: 'purple',
    Cancelled: 'gray',
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: ['fishInfo', 'imageUrl'],
      key: 'fishInfo.imageUrl',
      render: (url) => <img src={url} alt="fish" style={{width: 100, borderRadius: "10px"}}/>
    },
    {
      title: "Tên cá Koi",
      dataIndex: ['fishInfo', 'name'],
      key: "fishInfo.name",
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hình thức kí gửi",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Giá ban đầu",
      dataIndex: "initialPrice",
      key: "initialPrice",
      render: (text) => `${parseFloat(text).toLocaleString()} VND`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => (text ? new Date(text).toLocaleDateString() : ""),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'consignmentStatus',
      key: 'consignmentStatus',
      render: (status) => (
        <Tag color={statusColors[status] || 'default'}>
          {status === 'PendingApproval' ? 'Đang chờ duyệt' :
            status === 'Approved' ? 'Đã duyệt' :
              status === 'OnProcessing' ? 'Đang xử lý' :
                status === 'Rejected' ? 'Bị từ chối' :
                  status === 'Completed' ? 'Hoàn thành' :
                    status === 'Cancelled' ? 'Đã hủy' :
                      'Không xác định'}
        </Tag>
      ),
    },
    {
      title: <SettingOutlined/>,
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu>
            {/*<Menu.Item key="edit" icon={<EditOutlined/>} onClick={() => handleEdit(record)}>*/}
            {/*  Sửa*/}
            {/*</Menu.Item>*/}
            <Menu.Item key="view" icon={< EyeOutlined/>} onClick={() =>  handleViewDetails(record)}>
              Xem chi tiết
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
      <h1 style={{fontSize: "20px", marginBottom: "20px"}}>Quản lý ký gửi bán</h1>

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

      {/* Modal chi tiết */}
      <ConsignmentDetail
        consignment={currentConsignment}
        visible={isDetailVisible}
        onClose={closeDetailModal}
      />
    </div>
  );
};

export default ConsignmentSell;
