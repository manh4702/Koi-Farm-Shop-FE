import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/logo.jpg";

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
        Admin
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
          onClick={() => setSelectedKey("users")}
        >
          Users
        </Menu.Item>
        <Menu.Item key="3" onClick={() => setSelectedKey("fish-info")}>
          InformationFish
        </Menu.Item>
        <Menu.Item
          key="4"
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
