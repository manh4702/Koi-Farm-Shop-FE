// src/components/user/pages/ProductDetailPage.jsx
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import {Button, Image, message, Rate} from "antd";
import {ShoppingCartOutlined, DollarOutlined} from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";
import {getFishPackageById} from "../../../services/fishPackageService.js";
import {Transformation} from "cloudinary-react"; // Store quản lý giỏ hàng

const formatCurrency = (value) => {
  // Loại bỏ "VND" từ chuỗi nếu có
  const numericValue = typeof value === 'string'
    ? parseInt(value.replace(/[^\d]/g, ''))
    : value;

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(numericValue);
};

const ProductDetailPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [fish, setFish] = useState(null);
  // const fish = fishes.find((fish) => fish.id === parseInt(id));

  useEffect(() => {
    const fetchFishById = async (fishId) => {
      try {
        const fetchedFish = await getFishPackageById(fishId);
        setFish(fetchedFish);
      } catch (error) {
        console.error("Failed to fetch fish:", error);
      }
    };

    fetchFishById(id);
  }, [id]);

  if (!fish) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    addItem(fish); // Thêm sản phẩm vào giỏ hàng
    message.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  // Hàm xử lý khi nhấn "Mua ngay"
  const handleBuyNow = (e) => {
    e.stopPropagation();
    addItem(fish); // Thêm sản phẩm vào giỏ hàng
    navigate("/cart"); // Chuyển đến trang giỏ hàng
  };

  return (
    <div
      style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}
    >
      <Header/>
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
        <div style={{flex: 1}}>
          <Image
            cloudName="dmefon9dj"
            src={fish.imageUrl}
            // publicId={fish.imageUrl}
            width="auto"
            height="auto"
            crop="scale"
            alt={fish.name}
            style={{width: "100%", maxWidth: "600px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)"}}
            // style={{
            //   width: "100%",
            //   height: "auto",
            //   maxWidth: "600px",
            //   borderRadius: "8px",
            //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            // }}
          >
            <Transformation quality="auto" fetchFormat="auto"/>
          </Image>
          {fish.images && fish.images.length > 0 && (
            <div style={{display: "flex", gap: "8px", marginTop: "16px"}}>
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
            Giá bán: {formatCurrency(fish.totalPrice)}
          </p>
          {fish.status === "SOLDOUT" ? (
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
            {fish.screeningRate && (
              <p>
                <strong>Tỉ lệ sàng lọc:</strong> {fish.screeningRate}
              </p>
            )}
            {fish.numberOfFish && (
              <p>
                <strong>Số lượng cá trong lô:</strong> {fish.numberOfFish}
              </p>
            )}
            {fish.age && (
              <p>
                <strong>Tuổi:</strong> {fish.age} năm
              </p>
            )}
            {fish.origin && (
              <p>
                <strong>Nguồn gốc:</strong> {fish.origin}
              </p>
            )}
            {fish.breed && (
              <p>
                <strong>Giống:</strong> {fish.breed}
              </p>
            )}
            <p>
              <strong>Lượng thức ăn/ngày:</strong> {fish.dailyFood} gram
            </p>
            {fish.rating && (
              <p>
                <strong>Đánh giá:</strong> <Rate allowHalf defaultValue={fish.rating}/>
              </p>
            )}
            <p style={{marginTop: "24px"}}>{fish.description}</p>

          </div>


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
                style={{marginBottom: "24px"}}
              ></iframe>
            </>
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ProductDetailPage;
