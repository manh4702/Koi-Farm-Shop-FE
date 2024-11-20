import React, { useState, useRef, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const convertStatus = (status) => {
    const statusMap = {
      'AVAILABLE': 'Còn hàng',
      'SOLDOUT': 'Đã bán hết'
    };
    return statusMap[status] || status;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearched(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setIsSearched(true);

    try {
      const response = await axios.get(
        '/api/Search/SearchAll?page=1&pageSize=10',
        {
          headers: { accept: "*/*" },
        }
      );
      setResults(response.data.data.listData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (item) => {
    if (item.isPackage) {
      navigate(`/products/fish-packages/${item.fishPackageId}`);
    } else {
      navigate(`/products/fish/${item.fishId}`);
    }
    setIsSearched(false);
    setQuery("");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm cá hoặc lô cá..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full h-12 pl-5 pr-12 rounded-full border-2 border-gray-200 
                     focus:border-red-500 focus:outline-none transition-all duration-300
                     text-gray-700 text-base shadow-sm hover:shadow-md"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2
                     h-8 w-8 flex items-center justify-center rounded-full
                     bg-red-500 hover:bg-red-600 transition-colors duration-300"
        >
          <SearchOutlined className="text-white text-lg" />
        </button>
      </div>

      <AnimatePresence>
        {isSearched && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-lg shadow-lg
                      border border-gray-100 overflow-hidden z-50"
          >
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : results.length > 0 ? (
              <ul className="max-h-[400px] overflow-y-auto">
                {results.map((item) => (
                  <motion.li
                    key={item.isPackage ? item.fishPackageId : item.fishId}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    className="p-4 cursor-pointer border-b border-gray-100
                               hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleResultClick(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <h4 className="text-gray-800 font-medium">{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {item.isPackage ? 'Lô cá' : 'Cá đơn'} |
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatPrice(item.price)}
                          </span>
                          <span className={`text-sm ${
                            item.productStatus === 'AVAILABLE' 
                              ? 'text-green-500' 
                              : 'text-red-500'
                          }`}>
                            | {convertStatus(item.productStatus)}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.li>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;