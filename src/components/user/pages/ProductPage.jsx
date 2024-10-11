// src/components/user/pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Pagination, Checkbox, Modal, Button } from "antd";
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
    image:
      "https://th.bing.com/th/id/OIP.3lnsfQUPO4ZMLA1Xr0s3QgHaLc?w=201&h=310&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 11,
    name: "Yamabuki Ogon",
    description:
      "Koi Yamabuki Ogon 60 cm, 3 tuổi, màu vàng ánh kim, rất nổi bật và thu hút trong các hồ Koi.",
    price: "700,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.qjAQlysT0IBlOkrtY5qD5gHaLI?w=115&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 12,
    name: "Shusui",
    description:
      "Koi Shusui 50 cm, 1.5 tuổi, có vảy dọc lưng xanh, kết hợp với phần thân trắng pha màu đỏ cam.",
    price: "500,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.kH_bEW8tRBBH0V-qoETOcQHaLC?w=203&h=304&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 13,
    name: "Ki Utsuri",
    description:
      "Koi Ki Utsuri 65 cm, 2 tuổi, với màu vàng sáng xen lẫn màu đen đậm, tạo nên vẻ tương phản đầy cuốn hút.",
    price: "600,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.GST467YSEAQo31msgUOebAHaHW?w=173&h=180&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 14,
    name: "Kumonryu",
    description:
      "Koi Kumonryu 70 cm, 3 tuổi, màu trắng pha đen thay đổi theo mùa, được xem là cá Koi của sự bí ẩn.",
    price: "850,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.E-kBjXfwdIB-sqxRDZUA0gHaLH?w=203&h=304&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 15,
    name: "Benigoi",
    description:
      "Koi Benigoi 60 cm, 2.5 tuổi, toàn thân đỏ rực rỡ, thể hiện sự mạnh mẽ và nổi bật trong hồ Koi.",
    price: "950,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.tOWHDImwqRI_eKn7m7uYNgHaMH?w=195&h=319&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 16,
    name: "Doitsu Sanke",
    description:
      "Koi Doitsu Sanke 75 cm, 4 tuổi, vảy sáng và kết hợp màu đỏ trắng cùng các đốm đen đặc trưng.",
    price: "1,200,000 VND",
    image:
      "https://www.bing.com/th?id=OIP.tmy5i34MSmX0nw1w1GZ4FQHaLH&w=136&h=204&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2",
  },
  {
    id: 17,
    name: "Lô Koi Sanke & Showa",
    description:
      "Bộ sưu tập 5 con cá Koi gồm 3 Sanke và 2 Showa, đều sinh năm 2021. Lý tưởng cho việc bắt đầu một hồ Koi đa dạng.",
    price: "3,500,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.9wxu3jj4OLWUS8AfTCpPwQHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7",
    isLot: true,
    birthYear: 2021,
    quantity: 5,
    fishes: [
      { name: "Sanke", quantity: 3 },
      { name: "Showa", quantity: 2 },
    ],
  },
  {
    id: 18,
    name: "Lô cá Gosanke Premium",
    description:
      "Bộ 3 cá Koi cao cấp gồm Kohaku, Sanke, và Showa, sinh năm 2020. Đây là bộ sưu tập hoàn hảo cho những người yêu thích Gosanke.",
    price: "5,000,000 VND",
    image:
      "https://cdn11.bigcommerce.com/s-upcqwyrrdy/images/stencil/1280x1280/products/12349/31213/japanese-premium-gosanke-8-10inch-koi-4pack-1000__59378.1680885854.jpg?c=1",
    isLot: true,
    birthYear: 2020,
    quantity: 3,
    fishes: [
      { name: "Kohaku", quantity: 1 },
      { name: "Sanke", quantity: 1 },
      { name: "Showa", quantity: 1 },
    ],
  },
  {
    id: 19,
    name: "Lô Koi Butterfly",
    description:
      "Bộ sưu tập 4 con cá Koi Butterfly đẹp mắt, sinh năm 2022. Bao gồm các giống Koi có vây dài và đuôi bướm đặc trưng.",
    price: "2,800,000 VND",
    image:
      "https://cdn11.bigcommerce.com/s-kkon4imfg5/images/stencil/1280x1280/products/405/667/KOI_BUTTERFLY_6_-8___59746.1522374966.jpg?c=2",
    isLot: true,
    birthYear: 2022,
    quantity: 4,
    fishes: [
      { name: "Butterfly Kohaku", quantity: 1 },
      { name: "Butterfly Showa", quantity: 1 },
      { name: "Butterfly Sanke", quantity: 1 },
      { name: "Butterfly Goshiki", quantity: 1 },
    ],
  },
  // Thêm cá khác ...
];

const ITEMS_PER_PAGE = 12;

const ProductPage = () => {
  const [hoveredFishId, setHoveredFishId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFishes, setSelectedFishes] = useState([]);
  // Lấy các thẻ cá thuộc trang hiện tại
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFishes = fishes.slice(startIndex, endIndex);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
   // Hàm chọn cá để so sánh
   const handleSelectFish = (fishId) => {
    const selectedFish = fishes.find((fish) => fish.id === fishId);
    if (!selectedFish) return;

    if (selectedFishes.includes(selectedFish)) {
      setSelectedFishes(selectedFishes.filter((fish) => fish.id !== fishId));
    } else {
      if (selectedFishes.length < 2) {
        setSelectedFishes([...selectedFishes, selectedFish]);
      } else {
        Modal.warning({
          title: "Chỉ có thể so sánh 2 cá",
          content: "Bạn chỉ có thể chọn tối đa 2 cá để so sánh.",
        });
      }
    }
  };

     // Hiển thị bảng so sánh
    const showCompareModal = () => {
    Modal.info({
      title: "So sánh cá",
      content: (
        <div>
          {selectedFishes.length === 2 ? (
            <table>
              <thead>
                <tr>
                  <th>Thuộc tính</th>
                  <th>{selectedFishes[0].name}</th>
                  <th>{selectedFishes[1].name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Giá</td>
                  <td>{selectedFishes[0].price}</td>
                  <td>{selectedFishes[1].price}</td>
                </tr>
                <tr>
                  <td>Kích thước</td>
                  <td>{selectedFishes[0].size}</td>
                  <td>{selectedFishes[1].size}</td>
                </tr>
                <tr>
                  <td>Tuổi</td>
                  <td>{selectedFishes[0].age}</td>
                  <td>{selectedFishes[1].age}</td>
                </tr>
                <tr>
                  <td>Năm sinh</td>
                  <td>{selectedFishes[0].year}</td>
                  <td>{selectedFishes[1].year}</td>
                </tr>
                <tr>
                  <td>Nguồn gốc</td>
                  <td>{selectedFishes[0].origin}</td>
                  <td>{selectedFishes[1].origin}</td>
                </tr>
                <tr>
                  <td>Giống</td>
                  <td>{selectedFishes[0].breed}</td>
                  <td>{selectedFishes[1].breed}</td>
                </tr>
                <tr>
                  <td>Giới tính</td>
                  <td>{selectedFishes[0].gender}</td>
                  <td>{selectedFishes[1].gender}</td>
                </tr>
                <tr>
                  <td>Lượng thức ăn/ngày</td>
                  <td>{selectedFishes[0].foodPerDay}</td>
                  <td>{selectedFishes[1].foodPerDay}</td>
                </tr>
                <tr>
                  <td>Tỉ lệ sàng lọc</td>
                  <td>{selectedFishes[0].screeningRate}</td>
                  <td>{selectedFishes[1].screeningRate}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Vui lòng chọn 2 cá để so sánh.</p>
          )}
        </div>
      ),
      onOk() {},
    });
  };
  // Cuộn về đầu trang khi thay đổi trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]); // Gọi khi currentPage thay đổi

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
        {/* Container cho tiêu đề và nút so sánh */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // Căn giữa theo chiều dọc
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
            }}
          >
            Các loại cá Koi và Lô Cá
          </h1>
          {/* Nút hiện bảng so sánh */}
          {selectedFishes.length === 2 && (
            <Button
              type="primary"
              onClick={showCompareModal}
              style={{ marginLeft: "auto" }} // Đẩy nút sang bên phải
            >
              So sánh {selectedFishes.length} cá đã chọn
            </Button>
          )}
        </div>
  
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
              {/* Checkbox để chọn cá so sánh */}
              <Checkbox
                checked={selectedFishes.includes(fish)}
                onChange={() => handleSelectFish(fish.id)}
                style={{ position: "absolute", top: "10px", right: "10px" }}
              >
                So sánh
              </Checkbox>
            </Col>
          ))}
        </Row>
        {/* Container phân trang, căn về bên phải */}
        <div
          style={{
            textAlign: "right",
            marginTop: "32px",
            float: "right",
          }}
        >
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
