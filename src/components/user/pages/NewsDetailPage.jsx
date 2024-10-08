import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Skeleton, message } from "antd";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    const fetchNewsItem = async () => {
      try {
        // Giả lập dữ liệu API, thay thế bằng URL API thực tế của bạn
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            // Kiểm tra nếu ID không hợp lệ
            if (id !== "1" && id !== "2") {
              resolve({
                success: false,
                message: "Không tìm thấy bài viết tin tức.",
              });
            } else {
              resolve({
                success: true,
                data: {
                  id,
                  title: "Khuyến mãi lớn mùa hè cho cá Koi",
                  date: "2023-07-15",
                  content:
                    "Chúng tôi đang tổ chức chương trình khuyến mãi lớn dành cho tất cả khách hàng yêu thích cá Koi. Giảm giá lên đến 30% cho các dòng cá Koi đặc biệt...",
                  imageUrl: "https://via.placeholder.com/800x400", // Giả lập hình ảnh
                },
              });
            }
          }, 1000)
        );

        if (response.success) {
          setNewsItem(response.data);
        } else {
          throw new Error(
            response.message || "Không tìm thấy bài viết tin tức."
          );
        }
      } catch (err) {
        setError(err.message);
        message.error("Không tìm thấy bài viết tin tức.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        {loading ? (
          <Skeleton active />
        ) : error ? (
          <div>
            <p>{error}</p>
            <Link to="/news">
              <Button type="primary">Quay lại trang tin tức</Button>
            </Link>
          </div>
        ) : (
          <Card
            cover={
              <img
                alt={newsItem.title}
                src={newsItem.imageUrl}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            }
            actions={[
              <Link to="/news" key="back">
                <Button type="primary">Quay lại trang tin tức</Button>
              </Link>,
            ]}
          >
            <Card.Meta
              title={newsItem.title}
              description={`Ngày đăng: ${new Date(
                newsItem.date
              ).toLocaleDateString()}`}
            />
            <div style={{ marginTop: "20px" }}>
              <p>{newsItem.content}</p>
            </div>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
