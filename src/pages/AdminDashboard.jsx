import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import Sidebar from "../components/admin/Sidebar";
import HeaderBar from "../components/admin/HeaderBar";
import DashboardContent from "../components/admin/DashboardContent";
import Sider from "antd/es/layout/Sider";
import { Route, Routes } from "react-router-dom";
import FishInfo from "../components/admin/InformationFish/FishInfo";
import OrderManagement from "../components/admin/InformationOrder/OrderManagement";
import OrderList from "../components/admin/InformationOrder/OrderList";
import ProcessingOrders from "../components/admin/InformationOrder/ProcessingOrders";
import CompletedOrders from "../components/admin/InformationOrder/CompletedOrders";
import OrderTracking from "../components/admin/InformationOrder/OrderTracking";

const { Content, Footer } = Layout;

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <DashboardContent />;
      case "fish-info":
        return <FishInfo />;
      // case "order-management":
      //   return <OrderManagement />;
      case "order-list":
        return <OrderList />;
      case "processing-orders":
        return <ProcessingOrders />; 
      case "completed-orders":
        return <CompletedOrders />; 
      case "order-tracking":
        return <OrderTracking />; 

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
              selectedKey === "processing-orders" ||
              selectedKey === "completed-orders" ||
              selectedKey === "order-tracking") && (
              <Breadcrumb.Item>Order Management</Breadcrumb.Item>
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
            {selectedKey === "processing-orders" && (
              <Breadcrumb.Item>Đơn hàng đang xử lý</Breadcrumb.Item>
            )}
            {selectedKey === "completed-orders" && (
              <Breadcrumb.Item>Đơn hàng hoàn thành</Breadcrumb.Item>
            )}
            {selectedKey === "order-tracking" && (
              <Breadcrumb.Item>Theo dõi trạng thái đơn hàng</Breadcrumb.Item>
            )}
          </Breadcrumb>
          {/* <DashboardContent /> */}
          {renderContent()}
        </Content>
        <Footer style={{ textAlign: "center" }}>Admin Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
