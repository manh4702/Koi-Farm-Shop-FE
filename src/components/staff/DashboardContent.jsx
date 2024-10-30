import React from "react";
import { Row, Col, Card, Progress } from "antd";
import { Line } from "@ant-design/charts";
import { Bar } from "@ant-design/charts";
import { UserOutlined, SyncOutlined, DatabaseOutlined, ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";

const DashboardContent = () => {
  const profitData = [
    { month: 'Jan', value: 25000 },
    { month: 'Feb', value: 27000 },
    { month: 'Mar', value: 30000 },
    { month: 'Apr', value: 32000 },
    { month: 'May', value: 35000 },
  ];

  const deviceSalesData = [
    { device: 'Demand', sales: 70000 },
    { device: 'Supply', sales: 55000 },
  ];

  const lineConfig = {
    data: profitData,
    xField: 'month',
    yField: 'value',
    smooth: true,
    height: 200,
    color: '#3f51b5',
  };

  const barConfig = {
    data: deviceSalesData,
    xField: 'device',
    yField: 'sales',
    seriesField: 'device',
    color: ['#ff4d4f', '#1890ff'],
    height: 200,
  };

  return (
    <div className="p-4">
      <h2>Tổng quan</h2>
      {/* Thẻ thông tin hàng đầu */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Card bordered={false} className="dashboard-card" style={{ backgroundColor: "#3f51b5", color: "#fff" }}>
            <UserOutlined style={{ fontSize: '24px', color: '#fff' }} />
            <h3>Tổng số khách hàng</h3>
            <h2>100 Khách</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="dashboard-card" style={{ backgroundColor: "#009688", color: "#fff" }}>
            <SyncOutlined style={{ fontSize: '24px', color: '#fff' }} />
            <h3>Lượt hoạt động</h3>
            <h2>25 lượt</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="dashboard-card" style={{ backgroundColor: "#4caf50", color: "#fff" }}>
            <DatabaseOutlined style={{ fontSize: '24px', color: '#fff' }} />
            <h3>Trạng thái Server</h3>
            <h2>Đang chạy</h2>
          </Card>
        </Col>
      </Row>

      {/* Thẻ thông tin hàng thứ hai */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Card bordered={false} className="dashboard-card" style={{ backgroundColor: "#ff9800", color: "#fff" }}>
            <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />
            <h3>Lượt mua hàng</h3>
            <h2>50 lượt</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="dashboard-card" style={{ backgroundColor: "#f44336", color: "#fff" }}>
            <DollarOutlined style={{ fontSize: '24px', color: '#fff' }} />
            <h3>Doanh thu</h3>
            <h2>1,000,000 VND</h2>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Hoạt động gần đây" bordered={false}>
            <h3>Total Profit: $92,556</h3>
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Tốc độ tăng trưởng (Doanh số cá bán được)" bordered={false}>
            <Bar {...barConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
