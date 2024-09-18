import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
  const onFinish = (values) => {
    // Xử lý đăng nhập ở đây (chưa cần gọi API)
    // Ví dụ: Hiển thị thông báo và chuyển hướng đến trang admin
    message.success('Đăng nhập thành công!');
    window.location.href = '/admin'; // Chuyển hướng (chưa cần routing)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>
        <Form
          name="login-form"
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
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
