// src/components/user/pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Pagination, Checkbox, Modal, Button } from "antd";
import { EyeOutlined, UpCircleOutlined } from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FishCard from "../Product/FishCard";
import ZaloIcon from "../Shared/ZaloIcon";
import YTIconts from "../Shared/YoutubeIcon";
import FBIconts from "../Shared/FacebookIcon";

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
    image:"https://i.pinimg.com/236x/8e/0e/22/8e0e225d4b2487d1cdce5d9f30d4584f.jpg",
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
    image:"https://th.bing.com/th/id/OIP.4umxIFHoJIIg30gQhvpaYwHaLH?rs=1&pid=ImgDetMain",
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
const ITEMS_PER_PAGE = 12;

const ProductPage = () => {
  const [hoveredFishId, setHoveredFishId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFishes, setSelectedFishes] = useState([]);
  const [rate, setRate] = useState(0); // Thêm state cho rate
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "300px",

          }}
        >
          <div
            // style={{
            //   // borderRadius: "12px", // Bo góc cho div chứa bảng
            //   // overflow: "hidden", // Đảm bảo bảng không vượt quá vùng bo góc
            // //   border: "1px solid black", 
            // }}
          >
            {selectedFishes.length === 2 ? (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center", // Căn giữa chữ trong ô
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      Thuộc tính
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center", // Căn giữa chữ trong ô
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      {selectedFishes[0].name}
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center", // Căn giữa chữ trong ô
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      {selectedFishes[1].name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Giá
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].price}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].price}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Kích thước
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].size}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].size}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Tuổi
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].age}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].age}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Năm sinh
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].year}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].year}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Nguồn gốc
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].origin}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].origin}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Giống
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].breed}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].breed}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Giới tính
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].gender}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].gender}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Lượng thức ăn/ngày
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].foodPerDay}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].foodPerDay}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Tỉ lệ sàng lọc
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].screeningRate}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].screeningRate}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Đánh giá
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[0].rating} ⭐️
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {selectedFishes[1].rating} ⭐️
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Vui lòng chọn 2 cá để so sánh.</p>
            )}
          </div>
        </div>
      ),
      onOk() {
        setSelectedFishes([]);
      },
    });
  };
  // Cuộn về đầu trang khi thay đổi trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Hiển thị nút cuộn lên đầu trang khi cuộn đến cuối trang
  useEffect(() => {
    const handleScroll = () => {
      const scrollToTopButton = document.getElementById("scrollToTop");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Hủy sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
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
            alignItems: "center",
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
              style={{
                marginLeft: "auto",
                color: "white",
                backgroundColor: "red",
              }}
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
              {/* {hoveredFishId === fish.id && (
                <Tooltip title="Xem chi tiết">
                  <EyeOutlined
                    style={{
                      position: "absolute",
                      top: "150px",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "30px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              )} */}
              {/* Checkbox để chọn cá so sánh */}
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px",
                  position: "absolute",
                  top: "10px",
                  right: "39px",
                  backgroundColor: "InactiveCaption",
                }}
              >
                <Checkbox
                  checked={selectedFishes.includes(fish)}
                  onChange={() => handleSelectFish(fish.id)}
                  // style={{ position: "absolute", top: "10px", right: "30px" }}
                >
                  So sánh
                </Checkbox>
              </div>
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
        {/* Nút cuộn lên đầu trang */}
        <div
          id="scrollToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "270px",
            right: "20px",
            width: "50px",
            height: "50px",
            backgroundColor: "#f1f1f1",
            color: "#333",
            borderRadius: "50%",
            textAlign: "center",
            lineHeight: "50px",
            fontSize: "24px",
            cursor: "pointer",
            display: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "opacity 0.3s, background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#3B5998"; // Thay đổi màu nền khi hover
            e.currentTarget.style.color = "#0000ff"; // Thay đổi màu biểu tượng khi hover
            e.currentTarget.style.transform = "scale(1.1)"; // Phóng to khi hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f8f8ff"; // Quay lại màu nền ban đầu
            e.currentTarget.style.color = "#333"; // Quay lại màu biểu tượng ban đầu
            e.currentTarget.style.transform = "scale(1)"; // Quay lại kích thước ban đầu
          }}
        >
          <UpCircleOutlined style={{ fontSize: "24px" }} /> {/* Sử dụng biểu tượng */}
        </div>
      </main>
      <ZaloIcon />
      <YTIconts />
      <FBIconts />
      <Footer />
    </div>
  );
};

export default ProductPage;
