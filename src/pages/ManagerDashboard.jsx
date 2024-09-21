import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import Sidebar from "../components/manager/Sidebar";
import HeaderBar from "../components/manager/HeaderBar";
import DashboardContent from "../components/manager/DashboardContent";
import Sider from "antd/es/layout/Sider";
import { Route, Routes } from "react-router-dom";
import FishInfo from "../components/manager/InformationFish/FishInfo";
import OrderList from "../components/manager/InformationOrder/OrderList";
import OrderTracking from "../components/manager/InformationOrder/OrderTracking";
import CustomerManagement from "../components/manager/User/CustomerManagement";
import StaffManagement from "../components/manager/StaffManagement/StaffManagement";

const { Content, Footer } = Layout;

const ManagerDashboard = () => {
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
                        {selectedKey === "order-tracking" && (
                            <Breadcrumb.Item>Theo dõi trạng thái đơn hàng</Breadcrumb.Item>
                        )}
                    </Breadcrumb>
                    {/* <DashboardContent /> */}
                    {renderContent()}
                </Content>
                <Footer style={{ textAlign: "center", padding: "15px 0" }}>Admin Dashboard ©2024</Footer>
            </Layout>
        </Layout>
    );
};

export default ManagerDashboard;
