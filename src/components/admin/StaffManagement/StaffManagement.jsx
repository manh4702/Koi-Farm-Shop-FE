import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Switch,
  Select,
  Upload,
  message,
} from "antd";
import {
  UploadOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Calendar from "./Calendar"; // Import Calendar

const { Option } = Select;

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    {
      key: "1",
      avatar:
        "https://th.bing.com/th?id=OSK.vAVgNtmxfd8YO0kEZHIT1A&w=130&h=100&c=8&r=0&o=6&pid=SANGAM", // Example URL
      username: "alice_smith",
      fullName: "Alice Smith",
      phone: "0123456789",
      email: "alice@example.com",
      position: "Nhân viên chăm sóc cá", // Chức vụ
      hasAccess: false, // Truy cập trang web (default không có)
      workSchedule: [
        { date: "2023-09-01", status: "Làm việc" },
        { date: "2023-09-02", status: "Nghỉ phép" },
        { date: "2023-09-03", status: "Làm việc" },
      ],
    },
    {
      key: "2",
      avatar:
        "https://th.bing.com/th?id=OSK.58d505ebd03191fc0e909e43554a6aa5&w=80&h=80&c=7&r=0&o=6&pid=SANGAM", // Example URL
      username: "bob_johnson",
      fullName: "Bob Johnson",
      phone: "9876543210",
      email: "bob@example.com",
      position: "Nhân viên bán hàng", // Chức vụ
      hasAccess: true, // Truy cập trang web
      workSchedule: [
        { date: "2023-09-01", status: "Làm việc" },
        { date: "2023-09-02", status: "Làm việc" },
        { date: "2023-09-03", status: "Nghỉ phép" },
      ],
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showCalendarModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setCalendarModalVisible(true);
  };

  const handleCancelCalendar = () => {
    setCalendarModalVisible(false);
    setSelectedStaff(null);
  };

  const showAddModal = () => {
    setSelectedStaff(null);
    setIsModalVisible(true);
  };

  const handleEdit = (staffMember) => {
    setSelectedStaff(staffMember);
    form.setFieldsValue({
      ...staffMember,
    });
    setIsEditModalVisible(true);
  };

  const handleDelete = (key) => {
    setStaff(staff.filter((member) => member.key !== key));
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setSelectedStaff(null);
  };

  const handleEditSubmit = (values) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có muốn lưu thay đổi?",
      onOk: () => {
        setStaff((prevStaff) =>
          prevStaff.map((member) =>
            member.key === selectedStaff.key ? { ...member, ...values } : member
          )
        );
        message.success("Thay đổi đã được lưu");
        setIsEditModalVisible(false);
      },
    });
  };

  const handleAddSubmit = (values) => {
    setStaff((prevStaff) => [
      ...prevStaff,
      {
        ...values,
        key: (prevStaff.length + 1).toString(),
        hasAccess:
          values.position === "Nhân viên bán hàng" ||
          values.position === "Quản lý",
      },
    ]);
    setIsModalVisible(false);
  };

  const handleAccessToggle = (key, checked) => {
    setStaff((prevStaff) =>
      prevStaff.map((member) =>
        member.key === key ? { ...member, hasAccess: checked } : member
      )
    );
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "avatar",
      render: (text, record) => (
        <img
          src={record.avatar || "https://via.placeholder.com/50"}
          alt={record.fullName}
          width="50"
          height="50"
        />
      ),
    },
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
      title: "Chức vụ",
      dataIndex: "position",
    },
    {
      title: "Truy cập trang web",
      dataIndex: "hasAccess",
      render: (text, record) => (
        <Switch
          checked={record.hasAccess}
          onChange={(checked) => handleAccessToggle(record.key, checked)}
          disabled={
            record.position !== "Nhân viên bán hàng" &&
            record.position !== "Quản lý"
          }
        />
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button onClick={() => handleDelete(record.key)} danger>
            Xóa
          </Button>
          <Button
            icon={<CalendarOutlined />}
            onClick={() => showCalendarModal(record)}
          >
            Lịch
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <h1>Quản Lý Nhân Viên</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ float: "right", marginBottom: "10px" }}
        onClick={showAddModal}
      >
        Thêm nhân viên
      </Button>
      <Table columns={columns} dataSource={staff} />

      {/* Modal thêm nhân viên */}
      <Modal
        title="Thêm nhân viên mới"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical" onFinish={handleAddSubmit}>
          <Form.Item
            label="Tên Tài Khoản"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ và Tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Số Điện Thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Chức vụ" name="position">
            <Select>
              <Option value="Nhân viên chăm sóc cá">
                Nhân viên chăm sóc cá
              </Option>
              <Option value="Nhân viên bán hàng">Nhân viên bán hàng</Option>
              <Option value="Quản lý">Quản lý</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm Nhân Viên
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal sửa nhân viên */}
      <Modal
        title="Chỉnh sửa nhân viên"
        visible={isEditModalVisible}
        footer={null}
        onCancel={handleCancelEdit}
      >
        <Form layout="vertical" form={form} onFinish={handleEditSubmit}>
          <Form.Item label="Ảnh" name="avatar">
            <Upload>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Tên Tài Khoản" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Họ và Tên" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Số Điện Thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập địa chỉ email hợp lệ",
              },
              {
                required: true,
                message: "Vui lòng nhập email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Chức vụ" name="position">
            <Select
              onChange={(value) =>
                form.setFieldsValue({
                  hasAccess:
                    value === "Nhân viên bán hàng" || value === "Quản lý",
                })
              }
            >
              <Option value="Nhân viên chăm sóc cá">
                Nhân viên chăm sóc cá
              </Option>
              <Option value="Nhân viên bán hàng">Nhân viên bán hàng</Option>
              <Option value="Quản lý">Quản lý</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Truy cập trang web"
            name="hasAccess"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập Nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal lịch làm việc */}
      <Modal
        title={`Lịch Làm Việc - ${selectedStaff?.fullName}`}
        visible={calendarModalVisible}
        footer={null}
        onCancel={handleCancelCalendar}
        width={600}
      >
        {selectedStaff && (
          <Calendar workSchedule={selectedStaff.workSchedule} />
        )}
      </Modal>
    </div>
  );
};

export default StaffManagement;
