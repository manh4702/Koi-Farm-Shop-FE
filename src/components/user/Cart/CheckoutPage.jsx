import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col, List, Card, Radio, Modal, Divider, Select, Typography, QRCode} from 'antd';
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
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [form] = Form.useForm();
  const cartItems = useCartStore((state) => state.items);
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // console.log("Cart Items in CheckoutPage:", cartItems);

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

  // Kiểm tra điều kiện hợp lệ của form
  useEffect(() => {
    const checkFormValidity = async () => {
      const values = await form.getFieldsValue();
      const isAddressFilled = values.address && values.city;
      setIsFormValid(isAddressFilled && paymentMethod); // Kiểm tra nếu có địa chỉ và phương thức thanh toán
    };

    checkFormValidity();
  }, [paymentMethod, form]);

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
        })),
        paymentMethod: paymentMethod,
      };

      // await placeOrder(orderData);
      const orderResult = await placeOrder(orderData);
      useCartStore.getState().clearCart();

      if (paymentMethod === 'ZaloPay' && orderResult.success) {
        try {

          await new Promise(resolve => setTimeout(resolve, 2000));

          const orderId = orderResult.data.orderId;
          const totalPrice = orderResult.data.totalPrice;
          // Gọi API thanh toán với orderId
          const paymentResponse = await fetch(`/api/Payment/create-payment/${orderId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: calculateTotalPrice(cartItems),
              description: 'Thanh toán đơn hàng',
              item: 'Sản phẩm trong giỏ hàng'
            }),
          });

          const paymentData = await paymentResponse.json();

          // Chuyển hướng đến URL thanh toán
          if (paymentData.order_url) {
            window.location.href = paymentData.order_url;
          } else {
            throw new Error('Không nhận được URL thanh toán');
          }
        } catch (error) {
          Modal.error({
            title: 'Lỗi thanh toán',
            content: 'Không thể khởi tạo thanh toán ZaloPay. Vui lòng thử lại sau.',
          });
        }
      } else {
        Modal.success({
          title: 'Đặt hàng thành công',
          content: 'Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận.',
        });
        navigate('/'); // hoặc trang xác nhận đơn hàng
      }
    } catch (error) {
      Modal.error({
        title: 'Thanh toán thất bại',
        content: 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to call the Zalopay API to generate a QR code
  const createPayment = async (orderId) => {
    const amount = calculateTotalPrice(cartItems); // Use the total price of the cart
    const requestBody = {
      amount: amount,
      description: 'Thanh toán đơn hàng',
      item: 'Sản phẩm trong giỏ hàng'
    };

    try {
      const response = await fetch(`/api/Payment/createPayment/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      return data; // Assuming the response contains qrCodeUrl
    } catch (error) {
      console.error("Error creating payment:", error);
      return null;
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
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    fontSize: '18px',
                    height: '40px',
                    width: '50%',
                    color: isFormValid ? 'white' : 'black', // Chữ trắng khi hợp lệ, chữ đen khi chưa hợp lệ
                    backgroundColor: isFormValid ? 'red' : 'gray', // Màu đỏ khi hợp lệ, xám khi chưa hợp lệ
                    borderColor: isFormValid ? 'red' : 'gray', // Cùng màu với background
                  }}
                  loading={loading}
                  disabled={!isFormValid}
                >
                  ĐẶT HÀNG
                </Button>
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
                <Radio value="ZaloPay" style={{display: 'block', padding: '8px 0'}}><CreditCardOutlined/> Thanh
                  toán online</Radio>
                <Radio value="CASH" style={{display: 'block', padding: '8px 0'}}><DollarCircleOutlined/> Thanh toán khi
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
