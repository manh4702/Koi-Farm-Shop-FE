// // // src/components/user/Account/UserProfilePage.js

import React, {useEffect, useState} from "react";
import {
  Card,
  Descriptions,
  message,
  Button,
  Form,
  Input,
  DatePicker,
  Checkbox,
  Modal, Table, Tag,
} from "antd";
import {CiEdit} from "react-icons/ci";
import {FaHistory} from "react-icons/fa";
import {MdOutlineSecurity, MdFeedback} from "react-icons/md";
import {FaFish} from "react-icons/fa";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser, getOrderHistory,
} from "../../../services/customerService";
import moment from "moment";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import {GrOverview} from "react-icons/gr";
import fishConsignmentStore from "@/store/fishConsignmentStore.jsx";

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState("overview");
  const [form] = Form.useForm();
  const [orderHistory, setOrderHistory] = useState([]);
  const [consignments, setConsignments] = useState([]);

  const {
    fishConsignments,
    error,
    fetchFishConsignmentsUser,
  } = fishConsignmentStore();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetchFishConsignmentsUser(userId);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [form]);

  useEffect(() => {
    // Only set form values once userProfile is fetched and non-null
    if (userProfile) {
      form.setFieldsValue({
        ...userProfile,
        dateOfBirth: userProfile.dateOfBirth
          ? moment(userProfile.dateOfBirth)
          : null,
      });
    }
  }, [userProfile, form]); // form instance and userProfile as dependencies

  const fetchUserProfile = async () => {
    try {
      const profileData = await getUserProfile();
      setUserProfile(profileData);
      if (profileData?.userId) {
        fetchOrderHistory(profileData.userId);
      }
    } catch (error) {
      // message.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderHistory = async (userId) => {
    try {
      setLoading(true);
      const orders = await getOrderHistory(userId);
      setOrderHistory(orders);
      console.log(orders);
    } catch (error) {
      // message.error("Có lỗi xảy ra khi tải lịch sử đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const profileData = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? values.dateOfBirth.toISOString()
          : null,
        // changePassword: !!values.currentPassword,
      };

      // if (values.currentPassword) {
      //   profileData.currentPassword = values.currentPassword;
      //   profileData.newPassword = values.newPassword;
      //   profileData.confirmPassword = values.confirmPassword;
      // }

      const updatedProfile = await updateUserProfile(profileData);
      setUserProfile(updatedProfile);
      message.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error) {
      message.error("Cập nhật thông tin không thành công.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (values) => {
    setLoading(true);
    try {
      // Kiểm tra các trường dữ liệu mật khẩu
      if (values.newPassword !== values.confirmPassword) {
        message.error("Mật khẩu xác nhận không khớp!");
        setLoading(false);
        return;
      }

      // Tạo dữ liệu để gửi yêu cầu cập nhật mật khẩu
      const profileData = {
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        dateOfBirth: userProfile.dateOfBirth,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        changePassword: true,
      };
      // Gọi API để cập nhật mật khẩu
      const response = await updateUserProfile(profileData);

      // Kiểm tra phản hồi từ API
      if (response.message === "Current password is incorrect.") {
        message.error("Mật khẩu hiện tại không đúng, vui lòng thử lại.");
      } else {
        message.success("Cập nhật mật khẩu thành công!");
      }
    } catch (error) {
      // Xử lý lỗi khác nếu có
      message.error("Mật khẩu hiện tại không đúng, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
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
        } catch (error) {
          message.error("Vô hiệu hóa tài khoản không thành công.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "overview":
        return renderOverview();
      case "security":
        return renderSecuritySettings();
      case "orderHistory":
        return renderOrderHistory();
      case "consignmentHistory":
        return renderConsignmentHistory();
      case "favorites":
        return <div>Sản phẩm yêu thích</div>;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div>
      <h2
        style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}
      >
        Thông Tin Cá Nhân
      </h2>
      {!isEditing ? (
        <Card
          title="Thông Tin Chung"
          extra={
            <CiEdit
              onClick={handleEditClick}
              style={{fontSize: "25px", cursor: "pointer"}}
            />
          }
          style={{
            marginBottom: "20px",
            border: "2px solid gray",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            backgroundColor: "gray",
          }}
          styles={{
            header: {
              backgroundColor: "gray",
              color: "white",
              fontWeight: "bold",
            },
            body: {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Descriptions column={1}>
            <Descriptions.Item
              label={
                <span style={{fontWeight: "bold", color: "black"}}>
                  Họ và Tên
                </span>
              }
            >
              {userProfile?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span style={{fontWeight: "bold", color: "black"}}>
                  Email
                </span>
              }
            >
              {userProfile?.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span style={{fontWeight: "bold", color: "black"}}>
                  Số Điện Thoại
                </span>
              }
            >
              {userProfile?.phone}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span style={{fontWeight: "bold", color: "black"}}>
                  Ngày Sinh
                </span>
              }
            >
              {userProfile?.dateOfBirth
                ? new Date(userProfile.dateOfBirth).toLocaleDateString()
                : "Chưa cập nhật"}
            </Descriptions.Item>
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
          styles={{
            header: {
              backgroundColor: "gray",
              color: "white",
              fontWeight: "bold",
            },
            body: {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="name"
              label="Họ và Tên"
              rules={[{required: true}]}
            >
              <Input style={{width: "25rem", border: "1px solid black"}}/>
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{required: true, type: "email"}]}
            >
              <Input style={{width: "25rem", border: "1px solid black"}}/>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số Điện Thoại"
              rules={[{required: true}]}
            >
              <Input style={{width: "25rem", border: "1px solid black"}}/>
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Ngày Sinh">
              <DatePicker
                style={{width: "25rem", border: "1px solid black"}}
              />
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                float: "left",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{marginRight: "10px", backgroundColor: "green"}}
              >
                Cập Nhật
              </Button>
              <Button onClick={() => setIsEditing(false)}>Hủy</Button>
            </div>
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
        {userProfile?.addresses.length > 0 ? (
          userProfile.addresses.map((address, index) => (
            <Card
              key={index}
              type="inner"
              title={`Địa chỉ ${index + 1}`}
              style={{marginBottom: "10px"}}
            >
              <p>{address}</p>
            </Card>
          ))
        ) : (
          <p>Không có địa chỉ nào.</p>
        )}
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div>
      <h2
        style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}
      >
        Bảo mật
      </h2>
      {/* <Checkbox style={{ marginBottom: "20px" }}>Thay Đổi Mật Khẩu</Checkbox> */}
      <Card
        title="Cập Nhật Mật Khẩu"
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
          layout="vertical"
          onFinish={handlePasswordUpdate}
          style={{width: "100%"}}
        >
          <Form.Item
            name="currentPassword"
            label="Mật Khẩu Hiện Tại"
            rules={[
              {required: true, message: "Vui lòng nhập mật khẩu hiện tại!"},
            ]}
          >
            <Input.Password
              style={{width: "25rem", border: "1px solid black"}}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật Khẩu Mới"
            rules={[{required: true, message: "Vui lòng nhập mật khẩu mới!"}]}
          >
            <Input.Password
              style={{width: "25rem", border: "1px solid black"}}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác Nhận Mật Khẩu Mới"
            rules={[
              {required: true, message: "Vui lòng xác nhận mật khẩu mới!"},
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              style={{width: "25rem", border: "1px solid black"}}
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              float: "left",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{backgroundColor: "green", borderColor: "green"}}
            >
              Cập Nhật Mật Khẩu
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );

  const renderOrderHistory = () => (
    <div>
      <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}>
        Lịch sử đơn hàng
      </h2>
      <Table
        dataSource={orderHistory.map((order) => ({
          ...order,
          key: order.orderId,
        }))}
        style={{width: "100%", maxWidth: "1000px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)"}}
        columns={[
          // {
          //   title: "Mã Đơn Hàng",
          //   dataIndex: "orderId",
          //   key: "orderId",
          // },
          {
            title: "Ngày Đặt",
            dataIndex: "orderDate",
            key: "orderDate",
            render: (date) => moment(date).format("DD/MM/YYYY"),
          },
          {
            title: "Sản Phẩm",
            dataIndex: "items",
            key: "items",
            render: (items) =>
              items.map((item, index) => (
                <div key={index} style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                  <img
                    src={item.packageImage}
                    alt={item.packageName}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <div style={{fontWeight: "bold"}}>{item.packageName}</div>
                    <div>Số lượng: {item.quantity}</div>
                  </div>
                </div>
              )),
          },
          {
            title: "Địa Chỉ",
            dataIndex: "address",
            key: "address",
            render: (address) =>
              address ? (
                <div>
                  <div>{address.street || "Chưa cập nhật"}</div>
                  <div>{`${address.district || ""}, ${address.city || ""}`}</div>
                </div>
              ) : (
                <div>Không có địa chỉ</div>
              ),
          },
          {
            title: "Tổng Tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (amount) => `${amount.toLocaleString()}₫`,
          },
          {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
              let color = "";
              let text = "";

              if (status === "COMPLETED") {
                color = "green";
                text = "Hoàn thành";
              } else if (status === "PENDING") {
                color = "orange";
                text = "Đang xử lý";
              } else {
                color = "red";
                text = "Đã hủy";
              }

              return <Tag color={color}>{text}</Tag>;
            },
          },
        ]}
        bordered
        pagination={{pageSize: 5}}
        loading={loading}
      />
    </div>
  );

  const renderConsignmentHistory = () => (
    <div>
      <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}>
        Lịch sử kí gửi
      </h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p style={{color: "red"}}>{error}</p>
      ) : fishConsignments.length > 0 ? (
        fishConsignments.map((consignment) => (
          <Card
            key={consignment.fishConsignmentId}
            style={{
              marginBottom: "10px",
              border: "1px solid gray",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Descriptions column={1}>
              <Descriptions.Item
                label={
                  <span style={{fontWeight: "bold"}}>
                    ID Kí Gửi
                  </span>
                }
              >
                {consignment.fishConsignmentId}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{fontWeight: "bold"}}>
                    Ngày Tạo
                  </span>
                }
              >
                {moment(consignment.createDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{fontWeight: "bold"}}>
                    Mục Đích
                  </span>
                }
              >
                {consignment.purpose}
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <span style={{fontWeight: "bold"}}>
                    Trạng Thái
                  </span>
                }
              >
                {(() => {
                  switch (consignment.consignmentStatus) {
                    case "PendingApproval":
                      return <Tag color="orange">Đang chờ duyệt</Tag>;
                    case "Approved":
                      return <Tag color="blue">Đã duyệt</Tag>;
                    case "PriceAgreed":
                      return <Tag color="cyan">Đã thỏa thuận giá</Tag>;
                    case "Rejected":
                      return <Tag color="red">Bị từ chối</Tag>;
                    case "Completed":
                      return <Tag color="green">Hoàn thành</Tag>;
                    default:
                      return <Tag color="gray">Không xác định</Tag>;
                  }
                })()}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span style={{fontWeight: "bold"}}>
                    Mô Tả
                  </span>
                }
              >
                {consignment.conditionDescription}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ))
      ) : (
        <p>Không có kí gửi nào.</p>
      )}
    </div>
  );


  return (
    <>
      <Header/>
      <div style={{display: "flex", margin: "0 200px"}}>
        <div
          style={{
            width: "25%",
            borderRight: "1px solid #ccc",
            padding: "20px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h2
            style={{
              color: "#343a40",
              fontSize: "30px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Tài khoản
          </h2>
          <ul style={{listStyleType: "none", padding: 0}}>
            <li
              onClick={() => setSelectedSection("overview")}
              style={{
                fontSize: "18px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor:
                  selectedSection === "overview" ? "brown" : "transparent",
                color: selectedSection === "overview" ? "white" : "black",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <GrOverview style={{marginRight: "8px"}}/> Tổng quan
            </li>
            <li
              onClick={() => setSelectedSection("orderHistory")}
              style={{
                fontSize: "18px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor:
                  selectedSection === "orderHistory" ? "brown" : "transparent",
                color: selectedSection === "orderHistory" ? "white" : "black",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FaHistory style={{marginRight: "8px"}}/> Lịch sử đơn hàng
            </li>
            <li
              onClick={() => setSelectedSection("security")}
              style={{
                fontSize: "18px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor:
                  selectedSection === "security" ? "brown" : "transparent",
                color: selectedSection === "security" ? "white" : "black",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <MdOutlineSecurity style={{marginRight: "8px"}}/> Bảo mật
            </li>
            <li
              onClick={() => setSelectedSection("consignmentHistory")}
              style={{
                fontSize: "18px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor:
                  selectedSection === "consignmentHistory" ? "brown" : "transparent",
                color: selectedSection === "consignmentHistory" ? "white" : "black",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FaFish style={{marginRight: "8px"}}/> Lịch sử kí gửi
            </li>
          </ul>
        </div>
        <div style={{width: "75%", padding: "20px"}}>{renderContent()}</div>
      </div>
      <Footer/>
    </>
  );
};

export default UserProfilePage;
