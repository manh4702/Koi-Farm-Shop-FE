import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col, List, Card, Radio, Modal, Divider, Select, Typography} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import {CreditCardOutlined, BankOutlined, DollarCircleOutlined} from '@ant-design/icons';
import useCartStore from "@/store/cartStore.js";
import useOrderStore from "@/store/orderStore.js";

const {TextArea} = Input;
const {Title, Text} = Typography;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
  const [form] = Form.useForm();
  const cartItems = useCartStore((state) => state.items);
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const [loading, setLoading] = useState(false);

  console.log("Cart Items in CheckoutPage:", cartItems);

  const handlePaymentMethodChange = e => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      Modal.error({
        title: 'Chưa đăng nhập',
        content: 'Vui lòng đăng nhập để tiếp tục',
        onOk: () => navigate('/login')
      });
    }
  }, []);

  const handleFormSubmit = async (values) => {
    if (!cartItems || cartItems.length === 0) {
      Modal.error({
        title: 'Giỏ hàng trống',
        content: 'Vui lòng thêm sản phẩm vào giỏ hàng'
      });
      return;
    }

    setLoading(true);

    try {
      const userId = sessionStorage.getItem('userId');
      const orderData = {
        userId: userId,
        isSent: true,
        address: values.address.trim(),
        city: values.city,
        district: values.district?.trim() || '',
        cartItems: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.totalPricePerItem
        }))
      };

      // await placeOrder(orderData);
      const result = await placeOrder(orderData);
      useCartStore.getState().clearCart();

      // if (paymentMethod === 'onlinePayment') {
      //   navigate('/payment-gateway', {state: {cartItems, customerInfo: values}});
      // } else {
      //   Modal.success({
      //     title: 'Thanh toán thành công',
      //     content: 'Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận.',
      //   });
      // }
    } catch (error) {
      Modal.error({
        title: 'Thanh toán thất bại',
        content: 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (items) =>
    items.reduce((total, item) => total + item.totalPricePerItem * item.quantity, 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };
  
  return (
    <>
      <Header/>
      <div
        style={{maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px'}}>
        <Row gutter={32}>
          <Col span={16} style={{borderRight: '1px solid #f0f0f0'}}>
            <Title level={4} style={{marginBottom: '20px'}}>Thông tin nhận hàng</Title>
            <Form form={form} onFinish={handleFormSubmit} onFinishFailed={() => console.log("Form validation failed")}
                  layout="vertical">
              <Form.Item name="address" label="Địa chỉ"
                         rules={[{required: true, message: 'Vui lòng nhập địa chỉ'}]}>
                <Input placeholder="Địa chỉ"/>
              </Form.Item>
              <Form.Item name="city" label="Tỉnh thành"
                         rules={[{required: true, message: 'Vui lòng chọn tỉnh thành'}]}>
                <Select placeholder="Chọn tỉnh thành">
                  <Select.Option value="Hồ Chí Minh">Hồ Chí Minh</Select.Option>
                  <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                  <Select.Option value="Đà Nẵng">Đà Nẵng</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="district" label="Quận huyện">
                <Input placeholder="Quận huyện"/>
              </Form.Item>
              {/*<Form.Item name="note" label="Ghi chú (tuỳ chọn)">*/}
              {/*  <TextArea rows={2} placeholder="Ghi chú về đơn hàng (tuỳ chọn)"/>*/}
              {/*</Form.Item>*/}
              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{fontSize: '16px'}} loading={loading}>ĐẶT HÀNG</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}>
            <Title level={4} style={{marginBottom: '20px'}}>Đơn hàng</Title>
            <Card bordered={false} style={{marginBottom: '20px'}}>
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          src={item.fishImage || item.packageImage || 'placeholder.png'}
                          alt={item.fishName || item.packageName || 'Product'}
                          style={{width: 60, height: 60, borderRadius: '8px'}}
                        />
                      }
                      title={item.fishName || item.packageName}
                      description={
                        <>
                          <div>Giá: {formatCurrency(item.totalPricePerItem || 0)}</div>
                          <div>Số lượng: {item.quantity}</div>
                        </>
                      }/>
                  </List.Item>
                )}
              />
              <Divider/>
              <Text strong>Tổng cộng: </Text>
              <Text style={{
                float: 'right',
                color: '#ff4d4f',
                fontSize: '18px'
              }}>{formatCurrency(calculateTotalPrice(cartItems))}</Text>
            </Card>
            <Title level={4} style={{marginBottom: '10px'}}>Thanh toán</Title>
            <Card bordered={false}>
              <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod} style={{width: '100%'}}>
                <Radio value="onlinePayment" style={{display: 'block', padding: '8px 0'}}><CreditCardOutlined/> Thanh
                  toán online</Radio>
                <Radio value="cod" style={{display: 'block', padding: '8px 0'}}><DollarCircleOutlined/> Thanh toán khi
                  nhận hàng (COD)</Radio>
              </Radio.Group>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer/>
    </>
  );
};

export default CheckoutPage;
