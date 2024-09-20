import React from 'react';
import { Button, Dropdown, Menu, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('Admin'); // Lấy tên đăng nhập từ state hoặc localStorage
  const [avatarUrl, setAvatarUrl] = React.useState('https://example.com/avatar.jpg'); // Lấy URL ảnh đại diện từ state hoặc localStorage

  const handleLogout = () => {
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout} style={{backgroundColor: 'red', color: 'white'}}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    // <div className="flex justify-end items-center p-4 bg-white shadow-sm">
    //   <Button
    //     type="primary"
    //     icon={<LogoutOutlined />}
    //     onClick={handleLogout}
    //   >
    //     Logout
    //   </Button>
    // </div>
    <div className="flex justify-end items-center p-4 bg-white shadow-sm">
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="flex items-center cursor-pointer mr-10">
          <Avatar size="large" src={avatarUrl} icon={<UserOutlined />} />
          <span className="ml-2">{username}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderBar;
