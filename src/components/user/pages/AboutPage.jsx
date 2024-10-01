// src/user/Pages/About.jsx
import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-4">Giới Thiệu Về Cá Koi Store</h1>
        <p className="text-lg">
          Cá Koi Store là cửa hàng hàng đầu chuyên cung cấp các giống cá Koi
          chất lượng. Với đội ngũ nhân viên chuyên nghiệp và tận tâm, chúng tôi
          cam kết mang đến những trải nghiệm tốt nhất cho khách hàng khi lựa
          chọn cá Koi làm vật nuôi.
        </p>
        <p className="text-lg mt-4">
          Chúng tôi cung cấp các dịch vụ trọn gói bao gồm bán cá, tư vấn, chăm
          sóc và bảo dưỡng hồ cá Koi. Hãy đến với Cá Koi Store để trải nghiệm sự
          khác biệt!
        </p>
        <p className="text-lg mt-4">
          Địa chỉ: 123 Đường Cá Koi, Quận Cá, Thành Phố Koi.
          <br />
          Điện thoại: 036988088 - 0907832421
          <br />
          Email: info@cakoistore.com
        </p>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
