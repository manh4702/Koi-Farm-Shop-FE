import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import CategoryInfo from './CategoryInfo';
import FishInfo from './FishInfo';

const { Content } = Layout;

const FishManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Row gutter={16}>
          <Col span={8}>
            <CategoryInfo onSelectCategory={setSelectedCategory} />
          </Col>
          <Col span={16}>
            {selectedCategory && <FishInfo category={selectedCategory} />}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FishManagement;