import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, List, Card, Radio, Modal } from 'antd';
import { useLocation } from 'react-router-dom';
const CheckoutPage = ({ cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
  const [form] = Form.useForm();

  const handlePaymentMethodChange = e => {
    setPaymentMethod(e.target.value);
  };

  const handleFormSubmit = values => {
    console.log('Thông tin khách hàng:', values);
    console.log('Phương thức thanh toán:', paymentMethod);
    Modal.success({
      title: 'Thanh toán thành công',
      content: 'Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận.',
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Trang Thanh Toán</h1>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Thông tin khách hàng">
            <Form form={form} onFinish={handleFormSubmit} layout="vertical">
              <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
                <Input placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Xác nhận thanh toán</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Giỏ hàng">
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta title={item.name} description={`Giá: ${item.price.toLocaleString()} VND`} />
                </List.Item>
              )}
            />
            <h3 style={{ marginTop: '20px' }}>Tổng tiền: {cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()} VND</h3>
          </Card>
          <Card title="Phương thức thanh toán" style={{ marginTop: '20px' }}>
            <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
              <Radio value="bankTransfer">Chuyển khoản ngân hàng</Radio>
              <Radio value="creditCard">Thẻ tín dụng</Radio>
              <Radio value="eWallet">Ví điện tử</Radio>
            </Radio.Group>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
