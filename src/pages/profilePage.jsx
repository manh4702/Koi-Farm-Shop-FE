import React, { useEffect, useState } from 'react';
import '../styles/ProfilePage.css'; // Thêm file CSS cho styling
import Header from '../components/user/Shared/Header'; // Thêm Header
import Footer from '../components/user/Shared/Footer'; // Thêm Footer


const ProfilePage = () => {
    const [userData, setUserData] = useState(null); // Khởi tạo state cho dữ liệu người dùng

    const loadUserData = async () => {
        try {
            const response = await fetch('/api/user'); // Thay đổi đường dẫn API cho phù hợp
            const data = await response.json();
            setUserData(data); // Cập nhật state với dữ liệu người dùng
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        loadUserData(); // Gọi hàm lấy dữ liệu khi component được mount
    }, []);

    return (
        <>
            <Header /> {/* Thêm Header vào trang */}
            <div className="profile-container">
                <div className="sidebar">
                    <h2>Tài khoản</h2>
                    <ul>
                        <li>Lịch sử đơn hàng</li>
                        <li>Lịch sử giao dịch</li>
                        <li>Bảo mật</li>
                        <li>Bình luận của tôi</li>
                        <li>Sản phẩm yêu thích</li>
                        <li>Giới thiệu bạn bè</li>
                    </ul>
                </div>
                <div className="profile-details">
                    <h2>Tổng quan</h2>
                    <p>Tên đăng nhập: <span className="highlight">{userData ? userData.username : 'Loading...'}</span></p>
                    <p>Email: {userData ? userData.email : 'Loading...'}</p>
                    <p>Họ và tên: {userData ? userData.fullName : 'Loading...'}</p>
                    <p>Role khách hàng: {userData ? userData.role : 'Loading...'}</p>
                    
                    <div className="avatar-section">
                        <img src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg" alt="Avatar" className="avatar" />
                        {/* Thay thế đường dẫn ảnh đại diện */}
                        <button className="edit-button">Sửa ảnh đại diện</button>
                    </div>
                    <div className="upload-info">
                        <p>Ảnh phải nhỏ hơn 5MB</p>
                        <p>Chọn hình ảnh phù hợp, không phản cảm</p>
                    </div>
                </div>
            </div>
            <Footer /> {/* Thêm Footer vào trang */}
        </>
    );
};

export default ProfilePage;
