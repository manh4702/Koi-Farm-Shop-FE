// src/components/user/pages/KoiFishPage.jsx
import React, {useState, useEffect} from "react";
import {Row, Col, Pagination, Checkbox, Modal, Button, Spin} from "antd";
import {FrownOutlined, LoadingOutlined, UpCircleOutlined} from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FishCard from "../Product/FishCard";
import ZaloIcon from "../Shared/ZaloIcon";
import YTIconts from "../Shared/YoutubeIcon";
import FBIconts from "../Shared/FacebookIcon";
import {useFishStore} from "../../../store/fishStore.js";
import {useNavigate} from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const KoiFishPage = () => {
  // const [hoveredFishId, setHoveredFishId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedFishes, setSelectedFishes] = useState([]);
  const {fishes, loadFishes, loading, error, loadFishesCustomer} = useFishStore();
  const antIcon = <LoadingOutlined style={{fontSize: 48, fontWeight: "bold", color: "red"}} spin/>;

  // Load fish data from API when component mounts
  useEffect(() => {
    loadFishesCustomer();
  }, [loadFishesCustomer]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFishes = fishes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  if (loading) {
    return (
      <>
        <Header/>
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
        <Footer/>
      </>
    );
  }
  if (error) {
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

  return (
    <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header/>
      <main style={{flexGrow: 1, maxWidth: "100%", margin: "0 190px", padding: "32px 16px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px"}}>
          <h1 style={{fontSize: "1.875rem", fontWeight: "bold"}}>Các loại Cá Koi</h1>
          {/* {selectedFishes.length === 2 && (
            <Button type="primary" onClick={showCompareModal}
                    style={{marginLeft: "auto", color: "white", backgroundColor: "red"}}>
              So sánh {selectedFishes.length} cá đã chọn
            </Button>
          )} */}
        </div>

        <Row gutter={[16, 16]}>
          {currentFishes.map((fish) => (
            <Col key={fish.id} xs={24} sm={12} md={6} onMouseEnter={() => setHoveredFishId(fish.id)}
                 onMouseLeave={() => setHoveredFishId(null)} style={{position: "relative"}}>
              <FishCard fish={fish}/>
            </Col>
          ))}
        </Row>

        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "32px"}}>
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={fishes.length}
            onChange={handlePageChange}
          />
        </div>
      </main>
      <ZaloIcon/>
      <YTIconts/>
      <FBIconts/>
      <Footer/>
    </div>
  );
};

export default KoiFishPage;
