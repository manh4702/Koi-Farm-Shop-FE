import React, { useEffect, useState } from 'react';
import '../styles/ProfilePage.css'; // Thêm file CSS cho styling
import Header from '../components/user/Shared/Header'; // Thêm Header
import Footer from '../components/user/Shared/Footer'; // Thêm Footer
import profileStore from '../hooks/profile';
import { FaHistory } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaFish } from "react-icons/fa";
const ProfilePage = () => {
    const { user, initializeAuth } = profileStore(); // Lấy thông tin người dùng từ store

    useEffect(() => {
        initializeAuth(); // Gọi hàm để khởi tạo thông tin người dùng
    }, [initializeAuth]);

    return (
        <>
            <Header /> {/* Thêm Header vào trang */}
            <div className="profile-container">
                <div className="sidebar">
                    <h2>Tài khoản</h2>
                    <ul>
                        <li style={{ fontSize: '20px', padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                            <FaHistory style={{ marginRight: '8px', fontSize: '24px' }} /> {/* Adjusted icon size and margin */}
                            Lịch sử đơn hàng
                        </li>
                        
                        <li style={{ fontSize: '20px', padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                            <MdOutlineSecurity style={{ marginRight: '8px', fontSize: '24px' }} /> {/* Adjusted icon size and margin */}
                            Bảo mật
                        </li>
                        <li style={{ fontSize: '20px', padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                            <MdFeedback style={{ marginRight: '8px', fontSize: '24px' }} /> {/* Adjusted icon size and margin */}
                            Đánh giá của tôi
                        </li>
                        <li style={{ fontSize: '20px', padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                            <FaFish style={{ marginRight: '8px', fontSize: '24px' }} /> {/* Adjusted icon size and margin */}
                            Sản phẩm yêu thích
                        </li>
                        
                    </ul>
                </div>
                <div className="profile-details">
                    <h2>Tổng quan</h2>

                    <p style={{ fontSize: '20px' }}>Tên đăng nhập: {user ? user.name : 'Loading...'}</p>
                    {/*  <p>Email: {user ? user.email : 'Loading...'}</p>
                    <p>Số điện thoại: {user ? user.phone : 'Loading...'}</p> */}
                    <p style={{ fontSize: '20px' }}>Role khách hàng: {user ? user.role : 'Loading...'}</p>
                    <div className="avatar-section">
                        <img src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg" alt="Avatar" className="avatar" style={{ width: '150px', height: '150px' }} /> {/* Tăng kích thước ảnh đại diện */}
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
