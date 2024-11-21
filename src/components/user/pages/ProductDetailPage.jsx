// // src/components/user/pages/ProductDetailPage.jsx
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import {Button, Image, message, Rate, Spin, Tag} from "antd";
import {ShoppingCartOutlined, DollarOutlined, LoadingOutlined, FrownOutlined} from "@ant-design/icons";
import useCartStore from "../../../store/cartStore";
import {getFishPackageById} from "../../../services/fishPackageService.js";
import {getCategories} from "@/services/CategoryService.js";

const formatCurrency = (value) => {
  const numericValue =
    typeof value === "string" ? parseInt(value.replace(/[^\d]/g, "")) : value;

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const antIcon = <LoadingOutlined style={{fontSize: 48, fontWeight: "bold", color: "red"}} spin/>;

  // useEffect(() => {
  //   const fetchFishById = async (fishId) => {
  //     try {
  //       const response = await getFishPackageById(fishId);
  //       setFish(response);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Failed to fetch fish package details:", err);
  //       setError("Không thể tải chi tiết sản phẩm.");
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchFishById(id);
  // }, [id]);

  useEffect(() => {
    // Fetch fish details and categories
    const fetchData = async () => {
      try {
        // Fetch fish package by ID
        const fishResponse = await getFishPackageById(id);
        setFish(fishResponse);

        // Fetch categories
        const categoryResponse = await getCategories();
        if (categoryResponse) {
          setCategories(categoryResponse); // categoryResponse already contains the listData array
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Không thể tải dữ liệu.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.categoryId === categoryId);
    return category ? category.name : "Không xác định";
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f0f2f5",
        }}
      >
        <Spin indicator={antIcon} tip="Đang tải dữ liệu..."/>
      </div>
    );
  }

  if (error || !fish) {
    return (
      <>
        <Header/>
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            background: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <FrownOutlined style={{fontSize: "64px", color: "#ff4d4f"}}/>
          <h2 style={{marginTop: "16px", color: "#333"}}>Không tìm thấy sản phẩm</h2>
          <p style={{color: "#777", marginTop: "8px"}}>
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button
            type="primary"
            size="large"
            style={{marginTop: "20px", backgroundColor: "red"}}
            onClick={() => window.location.href = "/products"} // Chuyển về danh sách sản phẩm
          >
            Quay lại Sản phẩm
          </Button>
        </div>
        <Footer/>
      </>
    );
  }

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    addItem(fish);
    message.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  // Hàm xử lý khi nhấn "Mua ngay"
  const handleBuyNow = () => {
    addItem(fish);
    navigate("/cart");
  };

  const getTagColor = (categoryId) => {
    const colors = {
      1: "red",
      2: "green",
      3: "blue",
      4: "orange",
      5: "purple",
      6: "gold",
    };
    return colors[categoryId] || "default";
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
        {/* Phần hình ảnh chính */}
        <div style={{flex: 1}}>
          <Image
            src={fish.imageUrl}
            alt={fish.name}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "600px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* Phần chi tiết sản phẩm */}
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
            style={{
              fontSize: "1.5rem",
              color: "#c0392b",
              fontWeight: "bold",
            }}
          >
            Tổng giá: {formatCurrency(fish.totalPrice)}
          </p>
          {fish.productStatus === "AVAILABLE" ? (
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
          ) : (
            <p
              style={{
                backgroundColor: "red",
                padding: "5px",
                margin: "10px 0",
                width: "50%",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                fontSize: "20px",
              }}
            >
              Liên hệ
            </p>
          )}


          <div style={{marginTop: "16px"}}>
            {/*<p><strong>Sức chứa:</strong> {fish.capacity} cá</p>*/}
            <p>
              <strong>Kích thước:</strong> {fish.minSize} - {fish.maxSize} cm
            </p>
            <p><strong>Tuổi:</strong> {fish.age} tháng</p>
            <p><strong>Lượng thức ăn/ngày:</strong> {fish.dailyFood} gram</p>
            <p>
              <strong>Trạng thái sản phẩm:</strong>{" "}
              {fish.productStatus === "AVAILABLE" ? "Còn hàng" : "Hết hàng"}
            </p>
            <p><strong>Số lượng lô:</strong> {fish.quantityInStock} lô</p>
            <p><strong>Số lượng cá trong lô:</strong> {fish.numberOfFish}</p>
            <p><strong>Chi tiết các danh mục:</strong></p>
            <ul>
              {fish?.categories.map((category) => (
                <Tag
                  key={category.categoryId}
                  color={getTagColor(category.categoryId)}
                  style={{
                    fontSize: "14px",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    width: "fit-content",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{getCategoryName(category.categoryId)}</strong> - {category.quantityOfEach} con
                </Tag>
              ))}
            </ul>
            <p>{fish.description}</p>
          </div>


        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ProductDetailPage;
