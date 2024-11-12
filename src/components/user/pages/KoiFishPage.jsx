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
import {useNavigate} from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const KoiFishPage = () => {
  // const [hoveredFishId, setHoveredFishId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedFishes, setSelectedFishes] = useState([]);
  const { fishes, loadFishes, loading, error } = useFishStore();

  // Load fish data from API when component mounts
  useEffect(() => {
    loadFishes();
  }, [loadFishes]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFishes = fishes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleSelectFish = (fishId) => {
  //   const selectedFish = fishes.find((fish) => fish.fishId === fishId);
  //   if (!selectedFish) return;

  //   if (selectedFishes.includes(selectedFish)) {
  //     setSelectedFishes(selectedFishes.filter((fish) => fish.fishId !== fishId));
  //   } else {
  //     if (selectedFishes.length < 2) {
  //       setSelectedFishes([...selectedFishes, selectedFish]);
  //     } else {
  //       Modal.warning({
  //         title: "Chỉ có thể so sánh 2 cá",
  //         content: "Bạn chỉ có thể chọn tối đa 2 cá để so sánh.",
  //       });
  //     }
  //   }
  // };

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

  //         }}
  //       >
  //         <div>
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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPage]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollToTopButton = document.getElementById("scrollToTop");
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       scrollToTopButton.style.display = "block";
  //     } else {
  //       scrollToTopButton.style.display = "none";
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu: {error}</p>;

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
