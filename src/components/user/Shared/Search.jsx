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
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  return (
    <div
      style={{
        marginTop: "10px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Input
        placeholder="Tìm kiếm sản phẩm..."
        style={{
          width: "350px",
          height: "40px",
          padding: "0 12px",
          borderRadius: "50px 0 0 50px",
          border: "1px solid red",
          fontSize: "16px",
          outline: "none",
          borderRight: "none",
        }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        style={{
          height: "40px",
          width: "50px",
          borderRadius: "0 50px 50px 0",
          fontSize: "16px",
          backgroundColor: "red",
          border: "none",
        }}
      />
    </div>
  );
};

export default Search;
