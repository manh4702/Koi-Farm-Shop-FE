import React from "react";
import { Modal, Form, Input, DatePicker, Button, Select, Col, Row } from "antd";
import moment from "moment";

const { Option } = Select;

const UpdateConsignment = ({ visible, onCancel, onSubmit, consignment }) => {
  return (
    <Modal
      title="Sửa thông tin cá Koi"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        name="edit-consignment"
        onFinish={onSubmit}
        layout="vertical"
        initialValues={{
          price: consignment?.price,
          receivedDate: consignment ? moment(consignment.receivedDate) : null,
          returnDate: consignment ? moment(consignment.returnDate) : null,
          purpose: consignment?.purpose,
        }}
      >
        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <Input type="number" addonAfter="VND" />
        </Form.Item>
        <Row span={24} gutter={16}>
          <Col span={12}>
            <Form.Item
              name="receivedDate"
              label="Ngày nhập"
              rules={[{ required: true, message: "Vui lòng chọn ngày nhập!" }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="returnDate"
              label="Ngày trả"
              rules={[{ required: true, message: "Vui lòng chọn ngày trả!" }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="purpose"
          label="Mục đích ký gửi"
          rules={[{ required: true, message: "Vui lòng chọn mục đích!" }]}
        >
          <Select>
            <Option value="Cá gửi chăm sóc">Cá gửi chăm sóc</Option>
            <Option value="Cá gửi để bán">Cá gửi để bán</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateConsignment;
