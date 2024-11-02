import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, List, Card, Radio, Modal, Divider, Select, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { CreditCardOutlined, BankOutlined, DollarCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
  const [form] = Form.useForm();

  const handlePaymentMethodChange = e => {
    setPaymentMethod(e.target.value);
  };

  const handleFormSubmit = values => {
    console.log('Thông tin khách hàng:', values);
    console.log('Phương thức thanh toán:', paymentMethod);

    if (paymentMethod === 'onlinePayment') {
      navigate('/payment-gateway', { state: { cartItems, customerInfo: values } });
    } else {
      Modal.success({
        title: 'Thanh toán thành công',
        content: 'Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận.',
      });
    }
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <Row gutter={32}>
          <Col span={16} style={{ borderRight: '1px solid #f0f0f0' }}>
            <Title level={4} style={{ marginBottom: '20px' }}>Thông tin nhận hàng</Title>
            <Form form={form} onFinish={handleFormSubmit} layout="vertical">
              <Form.Item name="email" label="Email (tuỳ chọn)">
                <Input placeholder="Email (tuỳ chọn)" />
              </Form.Item>
              <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>\n                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>\n                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>\n                <Input placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item name="city" label="Tỉnh thành" rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành' }]}>\n                <Select placeholder="Chọn tỉnh thành">
                  <Select.Option value="hcm">Hồ Chí Minh</Select.Option>
                  <Select.Option value="hn">Hà Nội</Select.Option>
                  <Select.Option value="dn">Đà Nẵng</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="district" label="Quận huyện">
                <Input placeholder="Quận huyện" disabled />
              </Form.Item>
              <Form.Item name="ward" label="Phường xã">
                <Input placeholder="Phường xã" disabled />
              </Form.Item>
              <Form.Item name="note" label="Ghi chú (tuỳ chọn)">
                <TextArea rows={2} placeholder="Ghi chú về đơn hàng (tuỳ chọn)" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ fontSize: '16px' }}>ĐẶT HÀNG</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}>
            <Title level={4} style={{ marginBottom: '20px' }}>Đơn hàng</Title>
            <Card bordered={false} style={{ marginBottom: '20px' }}>
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={item.name} description={`Giá: ${item.price.toLocaleString()} VND`} />
                  </List.Item>
                )}
              />
              <Divider />
              <Text strong>Tổng cộng: </Text><Text style={{ float: 'right', color: '#ff4d4f', fontSize: '18px' }}>{cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()} VND</Text>
            </Card>
            <Title level={4} style={{ marginBottom: '10px' }}>Thanh toán</Title>
            <Card bordered={false}>
              <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod} style={{ width: '100%' }}>
                <Radio value="onlinePayment" style={{ display: 'block', padding: '8px 0' }}><CreditCardOutlined /> Thanh toán online</Radio>
                <Radio value="bankTransfer" style={{ display: 'block', padding: '8px 0' }}><BankOutlined /> Chuyển khoản ngân hàng</Radio>
                <Radio value="cod" style={{ display: 'block', padding: '8px 0' }}><DollarCircleOutlined /> Thanh toán khi nhận hàng (COD)</Radio>
              </Radio.Group>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
