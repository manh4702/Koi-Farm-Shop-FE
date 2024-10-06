// src/components/user/pages/ProductPage.jsx
import React, { useState } from "react";
import { Row, Col, Tooltip, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FishCard from "../Product/FishCard";

const fishes = [
  {
    id: 1,
    name: "Karashigoi",
    description:
      "Koi Karashigoi 60 cm, 2 tuổi, màu vàng tươi đặc trưng, rất hiếm và được ưa chuộng trong các hồ cá Koi.",
    price: "300,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
  },
  {
    id: 2,
    name: "Goshiki",
    description:
      "Koi Goshiki với sự kết hợp tinh tế giữa năm màu sắc trên cơ thể, kích thước 55 cm, 2 tuổi.",
    price: "500,000 VND",
    image: "https://koilover.vn/uploads/thumbs/goshiki_20190801092826524.jpg",
  },
  {
    id: 3,
    name: "Asagi",
    description:
      "Koi Asagi 50 cm, 1.5 tuổi, màu xanh xám đặc trưng với các họa tiết lưới trên lưng, phần bụng màu đỏ tươi.",
    price: "400,000 VND",
    image: "https://koilover.vn/uploads/thumbs/Asagi_20190801092355819.jpg",
  },
  {
    id: 4,
    name: "Kohaku",
    description:
      "Koi Kohaku 70 cm, 3 tuổi, là giống Koi phổ biến với hai màu đỏ trắng, thường được coi là 'vua' của các giống Koi.",
    price: "600,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kohaku_20190801092416968.jpg",
  },
  {
    id: 5,
    name: "Showa",
    description:
      "Koi Showa 65 cm, 2.5 tuổi, có ba màu chủ đạo là đỏ, trắng, và đen, với các họa tiết loang đặc sắc.",
    price: "750,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.6Vs0Oo2wsWAF5FtPVTRHZwHaLH?w=135&h=204&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 6,
    name: "Shiro Utsuri",
    description:
      "Koi Shiro Utsuri 55 cm, 2 tuổi, là giống Koi đen trắng với hoa văn đậm nét trên nền trắng.",
    price: "450,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.QweGuNY3xoLztgP99hL2-AHaMr?w=191&h=327&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 7,
    name: "Sanke",
    description:
      "Koi Sanke 70 cm, 3 tuổi, mang vẻ đẹp của hai màu đỏ và trắng với đốm đen lạ mắt.",
    price: "800,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.iQfjAgZSl6tCTFf6T4AS8QHaKs?w=131&h=190&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 8,
    name: "Tancho",
    description:
      "Koi Tancho 60 cm, 2.5 tuổi, nổi bật với đốm tròn màu đỏ trên đầu, được xem là biểu tượng may mắn.",
    price: "1,000,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.1CiBj7IMyAUNgClKWx8ajwHaLG?w=115&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 9,
    name: "Tancho",
    description:
      "Koi Tancho 60 cm, 2.5 tuổi, nổi bật với đốm tròn màu đỏ trên đầu, được xem là biểu tượng may mắn.",
    price: "1,000,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.1CiBj7IMyAUNgClKWx8ajwHaLG?w=115&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 10,
    name: "Doitsu Kujaku",
    description:
      "Koi Doitsu Kujaku 55 cm, 2 tuổi, vảy ánh kim sáng kết hợp màu đỏ và trắng tạo nên vẻ đẹp nổi bật.",
    price: "650,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kujyaku_20190801093000123.jpg",
  },
  {
    id: 11,
    name: "Yamabuki Ogon",
    description:
      "Koi Yamabuki Ogon 60 cm, 3 tuổi, màu vàng ánh kim, rất nổi bật và thu hút trong các hồ Koi.",
    price: "700,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/yamabukiogon_20190801093145245.jpg",
  },
  {
    id: 12,
    name: "Shusui",
    description:
      "Koi Shusui 50 cm, 1.5 tuổi, có vảy dọc lưng xanh, kết hợp với phần thân trắng pha màu đỏ cam.",
    price: "500,000 VND",
    image: "https://koilover.vn/uploads/thumbs/shusui_20190801093220223.jpg",
  },
  {
    id: 13,
    name: "Ki Utsuri",
    description:
      "Koi Ki Utsuri 65 cm, 2 tuổi, với màu vàng sáng xen lẫn màu đen đậm, tạo nên vẻ tương phản đầy cuốn hút.",
    price: "600,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kiutsuri_20190801093334245.jpg",
  },
  {
    id: 14,
    name: "Kumonryu",
    description:
      "Koi Kumonryu 70 cm, 3 tuổi, màu trắng pha đen thay đổi theo mùa, được xem là cá Koi của sự bí ẩn.",
    price: "850,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kumonryu_20190801093451356.jpg",
  },
  {
    id: 15,
    name: "Benigoi",
    description:
      "Koi Benigoi 60 cm, 2.5 tuổi, toàn thân đỏ rực rỡ, thể hiện sự mạnh mẽ và nổi bật trong hồ Koi.",
    price: "950,000 VND",
    image: "https://koilover.vn/uploads/thumbs/benigoi_20190801093517289.jpg",
  },
  {
    id: 16,
    name: "Doitsu Sanke",
    description:
      "Koi Doitsu Sanke 75 cm, 4 tuổi, vảy sáng và kết hợp màu đỏ trắng cùng các đốm đen đặc trưng.",
    price: "1,200,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/doitsusanke_20190801093628345.jpg",
  },

  // ... (Các đối tượng cá còn lại tương tự)
];

const ITEMS_PER_PAGE = 12;

const ProductPage = () => {
  // Tạo một state để theo dõi thẻ cá nào đang được hover
  const [hoveredFishId, setHoveredFishId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Lấy các thẻ cá thuộc trang hiện tại
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFishes = fishes.slice(startIndex, endIndex);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      style={{ minHeight: "100px", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main
        style={{
          flexGrow: 1,
          maxWidth: "100%",
          margin: "0 190px",
          padding: "32px 16px",
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "32px",
          }}
        >
          Các loại cá Koi
        </h1>
        <Row gutter={[16, 16]}>
          {currentFishes.map((fish) => (
            <Col
              key={fish.id}
              xs={24}
              sm={12}
              md={6}
              onMouseEnter={() => setHoveredFishId(fish.id)}
              onMouseLeave={() => setHoveredFishId(null)}
              style={{ position: "relative" }}
            >
              <FishCard fish={fish} />
              {hoveredFishId === fish.id && (
                <Tooltip title="Xem chi tiết">
                  <EyeOutlined
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "30px",
                      color: "#1890ff",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              )}
            </Col>
          ))}
        </Row>
        {/* Container phân trang, căn về bên phải */}
        <div style={{ textAlign: "right", marginTop: "32px" }}>
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={fishes.length}
            onChange={handlePageChange}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
