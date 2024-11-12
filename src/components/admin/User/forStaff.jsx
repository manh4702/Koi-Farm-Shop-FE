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
  DatePicker,
  Switch, Avatar, Divider, Descriptions, Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
  DownOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  deleteUser,
  fetchUsersByRole,
  restoreUser,
  updateUser,
} from "../../../services/userService";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";

const { TabPane } = Tabs;

const CustomerManagementFS = () => {
  useAuth();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const customersData = await fetchUsersByRole("Customer"); // Lấy danh sách khách hàng có roleId = 2
      setCustomers(customersData);
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu khách hàng");
    } finally {
      setLoading(false);
    }
  };

  console.log("customers", customers);

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleView = (customer) => {
    setSelectedCustomer(customer);
  };

  

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditCustomer(null);
    form.resetFields();
    // document.activeElement.blur();
  };
 

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
    },
    {
      title: "Điểm tích luỹ",
      dataIndex: "points",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (status, record) => (
        <Switch
          checked={status !== "Disable"}
          // onChange={(checked) => handleStatusToggle(record.userId, checked)}
          onChange={(checked) => handleStatusToggle(record.userId, status)}
          // checkedChildren="Kích hoạt"
          // unCheckedChildren="Disable"
          style={{
            backgroundColor: record.status === "Active" ? "#52c41a" : "#f5222d", // Green for active, red for inactive
          }}
        />
      ),
    },
    {
      title: <SettingOutlined />,
      key: "action",
      render: (_, record, index) => {
        const menu = (
          <Menu>
            
            <Menu.Item
              key="view"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            >
              Xem
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
          <h1>Quản Lý Khách Hàng</h1>
          <div style={{ maxHeight: "400px" }}>
            <Table
              columns={columns}
              dataSource={customers}
              rowKey="userId"
              pagination={10}
              scroll={{ y: 325 }}
              loading={loading}
            />
          </div>
        </Col>

        {selectedCustomer && (
          <Modal
            title={`Chi tiết của ${selectedCustomer.fullName}`}
            visible={!!selectedCustomer}
            onCancel={() => setSelectedCustomer(null)}
            footer={null}
            width={800}
          >
            <div style={{padding: "20px"}}>
              {/* Phần Avatar hoặc hình đại diện */}
              <div style={{textAlign: "center", marginBottom: "24px"}}>
                <Avatar
                  size={120}
                  src={selectedCustomer.avatar}
                  style={{
                    backgroundColor: '#87d068',
                    fontSize: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedCustomer.fullName?.charAt(0)}
                </Avatar>
              </div>

              <Divider orientation="left">Thông tin cơ bản</Divider>

              <Descriptions
                bordered
                column={{xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1}}
              >
                <Descriptions.Item label="Họ và tên" span={2}>
                  <strong>{selectedCustomer.fullName}</strong>
                </Descriptions.Item>

                <Descriptions.Item label="Email">
                  {selectedCustomer.email}
                </Descriptions.Item>

                <Descriptions.Item label="Số điện thoại">
                  {selectedCustomer.phone}
                </Descriptions.Item>

                <Descriptions.Item label="Trạng thái">
                  <Tag color={selectedCustomer.status === "Active" ? "green" : "red"}>
                    {selectedCustomer.status === "Active" ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                  </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Điểm tích lũy">
          <span style={{color: "#f50"}}>
            {selectedCustomer.points} điểm
          </span>
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Thông tin chi tiết</Divider>

              <Descriptions
                bordered
                column={{xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1}}
              >
                <Descriptions.Item label="Ngày sinh">
                  {moment(selectedCustomer.dob).format('DD/MM/YYYY')}
                </Descriptions.Item>

                <Descriptions.Item label="Địa chỉ" span={2}>
                  {selectedCustomer.address || "Chưa cập nhật"}
                </Descriptions.Item>
              </Descriptions>
              <Divider orientation="left">Danh sách địa chỉ</Divider>
              <Row gutter={[16, 16]}>
                {selectedCustomer.addresses.map((address, index) => (
                  <Col xs={24} sm={12} key={address.addressId}>
                    <Card
                      size="small"
                      title={`Địa chỉ ${index + 1}`}
                      style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <p><strong>Đường:</strong> {address.street}</p>
                      <p><strong>Quận/Huyện:</strong> {address.district}</p>
                      <p><strong>Thành phố:</strong> {address.city}</p>
                      <Divider style={{margin: '8px 0'}}/>
                      <p style={{
                        margin: 0,
                        color: '#1890ff',
                        fontSize: '13px'
                      }}>
                        Địa chỉ đầy đủ: {`${address.street}, ${address.district}, ${address.city}`}
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Divider orientation="left">Lịch sử đơn hàng</Divider>

              <Table
                dataSource={selectedCustomer.orders}
                columns={[
                  {
                    title: "Mã đơn hàng",
                    dataIndex: "orderId",
                    key: "orderId",
                  },
                  {
                    title: "Ngày đặt",
                    dataIndex: "date",
                    key: "date",
                    render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
                  },
                  {
                    title: "Tổng tiền",
                    dataIndex: "total",
                    key: "total",
                    render: (total) => new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(total),
                  },
                  {
                    title: "Trạng thái",
                    dataIndex: "status",
                    key: "status",
                    render: (status) => (
                      <Tag color={
                        status === 'COMPLETED' ? 'green' :
                          status === 'PENDING' ? 'gold' :
                            status === 'CANCELLED' ? 'red' : 'blue'
                      }>
                        {status === 'COMPLETED' ? 'Hoàn thành' :
                          status === 'PENDING' ? 'Đang xử lý' :
                            status === 'CANCELLED' ? 'Đã hủy' : 'Đang giao'}
                      </Tag>
                    ),
                  }
                ]}
                pagination={false}
                scroll={{y: 240}}
              />

              {selectedCustomer.feedback && selectedCustomer.feedback.length > 0 && (
                <>
                  <Divider orientation="left">Đánh giá & Phản hồi</Divider>
                  <List
                    itemLayout="horizontal"
                    dataSource={selectedCustomer.feedback}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar}/>}
                          title={
                            <Space>
                              <Rate disabled defaultValue={item.rating}/>
                              <span>{moment(item.date).format('DD/MM/YYYY')}</span>
                            </Space>
                          }
                          description={item.comment}
                        />
                      </List.Item>
                    )}
                  />
                </>
              )}
            </div>
          </Modal>
        )}
      </Row>
    </div>
  );
};

export default CustomerManagementFS;
