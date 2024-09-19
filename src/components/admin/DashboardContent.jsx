import React from 'react';
import { Row, Col } from 'antd';
import CardInfo from './CardInfo';

const DashboardContent = () => {
  return (
    <div className="p-4">
      <Row gutter={16}>
        <Col span={8}>
          <CardInfo title="Total Users" content="100 Users" />
        </Col>
        <Col span={8}>
          <CardInfo title="Active Sessions" content="25 Active" />
        </Col>
        <Col span={8}>
          <CardInfo title="Server Status" content="Running" />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
