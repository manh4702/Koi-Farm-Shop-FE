import React from "react";
import { Link } from "react-router-dom"; // Import Link to navigate
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
import ZaloIcon from "../components/user/Shared/ZaloIcon";
import FBIconts from "../components/user/Shared/FacebookIcon";
import YTIconts from "../components/user/Shared/YoutubeIcon";

// Sample data for news
const latestNews = [
  {
    id: 1,
    title: "Cách chăm sóc cá Koi vào mùa đông",
    date: "2024-01-15",
    description: "Hướng dẫn cách chăm sóc cá Koi trong điều kiện lạnh giá, đảm bảo sức khỏe và màu sắc của cá.",
  },
  {
    id: 2,
    title: "Xu hướng nuôi cá Koi 2024",
    date: "2024-01-10",
    description: "Cập nhật những xu hướng mới nhất trong việc nuôi và chăm sóc cá Koi trong năm 2024.",
  },
  {
    id: 3,
    title: "Sự kiện hội chợ cá Koi quốc tế",
    date: "2024-01-05",
    description: "Thông tin về hội chợ cá Koi quốc tế diễn ra tại Nhật Bản với sự tham gia của nhiều chuyên gia.",
  },
];

const featuredFishes = [
  {
    id: 1,
    name: "Karashigoi",
    image:
      "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
    price: "300,000 VND",
    description: "Cá Koi Karashigoi là một trong những loài cá Koi phổ biến nhất, được ưa chuộng bởi màu sắc và hình dạng độc đáo.",
  },
  {
    id: 2,
    name: "Goshiki",
    image: "https://koilover.vn/uploads/thumbs/goshiki_20190801092826524.jpg",
    price: "500,000 VND",
    description: "Cá Koi Goshiki là một loài cá Koi có màu sắc rực rỡ, được ưa chuộng bởi vẻ đẹp và sự hiếm có.",
  },
  {
    id: 3,
    name: "Showa",
    image:
      "https://th.bing.com/th/id/OIP.6Vs0Oo2wsWAF5FtPVTRHZwHaLH?w=135&h=204&c=7&r=0&o=5&pid=1.7",
    price: "750,000 VND",
    description: "Cá Koi Showa là một loài cá Koi có màu sắc đen trắng, được ưa chuộng bởi vẻ đẹp và sự hiếm có.",
  },
];

const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto my-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tin tức mới nhất</h2>
          {/* Display latest news */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {latestNews.map((news) => (
              <div key={news.id} className="border p-4">
                <h3 className="text-xl font-semibold">{news.title}</h3>
                <p className="text-gray-500 text-sm">{news.date}</p>
                <p className="text-gray-700">{news.description}</p>
                <Link
                  to={`/news/${news.id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Đọc thêm
                </Link>
              </div>
            ))}
          </div>
          {/* Link to the full news page */}
          <Link to="/news" className="text-blue-500 hover:underline">
            Xem tất cả tin tức
          </Link>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cá Koi nổi bật</h2>
          <div className="grid grid-cols-4 gap-4">
            {featuredFishes.map((fish) => (
              <div key={fish.id} className="border p-4">
                <img
                  src={fish.image}
                  alt={fish.name}
                  className="mb-4 w-full h-auto"
                />
                <h3 className="text-xl font-semibold">{fish.name}</h3>
                <p className="text-red-500 font-bold">{fish.price}</p>
                <p className="text-gray-700">{fish.description}</p>
                <Link
                  to={`/products/${fish.id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Xem chi tiết
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ZaloIcon />
      <FBIconts />
      <YTIconts />
      <Footer />
    </div>
  );
};

export default HomePage;
