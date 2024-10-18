import React from 'react';
import { Card } from 'antd';

const CardInfo = ({ title, content }) => {
  return (
    <Card title={title} bordered={false}>
      {content}
    </Card>
  );
};

export default CardInfo;
