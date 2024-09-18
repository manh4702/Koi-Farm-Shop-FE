import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Xử lý đăng ký ở đây (chưa cần gọi API)
    console.log('Form values:', values);
    message.success('Đăng ký thành công!');
    navigate('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng Ký</h2>
        <Form
          name="register-form"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
