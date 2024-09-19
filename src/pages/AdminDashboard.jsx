// import React from 'react';
// import { Layout, Menu, Breadcrumb, Card, Row, Col } from 'antd';
// import { UserOutlined, DashboardOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const { Header, Content, Footer, Sider } = Layout;

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate('/login');
//   };
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider collapsible>
//         <div className="logo" style={{ height: '32px', margin: '16px', color: 'white', textAlign: 'center' }}>Admin</div>
//         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//           <Menu.Item key="1" icon={<DashboardOutlined />}>
//             Dashboard
//           </Menu.Item>
//           <Menu.Item key="2" icon={<UserOutlined />}>
//             Users
//           </Menu.Item>
//           <Menu.Item key="3" icon={<SettingOutlined />}>
//             Settings
//           </Menu.Item>
//         </Menu>
//       </Sider>
//       <Layout className="site-layout">
//         <Header style={{ padding: 0, background: '#fff', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '16px' }}>
//           <Button
//             type="primary"
//             icon={<LogoutOutlined />}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </Header>
//         <Content style={{ margin: '0 16px' }}>
//           <Breadcrumb style={{ margin: '16px 0' }}>
//             <Breadcrumb.Item>Admin</Breadcrumb.Item>
//             <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
//           </Breadcrumb>

//           <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
//             <Row gutter={16}>
//               <Col span={8}>
//                 <Card title="Total Users" bordered={false}>
//                   100 Users
//                 </Card>
//               </Col>
//               <Col span={8}>
//                 <Card title="Active Sessions" bordered={false}>
//                   25 Active
//                 </Card>
//               </Col>
//               <Col span={8}>
//                 <Card title="Server Status" bordered={false}>
//                   Running
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>Admin Dashboard ©2024</Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import Sidebar from "../components/admin/Sidebar";
import HeaderBar from "../components/admin/HeaderBar";
import DashboardContent from "../components/admin/DashboardContent";
import Sider from "antd/es/layout/Sider";
import { Route, Routes } from "react-router-dom";
import FishInfo from "../components/admin/InformationFish/FishInfo";

const { Content, Footer } = Layout;

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <DashboardContent />;
      case "fish-info":
        return <FishInfo />;
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
            {/* <Breadcrumb.Item>Dashboard</Breadcrumb.Item> */}
            <Breadcrumb.Item>
              {selectedKey === "dashboard" ? "Dashboard" : "Fish Info"}
            </Breadcrumb.Item>
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
