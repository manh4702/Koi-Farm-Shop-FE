// // src/components/user/pages/UserProfilePage.js
import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  message,
  Spin,
  Button,
  Form,
  Input,
  DatePicker,
  Checkbox,
  Modal,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../../../services/customerService";
import { Link } from "react-router-dom";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import moment from "moment";
import { LiaEdit } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUserProfile(profileData);
        form.setFieldsValue({
          ...profileData,
          dateOfBirth: profileData.dateOfBirth
            ? moment(profileData.dateOfBirth)
            : null,
        });
      } catch (error) {
        message.error("Có lỗi xảy ra, vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [form]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const profileData = {
        ...values,
        changePassword: changePassword,
        dateOfBirth: values.dateOfBirth
          ? values.dateOfBirth.toISOString()
          : null,
      };

      const updatedProfile = await updateUserProfile(profileData);
      setUserProfile(updatedProfile);
      message.success("Cập nhật thông tin thành công!");
      setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa sau khi cập nhật thành công
    } catch (error) {
      message.error("Cập nhật thông tin không thành công.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Chuyển sang chế độ chỉnh sửa
  };

  const handleDeactivateAccount = async () => {
    Modal.confirm({
      title: "Vô hiệu hóa tài khoản",
      content: "Bạn có chắc chắn muốn vô hiệu hóa tài khoản của mình?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        setLoading(true);
        try {
          await deleteUser(userProfile.userId);
          message.success("Tài khoản đã được vô hiệu hóa.");
          navigate("/login"); // Điều hướng về trang đăng nhập sau khi vô hiệu hóa
        } catch (error) {
          message.error("Vô hiệu hóa tài khoản không thành công.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  //   if (loading) {
  //     return <Spin tip="Đang tải thông tin người dùng..." />;
  //   }

  if (!userProfile) {
    return <p>Không có thông tin người dùng.</p>;
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Thông Tin Cá Nhân
        </h1>

        {/* Hiển thị thông tin hoặc form chỉnh sửa */}
        {!isEditing ? (
          <Card
            title="Thông Tin Chung"
            extra={
              <CiEdit
                onClick={handleEditClick}
                style={{ fontSize: "25px", cursor: "pointer" }}
              />
            } // Biểu tượng cây bút
            style={{
              marginBottom: "20px",
              border: "2px solid gray",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              backgroundColor: "gray",
            }}
            headStyle={{
              backgroundColor: "gray",
              color: "white",
              fontWeight: "bold",
            }}
            bodyStyle={{
              backgroundColor: "#ffffff",
            }}
          >
            <Descriptions column={1}>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Họ và Tên
                  </span>
                }
              >
                {userProfile.name}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Email
                  </span>
                }
              >
                {userProfile.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Số Điện Thoại
                  </span>
                }
              >
                {userProfile.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Ngày Sinh
                  </span>
                }
              >
                {new Date(userProfile.dateOfBirth).toLocaleDateString()}
              </Descriptions.Item>
              {/* <Descriptions.Item
                label={
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Trạng Thái
                  </span>
                }
              >
                {userProfile.status}
              </Descriptions.Item> */}
            </Descriptions>
          </Card>
        ) : (
          <Card
            title="Cập Nhật Thông Tin"
            style={{
              marginBottom: "20px",
              border: "2px solid gray",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              backgroundColor: "gray",
            }}
            headStyle={{
              backgroundColor: "gray",
              color: "white",
              fontWeight: "bold",
            }}
            bodyStyle={{
              backgroundColor: "#ffffff",
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              initialValues={{
                name: userProfile.name,
                email: userProfile.email,
                phone: userProfile.phone,
                dateOfBirth: userProfile.dateOfBirth
                  ? moment(userProfile.dateOfBirth)
                  : null,
              }}
            >
              <Form.Item
                name="name"
                label="Họ và Tên"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số Điện Thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="dateOfBirth" label="Ngày Sinh">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Checkbox
                checked={changePassword}
                onChange={(e) => setChangePassword(e.target.checked)}
                style={{ marginBottom: "20px" }}
              >
                Thay Đổi Mật Khẩu
              </Checkbox>

              {changePassword && (
                <>
                  <Form.Item
                    name="currentPassword"
                    label="Mật Khẩu Hiện Tại"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu hiện tại!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="Mật Khẩu Mới"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Xác Nhận Mật Khẩu Mới"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng xác nhận mật khẩu mới!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật khẩu xác nhận không khớp!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </>
              )}

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ color: "white", backgroundColor: "green" }}
                >
                  Cập Nhật
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}

        <Card
          title="Địa Chỉ"
          extra={
            <Button
              type="primary"
              style={{
                color: "white",
                backgroundColor: "brown",
                // borderColor: "black",
              }}
            >
              Thêm Địa Chỉ
            </Button>
          }
          style={{
            marginBottom: "20px",
            border: "2px solid gray",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            backgroundColor: "gray",
          }}
          headStyle={{
            backgroundColor: "gray",
            color: "white",
            fontWeight: "bold",
          }}
          bodyStyle={{
            backgroundColor: "#ffffff",
          }}
        >
          {userProfile.addresses.length > 0 ? (
            userProfile.addresses.map((address, index) => (
              <Card
                key={index}
                type="inner"
                title={`Địa chỉ ${index + 1}`}
                style={{ marginBottom: "10px" }}
              >
                <p>{address}</p>
              </Card>
            ))
          ) : (
            <p>Không có địa chỉ nào.</p>
          )}
        </Card>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="danger"
            onClick={handleDeactivateAccount}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Vô hiệu hóa tài khoản
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
