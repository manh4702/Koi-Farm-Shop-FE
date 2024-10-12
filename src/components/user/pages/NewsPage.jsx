// src/components/user/pages/NewsPage.jsx
import React, { useEffect, useState } from "react";
import { Card, List, Typography } from "antd";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ZaloIcon from "./ZaloIcon";
import YTIconts from "./YoutubeIcon";
import FBIconts from "./FacebookIcon";

const { Title } = Typography;

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    const fetchNews = async () => {
      // Thay thế bằng API thực tế của bạn
      const newsData = [
        {
          id: 1,
          title: "Khuyến mãi lớn cho cá Koi mùa hè",
          summary: "Giảm giá 30% cho tất cả các dòng cá Koi nhập khẩu...",
          date: "2023-07-15",
        },
        {
          id: 2,
          title: "Sự kiện đấu giá cá Koi đặc biệt",
          summary:
            "Tham gia sự kiện đấu giá với nhiều dòng cá Koi chất lượng...",
          date: "2023-07-20",
        },
        // Thêm các bài viết khác...
      ];
      setNewsList(newsData);

      const popularNewsData = [
        {
          id: 3,
          title: "Giới thiệu các giống cá Koi nổi tiếng từ Nhật Bản",
          date: "2023-06-10",
        },
        {
          id: 4,
          title: "Hướng dẫn chăm sóc cá Koi mùa hè",
          date: "2023-05-15",
        },
      ];
      setPopularNews(popularNewsData);

      const popularProductsData = [
        {
          id: 1,
          name: "Cá Koi Sanke Nhật Bản",
          price: "15,000,000 VND",
          imageUrl: "https://via.placeholder.com/150", // Giả lập hình ảnh
        },
        {
          id: 2,
          name: "Cá Koi Kohaku Nhật Bản",
          price: "12,000,000 VND",
          imageUrl: "https://via.placeholder.com/150", // Giả lập hình ảnh
        },
      ];
      setPopularProducts(popularProductsData);
    };

    fetchNews();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Phần tin tức chính */}
          <div style={{ flex: 3 }}>
            <Title level={2}>Tin tức mới nhất</Title>
            <List
              itemLayout="vertical"
              dataSource={newsList}
              renderItem={(news) => (
                <List.Item key={news.id}>
                  <Card
                    title={news.title}
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
          </div>

          {/* Phần bài viết xem nhiều và sản phẩm phổ biến */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "20px" }}>
              <Title level={4}>Bài viết xem nhiều nhất</Title>
              <List
                itemLayout="horizontal"
                dataSource={popularNews}
                renderItem={(news) => (
                  <List.Item key={news.id}>
                    <List.Item.Meta
                      title={<a href={`/news/${news.id}`}>{news.title}</a>}
                      description={`Ngày đăng: ${new Date(
                        news.date
                      ).toLocaleDateString()}`}
                    />
                  </List.Item>
                )}
              />
            </div>

            <div>
              <Title level={4}>Sản phẩm nổi bật</Title>
              <List
                itemLayout="vertical"
                dataSource={popularProducts}
                renderItem={(product) => (
                  <List.Item key={product.id}>
                    <Card
                      cover={<img alt={product.name} src={product.imageUrl} />}
                    >
                      <Card.Meta
                        title={product.name}
                        description={`Giá: ${product.price}`}
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
