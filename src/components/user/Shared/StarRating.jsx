// src/user/Shared/StarRating.jsx
import React from 'react';
import { Rate } from 'antd';

const StarRating = ({ value }) => {
  return (
    <Rate disabled value={value} />
  );
};

export default StarRating;
