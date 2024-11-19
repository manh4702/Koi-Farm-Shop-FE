// UpdateFishPackageForm.jsx
import React, {useEffect, useState} from "react";
import {Form, Input, InputNumber, Select, Upload, Button, message, Modal, Row, Col} from "antd";
import {PlusOutlined, SaveOutlined} from "@ant-design/icons";
import {useFishPackageStore} from "../../../store/fishPackageStore.js";
import {FiUpload} from "react-icons/fi";

const UpdateFishPackageForm = ({visible, onCancel, fishPackage, onSuccess}) => {
  const [form] = Form.useForm();
  const {updateFishPackage} = useFishPackageStore();
  const [fileList, setFileList] = useState([]);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [remainingCapacity, setRemainingCapacity] = useState(0);
  const {fetchFishPackages} = useFishPackageStore();

  useEffect(() => {
    if (fishPackage) {
      // form.setFieldsValue(fishPackage);
      form.setFieldsValue({
        ...fishPackage,
        fishes: fishPackage.fishes || [],
      })
      setRemainingCapacity(fishPackage.capacity - (fishPackage.fishes?.reduce((sum, fish) => sum + fish.quantity, 0) || 0));

      // Nếu có ảnh cũ, hiển thị nó
      if (fishPackage.imageUrl) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: fishPackage.imageUrl,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [fishPackage, form]);

  const handleFileChange = ({file, fileList}) => {
    setFileList(fileList);
  };

  const onRemove = () => {
    setFileList([]); // Xóa file khỏi fileList
    return true; // Cho phép xóa
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Bạn chỉ có thể tải file ảnh lên!');
    }
    return false;
  };

  const handleFishQuantityChange = (value, field) => {
    const fishes = form.getFieldValue('fishes') || [];
    const totalOtherFish = fishes.reduce((sum, fish, index) => {
      if (index !== field) {
        return sum + (fish?.quantity || 0);
      }
      return sum;
    }, 0);

    const maxAllowed = fishPackage.capacity - totalOtherFish;
    if (value > maxAllowed) {
      const newFishes = [...fishes];
      newFishes[field] = { ...newFishes[field], quantity: maxAllowed };
      form.setFieldsValue({ fishes: newFishes });
      message.warning(`Số lượng đã được điều chỉnh xuống ${maxAllowed} để phù hợp với capacity`);
    }

    setRemainingCapacity(fishPackage.capacity - totalOtherFish - value);
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append("Name", isNameChanged ? values.name : "");
      formData.append("Age", values.age);
      formData.append("Description", values.description);
      formData.append("TotalPrice", values.totalPrice !== undefined ? values.totalPrice : "");
      formData.append("DailyFood", values.dailyFood);
      formData.append("Capacity", values.capacity);
      formData.append("QuantityInStock", values.quantityInStock);

      // Handle image
      if (fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          formData.append("ImageUrl", file.originFileObj);
        } else if (file.url) {
          formData.append("ImageUrl", file.url);
        }
      } else {
        formData.append("ImageUrl", ""); // Gửi chuỗi rỗng khi không có ảnh
      }

      await updateFishPackage(fishPackage.fishPackageId, formData);
      
      
      message.success("Lô cá đã được cập nhật thành công!");
      onSuccess();
      onCancel();
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật lô cá.");
    }
  };

  const handleNameChange = (e) => {
    if (e.target.value !== fishPackage.name) {
      setIsNameChanged(true);
    } else {
      setIsNameChanged(false);
    }
  };

  return (
    <Modal
      title="Sửa Thông tin Lô Cá"
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
            >
              <Input onChange={handleNameChange}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="totalPrice"
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
              name="imageUrl"

            >
              <div
                style={{border: "1px solid #d9d9d9", borderRadius: 4, padding: 8, width: "100%", textAlign: "center"}}>
                <Upload
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={handleFileChange}
                  onRemove={onRemove}
                  accept="image/*"
                  listType="picture"
                  maxCount={1}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  }}
                >
                  {fileList.length < 1 && (
                    <div className="flex flex-col items-center">
                      <FiUpload style={{color: 'royalblue', fontSize: 20}}/>
                      <div style={{marginTop: 8}}>Tải ảnh lên</div>
                    </div>
                  )}
                </Upload>
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thức ăn/ngày"
              name="dailyFood"
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Số lượng"
              name="numberOfFish"
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

          <Col span={12}>
            <Form.Item label="Trạng thái sản phẩm" name="productStatus">
              <Select>
                <Select.Option value="AVAILABLE">Có sẵn</Select.Option>
                <Select.Option value="UNAVAILABLE">Không có sẵn</Select.Option>
                <Select.Option value="SOLDOUT">Đã bán hết</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>


        <Form.Item
          label="Mô tả"
          name="description"
        >
          <Input.TextArea autoSize={{minRows: 3, maxRows: 5}}/>
        </Form.Item>

        <Form.Item style={{textAlign: "right"}}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined/>}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFishPackageForm;