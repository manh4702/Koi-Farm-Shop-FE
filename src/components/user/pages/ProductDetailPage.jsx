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
    rating: 4,
  },
  {
    id: 9,
    name: "Doitsu Kujaku",
    description:
      "Koi Doitsu Kujaku 55 cm, 2 tuổi, vảy ánh kim sáng kết hợp màu đỏ và trắng tạo nên vẻ đẹp nổi bật.",
    price: "650,000 VND",
    image: "https://images2.thanhnien.vn/zoom/686_429/Uploaded/ngocquy/2019_01_28/ca-tre-shuttesrtock_OSDE.jpg",
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
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmm-IWX5cD83gi5If64jIIozer5jKGSSX7Q&s",
    ],
    video: "https://www.youtube.com/watch?v=kujaku_video_link",
    rating: 5,
  },
  {
    id: 10,
    name: "Doitsu Kujaku",
    description:
      "Koi Doitsu Kujaku 55 cm, 2 tuổi, vảy ánh kim sáng kết hợp màu đỏ và trắng tạo nên vẻ đẹp nổi bật.",
    price: "650,000 VND",
    image:
      "https://th.bing.com/th/id/OIP.3lnsfQUPO4ZMLA1Xr0s3QgHaLc?w=201&h=310&c=7&r=0&o=5&pid=1.7",
    size: "55 cm",
    year: 2022,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
  },
  {
    id: 17,
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
    id: 18,
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
    id: 19,
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
