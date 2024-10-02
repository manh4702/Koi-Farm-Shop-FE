// src/user/Shared/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Space } from "antd";
import { PhoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import LogoKoi from "../../../assets/LogoKoi.png";
import Search from "./Search";

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader
      style={{ height: "200px", backgroundColor: "white", color: "black" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold" style={{ color: "red" }}>
          <PhoneOutlined /> 036988088 - 0907832421
        </h1>
        <div className="flex items-center space-x-2">
          <Menu mode="horizontal" className="flex items-center" style={{fontSize: "16px"}}>
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
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <img src={LogoKoi} alt="Cá Koi Store" style={{ height: "150px" }} />
        </div>
        <Search />
        <Menu mode="horizontal" className="flex items-center">
          <Space size="large">
            <Menu.Item key="home">
              <Link to="/" style={{ fontSize: "16px", fontWeight: "bold" }}>
                Trang Chủ
              </Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link
                to="/about"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Giới Thiệu
              </Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link
                to="/products"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Sản Phẩm
              </Link>
            </Menu.Item>
            <Menu.Item key="cart">
              <Link to="/cart">
                <ShoppingCartOutlined style={{ fontSize: "20px" }} />
              </Link>
            </Menu.Item>
          </Space>
        </Menu>
      </div>
    </AntHeader>
  );
};

export default Header;
