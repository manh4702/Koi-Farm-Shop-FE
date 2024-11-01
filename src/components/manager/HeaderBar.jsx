import React from 'react';
import { Button, Dropdown, Menu, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {removeAuthToken, removeUserRole} from "../../services/auth.js";
import useAuthStore from "../../store/store.js";

const HeaderBar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [username, setUsername] = React.useState('Manager'); // Lấy tên đăng nhập từ state hoặc localStorage
  const [avatarUrl, setAvatarUrl] = React.useState('https://img.icons8.com/?size=48&id=114317&format=png'); // Lấy URL ảnh đại diện từ state hoặc localStorage

  const handleLogout = () => {
    removeAuthToken();
    removeUserRole();
    logout();
    navigate('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-end items-center p-4 bg-white shadow-sm">
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="flex items-center cursor-pointer">
          <Avatar
            size="large"
            src={avatarUrl} // Sử dụng URL ảnh đại diện
            icon={!avatarUrl && <UserOutlined />} // Nếu không có URL, hiển thị icon mặc định
          />
          <span className="ml-2">{username}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderBar;
