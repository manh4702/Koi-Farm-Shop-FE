import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  
  UserOutlined,
  
  ShoppingCartOutlined,
  QuestionCircleOutlined,
  TagsFilled,
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
        <Menu.Item
          key="1"
          icon={<GiCirclingFish />}
          onClick={() => setSelectedKey("fish-info")}
        >
          Quản lí cá
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
        <Menu.Item
          key="4"
          icon={<TagsFilled />}
          onClick={() => setSelectedKey("promotion-management")}
        >
          Quản lí khuyến mãi
        </Menu.Item>
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
          Quản lí FAQ
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<MdFeedback />}
          onClick={() => setSelectedKey("feedback-management")}
        >
          Quản lí Đánh giá
        </Menu.Item>
        
      </Menu>
    </div>
  );
}

export default Sidebar;
