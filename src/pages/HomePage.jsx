import React, {useState, useEffect} from "react";
import axios from "../api/axios.jsx";
import {Link} from "react-router-dom";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
import ZaloIcon from "../components/user/Shared/ZaloIcon";
import FBIconts from "../components/user/Shared/FacebookIcon";
import YTIconts from "../components/user/Shared/YoutubeIcon";
import {GrCaretPrevious, GrCaretNext} from "react-icons/gr";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './HomePage.css';

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

const HomePage = () => {
  const [featuredFishes, setFeaturedFishes] = useState([]); // State cho cá lẻ từ API
  const [fishPackages, setFishPackages] = useState([]); // State cho lô cá từ API
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchFishes = async () => {
      setLoading(true);
      try {
        // Gọi API cho cá lẻ
        const fishResponse = await axios.get("/api/Fish");
        setFeaturedFishes(fishResponse.data);

        // Gọi API cho lô cá
        const packageResponse = await axios.get("/api/FishPackage?page=1&pageSize=10");
        setFishPackages(packageResponse.data.data.listData || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFishes();
  }, []);

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < featuredFishes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedFishes = featuredFishes.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <Header/>
      <main className="container mx-auto my-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tin tức mới nhất</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {latestNews.map((news) => (
              <div key={news.id} className="border p-4">
                <img src={news.image} alt={news.title} className="mb-4 w-full h-80"/>
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
          <Link to="/news" className="text-blue-500 hover:underline">
            Xem tất cả tin tức
          </Link>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Lô cá nổi bật</h2>
          <div className="flex items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="text-blue-500 hover:underline mr-4"
            >
              <GrCaretPrevious className="text-2xl"/>
            </button>
            <div className="flex overflow-hidden">
              {/*<div className="grid grid-cols-3 gap-4 mb-4">*/}
              {fishPackages.map((fishPackage) => (
                <div key={fishPackage.id} className="border p-4 mx-4 rounded-lg shadow-md" style={{width: "260px"}}>
                  <img src={fishPackage.imageUrl} alt={fishPackage.name}
                       className="mb-4 w-full h-80 rounded-lg"/>
                  <h3 className="text-xl font-semibold">{fishPackage.name}</h3>
                  <p className="text-red-500 font-bold">{fishPackage.price}</p>
                  <p className="text-gray-700">{fishPackage.description}</p>
                  <Link
                    to={`/products/${fishPackage.id}`}
                    className="text-blue-500 hover:underline mt-2 inline-block"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={(currentPage + 1) * itemsPerPage >= fishPackages.length}
              className="text-blue-500 hover:underline ml-4"
            >
              <GrCaretNext className="text-2xl"/>
            </button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cá Koi nổi bật</h2>
          <div className="scroll-container">
            <TransitionGroup>
              <div className="flex overflow-x-auto">
                {displayedFishes.map((fish) => (
                  <CSSTransition key={fish.id} timeout={300} classNames="fade">
                    <div className="fish-card mr-4">
                      <img
                        src={fish.imageUrl}
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
          <div className="flex justify-between mt-4">
            {loading ? (
              <span className="text-blue-500">Đang tải...</span>
            ) : (
              <>
                <button onClick={handlePrevPage} disabled={currentPage === 0}
                        className="flex items-center text-blue-500 hover:underline">
                  <GrCaretPrevious className="mr-2"/>
                  Trang trước
                </button>
                <button onClick={handleNextPage}
                        disabled={(currentPage + 1) * itemsPerPage >= featuredFishes.length}
                        className="flex items-center text-blue-500 hover:underline">
                  Trang sau
                  <GrCaretNext className="ml-2"/>
                </button>
              </>
            )}
          </div>
        </section>
      </main>

      <ZaloIcon/>
      <FBIconts/>
      <YTIconts/>
      <Footer/>
    </div>
  );
};

export default HomePage;
