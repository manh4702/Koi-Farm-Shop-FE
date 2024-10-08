// src/components/user/pages/ProductDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { Button, message } from "antd";
import { ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";
import useCartStore from "../../../store/cartStore"; // Store quản lý giỏ hàng

const fishes = [
  {
    id: 1,
    name: "Karashigoi",
    description:
      "Koi Karashigoi 60 cm, 2 tuổi, màu vàng tươi đặc trưng, rất hiếm và được ưa chuộng trong các hồ cá Koi.",
    price: "300,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
    size: "60 cm",
    year: 2022,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://koilover.vn/uploads/thumbs/karashigoi_20190801092911330.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5PF0YC5oyRfmFHF49BXTUsQkB7HAimFGYfA&s",
      "https://koilover.vn/uploads/images/karashigoi_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=0Ihh7WvKMX4&t=2s",
  },
  {
    id: 2,
    name: "Goshiki",
    description:
      "Koi Goshiki với sự kết hợp tinh tế giữa năm màu sắc trên cơ thể, kích thước 55 cm, 2 tuổi.",
    price: "500,000 VND",
    image: "https://koilover.vn/uploads/thumbs/goshiki_20190801092826524.jpg",
    size: "55 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://koilover.vn/uploads/thumbs/goshiki_20190801092826524.jpg",
      "https://koilover.vn/uploads/images/goshiki_sideview.jpg",
      "https://koilover.vn/uploads/images/goshiki_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=goshiki_video_link",
  },
  {
    id: 3,
    name: "Asagi",
    description:
      "Koi Asagi 50 cm, 1.5 tuổi, màu xanh xám đặc trưng với các họa tiết lưới trên lưng, phần bụng màu đỏ tươi.",
    price: "400,000 VND",
    image: "https://koilover.vn/uploads/thumbs/Asagi_20190801092355819.jpg",
    size: "50 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://koilover.vn/uploads/thumbs/Asagi_20190801092355819.jpg",
      "https://koilover.vn/uploads/images/asagi_sideview.jpg",
      "https://koilover.vn/uploads/images/asagi_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=asagi_video_link",
  },
  {
    id: 4,
    name: "Kohaku",
    description:
      "Koi Kohaku 70 cm, 3 tuổi, là giống Koi phổ biến với hai màu đỏ trắng, thường được coi là 'vua' của các giống Koi.",
    price: "600,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kohaku_20190801092416968.jpg",
    size: "70 cm",
    year: 2020,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://koilover.vn/uploads/thumbs/kohaku_20190801092416968.jpg",
      "https://koilover.vn/uploads/images/kohaku_sideview.jpg",
      "https://koilover.vn/uploads/images/kohaku_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=kohaku_video_link",
  },
  {
    id: 5,
    name: "Showa",
    description:
      "Koi Showa 65 cm, 2.5 tuổi, có ba màu chủ đạo là đỏ, trắng, và đen, với các họa tiết loang đặc sắc.",
    price: "750,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.6Vs0Oo2wsWAF5FtPVTRHZwHaLH?w=135&h=204&c=7&r=0&o=5&pid=1.7",
    size: "65 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://th.bing.com/th/id/OIP.6Vs0Oo2wsWAF5FtPVTRHZwHaLH?w=135&h=204&c=7&r=0&o=5&pid=1.7",
      "https://koilover.vn/uploads/images/showa_sideview.jpg",
      "https://koilover.vn/uploads/images/showa_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=showa_video_link",
  },
  {
    id: 6,
    name: "Shiro Utsuri",
    description:
      "Koi Shiro Utsuri 55 cm, 2 tuổi, là giống Koi đen trắng với hoa văn đậm nét trên nền trắng.",
    price: "450,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.QweGuNY3xoLztgP99hL2-AHaMr?w=191&h=327&c=7&r=0&o=5&pid=1.7",
    size: "55 cm",
    year: 2022,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://th.bing.com/th/id/OIP.QweGuNY3xoLztgP99hL2-AHaMr?w=191&h=327&c=7&r=0&o=5&pid=1.7",
      "https://koilover.vn/uploads/images/shiro_sideview.jpg",
      "https://koilover.vn/uploads/images/shiro_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=shiro_video_link",
  },
  {
    id: 7,
    name: "Sanke",
    description:
      "Koi Sanke 70 cm, 3 tuổi, mang vẻ đẹp của hai màu đỏ và trắng với đốm đen lạ mắt.",
    price: "800,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.iQfjAgZSl6tCTFf6T4AS8QHaKs?w=131&h=190&c=7&r=0&o=5&pid=1.7",
    size: "70 cm",
    year: 2020,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://th.bing.com/th/id/OIP.iQfjAgZSl6tCTFf6T4AS8QHaKs?w=131&h=190&c=7&r=0&o=5&pid=1.7",
      "https://koilover.vn/uploads/images/sanke_sideview.jpg",
      "https://koilover.vn/uploads/images/sanke_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=sanke_video_link",
  },
  {
    id: 8,
    name: "Tancho",
    description:
      "Koi Tancho 60 cm, 2.5 tuổi, nổi bật với đốm tròn màu đỏ trên đầu, được xem là biểu tượng may mắn.",
    price: "1,000,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.1CiBj7IMyAUNgClKWx8ajwHaLG?w=115&h=180&c=7&r=0&o=5&pid=1.7",
    size: "60 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://th.bing.com/th/id/OIP.1CiBj7IMyAUNgClKWx8ajwHaLG?w=115&h=180&c=7&r=0&o=5&pid=1.7",
      "https://koilover.vn/uploads/images/tancho_sideview.jpg",
      "https://koilover.vn/uploads/images/tancho_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=tancho_video_link",
  },
  {
    id: 9,
    name: "Doitsu Kujaku",
    description:
      "Koi Doitsu Kujaku 55 cm, 2 tuổi, vảy ánh kim sáng kết hợp màu đỏ và trắng tạo nên vẻ đẹp nổi bật.",
    price: "650,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kujyaku_20190801093000123.jpg",
    size: "55 cm",
    year: 2022,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    images: [
      "https://koilover.vn/uploads/thumbs/kujyaku_20190801093000123.jpg",
      "https://koilover.vn/uploads/images/kujaku_sideview.jpg",
      "https://koilover.vn/uploads/images/kujaku_closeup.jpg",
    ],
    video: "https://www.youtube.com/watch?v=kujaku_video_link",
  },
  {
    id: 10,
    name: "Doitsu Kujaku",
    description:
      "Koi Doitsu Kujaku 55 cm, 2 tuổi, vảy ánh kim sáng kết hợp màu đỏ và trắng tạo nên vẻ đẹp nổi bật.",
    price: "650,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kujyaku_20190801093000123.jpg",
    size: "55 cm",
    year: 2022,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
  },
  {
    id: 11,
    name: "Yamabuki Ogon",
    description:
      "Koi Yamabuki Ogon 60 cm, 3 tuổi, màu vàng ánh kim, rất nổi bật và thu hút trong các hồ Koi.",
    price: "700,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/yamabukiogon_20190801093145245.jpg",
    size: "60 cm",
    year: 2020,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
  },
  {
    id: 12,
    name: "Shusui",
    description:
      "Koi Shusui 50 cm, 1.5 tuổi, có vảy dọc lưng xanh, kết hợp với phần thân trắng pha màu đỏ cam.",
    price: "500,000 VND",
    image: "https://koilover.vn/uploads/thumbs/shusui_20190801093220223.jpg",
    size: "50 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
  },
  {
    id: 13,
    name: "Ki Utsuri",
    description:
      "Koi Ki Utsuri 65 cm, 2 tuổi, với màu vàng sáng xen lẫn màu đen đậm, tạo nên vẻ tương phản đầy cuốn hút.",
    price: "600,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kiutsuri_20190801093334245.jpg",
    size: "65 cm",
    year: 2022,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
  },
  {
    id: 14,
    name: "Kumonryu",
    description:
      "Koi Kumonryu 70 cm, 3 tuổi, màu trắng pha đen thay đổi theo mùa, được xem là cá Koi của sự bí ẩn.",
    price: "850,000 VND",
    image: "https://koilover.vn/uploads/thumbs/kumonryu_20190801093451356.jpg",
    size: "70 cm",
    year: 2020,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
  },
  {
    id: 15,
    name: "Benigoi",
    description:
      "Koi Benigoi 60 cm, 2.5 tuổi, toàn thân đỏ rực rỡ, thể hiện sự mạnh mẽ và nổi bật trong hồ Koi.",
    price: "950,000 VND",
    image: "https://koilover.vn/uploads/thumbs/benigoi_20190801093517289.jpg",
    size: "60 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
  },
  {
    id: 16,
    name: "Doitsu Sanke",
    description:
      "Koi Doitsu Sanke 75 cm, 4 tuổi, vảy sáng và kết hợp màu đỏ trắng cùng các đốm đen đặc trưng.",
    price: "1,200,000 VND",
    image:
      "https://koilover.vn/uploads/thumbs/doitsusanke_20190801093628345.jpg",
    size: "75 cm",
    year: 2019,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
  },
  {
    id: 17,
    name: "Lô Koi Sanke & Showa",
    description:
      "Bộ sưu tập 5 con cá Koi gồm 3 Sanke và 2 Showa, đều sinh năm 2021. Lý tưởng cho việc bắt đầu một hồ Koi đa dạng.",
    price: "3,500,000 VND",
    image: "https://example.com/sanke-showa-lot.jpg",
    isLot: true, // Đây là lô cá
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    age: 2, // Tuổi (năm)
    foodPerDay: 100, // Lượng thức ăn/ngày (gram)
    quantity: 5,
    fishes: [
      { name: "Sanke", quantity: 3 },
      { name: "Showa", quantity: 2 },
    ],
  },
  {
    id: 18,
    name: "Bộ Gosanke Premium",
    description:
      "Bộ 3 cá Koi cao cấp gồm Kohaku, Sanke, và Showa, sinh năm 2020. Đây là bộ sưu tập hoàn hảo cho những người yêu thích Gosanke.",
    price: "5,000,000 VND",
    image: "https://example.com/gosanke-premium.jpg",
    isLot: true, // Đây là lô cá
    year: 2019,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    age: 2, // Tuổi (năm)
    foodPerDay: 100, // Lượng thức ăn/ngày (gram)
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
    image: "https://example.com/butterfly-koi-lot.jpg",
    isLot: true, // Đây là lô cá
    year: 2019,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    age: 2, // Tuổi (năm)
    foodPerDay: 150, // Lượng thức ăn/ngày (gram)
    quantity: 4,
    fishes: [
      { name: "Butterfly Kohaku", quantity: 1 },
      { name: "Butterfly Showa", quantity: 1 },
      { name: "Butterfly Sanke", quantity: 1 },
      { name: "Butterfly Goshiki", quantity: 1 },
    ],
  },
  // Các sản phẩm khác...<3
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const fish = fishes.find((fish) => fish.id === parseInt(id));

  if (!fish) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    addItem(fish); // Thêm sản phẩm vào giỏ hàng
    message.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  // Hàm xử lý khi nhấn "Mua ngay"
  const handleBuyNow = () => {
    addItem(fish); // Thêm sản phẩm vào giỏ hàng
    navigate("/checkout"); // Điều hướng đến trang thanh toán
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main
        style={{
          flexGrow: 1,
          padding: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
        }}
      >
        {/* Phần hình ảnh chính và ảnh nhỏ bên dưới */}
        <div style={{ flex: 1 }}>
          <img
            src={fish.image}
            alt={fish.name}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "600px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          {fish.images && fish.images.length > 0 && (
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              {fish.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1} of ${fish.name}`}
                  style={{
                    width: "100px",
                    height: "auto",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Phần thông tin chi tiết */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            {fish.name}
          </h1>
          <p
            style={{ fontSize: "1.5rem", color: "#c0392b", fontWeight: "bold" }}
          >
            Giá bán: {fish.price}
          </p>
          <p style={{ marginBottom: "24px" }}>{fish.description}</p>

          <div>
            <p>
              <strong>Giới tính:</strong> {fish.gender}
            </p>
            <p>
              <strong>Nguồn gốc:</strong> {fish.origin}
            </p>
            <p>
              <strong>Tuổi:</strong> {fish.age} năm
            </p>
            <p>
              <strong>Giống:</strong> {fish.breed}
            </p>
            <p>
              <strong>Lượng thức ăn/ngày:</strong> {fish.foodPerDay} gram
            </p>
            <p>
              <strong>Tỉ lệ sàng lọc:</strong> {fish.screeningRate}
            </p>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <Button
            type="primary"
            style={{
              backgroundColor: "red",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
            onClick={handleAddToCart}
          >
            <ShoppingCartOutlined /> Thêm vào giỏ hàng
          </Button>

          {/* Nút mua ngay */}
          <Button
            type="default"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "border 0.3s",
              border: "2px solid transparent",
              color: "black",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "2px solid red";
              e.currentTarget.style.color = "red";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "2px solid transparent";
              e.currentTarget.style.color = "black";
            }}
            onClick={handleBuyNow}
          >
            <DollarOutlined /> Mua ngay
          </Button>

          {/* Kiểm tra nếu có video giới thiệu */}
          {fish.video && (
            <>
              <h2>Video Giới Thiệu</h2>
              <iframe
                width="100%"
                height="315"
                src={fish.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ marginBottom: "24px" }}
              ></iframe>
            </>
          )}

          {/* Hiển thị thông tin nếu là lô cá */}
          {fish.isLot ? (
            <>
              <p>
                <strong>Năm sinh:</strong> {fish.year}
              </p>
              <p>
                <strong>Số lượng cá trong lô:</strong> {fish.quantity}
              </p>
              <h3>Chi tiết các loại cá trong lô:</h3>
              <ul>
                {fish.fishes.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} con
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p>
                <strong>Kích thước:</strong> {fish.size}
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
