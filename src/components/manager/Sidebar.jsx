import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/logo.jpg";
import { GiCirclingFish } from "react-icons/gi";
import { GrBlog, GrUserManager } from "react-icons/gr";

const { SubMenu } = Menu;

const Sidebar = ({ setSelectedKey }) => {
  return (
    <div className="logo" style={{ height: "100%" }}>
      <div style={{ textAlign: "center", padding: "20px 0 0" }}>
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "inline-block",
          }}
        />
      </div>
      <p
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          padding: "0 0 20px",
        }}
      >
        MANAGER
      </p>

      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          onClick={() => setSelectedKey("dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          onClick={() => setSelectedKey("user-management")}
        >
          Quản lí khách hàng
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<GiCirclingFish />}
          onClick={() => setSelectedKey("fish-info")}
        >
          Thông tin cá
        </Menu.Item>
        {/* SubMenu for Order Management */}
        <SubMenu
          key="4"
          icon={<ShoppingCartOutlined />}
          title="Order Management"
        >
          <Menu.Item key="4-1" onClick={() => setSelectedKey("order-list")}>
            Danh sách đơn hàng
          </Menu.Item>
          <Menu.Item key="4-2" onClick={() => setSelectedKey("order-tracking")}>
            Theo dõi trạng thái đơn hàng
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="5"
          icon={<GrBlog />}
          onClick={() => setSelectedKey("blog-management")}
        >
          Quản lý tin tức
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<QuestionCircleOutlined />}
          onClick={() => setSelectedKey("FAQ-management")}
        >
          FAQ
        </Menu.Item>
        <Menu.Item
          key=""
          icon={<SettingOutlined />}
          onClick={() => setSelectedKey("settings")}
        >
          Settings
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
