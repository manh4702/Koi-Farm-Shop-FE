// src/components/user/pages/NewsPage.jsx
import React, { useEffect, useState } from "react";
import { Card, List, Typography } from "antd";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "../Shared/ZaloIcon";
import YTIconts from "../Shared/YoutubeIcon";
import FBIconts from "../Shared/FacebookIcon";
import './../../../styles/newpage.css'; // Thêm dòng này để nhập CSS

const { Title } = Typography;

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // Number of articles per page

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    const fetchNews = async () => {
      // Thay thế bằng API thực tế của bạn
      const newsData = [
        {
          id: 1,
          title: "Khuyến mãi lớn cho cá Koi mùa hè",
          summary: "Giảm giá 30% cho tất cả các dòng cá Koi nhập khu...",
          date: "2023-07-15",
          imageUrl: "https://img.freepik.com/free-photo/beautiful-exotic-colorful-fish_23-2150737617.jpg", // Giả lập hình ảnh
        },
        {
          id: 2,
          title: "Sự kiện đấu giá cá Koi đặc biệt",
          summary:
            "Tham gia sự kiện đấu giá với nhiều dòng cá Koi chất lượng...",
          date: "2023-07-20",
          imageUrl: "https://images.unsplash.com/photo-1526317405575-b992efc46796?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGtvaXxlbnwwfHwwfHx8MA%3D%3D", // Giả lập hình ảnh
        },
        {
          id: 3,
          title: "Ý Nghĩa Cá Koi Trong Văn Hóa Nhật Bản",
          summary: "Cá Koi không chỉ là loài cá đẹp mà còn mang ý nghĩa văn hóa sâu sắc.",
          date: "2023-08-13",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Y6jjGzXOEf4u5-x1rrYAEc0vBDg4PMAEbA&s",
        },
        {
          id: 4,
          title: "Cách Chăm Sóc Cá Koi",
          summary: "Cá Koi là loài cá cảnh đòi hỏi sự chăm sóc đặc biệt.",
          date: "2023-08-14",
          imageUrl: "https://media.istockphoto.com/id/1450062580/es/foto/manojo-de-la-variedad-nishikigoi-koi-la-colorida-carpa-de-amur-nadando-activamente-en-el.webp?b=1&s=170667a&w=0&k=20&c=AhBHEuN0ozjvdXYZ4Ffd0xJca-Kb9igVSEWM41teMCc=",
        },
        {
          id: 5,
          title: "Giá Trị Thị Trường Của Cá Koi",
          summary: "Giá trị của cá Koi phụ thuộc vào nhiều yếu tố như kích thước, màu sắc, hoa văn và độ thuần chủng.",
          date: "2023-08-15",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfvWOsSovaHUiTcAiW63TJJcSVlCjYe6FlhIUF7fnUbCiYInAvVBh9ng44lC6GQOZS80&usqp=CAU",
        },
        {
          id: 6,
          title: "Sự Khác Biệt Giữa Cá Koi Và Cá Chép Thường",
          summary: "Cá Koi và cá chép thường có chung nguồn gốc, nhưng điểm khác biệt chính là màu sắc và hoa văn.",
          date: "2023-08-16",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkSIhtPYccSquAyMbqd-p_BEqCwku3l8d7qFD7xxES1NrKSE0junUMeZefSqwgEu8Ohw4&usqp=CAU",
        },
        {
          id: 7,
          title: "Chọn Hồ Cá Koi Phù Hợp",
          summary: "Hồ cá Koi cần được thiết kế sao cho phù hợp với sự phát triển và sinh sống của cá.",
          date: "2023-08-17",
          imageUrl: "https://img.freepik.com/vector-premium/peces-koi-nadando-estanque_9645-2254.jpg",
        },
        {
          id: 8,
          title: "Thức Ăn Cho Cá Koi",
          summary: "Cá Koi là loài cá ăn tạp, chúng có thể ăn thực vật, côn trùng và thức ăn chuyên dụng.",
          date: "2023-08-18",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNutPLuj7m3jl5ggzoHzj6PqqMlg7OxvQuaUEz92pJRK6m80pRe0x9jvp4R-XiJ2UVxtg&usqp=CAU",
        },
        {
          id: 9,
          title: "Những Bệnh Thường Gặp Ở Cá Koi",
          summary: "Cá Koi cũng có thể mắc một số bệnh phổ biến như nấm da, viêm mang, và ký sinh trùng.",
          date: "2023-08-19",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpNy7gG2zSt5t_EwxizHI6TGqY6cOB3-WtQ&s",
        },
        {
          id: 10,
          title: "Phong Trào Chơi Cá Koi Ở Việt Nam",
          summary: "Tại Việt Nam, phong trào nuôi cá Koi ngày càng phổ biến, đặc biệt là ở các thành phố lớn.",
          date: "2023-08-20",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EZ8RUhwK7AKTBQfPWG3XEzUS7xbp7aFUxg&s",
        },
        // ... existing articles ...
      ];
      setNewsList(newsData);

      const popularNewsData = [
        {
          id: 3,
          title: "Giới thiệu các giống cá Koi nổi tiếng từ Nhật Bản",
          date: "2023-06-10",
          imageUrl: "https://img.pikbest.com/wp/202345/black-koi-an-orange-with-spots-is-swimming_9597133.jpg!w700wp", // Giả lập hình ảnh
        },
        {
          id: 4,
          title: "Hướng dẫn chăm sóc cá Koi mùa hè",
          date: "2023-05-15",
          imageUrl: "https://c4.wallpaperflare.com/wallpaper/60/410/480/artwork-fish-water-lake-wallpaper-preview.jpg", // Giả lập hình ảnh
        },
        {
          id: 11,
          title: "Giới thiệu các giống cá Koi hiếm",
          date: "2023-08-05",
          imageUrl: "https://img.pikbest.com/wp/202345/black-koi-an-orange-with-spots-is-swimming_9597133.jpg!w700wp", // Giả lập hình ảnh
        },
        {
          id: 12,
          title: "Cách chăm sóc cá Koi trong mùa đông",
          date: "2023-08-06",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpNy7gG2zSt5t_EwxizHI6TGqY6cOB3-WtQ&s", // Giả lập hình ảnh
        },
        {
          id: 13,
          title: "Tác dụng của cá Koi đối với môi trường",
          date: "2023-08-07",
          imageUrl: "https://img.freepik.com/vector-premium/peces-koi-nadando-estanque_9645-2254.jpg", // Giả lập hình ảnh
        },
        {
          id: 14,
          title: "Phong trào nuôi cá Koi trên thế giới",
          date: "2023-08-08",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Y6jjGzXOEf4u5-x1rrYAEc0vBDg4PMAEbA&s", // Giả lập hình ảnh
        },
      ];
      setPopularNews(popularNewsData);

      const popularProductsData = [
        {
          id: 1,
          name: "Cá Koi Sanke Nhật Bản",
          price: "15,000,000 VND",
          imageUrl: "https://koilover.vn/uploads/thumbs/goshiki_20190801092826524.jpg", // Giả lập hình ảnh
        },
        {
          id: 2,
          name: "Cá Koi Kohaku Nhật Bản",
          price: "12,000,000 VND",
          imageUrl: "https://koilover.vn/uploads/thumbs/kohaku_20190801092416968.jpg", // Giả lập hình ảnh
        },
      ];
      setPopularProducts(popularProductsData);
    };
    fetchNews();
  }, []);

  // Calculate the current articles to display
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsList.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(newsList.length / articlesPerPage);

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "20px" }}> 
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Phần tin tức chính */}
          <div style={{ flex: 4 }}> 
            <Title level={2} style={{ fontSize: '24px', color: '#1890ff', fontWeight: 'bold' }}>Tin tức mới nhất</Title>
            <List
              itemLayout="vertical"
              dataSource={currentArticles} // Use currentArticles for pagination
              renderItem={(news) => (
                <List.Item key={news.id}>
                  <Card
                    cover={<img alt={news.title} src={news.imageUrl} />}
                    title={<span style={{ fontSize: '28px', fontWeight: 'bold' }}>{news.title}</span>} // Tăng kích thước và độ đậm của tiêu đề
                    extra={
                      <span>{new Date(news.date).toLocaleDateString()}</span>
                    }
                  >
                    <p>{news.summary}</p>
                    <a href={`/news/${news.id}`}>Đọc thêm</a>
                  </Card>
                </List.Item>
              )}
            />
            {/* Pagination Controls */}
            <div style={{ marginTop: "20px" }}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{
                    margin: "0 5px",
                    padding: "5px 10px",
                    backgroundColor: currentPage === index + 1 ? "#1890ff" : "#f0f0f0",
                    color: currentPage === index + 1 ? "#fff" : "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
 
          {/* Phần bài viết xem nhiều và sản phẩm phổ biến */}
          <div style={{ flex: 2 }}> 
            <div style={{ marginBottom: "20px" }}>
              <Title level={4} style={{ fontSize: '24px', color: '#1890ff', fontWeight: 'bold' }}>Bài viết xem nhiều nhất</Title>
              <List
                itemLayout="horizontal"
                dataSource={popularNews}
                renderItem={(news) => (
                  <List.Item key={news.id}>
                    <List.Item.Meta
                      avatar={<img src={news.imageUrl} alt={news.title} style={{ width: '100px', height: '100px' }} />} // Tăng kích thước ảnh
                      title={<a href={`/news/${news.id}`} style={{ fontSize: '20px' }}> {news.title} </a>} // Increased font size
                      description={`Ngày đăng: ${new Date(
                        news.date
                      ).toLocaleDateString()}`}
                    />
                  </List.Item>
                )}
              />
            </div>

            <div>
              <Title level={4} style={{ fontSize: '24px', color: '#1890ff', fontWeight: 'bold', marginBottom: '20px' }}>Sản phẩm nổi bật</Title>
              <List
                itemLayout="vertical"
                dataSource={popularProducts}
                renderItem={(product) => (
                  <List.Item key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}> 
                    <Card
                      cover={<img alt={product.name} src={product.imageUrl} style={{ width: '150px', height: '150px', borderRadius: '8px' }} />} // Adjusted image size and added border radius
                    >
                      <Card.Meta
                        title={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>{product.name}</span>} // Adjusted font size and added bold
                        description={<span style={{ fontSize: '18px', color: '#666' }}>Giá: {product.price}</span>} // Adjusted font size and color
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <ZaloIcon />
      <YTIconts />
      <FBIconts />
      <Footer />
    </div>
  );
};

export default NewsPage;
