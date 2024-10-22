// UpdateFishPackageForm.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Upload, Button, message, Modal } from "antd";
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
      const imageUrlToUpdate = imageFile && imageFile.length > 0 ? null : values.imageUrl;

      const newData = {
        name: values.name,
        age: values.age,
        gender: values.gender,
        size: values.size,
        description: values.description,
        totalPrice: values.price,
        dailyFood: values.dailyFood,
        numberOfFish: values.numberOfFish,
        imageFiles: imageFile && imageFile.length > 0 ? imageFile : null,
        imageUrl: imageUrlToUpdate, // Sử dụng imageUrl nếu không có tệp ảnh mới
        status: values.status,
      };

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
        <Form.Item label="Tên Lô Cá" name="name" rules={[{ required: true, message: "Vui lòng nhập tên lô cá!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Giá" name="price" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Ảnh" name="imageUrl">
          <Upload
            fileList={imageFile}
            beforeUpload={() => false}
            onChange={handleFileChange}
            accept="image/*"
          >
            <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Tuổi" name="age">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender">
          <Select>
            <Select.Option value="Male">Nam</Select.Option>
            <Select.Option value="Female">Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Kích thước" name="size">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Thức ăn/ngày" name="dailyFood">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Số lượng" name="numberOfFish">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status">
          <Select>
            <Select.Option value="Available">Có sẵn</Select.Option>
            <Select.Option value="Sold">Đã bán</Select.Option>
            <Select.Option value="Pending">Đang chờ</Select.Option>
          </Select>
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
