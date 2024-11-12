// CreateFishPackageForm.jsx
import React, {useState} from "react";
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
import {PlusOutlined, SaveOutlined} from "@ant-design/icons";
import {createFishPackage} from "../../../services/fishPackageService.js";
import {FiUpload} from "react-icons/fi";

const CreateFishPackageForm = ({visible, onCancel, onSuccess}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // const handleFileChange = (info) => {
  //   setImageFile(info.fileList); // Update the list of selected files
  //   setHasImage(FileList.length > 0)
  // };

  const handleFileChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Bạn chỉ có thể tải file ảnh lên!');
      return false;
    }
    return false; // Prevent automatic upload
  };

  const onFinish = async (values) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData();

      // Append form values
      formData.append("Name", values.name);
      formData.append("Age", values.age?.toString());
      formData.append("Gender", values.gender);
      formData.append("Size", values.size?.toString());
      formData.append("Description", values.description);
      formData.append("TotalPrice", values.totalPrice?.toString());
      formData.append("DailyFood", values.dailyFood?.toString());
      formData.append("NumberOfFish", values.numberOfFish?.toString());

      // Append the image file if it exists
      if (fileList[0]?.originFileObj) {
        formData.append("ImageUrl", fileList[0].originFileObj);
      }

      // Call createFishPackage with the prepared FormData
      const response = await createFishPackage(formData);

      if (response.success) {
        message.success("Lô cá đã được tạo thành công!");
        form.resetFields();
        setFileList([]);
        onSuccess();
        onCancel();
      } else {
        throw new Error(response.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo lô cá.");
    } finally {
      setSubmitting(false); // Đặt lại trạng thái loading về false
    }
  };

  return (
    <Modal
      title="Thêm mới Lô Cá"
      open={visible}
      footer={null}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên Lô Cá"
              name="name"
              rules={[{required: true, message: "Vui lòng nhập tên lô cá!"}]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="totalPrice"
              rules={[{required: true, message: "Vui lòng nhập giá!"}]}
            >
              <InputNumber
                min={0}
                style={{width: "100%"}}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={(value) => value.replace(/\./g, "")}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
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
              valuePropName="fileList"
              getValueFromEvent={({fileList}) => fileList}
              rules={[{required: true, message: "Vui lòng chọn ảnh!"}]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={beforeUpload}
                maxCount={1}
                onChange={handleFileChange}
                accept="image/*"
              >
                {fileList.length === 0 && (
                  <div className="flex flex-col items-center">
                    <FiUpload style={{color: 'royalblue', fontSize: 20}}/>
                    <div style={{marginTop: 8}}>Tải ảnh lên</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thức ăn/ngày"
              name="dailyFood"
              rules={[{required: true, message: "Vui lòng nhập lượng thức ăn/ngày!"}]}
            >
              <InputNumber
                min={0}
                style={{width: "100%"}}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="numberOfFish"
              rules={[{required: true, message: "Vui lòng nhập số lượng!"}]}
            >
              <InputNumber
                min={0}
                style={{width: "100%"}}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{required: true, message: "Vui lòng nhập mô tả!"}]}
        >
          <Input.TextArea autoSize={{minRows: 3, maxRows: 5}}/>
        </Form.Item>

        <Form.Item style={{textAlign: "right"}}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined/>}
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
