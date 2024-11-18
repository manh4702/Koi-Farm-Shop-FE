// // src/user/Shared/Search.jsx
// import React from "react";
// import { Input } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

// const Search = () => {
//   return (
//     <div style={{ marginTop: "30px", textAlign: "center" }}>
//       <Input.Search
//         placeholder="Tìm kiếm sản phẩm..."
//         enterButton={<SearchOutlined style={{ fontSize: "20px" }} />}
//         size="large"
//         className="custom-search-input"
//         style={{
//           width: "400px",
//           border: "1px solid red",
//           borderRadius: "10px",
//         }}
//       />
//     </div>
//   );
// };

// export default Search;

// src / user / Shared / Search.jsx;
// import React from "react";
// import { SearchOutlined } from "@ant-design/icons";

// const Search = () => {
//   return (
//     <div className="flex items-center justify-center mt-2.5">
//       <input
//         type="text"
//         placeholder="Tìm kiếm sản phẩm..."
//         className="w-88 h-10 pl-3 pr-3 rounded-l-full border border-red-500 border-r-0 text-base outline-none focus:outline-none"
//         style={{ borderRadius: "50px 0 0 50px", fontSize: "16px" }}  // Tailwind không hỗ trợ borderRadius với giá trị không đối xứng, do đó bạn phải dùng inline style hoặc CSS custom
//       />
//       <button
//         type="button"
//         className="flex items-center justify-center h-10 w-12 rounded-r-full bg-red-500 text-white text-base border-0 hover:bg-red-500"
//         style={{ borderRadius: "0 50px 50px 0", fontSize: "16px" }}  // Tương tự như input, borderRadius đặc biệt phải dùng inline style hoặc CSS custom
//       >
//         <SearchOutlined style={{ color: 'white' }} />
//       </button>
//     </div>
//   );
// };

// export default Search;
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "../../../api/axios.jsx";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // Thêm trạng thái kiểm tra

  const handleSearch = async () => {
    if (query.trim() === "") {
      alert("Vui lòng nhập từ khóa tìm kiếm!");
      return;
    }
    setIsSearched(true); // Đánh dấu là người dùng đã tìm kiếm
    try {
      const response = await axios.get(
        `/api/FishPackage?page=1&pageSize=10&search=${query}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );
      setResults(response.data); // Lưu kết quả từ API
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex items-center justify-center mt-2.5">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-88 h-10 pl-3 pr-3 rounded-l-full border border-red-500 border-r-0 text-base outline-none focus:outline-none"
        style={{ borderRadius: "50px 0 0 50px", fontSize: "16px" }}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="flex items-center justify-center h-10 w-12 rounded-r-full bg-red-500 text-white text-base border-0 hover:bg-red-500"
        style={{ borderRadius: "0 50px 50px 0", fontSize: "16px" }}
      >
        <SearchOutlined style={{ color: "white" }} />
      </button>

      {/* Hiển thị kết quả */}
      <div className="mt-4 w-96">
        {isSearched && results.length === 0 && (
          <p className="text-center text-gray-500">
            Không có kết quả nào được tìm thấy.
          </p>
        )}
        {results.length > 0 && (
          <ul className="list-disc pl-5">
            {results.map((item, index) => (
              <li key={index} className="text-left text-base">
                {item.name} - {item.description} {/* Tuỳ chỉnh theo dữ liệu */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
