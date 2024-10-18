import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import Sidebar from "../components/manager/Sidebar";
import HeaderBar from "../components/manager/HeaderBar";
import DashboardContent from "../components/manager/DashboardContent";
import Sider from "antd/es/layout/Sider";
import { Route, Routes } from "react-router-dom";
import FishInfo from "../components/admin/InformationFish/FishInfo";
import OrderList from "../components/admin/InformationOrder/OrderList";
import OrderTracking from "../components/admin/InformationOrder/OrderTracking";
import CustomerManagement from "../components/admin/User/CustomerManagement";
import StaffManagement from "../components/admin/StaffManagement/StaffManagement";
import BlogManagement from "../components/admin/BlogManagerment/BlogManagement";
import FAQManagement from "../components/admin/FAQmanagement/FAQmanagement";
import PromotionManagement from "../components/admin/InfoPromotion/PromotionManagement";
import ConsignmentManagement from "../components/admin/FishConsignment/ConsignmentManagement";
import FeedbackAndRate from "../components/admin/Feedback&Rate/FeedbackandRate";

const { Content, Footer } = Layout;

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <DashboardContent />;
      case "user-management":
        return <CustomerManagement />;
      case "fish-info":
        return <FishInfo />;
      case "order-list":
        return <OrderList />;
      case "order-tracking":
        return <OrderTracking />;
      case "staff-management":
        return <StaffManagement />;
      case "blog-management":
        return <BlogManagement />;
      case "FAQ-management":
        return <FAQManagement />;
      case "feedback-management":
        return <FeedbackAndRate />;
      case "promotion-management":
        return <PromotionManagement />;
      case "consignment-management":
        return <ConsignmentManagement />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Sidebar setSelectedKey={setSelectedKey} />
      </Sider>
      <Layout className="site-layout">
        <HeaderBar />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            {(selectedKey === "order-list" ||
              selectedKey === "order-tracking") && (
                <Breadcrumb.Item>Quản lí đơn hàng</Breadcrumb.Item>
              )}
            {selectedKey === "dashboard" && (
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            )}
            {selectedKey === "fish-info" && (
              <Breadcrumb.Item>Fish Info</Breadcrumb.Item>
            )}
            {selectedKey === "order-list" && (
              <Breadcrumb.Item>Order List</Breadcrumb.Item>
            )}
            {selectedKey === "order-tracking" && (
              <Breadcrumb.Item>Theo dõi trạng thái đơn hàng</Breadcrumb.Item>
            )}
          </Breadcrumb>
          {/* <DashboardContent /> */}
          {renderContent()}
        </Content>
        <Footer style={{ textAlign: "center", padding: "15px 0" }}>
          Admin Dashboard ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
