// // CreateFishPackageForm.jsx
import React, {useEffect, useState} from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Modal,
  Row,
  Col,
  Upload,
  Select,
  Space, Divider, Alert,
} from "antd";
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {addFishToPackage, createFishPackage} from "../../../services/fishPackageService.js";
import {FiUpload} from "react-icons/fi";
import useCategoryStore from "@/store/categoryStore.js";

const CreateFishPackageForm = ({visible, onCancel, onSuccess}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const {categories} = useCategoryStore();
  const [capacity, setCapacity] = useState(0);
  const [remainingCapacity, setRemainingCapacity] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    return false;
  };

  // Cập nhật danh sách category đã chọn khi form thay đổi
  useEffect(() => {
    const fishes = form.getFieldValue('fishes') || [];
    const selectedCats = fishes.map(fish => fish?.categoryId).filter(Boolean);
    setSelectedCategories(selectedCats);
  }, [form.getFieldValue('fishes')]);

// Thêm hàm xử lý khi category được chọn
  const handleCategoryChange = (value, field) => {
    const fishes = form.getFieldValue('fishes') || [];
    setSelectedCategories(fishes.map(fish => fish?.categoryId).filter(Boolean));
  };


  // Theo dõi thay đổi của capacity
  useEffect(() => {
    const currentCapacity = form.getFieldValue('capacity') || 0;
    setCapacity(currentCapacity);
    updateRemainingCapacity();
  }, [form.getFieldValue('capacity')]);

  // Cập nhật remaining capacity khi có thay đổi trong danh sách cá
  const updateRemainingCapacity = () => {
    const fishes = form.getFieldValue('fishes') || [];
    const totalFish = fishes.reduce((sum, fish) => sum + (fish?.quantity || 0), 0);
    const remaining = capacity - totalFish;
    setRemainingCapacity(remaining);
    return remaining;
  };

  // Xử lý khi capacity thay đổi
  const handleCapacityChange = (value) => {
    setCapacity(value || 0);
    const fishes = form.getFieldValue('fishes') || [];
    const totalFish = fishes.reduce((sum, fish) => sum + (fish?.quantity || 0), 0);

    if (totalFish > value) {
      // Nếu tổng số cá vượt quá capacity mới, reset danh sách cá
      form.setFieldsValue({fishes: []});
      message.warning('Danh sách cá đã được làm mới do capacity thay đổi');
    }

    updateRemainingCapacity();
  };

  // Xử lý khi số lượng cá thay đổi
  const handleFishQuantityChange = (value, field) => {
    const fishes = form.getFieldValue('fishes') || [];
    const totalOtherFish = fishes.reduce((sum, fish, index) => {
      if (index !== field) {
        return sum + (fish?.quantity || 0);
      }
      return sum;
    }, 0);

    const maxAllowed = capacity - totalOtherFish;
    if (value > maxAllowed) {
      // Nếu số lượng vượt quá capacity còn lại, set lại giá trị tối đa cho phép
      const newFishes = [...fishes];
      newFishes[field] = {...newFishes[field], quantity: maxAllowed};
      form.setFieldsValue({fishes: newFishes});
      message.warning(`Số lượng đã được điều chỉnh xuống ${maxAllowed} để phù hợp với capacity`);
    }

    updateRemainingCapacity();
  };

  const onFinish = async (values) => {
    if (submitting) return;

    const totalFish = values.fishes.reduce((sum, fish) => sum + (fish.quantity || 0), 0);
    if (totalFish !== capacity) {
      message.error(`Tổng số cá (${totalFish}) phải bằng với capacity (${capacity})`);
      return;
    }

    setSubmitting(true);

    try {
      // Tạo FormData cho FishPackage
      const formData = new FormData();
      formData.append("Name", values.name);
      formData.append("Age", values.age?.toString());
      formData.append("MinSize", values.minSize?.toString());
      formData.append("MaxSize", values.maxSize?.toString());
      formData.append("Description", values.description);
      formData.append("TotalPrice", values.totalPrice?.toString());
      formData.append("DailyFood", values.dailyFood?.toString());
      formData.append("Capacity", values.capacity?.toString());
      formData.append("QuantityInStock", values.quantityInStock?.toString());

      if (fileList[0]?.originFileObj) {
        formData.append("ImageUrl", fileList[0].originFileObj);
      }

      // Tạo FishPackage
      const response = await createFishPackage(formData);

      if (response.success) {
        // Nếu tạo FishPackage thành công, thêm các loại cá
        const fishPackageId = response.data.fishPackageId;
        for (const fish of values.fishes) {
          try {
            const addFishData = new FormData();
            addFishData.append("FishPackageId", fishPackageId);  // Appending fish package ID
            addFishData.append("CategoryId", fish.categoryId);  // Appending category ID
            addFishData.append("QuantityOfEach", fish.quantity);  // Appending quantity of each fish

            const addFishResponse = await addFishToPackage(addFishData); // Make sure to send FormData here

            if (!addFishResponse.success) {
              throw new Error(addFishResponse.message || 'Thêm loại cá thất bại');
            }
          } catch (error) {
            // Nếu có lỗi khi thêm một loại cá, hiển thị cảnh báo nhưng vẫn tiếp tục với các loại còn lại
            message.warning(`Có lỗi khi thêm loại cá ${fish.categoryId}: ${error.message}`);
          }
        }

        message.success("Tạo lô cá thành công!");
        form.resetFields();
        setFileList([]);
        onSuccess();
        onCancel();
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo lô cá: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const totalFish = values.fishes.reduce((sum, fish) => sum + (fish.quantity || 0), 0);

      Modal.confirm({
        title: 'Xác nhận tạo lô cá',
        content: (
          <div>
            <p>Tổng số cá: {totalFish}</p>
            <p>Capacity: {capacity}</p>
            <p>Chi tiết các loại cá:</p>
            {values.fishes.map((fish, index) => (
              <p key={index}>
                - {categories.find(c => c.categoryId === fish.categoryId)?.name}: {fish.quantity} con
              </p>
            ))}
          </div>
        ),
        onOk: () => onFinish(values),
      });
    });
  };

  return (
    <Modal
      title="Thêm mới Lô Cá"
      open={visible}
      footer={null}
      onCancel={onCancel}
      width={800}
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
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value) => value.replace(/\./g, '')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Tuổi (tháng)"
              name="age"
              rules={[{required: true, message: "Vui lòng nhập tuổi!"}]}
            >
              <InputNumber min={0} style={{width: "100%"}}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Kích thước tối thiểu (cm)"
              name="minSize"
              rules={[
                {required: true, message: "Vui lòng nhập kích thước tối thiểu!"},
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if (value === undefined || value < getFieldValue('maxSize')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Kích thước tối thiểu phải nhỏ hơn kích thước tối đa!')
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                min={0}
                style={{width: "100%"}}
                onChange={() => {
                  form.validateFields(['maxSize']);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Kích thước tối đa (cm)"
              name="maxSize"
              rules={[
                {required: true, message: "Vui lòng nhập kích thước tối đa!"},
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if (value === undefined || value > getFieldValue('minSize')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Kích thước tối đa phải lớn hơn kích thước tối thiểu!')
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                min={0}
                style={{width: "100%"}}
                onChange={() => {
                  form.validateFields(['minSize']);
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Thức ăn/ngày (gram)"
              name="dailyFood"
              rules={[{required: true, message: "Vui lòng nhập lượng thức ăn!"}]}
            >
              <InputNumber min={0} style={{width: "100%"}}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Số lượng cá trong lô"
              name="capacity"
              rules={[{required: true, message: "Vui lòng nhập sức chứa!"}]}
            >
              <InputNumber
                min={1}
                style={{width: "100%"}}
                onChange={handleCapacityChange}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Số lượng lô trong kho"
              name="quantityInStock"
              rules={[{required: true, message: "Vui lòng nhập số lượng trong kho!"}]}
            >
              <InputNumber min={0} style={{width: "100%"}}/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Ảnh" required>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={beforeUpload}
            maxCount={1}
          >
            {fileList.length === 0 && (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FiUpload style={{fontSize: "22", fontWeight: "bold", color: "#43aeff"}}/>
                <div style={{marginTop: 8}}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Divider>Thông tin loại cá</Divider>

        {capacity > 0 && (
          <Alert
            message={`Số lượng cá còn lại có thể thêm: ${remainingCapacity}`}
            type={remainingCapacity === 0 ? "success" : "info"}
            style={{marginBottom: 16}}
          />
        )}

        <Form.List name="fishes">
          {(fields, {add, remove}) => (
            <>
              {fields.map(({key, name, ...restField}) => (
                <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'categoryId']}
                    rules={[{required: true, message: 'Chọn loại cá'}]}
                  >
                    <Select
                      style={{width: 200}}
                      placeholder="Chọn loại cá"
                      onChange={(value) => handleCategoryChange(value, name)}
                    >
                      {categories.map(cat => {
                        const isSelected = selectedCategories.includes(cat.categoryId);
                        const currentValue = form.getFieldValue(['fishes', name, 'categoryId']);
                        // Hiển thị option nếu chưa được chọn hoặc là giá trị hiện tại của field này
                        if (!isSelected || currentValue === cat.categoryId) {
                          return (
                            <Select.Option key={cat.categoryId} value={cat.categoryId}>
                              {cat.name}
                            </Select.Option>
                          );
                        }
                        return null;
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    rules={[{required: true, message: 'Nhập số lượng'}]}
                  >
                    <InputNumber
                      placeholder="Số lượng"
                      min={1}
                      max={remainingCapacity + (form.getFieldValue(['fishes', name, 'quantity']) || 0)}
                      onChange={(value) => handleFishQuantityChange(value, name)}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => {
                    remove(name);
                    // Cập nhật lại danh sách category đã chọn sau khi xóa
                    const updatedFishes = form.getFieldValue('fishes')?.filter((_, index) => index !== name) || [];
                    setSelectedCategories(updatedFishes.map(fish => fish?.categoryId).filter(Boolean));
                    updateRemainingCapacity();
                  }}/>
                </Space>
              ))}
              {remainingCapacity > 0 && categories.length > selectedCategories.length && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined/>}
                  >
                    Thêm loại cá
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>


        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{required: true, message: "Vui lòng nhập mô tả!"}]}
        >
          <Input.TextArea rows={4}/>
        </Form.Item>

        <Form.Item style={{textAlign: "right"}}>
          <Button type="default" onClick={onCancel} style={{marginRight: 8}}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFishPackageForm;