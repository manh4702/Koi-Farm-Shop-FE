import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, Dropdown, Layout, Menu, Space, Avatar } from "antd";
import {
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LogoKoi from "../../../assets/LogoKoi.png";
import Search from "./Search";
import useCartStore from "../../../store/cartStore";
import useAuthStore from "../../../store/store";

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const { logout, user, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const getMenuItemStyle = (path) => {
    return location.pathname === path
      ? { fontSize: "16px", fontWeight: "bold", color: "red" } // Style khi đang ở trang đó
      : { fontSize: "16px", fontWeight: "bold", color: "black" }; // Style mặc định
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLgout = () => {
    logout(navigate);
  };

  const handleGoToProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleGoToProfile}>
        Thông Tin Cá Nhân
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLgout}>
        <div style={{backgroundColor: "red", borderRadius: "5px", padding: "5px", color: "white", textAlign: "center"}}>
          Đăng Xuất <LogoutOutlined style={{}} />
        </div>
      </Menu.Item>
    </Menu>
  );

  const productMenu = (
    <Menu>
      <Menu.Item key="fish">
        <Link to="/products/fish" style={getMenuItemStyle("/products/fish")}>
          Cá Đơn
        </Link>
      </Menu.Item>
      <Menu.Item key="fish-lot">
        {/*<Link to="/products/fish-lot" style={getMenuItemStyle("/products/fish-lot")}>*/}
        <Link to="/products/fish-packages" style={getMenuItemStyle("/products/fish-packages")}>
          Lô Cá
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      style={{
        height: "200px",
        backgroundColor: "white",
        color: "white",
        borderBottom: "1px solid #d9d9d9",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
          maxWidth: "1200px",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>
          <PhoneOutlined /> 036988088 - 0907832421
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Menu
            mode="horizontal"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {user ? (
              <Dropdown overlay={userMenu} trigger={['click']}>
                <Space>
                  <Avatar icon={<UserOutlined style={{ color: "black" }} />} />
                  {user.name}
                </Space>
              </Dropdown>
            ) : (
              <>
                <Menu.Item key="login">
                  <Link to="/login">Đăng Nhập</Link>
                </Menu.Item>
                <span>|</span>
                <Menu.Item key="register">
                  <Link to="/register">Đăng Ký</Link>
                </Menu.Item>
              </>
            )}
          </Menu>
          <Badge count={cartItemCount} overflowCount={99}>
            <Link to="/cart" style={getMenuItemStyle("/cart")}>
              <ShoppingCartOutlined
                style={{ fontSize: "20px", marginLeft: "20px" }}
              />
            </Link>
          </Badge>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 150px",
          maxWidth: "100%",
          height: "150px",
        }}
      >
        {/* Bọc logo trong thẻ Link */}
        <Link
          to="/"
          // style={{ height: "150px" }}
        >
          <img
            src={LogoKoi}
            alt="Cá Koi Store"
            style={{ height: "200px", objectFit: "contain" }}
          />
        </Link>
        <Search />
        <Menu
          mode="horizontal"
          style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}
        >
          <Space size="large">
            <Menu.Item key="home">
              <Link to="/" style={getMenuItemStyle("/")}>
                Trang Chủ
              </Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about" style={getMenuItemStyle("/about")}>
                Giới Thiệu
              </Link>
            </Menu.Item>
            <Dropdown overlay={productMenu} trigger={['hover']}>
              <Link to="/products" style={getMenuItemStyle("/products")}>
                Sản Phẩm
              </Link>
            </Dropdown>
            <Menu.Item key="consignment">
              <Link
                to="/fish-consignment"
                style={getMenuItemStyle("/fish-consignment")}
              >
                Ký Gửi Cá
              </Link>
            </Menu.Item>
            <Menu.Item key="news">
              <Link to="/news" style={getMenuItemStyle("/news")}>
                Tin Tức
              </Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact" style={getMenuItemStyle("/contact")}>
                Liên Hệ
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="cart">
            <Badge count={cartItemCount} overflowCount={99}>
              <Link to="/cart" style={getMenuItemStyle("/cart")}>
                <ShoppingCartOutlined style={{ fontSize: "20px" }} />
              </Link>
            </Badge>
          </Menu.Item> */}
          </Space>
        </Menu>
      </div>
    </AntHeader>
  );
};

export default Header;
