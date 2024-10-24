import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { removeAuthToken, removeUserRole } from '../../services/auth';
import useAuthStore from '../../store/store';

const HeaderBar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [username, setUsername] = React.useState('Admin'); // Lấy tên đăng nhập từ state hoặc localStorage
  const [avatarUrl, setAvatarUrl] = React.useState('https://img.icons8.com/?size=80&id=110480&format=png'); // Lấy URL ảnh đại diện từ state hoặc localStorage

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
            src={avatarUrl || null} // Kiểm tra avatarUrl, nếu có sẽ dùng URL, nếu không sẽ đặt là null
            icon={!avatarUrl && <UserOutlined />} // Nếu không có URL, sẽ hiển thị biểu tượng UserOutlined
          />
          <span className="ml-2">{username}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderBar;
