import React, { useState } from "react"; // Thêm useState
import { Link } from "react-router-dom"; // Import Link to navigate
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
import ZaloIcon from "../components/user/Shared/ZaloIcon";
import FBIconts from "../components/user/Shared/FacebookIcon";
import YTIconts from "../components/user/Shared/YoutubeIcon";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr"; // Import mũi tên
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import cho hiệu ứng chuyển động

import './HomePage.css'; // Import tệp CSS mới

// Sample data for news
const latestNews = [
  {
    id: 1,
    title: "Cách chăm sóc cá Koi vào mùa đông",
    date: "2024-01-15",
    description: "Hướng dẫn cách chăm sóc cá Koi trong điều kiện lạnh giá, đảm bảo sức khỏe và màu sắc của cá.",
    image: "https://media.istockphoto.com/id/1450062580/es/foto/manojo-de-la-variedad-nishikigoi-koi-la-colorida-carpa-de-amur-nadando-activamente-en-el.webp?b=1&s=170667a&w=0&k=20&c=AhBHEuN0ozjvdXYZ4Ffd0xJca-Kb9igVSEWM41teMCc=",
  },
  {
    id: 2,
    title: "Xu hướng nuôi c Koi 2024",
    date: "2024-01-10",
    description: "Cập nhật những xu hướng mới nhất trong việc nuôi và chăm sóc cá Koi trong năm 2024.",
    image: "https://img.freepik.com/free-photo/beautiful-exotic-colorful-fish_23-2150737617.jpg",
  },
  {
    id: 3,
    title: "Sự kiện hội chợ cá Koi quốc tế",
    date: "2024-01-05",
    description: "Thông tin về hội chợ cá Koi quốc tế diễn ra tại Nhật Bản với sự tham gia của nhiều chuyên gia.",
    image: "https://images.unsplash.com/photo-1526317405575-b992efc46796?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGtvaXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const featuredFishes = [
  {
    id: 1,
    name: "Karashigoi",
    image: "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
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
    name: "Asagi",
    image: "https://koilover.vn/uploads/thumbs/Asagi_20190801092355819.jpg",
    price: "400,000 VND",
    description: "Cá Koi Asagi có màu xanh xám đặc trưng với các họa tiết lưới trên lưng.",
  },
  {
    id: 4,
    name: "Kohaku",
    image: "https://koilover.vn/uploads/thumbs/kohaku_20190801092416968.jpg",
    price: "600,000 VND",
    description: "Cá Koi Kohaku là giống Koi phổ biến với hai màu đỏ trắng.",
  },
  {
    id: 5,
    name: "Showa",
    image: "https://th.bing.com/th/id/OIP.6Vs0Oo2wsWAF5FtPVTRHZwHaLH?w=135&h=204&c=7&r=0&o=5&pid=1.7",
    price: "750,000 VND",
    description: "Cá Koi Showa có ba màu chủ đạo là đỏ, trắng, và đen.",
  },
  {
    id: 6,
    name: "Shiro Utsuri",
    image: "https://th.bing.com/th/id/OIP.QweGuNY3xoLztgP99hL2-AHaMr?w=191&h=327&c=7&r=0&o=5&pid=1.7",
    price: "450,000 VND",
    description: "Cá Koi Shiro Utsuri là giống Koi đen trắng với hoa văn đậm nét.",
  },
  {
    id: 7,
    name: "Sanke",
    image: "https://th.bing.com/th/id/OIP.iQfjAgZSl6tCTFf6T4AS8QHaKs?w=131&h=190&c=7&r=0&o=5&pid=1.7",
    price: "800,000 VND",
    description: "Cá Koi Sanke mang vẻ đẹp của hai màu đỏ và trắng.",
  },
  {
    id: 8,
    name: "Tancho",
    image: "https://i.pinimg.com/236x/8e/0e/22/8e0e225d4b2487d1cdce5d9f30d4584f.jpg",
    price: "1,000,000 VND",
    description: "Cá Koi Tancho nổi bật với đốm tròn màu đỏ trên đầu.",
  },
  {
    id: 9,
    name: "Doitsu Kujaku",
    image: "https://th.bing.com/th/id/OIP.4umxIFHoJIIg30gQhvpaYwHaLH?rs=1&pid=ImgDetMain",
    price: "650,000 VND",
    description: "Cá Koi Doitsu Kujaku với vảy ánh kim sáng.",
  },
  {
    id: 10,
    name: "Yamabuki Ogon",
    image: "https://th.bing.com/th/id/OIP.qjAQlysT0IBlOkrtY5qD5gHaLI?w=115&h=180&c=7&r=0&o=5&pid=1.7",
    price: "700,000 VND",
    description: "Cá Koi Yamabuki Ogon màu vàng ánh kim.",
  },
  {
    id: 11,
    name: "Shusui",
    image: "https://th.bing.com/th/id/OIP.kH_bEW8tRBBH0V-qoETOcQHaLC?w=203&h=304&c=7&r=0&o=5&pid=1.7",
    price: "500,000 VND",
    description: "Cá Koi Shusui có vảy dọc lưng xanh.",
  },
  {
    id: 12,
    name: "Ki Utsuri",
    image: "https://th.bing.com/th/id/OIP.GST467YSEAQo31msgUOebAHaHW?w=173&h=180&c=7&r=0&o=5&pid=1.7",
    price: "600,000 VND",
    description: "Cá Koi Ki Utsuri với màu vàng sáng xen lẫn màu đen.",
  },
  {
    id: 13,
    name: "Kumonryu",
    image: "https://th.bing.com/th/id/OIP.E-kBjXfwdIB-sqxRDZUA0gHaLH?w=203&h=304&c=7&r=0&o=5&pid=1.7",
    price: "850,000 VND",
    description: "Cá Koi Kumonryu màu trắng pha đen.",
  },
  {
    id: 14,
    name: "Benigoi",
    image: "https://th.bing.com/th/id/OIP.tOWHDImwqRI_eKn7m7uYNgHaMH?w=195&h=319&c=7&r=0&o=5&pid=1.7",
    price: "950,000 VND",
    description: "Cá Koi Benigoi toàn thân đỏ rực rỡ.",
  },
  {
    id: 15,
    name: "Doitsu Sanke",
    image: "https://www.bing.com/th?id=OIP.tmy5i34MSmX0nw1w1GZ4FQHaLH&w=136&h=204&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2",
    price: "1,200,000 VND",
    description: "Cá Koi Doitsu Sanke vảy sáng và kết hợp màu đỏ trắng.",
  },
  {
    id: 16,
    name: "Lô Koi Hiếm",
    description: "Bộ sưu tập 4 con cá Koi hiếm, lý tưởng cho những người sưu tầm.",
    price: "7,500,000 VND",
    image: "https://th.bing.com/th/id/OIP.9wxu3jj4OLWUS8AfTCpPwQHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7",
    isLot: true,
    year: 2022,
    origin: "Nhật Bản",
    seller: "Rare Koi Farm",
    age: 1,
    foodPerDay: 130,
    quantity: 4,
    fishes: [
      { name: "Kohaku", quantity: 1 },
      { name: "Sanke", quantity: 1 },
      { name: "Showa", quantity: 1 },
      { name: "Goshiki", quantity: 1 },
    ],
    rating: 4,
  },
  {
    id: 17,
    name: "Lô Koi Đẹp",
    description: "Bộ sưu tập 5 con cá Koi đẹp, phù hợp cho hồ cá gia đình.",
    price: "4,200,000 VND",
    image: "https://cdn11.bigcommerce.com/s-upcqwyrrdy/images/stencil/1280x1280/products/12349/31213/japanese-premium-gosanke-8-10inch-koi-4pack-1000__59378.1680885854.jpg?c=1",
    isLot: true,
    year: 2021,
    origin: "Nhật Bản",
    seller: "Beautiful Koi Farm",
    age: 2,
    foodPerDay: 110,
    quantity: 5,
    fishes: [
      { name: "Kohaku", quantity: 2 },
      { name: "Sanke", quantity: 2 },
      { name: "Showa", quantity: 1 },
    ],
    rating: 5,
  },
  {
    id: 18,
    name: "Lô Koi Cao Cấp",
    description: "Bộ sưu tập 3 con cá Koi cao cấp, lý tưởng cho những người yêu thích cá Koi.",
    price: "8,000,000 VND",
    image: "https://cdn11.bigcommerce.com/s-kkon4imfg5/images/stencil/1280x1280/products/405/667/KOI_BUTTERFLY_6_-8___59746.1522374966.jpg?c=2",
    isLot: true,
    year: 2020,
    origin: "Nhật Bản",
    seller: "Premium Koi Farm",
    age: 3,
    foodPerDay: 150,
    quantity: 3,
    fishes: [
      { name: "Kohaku", quantity: 1 },
      { name: "Sanke", quantity: 1 },
      { name: "Showa", quantity: 1 },
    ],
    rating: 5,
  },
];



const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0); // Trạng thái cho trang hiện tại
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading
  const itemsPerPage = 4; // Số cá thể trên mỗi trang

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < featuredFishes.length) {
      setLoading(true); // Bắt đầu loading
      setCurrentPage(currentPage + 1);
      setLoading(false); // Kết thúc loading ngay lập tức
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setLoading(true); // Bắt đầu loading
      setCurrentPage(currentPage - 1);
      setLoading(false); // Kết thúc loading ngay lập tức
    }
  };

  const displayedFishes = featuredFishes.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <Header />
      <main className="container mx-auto my-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tin tức mới nhất </h2>
          {/* Display latest news */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {latestNews.map((news) => (
              <div key={news.id} className="border p-4">
                <img src={news.image} alt={news.title} className="mb-4 w-full h-80" />
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
          <h2 className="text-2xl font-bold mb-4">Lô cá nổi bật</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {featuredFishes.filter(fish => fish.isLot).map((fish) => (
              <div key={fish.id} className="border p-4">
                <img src={fish.image} alt={fish.name} className="mb-4 w-full h-80" />
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cá Koi nổi bật</h2>
          <div className="scroll-container"> {/* Sử dụng lớp CSS mới */}
            <TransitionGroup>
              <div className="flex overflow-x-auto"> {/* Thay đổi để hiển thị thẻ cá nằm ngang */}
                {displayedFishes.map((fish) => (
                  <CSSTransition key={fish.id} timeout={300} classNames="fade">
                    <div className="fish-card mr-4"> {/* Thêm khoảng cách giữa các thẻ cá */}
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
                  </CSSTransition>
                ))}
              </div>
            </TransitionGroup>
          </div>
          <div className="flex justify-between mt-4"> {/* Thêm nút điều hướng */}
            {loading ? ( // Hiển thị thông báo loading
              <span className="text-blue-500">Đang tải...</span>
            ) : (
              <>
                <button onClick={handlePrevPage} disabled={currentPage === 0} className="flex items-center text-blue-500 hover:underline">
                  <GrCaretPrevious className="mr-2" /> {/* Mũi tên trái */}
                  Trang trước
                </button>
                <button onClick={handleNextPage} disabled={(currentPage + 1) * itemsPerPage >= featuredFishes.length} className="flex items-center text-blue-500 hover:underline">
                  Trang sau
                  <GrCaretNext className="ml-2" /> {/* Mũi tên phải */}
                </button>
              </>
            )}
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
