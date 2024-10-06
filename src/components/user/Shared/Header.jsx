// src/user/Shared/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge, Layout, Menu, Space } from "antd";
import { PhoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import LogoKoi from "../../../assets/LogoKoi.png";
import Search from "./Search";
import useCartStore from "../../../store/cartStore";

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);

  const getMenuItemStyle = (path) => {
    return location.pathname === path
      ? { fontSize: "16px", fontWeight: "bold", color: "red" } // Style khi đang ở trang đó
      : { fontSize: "16px", fontWeight: "bold", color: "black" }; // Style mặc định
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
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
            style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
          >
            <Menu.Item key="login">
              <Link to="/login">Đăng Nhập</Link>
            </Menu.Item>
            <span>|</span>
            <Menu.Item key="register">
              <Link to="/register">Đăng Ký</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 150px",
          maxWidth: "100%",
        }}
      >
        <div style={{ height: "150px" }}>
          <img
            src={LogoKoi}
            alt="Cá Koi Store"
            style={{ height: "100%", objectFit: "contain" }}
          />
        </div>
        <Search />
        <Menu
          mode="horizontal"
          style={{ display: "flex", alignItems: "center" }}
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
            <Menu.Item key="products">
              <Link to="/products" style={getMenuItemStyle("/products")}>
                Sản Phẩm
              </Link>
            </Menu.Item>
            <Menu.Item key="consignment">
              <Link
                to="/fish-consignment"
                style={getMenuItemStyle("/fish-consignment")}
              >
                Ký Gửi Cá
              </Link>
            </Menu.Item>
            <Menu.Item key="cart">
              <Badge count={cartItemCount} overflowCount={99}>
                <Link to="/cart" style={getMenuItemStyle("/cart")}>
                  <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                </Link>
              </Badge>
            </Menu.Item>
          </Space>
        </Menu>
      </div>
    </AntHeader>
  );
};

export default Header;
