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
  const [selectedFishes, setSelectedFishes] = useState([]);

  const {fishes, loadFishes} = useFishStore();
  const {fishPackages, fetchFishPackages} = useFishPackageStore();

  useEffect(() => {
    loadFishes();
    fetchFishPackages();

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

  const getSelectedFish = (fishId, isPackage) => {
    if (isPackage) {
      return fishPackages.find((pkg) => pkg.fishPackageId === fishId);
    } else {
      return fishes.find((fish) => fish.id === fishId);
    }
  };

  const handleSelectFish = (fishId, isPackage = false) => {
    const selectedFish = getSelectedFish(fishId, isPackage);
    if (!selectedFish) return;

    const alreadySelected = selectedFishes.some(
      (fish) => fish.fishPackageId === fishId || fish.id === fishId
    );

    if (alreadySelected) {
      setSelectedFishes(selectedFishes.filter((fish) => fish.fishPackageId !== fishId && fish.id !== fishId));
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

  // const showCompareModal = () => {
  //   Modal.info({
  //     title: "So sánh cá",
  //     content: (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           width: "300px",
  //
  //         }}
  //       >
  //         <div
  //           // style={{
  //           //   // borderRadius: "12px", // Bo góc cho div chứa bảng
  //           //   // overflow: "hidden", // Đảm bảo bảng không vượt quá vùng bo góc
  //           // //   border: "1px solid black", 
  //           // }}
  //         >
  //           {selectedFishes.length === 2 ? (
  //             <table
  //               style={{
  //                 width: "100%",
  //                 borderCollapse: "collapse",
  //               }}
  //             >
  //               <thead>
  //               <tr>
  //                 <th
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center", // Căn giữa chữ trong ô
  //                     backgroundColor: "#f2f2f2",
  //                   }}
  //                 >
  //                   Thuộc tính
  //                 </th>
  //                 <th
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center", // Căn giữa chữ trong ô
  //                     backgroundColor: "#f2f2f2",
  //                   }}
  //                 >
  //                   {selectedFishes[0].name}
  //                 </th>
  //                 <th
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center", // Căn giữa chữ trong ô
  //                     backgroundColor: "#f2f2f2",
  //                   }}
  //                 >
  //                   {selectedFishes[1].name}
  //                 </th>
  //               </tr>
  //               </thead>
  //               <tbody>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Giá
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].price}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].price}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Kích thước
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].size}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].size}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Tuổi
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].age}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].age}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Năm sinh
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].year}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].year}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Nguồn gốc
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].origin}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].origin}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Giống
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].breed}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].breed}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Giới tính
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].gender}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].gender}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Lượng thức ăn/ngày
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].foodPerDay}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].foodPerDay}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Tỉ lệ sàng lọc
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].screeningRate}
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].screeningRate}
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Đánh giá
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[0].rating} ⭐️
  //                 </td>
  //                 <td
  //                   style={{
  //                     border: "1px solid black",
  //                     padding: "8px",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   {selectedFishes[1].rating} ⭐️
  //                 </td>
  //               </tr>
  //               </tbody>
  //             </table>
  //           ) : (
  //             <p>Vui lòng chọn 2 cá để so sánh.</p>
  //           )}
  //         </div>
  //       </div>
  //     ),
  //     onOk() {
  //       setSelectedFishes([]);
  //     },
  //   });
  // };

  const showCompareModal = () => {
    Modal.info({
      title: "So sánh cá",
      content: (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "300px" }}>
          <div>
            {selectedFishes.length === 2 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px", textAlign: "center", backgroundColor: "#f2f2f2" }}>
                    Thuộc tính
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px", textAlign: "center", backgroundColor: "#f2f2f2" }}>
                    {selectedFishes[0].name || selectedFishes[0].fishPackageName}
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px", textAlign: "center", backgroundColor: "#f2f2f2" }}>
                    {selectedFishes[1].name || selectedFishes[1].fishPackageName}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Giá</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[0].price}</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[1].price}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Kích thước</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[0].size}</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[1].size}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Tuổi</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[0].age}</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[1].age}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Nguồn gốc</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[0].origin}</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[1].origin}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Giống</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[0].breed}</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[1].breed}</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>Giới tính</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[0].gender}</td>
                  <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>{selectedFishes[1].gender}</td>
                </tr>
                {/* Add more comparison rows as needed */}
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
  
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPage]);

  return (
    <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header/>
      <main style={{flexGrow: 1, maxWidth: "100%", margin: "0 190px", padding: "32px 16px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px"}}>
          <h1 style={{fontSize: "1.875rem", fontWeight: "bold"}}>Các loại Cá Koi</h1>
          {selectedFishes.length === 2 && (
            <Button type="primary" onClick={showCompareModal}
                    style={{marginLeft: "auto", color: "white", backgroundColor: "red"}}>
              So sánh {selectedFishes.length} cá đã chọn
            </Button>
          )}
        </div>

        <Row gutter={[16, 16]}>
          {currentFishes.map((fish) => (
            <Col key={fish.id} xs={24} sm={12} md={6} style={{position: "relative"}}>
              <FishCard fish={fish}/>
              <div style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px",
                position: "absolute",
                top: "10px",
                right: "39px",
                backgroundColor: "InactiveCaption"
              }}>
                <Checkbox checked={selectedFishes.includes(fish)} onChange={() => handleSelectFish(fish.id)}>
                  So sánh
                </Checkbox>
              </div>
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
