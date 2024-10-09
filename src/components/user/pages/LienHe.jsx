import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import Search from "../Shared/Search";
import ZaloIcon from "./ZaloIcon";
import FacebookIcon from "./FacebookIcon";
import YoutubeIcon from "./YoutubeIcon";

const LienHe = () => {
  return (
    <div>
      <Header />
      {/* <Search /> Tùy chọn: hiển thị ô tìm kiếm */}
      <main className="container mx-auto my-4">
        {/* <h1 className="text-2xl font-bold mb-4">Tin Tức</h1> */}

        {/* Thêm biểu mẫu liên hệ */}
        <h2 className="text-xl font-bold mt-6">GỬI THÔNG TIN CHO CHÚNG TÔI</h2>
        <p>
          Nếu có bất cứ thắc mắc nào về sản phẩm, dịch vụ, Quý khách vui lòng để
          lại thông tin theo form bên dưới. Chúng tôi sẽ phản hồi Quý khách
          trong vòng tối đa 24h.
        </p>

        <form className="mt-4">
          <label htmlFor="title">Tiêu đề *</label>
          <input
            type="text"
            id="title"
            required
            className="border p-2 w-full mb-2"
          />

          <label htmlFor="name">Họ và tên *</label>
          <input
            type="text"
            id="name"
            required
            className="border p-2 w-full mb-2"
          />

          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            required
            className="border p-2 w-full mb-2"
          />

          <label htmlFor="phone">Điện thoại</label>
          <input type="tel" id="phone" className="border p-2 w-full mb-2" />

          <label htmlFor="content">Nội dung</label>
          <textarea
            id="content"
            rows="4"
            className="border p-2 w-full mb-2"
          ></textarea>

          <button type="submit" className="bg-green-500 text-white p-2 w-full">
            Gửi đi
          </button>
          <button
            type="reset"
            className="bg-gray-300 text-black p-2 w-full mt-2"
          >
            Nhập lại
          </button>
        </form>
        <p className="mt-2">Lưu ý: Các trường có dấu * là trường bắt buộc.</p>
      </main>
      <ZaloIcon />
      <FacebookIcon />
      <YoutubeIcon />
      <Footer />
    </div>
  );
};

export default LienHe;
