import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Badge, Dropdown, Layout, Menu, Space, Avatar, Button} from "antd";
import {
  BarsOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LogoKoi from "../../../assets/LogoKoi.png";
import Search from "./Search";
import useCartStore from "../../../store/cartStore";
import useAuthStore from "../../../store/store";

const {Header: AntHeader} = Layout;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items || []);
  const {logout, user, initializeAuth} = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const isActive = (path) => {
    return location.pathname === path || (path === "/products" && location.pathname.startsWith("/products"));
  };

  const getMenuItemStyle = (path) => ({
    fontSize: "16px",
    fontWeight: "bold",
    color: isActive(path) ? "red" : "black",
  });

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  // const cartItemCount = useCartStore(state => state.items.length);
  
  const handleLogout = () => {
    logout(navigate);
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleGoToProfile}>
        Thông Tin Cá Nhân
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <div className="bg-red-600 rounded p-2 text-white text-center">
          Đăng Xuất <LogoutOutlined/>
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
        <Link to="/products/fish-packages" style={getMenuItemStyle("/products/fish-packages")}>
          Lô Cá
        </Link>
      </Menu.Item>
    </Menu>
  );

  const authMenu = (
    <Menu>
      <Menu.Item key="login">
        <Link to="/login">Đăng Nhập</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Đăng Ký</Link>
      </Menu.Item>
    </Menu>
  );

  const mobileMenu = (
    <Menu>
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
        <Dropdown overlay={productMenu} trigger={['hover']}>
          <Link to="/products" style={getMenuItemStyle("/products")}>
            Sản Phẩm
          </Link>
        </Dropdown>
      </Menu.Item>
      <Menu.Item key="consignment">
        <Link to="/fish-consignment" style={getMenuItemStyle("/fish-consignment")}>
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
    </Menu>
  );

  return (
    <AntHeader className="h-[200px] bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div style={{ marginTop: "5px" }} className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-600">
            <PhoneOutlined/> 036988088 - 0907832421
          </h1>
          <div className="flex items-center gap-2">
            <Dropdown overlay={user ? userMenu : authMenu} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()} className="flex items-center text-black">
                {user ? (
                  <Space>
                    <Avatar className="bg-red-600" icon={<UserOutlined/>}/>
                    {user.name}
                  </Space>
                ) : (
                  <Avatar className="bg-red-600" icon={<UserOutlined/>}/>
                )}
              </a>
            </Dropdown>
            <Badge count={cartItemCount} overflowCount={99}>
              <Link to="/cart" style={getMenuItemStyle("/cart")}>
                <ShoppingCartOutlined className="text-2xl ml-5"/>
              </Link>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-[150px]">
          <Link to="/">
            <img
              src={LogoKoi}
              alt="Cá Koi Store"
              className="h-[200px] object-contain"
            />
          </Link>

          <div className="flex-1 mx-8">
            <Search/>
          </div>

          <div className="hidden lg:flex">
            <Menu mode="horizontal" className="flex items-center border-none flex-wrap">
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
                <Dropdown overlay={productMenu} trigger={['hover']}>
                  <Link to="/products" style={getMenuItemStyle("/products")}>
                    Sản Phẩm
                  </Link>
                </Dropdown>
              </Menu.Item>
              <Menu.Item key="consignment">
                <Link to="/fish-consignment" style={getMenuItemStyle("/fish-consignment")}>
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
            </Menu>
          </div>
          <div className="lg:hidden">
            <Dropdown overlay={mobileMenu} trigger={['click']}>
              <Button icon={<BarsOutlined/>}/>
            </Dropdown>
          </div>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;