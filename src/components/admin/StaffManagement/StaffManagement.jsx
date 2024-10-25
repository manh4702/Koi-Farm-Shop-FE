import React, { useEffect, useState } from "react";
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
  DatePicker,
} from "antd";
import {
  UploadOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Calendar from "./Calendar"; // Import Calendar
import {
  createManager,
  createStaff,
  deleteStaff,
  deleteUser,
  fetchUsersByRole,
} from "../../../services/userService";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";

const { Option } = Select;

const StaffManagement = () => {
  useAuth();
  const [manager, setManager] = useState([]);
  const [staff, setStaff] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [role, setRole] = useState("Staff");

  const loadStaff = async () => {
    try {
      setLoading(true);
      // const timestamp = new Date().getTime();
      // const staffData = await fetchUsersByRole([2, 3]); // Lấy danh sách nhân viên có roleId = 3
      const managerData = await fetchUsersByRole("Manager");
      const staffData = await fetchUsersByRole("Staff");
      console.log("staff:", staffData, "manager:", managerData);
      setStaff(staffData);
      setManager(managerData);
      // setLoading(false);
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu nhân viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const combinedData = [...manager, ...staff];

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

  const handleAddSubmit = async (values) => {
    // Dữ liệu gửi đến API
    const newUserData = {
      name: values.name,
      email: values.email,
      password: "Abc@123",
      phone: values.phone,
      dateOfBirth: moment(values.dateOfBirth).toISOString(),
    };

    try {
      if (role === "Manager") {
        await createManager(newUserData);
        message.success("Thêm quản lý thành công");
      } else {
        await createStaff(newUserData);
        message.success("Thêm nhân viên thành công");
      }
      loadStaff();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Lỗi khi thêm nhân viên");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (staffMember) => {
    setSelectedStaff(staffMember);
    form.setFieldsValue({
      ...staffMember,
    });
    setIsEditModalVisible(true);
  };

  const handleDelete = (userId) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc chắn muốn xóa nhân viên này?",
      onOk: async () => {
        try {
          await deleteStaff(userId);
          message.success("Đã xóa nhân viên thành công");
          loadStaff(); // Tải lại danh sách sau khi xóa thành công
        } catch (error) {
          message.error("Lỗi khi xóa nhân viên");
        }
      },
    });
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

  const handleAccessToggle = (key, checked) => {
    setStaff((prevStaff) =>
      prevStaff.map((member) =>
        member.key === key ? { ...member, hasAccess: checked } : member
      )
    );
  };

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "userName",
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
      render: (_, record) => {
        if (record.roleName === "Manager") {
          return "Quản lý";
        } else if (record.roleName === "Staff") {
          return "Nhân viên";
        } else {
          return "Unknown";
        }
      },
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button onClick={() => handleDelete(record.userId)} danger>
            Xóa
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
      <Table columns={columns} dataSource={combinedData} loading={loading} />

      {/* Modal thêm nhân viên */}
      <Modal
        title="Thêm nhân viên mới"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={handleAddSubmit}>
          
          <Form.Item
            label="Chức vụ"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn chức vụ" }]}
          >
            <Select onChange={(value) => setRole(value)}>
              <Option value="Manager">Quản lý</Option>
              <Option value="Staff">Nhân viên</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Họ và Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số Điện Thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { len: 10, message: "Số điện thoại phải có đúng 10 chữ số" },
            ]}
          >
            <Input
              maxLength={10} 
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
          </Form.Item>

          <Form.Item
            label="Ngày Sinh"
            name="dateOfBirth"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
            />
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
      {/* <Modal
        title={`Lịch Làm Việc - ${selectedStaff?.fullName}`}
        visible={calendarModalVisible}
        footer={null}
        onCancel={handleCancelCalendar}
        width={600}
      >
        {selectedStaff && (
          <Calendar workSchedule={selectedStaff.workSchedule} />
        )}
      </Modal> */}
    </div>
  );
};

export default StaffManagement;
