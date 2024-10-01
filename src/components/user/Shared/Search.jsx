// src/user/Shared/Search.jsx
import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <Input.Search 
        placeholder="Tìm kiếm sản phẩm..." 
        enterButton={<SearchOutlined />}
        size="large" 
        className="custom-search-input"
        style={{ width: '400px' }}
      />
    </div>
  );
};

export default Search;
