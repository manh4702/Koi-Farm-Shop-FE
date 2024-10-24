// UpdateFishPackageForm.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Upload, Button, message, Modal, Row, Col } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { updateFishPackage } from "../../../services/fishPackageStore";

const UpdateFishPackageForm = ({ visible, onCancel, fishPackage, onSuccess }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (fishPackage) {
      form.setFieldsValue(fishPackage);
      setImageFile(null); // Reset the image file state
    }
  }, [fishPackage, form]);

  const handleFileChange = (info) => {
    setImageFile(info.fileList); // Update the list of selected files
  };

  const onFinish = async (values) => {
    try {
      // Nếu không có ảnh mới được chọn, sử dụng giá trị từ imageUrl
      // const imageUrlToUpdate = imageFile && imageFile.length > 0 ? null : values.imageUrl;

      const newData = {
        name: values.name,
        age: values.age,
        gender: values.gender,
        size: values.size,
        description: values.description,
        totalPrice: values.totalPrice,
        dailyFood: values.dailyFood,
        numberOfFish: values.numberOfFish,
        imageFiles: imageFile && imageFile.length > 0 ? imageFile : null, // Sử dụng file mới nếu có
        status: values.status,
      };

      // Gọi API updateFishPackage
      await updateFishPackage(fishPackage.fishPackageId, newData);
      message.success("Lô cá đã được cập nhật thành công!");
      onSuccess(); // Notify parent component to refresh the list
      onCancel(); // Đóng popup sau khi cập nhật thành công
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật lô cá.");
    }
  };


  return (
    <Modal
      title="Sửa Thông tin Lô Cá"
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
              name="totalPrice"
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
                    e.preventPrevent();
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
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFishPackageForm;
