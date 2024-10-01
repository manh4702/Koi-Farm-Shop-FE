// src/user/Shared/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Cá Koi Store. Tất cả quyền được bảo lưu.</p>
        <p>Liên hệ: support@cakoi.vn | SĐT: 024.32.666.777</p>
      </div>
    </footer>
  );
};

export default Footer;
