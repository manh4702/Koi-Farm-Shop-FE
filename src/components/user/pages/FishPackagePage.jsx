import React, {useState, useEffect} from "react";
import {Row, Col, Pagination, Checkbox, Modal, Button, Spin} from "antd";
import {UpCircleOutlined} from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FishCard from "../Product/FishCard";
import ZaloIcon from "../Shared/ZaloIcon";
import YTIconts from "../Shared/YoutubeIcon";
import FBIconts from "../Shared/FacebookIcon";
import {getFishPackages} from "../../../services/fishPackageService";
import useFishStore from "../../../store/useFishStore.js";

const ITEMS_PER_PAGE = 12;

const FishPackagePage = () => {
  const [hoveredFishId, setHoveredFishId] = useState(null);
  const [selectedFishes, setSelectedFishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const {fishPackages, currentPage, totalRecords, setFishPackages, setCurrentPage, setTotalRecords} = useFishStore();

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFishPackages = fishPackages.slice(startIndex, endIndex);

  const fetchFishPackages = async () => {
    try {
      const data = await getFishPackages(currentPage, ITEMS_PER_PAGE);
      setFishPackages(data);
      if (data.length > totalRecords) {
        const updatedTotalRecords = data[0]?.total || data.length; // Cập nhật số lượng bản ghi tổng
        setTotalRecords(updatedTotalRecords);
      }
    } catch (error) {
      console.error("Failed to fetch fish packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFishPackages();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollToTopButton = document.getElementById("scrollToTop");
      scrollToTopButton.style.display =
        window.innerHeight + window.scrollY >= document.body.offsetHeight ? "block" : "none";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header/>
      <main
        style={{
          flexGrow: 1,
          maxWidth: "100%",
          margin: "0 190px",
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h1 style={{fontSize: "1.875rem", fontWeight: "bold"}}>Fish Packages</h1>
          {selectedFishes.length === 2 && (
            <Button
              type="primary"
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

        {loading ? (
          <Spin size="large"/>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {currentFishPackages.map((fish) => (
                <Col
                  key={fish.id}
                  xs={24}
                  sm={12}
                  md={6}
                  onMouseEnter={() => setHoveredFishId(fish.id)}
                  onMouseLeave={() => setHoveredFishId(null)}
                  style={{position: "relative"}}
                >
                  <FishCard fish={fish}/>
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
                    >
                      So sánh
                    </Checkbox>
                  </div>
                </Col>
              ))}
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "32px",
              }}
            >
              <Pagination
                current={currentPage}
                pageSize={ITEMS_PER_PAGE}
                total={totalRecords}
                onChange={handlePageChange}
              />
            </div>
            <div
              id="scrollToTop"
              onClick={() =>
                window.scrollTo({top: 0, behavior: "smooth"})
              }
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
              }}
            >
              <UpCircleOutlined/>
            </div>
          </>
        )}
      </main>
      <ZaloIcon/>
      <YTIconts/>
      <FBIconts/>
      <Footer/>
    </div>
  );
};

export default FishPackagePage;