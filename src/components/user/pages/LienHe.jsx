import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import Search from "../Shared/Search";
import ZaloIcon from "./ZaloIcon";
import FacebookIcon from "./FacebookIcon";
import YoutubeIcon from "./YoutubeIcon";

const LienHe = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      {/* <Search /> Tùy chọn: hiển thị ô tìm kiếm */}
      <main className="container mx-auto my-4 p-4 bg-white rounded-lg shadow">
        {/* <h1 className="text-3xl font-bold mb-4 text-gray-800">Liên Hệ</h1> */}

        {/* Thêm biểu mẫu liên hệ */}
        <h2 className="text-2xl font-bold mt-6 text-gray-700">
          Gửi Thông Tin Cho Chúng Tôi
        </h2>
        <p className="mb-4 text-gray-600">
          Nếu có bất cứ thắc mắc nào về sản phẩm, dịch vụ, Quý khách vui lòng để
          lại thông tin theo form bên dưới. Chúng tôi sẽ phản hồi Quý khách
          trong vòng tối đa 24h.
        </p>

        <form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Tiêu đề *
            </label>
            <input
              type="text"
              id="title"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Họ và tên *
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Nội dung
            </label>
            <textarea
              id="content"
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Gửi đi
            </button>
            <button
              type="reset"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Nhập lại
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Lưu ý: Các trường có dấu * là trường bắt buộc.
          </p>
        </form>
      </main>
      <ZaloIcon />
      <FacebookIcon />
      <YoutubeIcon />
      <Footer />
    </div>
  );
};

export default LienHe;
