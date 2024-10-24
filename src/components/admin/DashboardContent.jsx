import React from "react";
import { Row, Col } from "antd";
import CardInfo from "./CardInfo";

const DashboardContent = () => {
  return (
    <div className="p-4">
      <Row gutter={16}>
        <Col span={8}>
          <CardInfo title="Tổng số khách hàng" content="100 Khách" />
        </Col>
        <Col span={8}>
          <CardInfo title="Lượt hoạt động" content="25 lượt" />
        </Col>
        <Col span={8}>
          <CardInfo title="Trạng thái Server" content="Đang chạy" />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
