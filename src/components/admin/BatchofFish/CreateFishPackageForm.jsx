// CreateFishPackageForm.jsx
import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  Modal,
  Row,
  Col,
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { createFishPackage } from "../../../services/fishPackageStore";

const CreateFishPackageForm = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (info) => {
    setImageFile(info.fileList); // Update the list of selected files
  };

  const onFinish = async (values) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const newData = {
        name: values.name,
        age: values.age,
        gender: values.gender,
        size: values.size,
        description: values.description,
        totalPrice: values.price,
        dailyFood: values.dailyFood,
        // imageFiles: imageFile && imageFile.length > 0 ? imageFile : null,
        imageFile: [],
        numberOfFish: values.numberOfFish,
        // imageUrl: values.imageUrl || null,
      };

      await createFishPackage(newData);
      message.success("Lô cá đã được tạo thành công!");
      onSuccess(); // Notify parent component to refresh the list
      form.resetFields();
      setImageFile(null);
      onCancel();
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo lô cá.");
    } finally {
      setSubmitting(false); // Đặt lại trạng thái loading về false
    }
  };

  return (
    <Modal
      title="Thêm mới Lô Cá"
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên Lô Cá"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên lô cá!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ảnh"
              name="imageFile"
              rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
            >
              <Upload
                fileList={imageFile}
                beforeUpload={() => false}
                onChange={handleFileChange}
                accept="image/*"
              >
                <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tuổi"
              name="age"
              rules={[{ required: true, message: "Vui lòng nhập tuổi!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Select>
                <Select.Option value="Đực">Đực</Select.Option>
                <Select.Option value="Cái">Cái</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Kích thước"
              name="size"
              rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Thức ăn/ngày"
              name="dailyFood"
              rules={[{ required: true, message: "Vui lòng nhập lượng thức ăn/ngày!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số lượng"
              name="numberOfFish"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={submitting}
          >
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFishPackageForm;
