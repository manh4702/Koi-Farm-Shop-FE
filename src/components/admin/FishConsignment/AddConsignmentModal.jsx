import React from "react";
import { Modal, Form, Input, DatePicker, Button, Select, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddConsignment = ({ visible, onCancel, onSubmit }) => {
  return (
    <Modal
      title={
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Thêm đơn ký gửi
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form name="add-consignment" onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên cá Koi"
          rules={[{ required: true, message: "Vui lòng nhập tên cá!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="owner"
          label="Chủ sở hữu"
          rules={[{ required: true, message: "Vui lòng nhập tên chủ sở hữu!" }]}
        >
          <Input />
        </Form.Item>

        <Row span={24} gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Loại cá"
              rules={[{ required: true, message: "Vui lòng nhập loại cá!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <Input type="number" addonAfter="VND" />
            </Form.Item>
          </Col>
        </Row>

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
          <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: "16px" }}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddConsignment;
