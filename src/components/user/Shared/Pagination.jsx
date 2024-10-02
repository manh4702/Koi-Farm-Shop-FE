// src/user/Shared/Pagination.jsx
import React from 'react';
import { Pagination as AntPagination } from 'antd';

const Pagination = ({ total, current, onChange }) => {
  return (
    <div className="flex justify-center my-4">
      <AntPagination 
        total={total} 
        current={current} 
        onChange={onChange} 
        pageSize={10}
      />
    </div>
  );
};

export default Pagination;
