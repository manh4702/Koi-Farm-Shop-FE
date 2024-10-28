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
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  return (
    <div className="flex items-center justify-center mt-2.5">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="w-88 h-10 pl-3 pr-3 rounded-l-full border border-red-500 border-r-0 text-base outline-none focus:outline-none"
        style={{ borderRadius: "50px 0 0 50px", fontSize: "16px" }}  // Tailwind không hỗ trợ borderRadius với giá trị không đối xứng, do đó bạn phải dùng inline style hoặc CSS custom
      />
      <button
        type="button"
        className="flex items-center justify-center h-10 w-12 rounded-r-full bg-red-500 text-white text-base border-0 hover:bg-red-500"
        style={{ borderRadius: "0 50px 50px 0", fontSize: "16px" }}  // Tương tự như input, borderRadius đặc biệt phải dùng inline style hoặc CSS custom
      >
        <SearchOutlined style={{ color: 'white' }} />
      </button>
    </div>
  );
};

export default Search;

