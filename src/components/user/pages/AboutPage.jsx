// src/user/Pages/About.jsx
import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "./ZaloIcon";
import FBIconts from "./FacebookIcon";
import YTIconts from "./YoutubeIcon";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-4">
          FishKoi Store - Nơi thoả mãn đam mê cá Nhật
        </h1>

        {/* Chèn video YouTube */}
        <div className="mb-8">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/FXBLvGAhQGc"
            title="Koilover Introduction"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        {/* Chèn hình ảnh bằng link */}
        <div className="mb-8">
          <img
            src="https://cdn.tuoitre.vn/thumb_w/1200/2021/2/4/photo-1-1612402298157895451843.jpg" // Thay thế đường dẫn này bằng link ảnh của bạn
            alt="Mô tả ảnh"
            className="w-full h-auto"
          />
        </div>

        {/* Nội dung giới thiệu về Koilover */}
        <p className="text-lg">
          FishKoi là hệ thống cung cấp Cá Koi Nhật hàng đầu Việt Nam, nơi bạn có
          thể tin tưởng như đội ngũ chuyên nghiệp, hạ tầng tiêu chuẩn cùng bộ
          sản phẩm và dịch vụ tốt nhất dành cho cá Koi. Chúng tôi hướng tới việc
          kinh doanh bền vững dựa trên việc đáp ứng lợi ích lâu dài của khách
          hàng, FishKoi luôn đồng hành cùng đam mê.
        </p>
        <div className="mb-8">
          <img
            src="https://cdn.tuoitre.vn/thumb_w/1200/2021/2/4/hinh-2-1612402535458654973453.jpg" // Thay thế đường dẫn này bằng link ảnh của bạn
            alt="Mô tả ảnh"
            className="w-full h-auto"
          />
        </div>
        <p className="text-lg mt-4">
          Sau hơn 1 vài năm phát triển, luôn cải tiến để đáp ứng tốt nhất nhu
          cầu của cộng đồng chơi Koi Việt Nam, FishKoi Store đã đạt được một số
          thành tựu như sau:
        </p>
        <div className="mb-8">
          <img
            src="https://toidi.net/wp-content/uploads/2017/02/hosokai-koi-farm.jpg" // Thay thế đường dẫn này bằng link ảnh của bạn
            alt="Mô tả ảnh"
            className="w-full h-auto"
          />
        </div>
        <ul className="list-disc list-inside text-lg mt-4">
          <li>
            Hệ thống showroom tại Hồ Chí Minh và khu kỹ thuật dưỡng cá có tổng
            diện tích mặt nước trên 6000m² với trên 160 hồ cá Koi các loại.
          </li>
          <li>
            Đối tác cá: Trên 20 trại cá hàng đầu của Nhật như Narita, Sakai,
            Momotaro, Dainichi, Ogata, Omosako, Isa, Marusei, Marudo... cung cấp
            nhiều loại cá Koi đa dạng với hơn 30 biến thể như Kohaku, Showa,
            Sanke, Utsuri, Komonryu, Asagi, Shusui, Goromo, Benigoi, Karashi,
            kích thước từ 10cm đến trên 1m, số lượng lớn, giá cả cạnh tranh.
          </li>
        </ul>
        <p className="text-lg mt-4">
          Hãy đến với FishKoi Store để trải nghiệm sự khác biệt trong thế giới
          của cá Koi.
        </p>

        <p className="text-lg mt-4">
          Địa chỉ: Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Long Thạnh Mỹ, Hồ Chí
          Minh.
          <br />
          Điện thoại: 036988088 - 0907832421
          <br />
          Email: cakoistore.com
        </p>
      </div>
      <ZaloIcon />
      <FBIconts />
      <YTIconts />
      <Footer />
    </>
  );
};

export default AboutPage;
