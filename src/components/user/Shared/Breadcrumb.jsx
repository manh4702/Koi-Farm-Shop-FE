// src/user/Shared/Breadcrumb.jsx
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const BreadcrumbComponent = () => {
  return (
    <Breadcrumb className="my-4">
      <Breadcrumb.Item>
        <Link to="/">Trang Chủ</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/products">Sản Phẩm</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
