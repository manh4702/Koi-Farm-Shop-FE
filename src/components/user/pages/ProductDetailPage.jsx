// src/components/user/pages/ProductDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { Button, message, Rate } from "antd";
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
    rating: 4.5, // Đánh giá
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
    rating: 5,
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
    rating: 3,
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
    rating: 2,
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
    rating: 1,
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
    rating: 2,
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
    rating: 3,
  },
  {
    id: 8,
    name: "Tancho",
    description:
      "Koi Tancho 60 cm, 2.5 tuổi, nổi bật với đốm tròn màu đỏ trên đầu, được xem là biểu tượng may mắn.",
    price: "1,000,000 VND",
    image:
      "https://i.pinimg.com/236x/8e/0e/22/8e0e225d4b2487d1cdce5d9f30d4584f.jpg",
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
    rating: 4,
  },
  {
    id: 9,
    name: "Doitsu Kujaku",
    description:
      "Koi Doitsu Kujaku 55 cm, 2 tuổi, vảy ánh kim sáng kết hợp màu đỏ và trắng tạo nên vẻ đẹp nổi bật.",
    price: "650,000 VND",
    image: "https://th.bing.com/th/id/OIP.4umxIFHoJIIg30gQhvpaYwHaLH?rs=1&pid=ImgDetMain",
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
      "https://i.pinimg.com/736x/9e/80/92/9e8092e713679f28bc832bad3aaf2fc3.jpg",
      "https://i.pinimg.com/236x/a6/5c/25/a65c25060fb067d4bece976407f890ea.jpg",
      "https://i.pinimg.com/236x/2f/36/3e/2f363e548bca864ac8b30519efc282ea.jpg",
    ],
    video: "https://www.youtube.com/watch?v=kujaku_video_link",
    rating: 5,
  },
  {
    id: 10,
    name: "Yamabuki Ogon",
    description:
      "Koi Yamabuki Ogon 60 cm, 3 tuổi, màu vàng ánh kim, rất nổi bật và thu hút trong các hồ Koi.",
    price: "700,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.qjAQlysT0IBlOkrtY5qD5gHaLI?w=115&h=180&c=7&r=0&o=5&pid=1.7",
    size: "60 cm",
    year: 2020,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    rating: 1,
  },
  {
    id: 11,
    name: "Shusui",
    description:
      "Koi Shusui 50 cm, 1.5 tuổi, có vảy dọc lưng xanh, kết hợp với phần thân trắng pha màu đỏ cam.",
    price: "500,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.kH_bEW8tRBBH0V-qoETOcQHaLC?w=203&h=304&c=7&r=0&o=5&pid=1.7",
    size: "50 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    rating: 2,
  },
  {
    id: 12,
    name: "Ki Utsuri",
    description:
      "Koi Ki Utsuri 65 cm, 2 tuổi, với màu vàng sáng xen lẫn màu đen đậm, tạo nên vẻ tương phản đầy cuốn hút.",
    price: "600,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.GST467YSEAQo31msgUOebAHaHW?w=173&h=180&c=7&r=0&o=5&pid=1.7",
    size: "34 cm",
    year: 2022,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    rating: 3,
  },
  {
    id: 13,
    name: "Kumonryu",
    description:
      "Koi Kumonryu 70 cm, 3 tuổi, màu trắng pha đen thay đổi theo mùa, được xem là cá Koi của sự bí ẩn.",
    price: "850,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.E-kBjXfwdIB-sqxRDZUA0gHaLH?w=203&h=304&c=7&r=0&o=5&pid=1.7",
    size: "70 cm",
    year: 2020,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    rating: 4.5,
  },
  {
    id: 14,
    name: "Benigoi",
    description:
      "Koi Benigoi 60 cm, 2.5 tuổi, toàn thân đỏ rực rỡ, thể hiện sự mạnh mẽ và nổi bật trong hồ Koi.",
    price: "950,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.tOWHDImwqRI_eKn7m7uYNgHaMH?w=195&h=319&c=7&r=0&o=5&pid=1.7",
    size: "60 cm",
    year: 2021,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    rating: 3.5,
  },
  {
    id: 15,
    name: "Doitsu Sanke",
    description:
      "Koi Doitsu Sanke 75 cm, 4 tuổi, vảy sáng và kết hợp màu đỏ trắng cùng các đốm đen đặc trưng.",
    price: "1,200,000 VND",
    image:
      "https://www.bing.com/th?id=OIP.tmy5i34MSmX0nw1w1GZ4FQHaLH&w=136&h=204&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2",
    size: "75 cm",
    year: 2019,
    origin: "Nhật Bản",
    seller: "On Koi Farm",
    gender: "Đực", // Giới tính
    breed: "Karashigoi", // Giống
    age: 2, // Tuổi (năm)
    foodPerDay: 30, // Lượng thức ăn/ngày (gram)
    screeningRate: "95%", // Tỉ lệ sàng lọc
    rating: 5,
    video: "https://youtu.be/8_8uHDO679Y",
  },
  {
    id: 16,
    name: "Lô Koi Sanke & Showa",
    description:
      "Bộ sưu tập 5 con cá Koi gồm 3 Sanke và 2 Showa, đều sinh năm 2021. Lý tưởng cho việc bắt đầu một hồ Koi đa dạng.",
    price: "3,500,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.9wxu3jj4OLWUS8AfTCpPwQHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7",
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
    video: "https://www.youtube.com/watch?v=showa_video_link",
    rating: 4,
  },
  {
    id: 17,
    name: "Lô cá Gosanke Premium",
    description:
      "Bộ 3 cá Koi cao cấp gồm Kohaku, Sanke, và Showa, sinh năm 2020. Đây là bộ sưu tập hoàn hảo cho những người yêu thích Gosanke.",
    price: "5,000,000 VND",
    image:
      "https://cdn11.bigcommerce.com/s-upcqwyrrdy/images/stencil/1280x1280/products/12349/31213/japanese-premium-gosanke-8-10inch-koi-4pack-1000__59378.1680885854.jpg?c=1",
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
    rating: 3,
  },
  {
    id: 18,
    name: "Lô Koi Butterfly",
    description:
      "Bộ sưu tập 4 con cá Koi Butterfly đẹp mắt, sinh năm 2022. Bao gồm các giống Koi có vây dài và đuôi bướm đặc trưng.",
    price: "2,800,000 VND",
    image:
      "https://cdn11.bigcommerce.com/s-kkon4imfg5/images/stencil/1280x1280/products/405/667/KOI_BUTTERFLY_6_-8___59746.1522374966.jpg?c=2",
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
    rating: 2,
  },
  // Thêm cá khác ...
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
            {/* Hiển thị thông tin chung cho cả cá thể và lô cá */}
            {!fish.isLot ? (
              <>
                <p>
                  <strong>Giới tính:</strong> {fish.gender}
                </p>
                <p>
                  <strong>Kích thước:</strong> {fish.size}
                </p>
                <p>
                  <strong>Tỉ lệ sàng lọc:</strong> {fish.screeningRate}
                </p>
              </>
            ) : (
              <>
                {fish.gender && (
                  <p>
                    <strong>Giới tính:</strong> {fish.gender}
                  </p>
                )}
                {fish.size && (
                  <p>
                    <strong>Kích thước:</strong> {fish.size}
                  </p>
                )}
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
            )}
            <p>
              <strong>Tuổi:</strong> {fish.age} năm
            </p>
            <p>
              <strong>Nguồn gốc:</strong> {fish.origin}
            </p>
            <p>
              <strong>Giống:</strong> {fish.breed}
            </p>
            <p>
              <strong>Lượng thức ăn/ngày:</strong> {fish.foodPerDay} gram
            </p>
            <p>
              <strong>Năm sinh:</strong> {fish.year}
            </p>
            <p>
              <strong>Đánh giá:</strong> <Rate allowHalf defaultValue={fish.rating} />
            </p>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <Button
            type="primary"
            style={{
              backgroundColor: "red",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "10px",
            }}
            onClick={handleBuyNow}
          >
            <DollarOutlined /> Mua ngay
          </Button>

          {/* Nút mua ngay */}
          <Button
            type="default"
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "border 0.3s",
              border: "2px solid black",
              color: "black",
              marginBottom: "30px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "2px solid red";
              e.currentTarget.style.color = "red";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "2px solid black";
              e.currentTarget.style.color = "black";
            }}
            onClick={handleAddToCart}
          >
            <ShoppingCartOutlined /> Thêm vào giỏ hàng
          </Button>

          {/* Kiểm tra nếu có video giới thiệu */}
          {fish.video && (
            <>
              {/* <h2>Video về cá</h2> */}
              <iframe
                width="100%"
                height="315"
                src={fish.video.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ marginBottom: "24px" }}
              ></iframe>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
