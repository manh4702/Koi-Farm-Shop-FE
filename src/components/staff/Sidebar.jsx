import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/logo.jpg";
import { MdFeedback } from "react-icons/md";
import { GiCirclingFish } from "react-icons/gi";
import { GrUserManager } from "react-icons/gr";
import { GrBlog } from "react-icons/gr";
const { SubMenu } = Menu;

function Sidebar({ setSelectedKey }) {
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
        Staff
      </p>
        
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu
          key="1"
          icon={<GiCirclingFish />}
          title="Quản lý cá đơn"
        >
          <Menu.Item key="1-1" onClick={() => setSelectedKey("cate-info")}>
            Phân loại cá
          </Menu.Item>
          <Menu.Item key="1-2" onClick={() => setSelectedKey("fish-info")}>
            Thông tin cá đơn
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="11"
          icon={<GiCirclingFish />}
          onClick={() => setSelectedKey("batch-info")}
        >
          Quản lí lô cá
        </Menu.Item>

        <Menu.Item
          key="12"
          icon={<GrUserManager />}
          onClick={() => setSelectedKey("customer-management")}
        >
          Thông tin khách hàng

        </Menu.Item>

        <Menu.Item
          key="2" // Gán key duy nhất
          icon={<FileDoneOutlined />} // Icon cho chức năng ký gửi
          onClick={() => setSelectedKey("consignment-management")} // Gán key
        >
          Quản lý Ký gửi
        </Menu.Item>
        
        <SubMenu
          key="3"
          icon={<ShoppingCartOutlined />}
          title="Quản lí đơn hàng"
        >
          <Menu.Item key="3-1" onClick={() => setSelectedKey("order-list")}>
            Danh sách đơn hàng
          </Menu.Item>
          <Menu.Item key="3-2" onClick={() => setSelectedKey("order-tracking")}>
            Theo dõi trạng thái đơn hàng
          </Menu.Item>
        </SubMenu>
        
      </Menu>
    </div>
  );
}

export default Sidebar;
