import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "../Shared/ZaloIcon";
import FBIconts from "../Shared/FacebookIcon";
import YTIconts from "../Shared/YoutubeIcon";

const TermsOfService = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container mx-auto my-4 p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Điều khoản mua hàng</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">1. Hướng dẫn sử dụng web</h2>
          <p className="text-gray-600 mt-2">
            Khách hàng phải từ 18 tuổi trở lên, chịu trách nhiệm về tài khoản của mình và nhận thông tin sản phẩm từ KoiFish.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">2. Đặt hàng và xác nhận đơn hàng</h2>
          <p className="text-gray-600 mt-2">
            Khách hàng sẽ nhận được xác nhận đơn hàng qua email sau khi đặt hàng trên website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">3. Chương trình khuyến mãi</h2>
          <p className="text-gray-600 mt-2">
            Thông tin khuyến mãi sẽ được cập nhật trên trang, có thể thay đổi mà không cần thông báo trước.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">4. Thương hiệu và bản quyền</h2>
          <p className="text-gray-600 mt-2">
            Mọi nội dung trên website thuộc quyền sở hữu trí tuệ của KoiFish, được bảo vệ bởi luật pháp.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">5. Quy định chấm dứt thỏa thuận</h2>
          <p className="text-gray-600 mt-2">
            KoiFish có quyền chấm dứt tài khoản nếu khách hàng vi phạm các điều khoản.
          </p>
        </section>
      </main>
      
      <ZaloIcon />
      <FBIconts />
      <YTIconts />
      <Footer />
    </div>
  );
};

export default TermsOfService;
