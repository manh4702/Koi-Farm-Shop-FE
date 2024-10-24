import React from 'react';
import { Button, Dropdown, Menu, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('Staff'); // Lấy tên đăng nhập từ state hoặc localStorage
  const [avatarUrl, setAvatarUrl] = React.useState('https://img.icons8.com/?size=48&id=22119&format=png'); // Lấy URL ảnh đại diện từ state hoặc localStorage

  const handleLogout = () => {
    navigate('/login');
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
            src={avatarUrl || null} // Nếu có URL ảnh, sử dụng URL đó. Nếu không, để null.
            icon={!avatarUrl && <UserOutlined />} // Nếu avatarUrl không có giá trị, hiển thị icon UserOutlined
          />
          <span className="ml-2">{username}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderBar;
