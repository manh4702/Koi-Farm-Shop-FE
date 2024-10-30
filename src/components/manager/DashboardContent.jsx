import React from "react";
import { Row, Col } from "antd";
import CardInfo from "./CardInfo";
import { UserOutlined, SyncOutlined, DatabaseOutlined, ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";

const DashboardContent = () => {
  return (
    <div className="p-4">
      <Row gutter={16}>
        <Col span={8}>
          <CardInfo
            title="Tổng số khách hàng"
            content="100 Khách"
            icon={UserOutlined}
            color="#3f51b5"
          />
        </Col>
        <Col span={8}>
          <CardInfo
            title="Lượt hoạt động"
            content="25 lượt"
            icon={SyncOutlined}
            color="#009688"
          />
        </Col>
        <Col span={8}>
          <CardInfo
            title="Trạng thái Server"
            content="Đang chạy"
            icon={DatabaseOutlined}
            color="#4caf50"
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={8}>
          <CardInfo
            title="Lượt mua hàng"
            content="50 lượt"
            icon={ShoppingCartOutlined}
            color="#ff9800"
          />
        </Col>
        <Col span={8}>
          <CardInfo
            title="Doanh thu"
            content="1,000,000 VND"
            icon={DollarOutlined}
            color="#f44336"
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
