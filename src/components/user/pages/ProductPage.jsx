// src/components/user/pages/KoiFishPage.jsx
import React, {useState, useEffect} from "react";
import {Row, Col, Pagination, Checkbox, Modal, Button} from "antd";
import {UpCircleOutlined} from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import FishCard from "../Product/FishCard";
import ZaloIcon from "../Shared/ZaloIcon";
import YTIconts from "../Shared/YoutubeIcon";
import FBIconts from "../Shared/FacebookIcon";
import {useFishStore} from "../../../store/fishStore.js";
import {useFishPackageStore} from "../../../store/fishPackageStore.js";

const ITEMS_PER_PAGE = 12;



const ProductPage = () => {
  const [currentPageFishes, setCurrentPageFishes] = useState(1);
  const [currentPageFishPackages, setCurrentPageFishPackages] = useState(1);
  // const [selectedFishes, setSelectedFishes] = useState([]);

  const {fishes, loadFishes, loadFishesCustomer} = useFishStore();
  const {fishPackages, fetchFishPackages, fetchFishPackagesCustomer} = useFishPackageStore();

  useEffect(() => {
    loadFishesCustomer();
    fetchFishPackagesCustomer();

    const handleScroll = () => {
      const scrollToTopButton = document.getElementById("scrollToTop");
      scrollToTopButton.style.display =
        window.innerHeight + window.scrollY >= document.body.offsetHeight ? "block" : "none";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const combinedData = [...fishes, ...fishPackages.map(pkg => ({
    ...pkg,
    isPackage: true
  }))];

  const startIndexFishes = (currentPageFishes - 1) * ITEMS_PER_PAGE;
  const endIndexFishes = startIndexFishes + ITEMS_PER_PAGE;
  const currentFishes = fishes.slice(startIndexFishes, endIndexFishes);

  const startIndexFishPackages = (currentPageFishPackages - 1) * ITEMS_PER_PAGE;
  const endIndexFishPackages = startIndexFishPackages + ITEMS_PER_PAGE;
  const currentFishPackages = fishPackages.slice(startIndexFishPackages, endIndexFishPackages);

  const handlePageChangeFishes = (page) => {
    setCurrentPageFishes(page);
  };

  const handlePageChangeFishPackages = (page) => {
    setCurrentPageFishPackages(page);
  };

  return (
    <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header/>
      <main style={{flexGrow: 1, maxWidth: "100%", margin: "0 190px", padding: "32px 16px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px"}}>
          <h1 style={{fontSize: "1.875rem", fontWeight: "bold"}}>Các loại Cá Koi</h1>
        </div>

        <Row gutter={[16, 16]}>
          {currentFishes.map((fish) => (
            <Col key={fish.id} xs={24} sm={12} md={6} style={{position: "relative"}}>
              <FishCard fish={fish}/>
            </Col>
          ))}
        </Row>

        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "32px"}}>
          <Pagination
            current={currentPageFishes}
            pageSize={ITEMS_PER_PAGE}
            total={fishes.length}
            onChange={handlePageChangeFishes}
          />
        </div>

        <div style={{marginTop: "48px"}}>
          <h1 style={{fontSize: "1.875rem", fontWeight: "bold"}}>Lô Cá Koi</h1>
        </div>

        <Row gutter={[16, 16]}>
          {currentFishPackages.map((pkg) => (
            <Col key={pkg.fishPackageId} xs={24} sm={12} md={6}>
              <FishCard fish={pkg}/>
            </Col>
          ))}
        </Row>

        <div style={{display: "flex", justifyContent: "flex-end", marginTop: "32px"}}>
          <Pagination
            current={currentPageFishPackages}
            pageSize={ITEMS_PER_PAGE}
            total={fishPackages.length}
            onChange={handlePageChangeFishPackages}
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

export default ProductPage;
