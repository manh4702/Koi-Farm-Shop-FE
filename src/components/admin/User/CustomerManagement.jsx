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
  Switch,
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

const CustomerManagement = () => {
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
      const customersData = await fetchUsersByRole(4); // Lấy danh sách khách hàng có roleId = 2
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

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    form.setFieldsValue({ ...customer, dob: moment(customer.dob) });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditCustomer(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const updatedData = {
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      dateOfBirth: values.dob.format("YYYY-MM-DD"),
      password: values.password ? values.password : "",
    };

    try {
      await updateUser(editCustomer.userId, updatedData);
      message.success("Cập nhật thông tin khách hàng thành công");
      handleCancel();
      loadCustomers();
    } catch (error) {
      message.error("Lỗi khi cập nhật thông tin khách hàng");
    }
  };

  // const handleDelete = async (userId) => {
  //   Modal.confirm({
  //     title: "Xác nhận xoá",
  //     content: "Bạn có chắc chắn muốn xóa khách hàng này?",
  //     onOk: async () => {
  //       try {
  //         await deleteUser(userId);
  //         message.success("Đã xóa khách hàng thành công");
  //         loadCustomers(); // Tải lại danh sách sau khi xóa thành công
  //       } catch (error) {
  //         message.error("Lỗi khi xóa khách hàng");
  //       }
  //     },
  //   });
  // };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      if (currentStatus === "Disable") {
        await restoreUser(userId);
        message.success("Đã kích hoạt người dùng thành công");
      } else {
        await deleteUser(userId);
        message.success("Đã vô hiệu hóa người dùng thành công");
      }
      loadCustomers();
    } catch (error) {
      message.error("Lỗi khi thay đổi trạng thái người dùng");
    }
  };

  const columns = [
    {
      title: "Tên Tài Khoản",
      dataIndex: "username",
    },
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
      // title: "Hành Động",
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
            {/* <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.userId)}
            >
              Xóa
            </Menu.Item> */}
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

        {/* {editCustomer && ( */}
        <Modal
          title="Chỉnh Sửa Thông Tin Khách Hàng"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Họ và Tên"
                  name="fullName"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ngày Tháng Năm Sinh"
                  name="dob"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày sinh" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số Điện Thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                    {
                      len: 10,
                      message: "Số điện thoại phải có đúng 10 chữ số",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 10);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Vui lòng nhập email hợp lệ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px", marginTop: "10px" }}
              >
                <SaveOutlined />
                Lưu
              </Button>
              {/* <Popconfirm
                  title="Bạn có chắc chắn muốn xóa khách hàng này không?"
                  onConfirm={handleDelete}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button
                    type="primary"
                    ghost
                    style={{
                      marginTop: "10px",
                      color: "white",
                      backgroundColor: "red",
                      border: "1px solid red",
                    }}
                  >
                    <DeleteOutlined />
                    Xóa
                  </Button>
                </Popconfirm> */}
            </Form.Item>
          </Form>
        </Modal>
        {/* )} */}

        {selectedCustomer && (
          <Col span={24}>
            <Card title={`Thông tin chi tiết của ${selectedCustomer.fullName}`}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Hồ Sơ Khách Hàng" key="1">
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      margin: "-10px 0 10px 0",
                    }}
                  >
                    Thông Tin
                  </h3>

                  <Row gutter={16}>
                    <Col span={12}>
                      <p>
                        <strong>Họ và Tên:</strong> {selectedCustomer.fullName}
                      </p>
                      <p>
                        <strong>Ngày Sinh:</strong> {selectedCustomer.dob}
                      </p>
                      <p>
                        <strong>Số Điện Thoại:</strong> {selectedCustomer.phone}
                      </p>
                    </Col>
                    <Col span={12}>
                      <p>
                        <strong>Email:</strong> {selectedCustomer.email}
                      </p>
                      <p>
                        <strong>Địa Chỉ:</strong> {selectedCustomer.address}
                      </p>
                      <p>
                        <strong>Tích Điểm:</strong> {selectedCustomer.points}
                      </p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="Lịch Sử Đơn Hàng" key="2">
                  <Table
                    columns={[
                      { title: "Mã Đơn", dataIndex: "orderId" },
                      { title: "Ngày", dataIndex: "date" },
                      { title: "Tổng", dataIndex: "total" },
                    ]}
                    dataSource={selectedCustomer.orders}
                    pagination={false}
                  />
                </TabPane>
                <TabPane tab="Đánh Giá & Phản Hồi" key="3">
                  {selectedCustomer.feedback.map((item, index) => (
                    <div key={index}>
                      <Rate disabled value={item.rating} />
                      <p>{item.comment}</p>
                    </div>
                  ))}
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CustomerManagement;
