// import React, { useState, useRef } from "react";
// import { SearchOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "../../../api/axios.jsx";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isSearched, setIsSearched] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();
//   const searchRef = useRef(null);

//   const handleSearch = async () => {
//     if (query.trim() === "") {
//       alert("Vui lòng nhập từ khóa tìm kiếm!");
//       return;
//     }
//     setIsSearched(true);
//     try {
//       const response = await axios.get(
//         `/api/FishPackage?page=1&pageSize=10&search=${query}`,
//         {
//           headers: {
//             accept: "*/*",
//           },
//         }
//       );
//       setResults(response.data.data.listData);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       alert("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại!");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleResultClick = (id) => {
//     navigate(`/products/fish-packages/${id}`);
//     setShowPopup(false);
//   };

//   const handleClickOutside = (e) => {
//     if (searchRef.current && !searchRef.current.contains(e.target)) {
//       setShowPopup(false);
//     }
//   };

//   React.useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex flex-col items-center mt-2.5 relative" ref={searchRef}>
//       <div className="flex items-center justify-center w-full max-w-lg">
//         <input
//           type="text"
//           placeholder="Tìm kiếm sản phẩm..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="w-88 h-10 pl-4 pr-3 rounded-l-full border border-red-500 border-r-0 text-base outline-none focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
//           style={{ borderRadius: "50px 0 0 50px", fontSize: "16px" }}
//         />
//         <button
//           type="button"
//           onClick={handleSearch}
//           className="flex items-center justify-center h-10 w-12 rounded-r-full bg-red-500 text-white text-base border-0 hover:bg-red-600 transition-colors duration-200"
//           style={{ borderRadius: "0 50px 50px 0", fontSize: "16px" }}
//         >
//           <SearchOutlined style={{ color: "white" }} />
//         </button>
//       </div>

//       {showPopup && (results.length > 0 || isSearched) && (
//         <div
//           className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-lg z-50 transition-all duration-200 ease-in-out"
//           style={{ 
//             maxHeight: "300px", 
//             overflowY: "auto",
//             transform: showPopup ? 'translateY(10)' : 'translateY(-10px)',
//             opacity: showPopup ? 1 : 0
//           }}
//         >
//           {results.length > 0 ? (
//             <ul className="list-none p-0 m-0">
//               {results.map((item) => (
//                 <li
//                   key={item.fishPackageId}
//                   className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                   onClick={() => handleResultClick(item.fishPackageId)}
//                 >
//                   <div className="flex flex-col">
//                     <span className="font-medium text-gray-800 mb-1">
//                       {item.name}
//                     </span>
                    
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-6 text-center">
//               <p className="text-gray-500 font-medium">
//                 Không tìm thấy kết quả nào
//               </p>
//               <p className="text-sm text-gray-400 mt-1">
//                 Vui lòng thử lại với từ khóa khác
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;

import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios.jsx";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearch = async () => {
    if (query.trim() === "") {
      alert("Vui lòng nhập từ khóa tìm kiếm!");
      return;
    }
    setIsSearched(true);
    try {
      const response = await axios.get(
        `/api/FishPackage?page=1&pageSize=10&search=${query}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );
      setResults(response.data.data.listData);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (id) => {
    navigate(`/products/fish-packages/${id}`);
    setIsSearched(false); // Đóng popup sau khi chọn kết quả
  };

  return (
    <div className="flex flex-col items-center mt-2.5 relative">
      <div className="flex items-center justify-center w-full max-w-lg">
        <input
          type="text"
          placeholder="Tìm kiếm cá hoặc lô cá..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-88 h-10 pl-4 pr-3 rounded-l-full border border-red-500 border-r-0 text-base outline-none focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
          style={{ borderRadius: "50px 0 0 50px", fontSize: "16px" }}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center h-10 w-12 rounded-r-full bg-red-500 text-white text-base border-0 hover:bg-red-600 transition-colors duration-200"
          style={{ borderRadius: "0 50px 50px 0", fontSize: "16px" }}
        >
          <SearchOutlined style={{ color: "white" }} />
        </button>
      </div>

      <Popup
        open={isSearched && results.length > 0}
        closeOnDocumentClick
        onClose={() => setIsSearched(false)}
        position="bottom center"
        contentStyle={{
          width: "100%",
          maxWidth: "400px",
          maxHeight: "300px",
          marginTop: "170px",
          overflowY: "auto",
          borderRadius: "8px",
          padding: "10px",
          border: "1px solid #ccc",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "#fff",
          zIndex: 1000,
        }}
      >
        <div>
          {results.length > 0 ? (
            <ul className="list-none p-0 m-0">
              {results.map((item) => (
                <li
                  key={item.fishPackageId}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                  onClick={() => handleResultClick(item.fishPackageId)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 mb-1">
                      {item.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 font-medium">
                Không tìm thấy kết quả nào
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Vui lòng thử lại với từ khóa khác
              </p>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default Search;
