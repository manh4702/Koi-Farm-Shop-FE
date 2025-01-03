// src/components/user/pages/FishDetailPage.jsx
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import {Button, Image, message, Rate} from "antd";
import {ShoppingCartOutlined, DollarOutlined} from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";
import {getFishById} from "../../../services/fishService.js";
import {Transformation} from "cloudinary-react"; // Store quản lý giỏ hàng

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const FishDetailPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [fish, setFish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFishDetail = async () => {
      try {
        setLoading(true);
        const fetchedFish = await getFishById(id); // Sử dụng API lấy chi tiết cá
        setFish(fetchedFish);
        console.log(fetchedFish);
      } catch (error) {
        setError("Không thể tải chi tiết cá.");
        console.error("Failed to fetch fish:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFishDetail();
  }, [id]);

  const getGenderLabel = (gender) => {
    switch (gender) {
      case "Male":
        return "Đực";
      case "Female":
        return "Cái";
      default:
        return "Không xác định";
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!fish) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }


  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    addItem(fish); // Thêm sản phẩm vào giỏ hàng
    message.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  // Hàm xử lý khi nhấn "Mua ngay"
  const handleBuyNow = (e) => {
    e.stopPropagation();
    addItem(fish);
    message.success("Đã thêm sản phẩm vào giỏ hàng");
    navigate("/cart");
  };

  const handleContact = () => {
    message.info("Vui lòng liên hệ với chúng tôi để biết thêm thông tin.");
    // You can navigate to a contact page or open a contact form here if needed.
  };

  return (
    <>
      <Header/>
      <div
        style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}
      >
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
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '600px',
            height: 'auto',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <Image
              src={fish.imageUrl}
              alt={fish.name}
              preview={true}
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>

          <div style={{flex: 1}}>
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
              style={{fontSize: "1.5rem", color: "#c0392b", fontWeight: "bold"}}
            >
              Giá bán: {formatCurrency(fish.price)}
            </p>
            {fish.productStatus === "SOLDOUT" ? (
              <p style={{
                backgroundColor: "red",
                padding: "5px",
                margin: "10px 0",
                width: "50%",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                fontSize: "20px"
              }}>Liên hệ</p>
            ) : (
              <>
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
                  <DollarOutlined/> Mua ngay
                </Button>

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
                  <ShoppingCartOutlined/> Thêm vào giỏ hàng
                </Button>
              </>
            )}
            <div>
              {/*<p>*/}
              {/*  <strong>Tên cá:</strong> {fish.name}*/}
              {/*</p>*/}
              {/*<p>*/}
              {/*  <strong>ID cá:</strong> {fish.fishId}*/}
              {/*</p>*/}
              <p>
                <strong>Tuổi:</strong> {fish.age} tháng
              </p>
              <p>
                <strong>Giới tính:</strong> {fish.gender === "Male" ? "Đực" : "Cái"}
              </p>
              <p>
                <strong>Kích thước:</strong> {fish.size} cm
              </p>

              <p>
                <strong>Loại cá:</strong> {fish.categoryName}
              </p>
              <p>
                <strong>Lượng thức ăn mỗi ngày:</strong> {fish.dailyFood} gram
              </p>
              <p>
                <strong>Tình trạng:</strong> {fish.status === "GOOD" ? "Khoẻ mạnh" : "Không tốt"}
              </p>
              <p>
                <strong>Trạng thái sản phẩm:</strong> {fish.productStatus === "AVAILABLE" ? "Còn hàng" : "Hết hàng"}
              </p>
              <p>
                {fish.description}
              </p>
            </div>
            {/* Kiểm tra nếu có video giới thiệu */}
            {fish.video && (
              <>
                <iframe
                  width="100%"
                  height="315"
                  src={fish.video.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{marginBottom: "24px"}}
                ></iframe>
              </>
            )}
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default FishDetailPage;
