import React, {useEffect, useState} from "react";
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
  Space,
  Divider,
  Alert,
  Card
} from "antd";
import {PlusOutlined, SaveOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {useFishPackageStore} from "../../../store/fishPackageStore";
import {FiUpload} from "react-icons/fi";
import useCategoryStore from "@/store/categoryStore";
import AddFishForm from "@/components/admin/BatchofFish/AddFishForm.jsx";

const UpdateFishPackageForm = ({visible, onCancel, fishPackage, onSuccess}) => {
  const [form] = Form.useForm();
  const {updateFishPackage, updateFishQuantities, deleteFishFromPackage, addFishToPackage} = useFishPackageStore();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const {categories} = useCategoryStore();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [capacity, setCapacity] = useState(0);
  const [remainingCapacity, setRemainingCapacity] = useState(0);
  const [originalFishes, setOriginalFishes] = useState([]);
  const [currentCapacity, setCurrentCapacity] = useState(0);
  const [isAddingNewFish, setIsAddingNewFish] = useState(false);
  const [newFishForm] = Form.useForm();
  const [quantityChanges, setQuantityChanges] = useState({});
  const [currentTotal, setCurrentTotal] = useState(0);

  useEffect(() => {
    if (fishPackage) {
      const initialTotal = fishPackage.categories.reduce(
        (sum, cat) => sum + cat.quantityOfEach,
        0
      );
      setCurrentTotal(initialTotal);
      setCurrentCapacity(fishPackage.capacity);
      setOriginalFishes(fishPackage.categories.map(cat => ({
        categoryId: cat.categoryId,
        quantity: cat.quantityOfEach
      })));

      form.setFieldsValue({
        name: fishPackage.name,
        age: fishPackage.age,
        minSize: fishPackage.minSize,
        maxSize: fishPackage.maxSize,
        description: fishPackage.description,
        totalPrice: fishPackage.totalPrice,
        dailyFood: fishPackage.dailyFood,
        capacity: fishPackage.capacity,
        quantityInStock: fishPackage.quantityInStock,
        productStatus: fishPackage.productStatus,
        fishes: fishPackage.categories.map(cat => ({
          categoryId: cat.categoryId,
          quantity: cat.quantityOfEach,
          originalQuantity: cat.quantityOfEach
        }))
      });

      setCapacity(fishPackage.capacity);
      updateRemainingCapacity(fishPackage.categories);

      if (fishPackage.imageUrl) {
        setFileList([{
          uid: '-1',
          name: 'current-image.png',
          status: 'done',
          url: fishPackage.imageUrl,
        }]);
      }
    }
  }, [fishPackage, form]);

  const updateRemainingCapacity = (fishes) => {
    const totalFish = fishes.reduce((sum, fish) => sum + (fish.quantityOfEach || fish.quantity || 0), 0);
    setRemainingCapacity(currentCapacity - totalFish);
  };

  const handleFileChange = ({fileList}) => setFileList(fileList);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ cho phép tải lên file ảnh!');
    }
    return false;
  };

  const handleFishQuantityChange = (value, field) => {
    const currentFishes = form.getFieldValue('fishes');
    const fishToUpdate = currentFishes[field];
    const originalQuantity = fishToUpdate.originalQuantity;

    // Tính tổng số lượng mới
    const newTotal = currentFishes.reduce(
      (sum, fish, idx) => sum + (idx === field ? value : fish.quantity),
      0
    );

    if (newTotal > currentCapacity) {
      message.error('Tổng số lượng không được vượt quá capacity');
      return;
    }

    // Cập nhật form và state
    const newFishes = [...currentFishes];
    newFishes[field] = {
      ...newFishes[field],
      quantity: value
    };
    form.setFieldsValue({fishes: newFishes});

    // Cập nhật tổng số lượng hiện tại
    setCurrentTotal(newTotal);

    if (value !== originalQuantity) {
      setQuantityChanges(prev => ({
        ...prev,
        [fishToUpdate.categoryId]: value
      }));
    } else {
      const newChanges = {...quantityChanges};
      delete newChanges[fishToUpdate.categoryId];
      setQuantityChanges(newChanges);
    }
  };

  const handleDeleteFish = async (field) => {
    const currentFishes = form.getFieldValue('fishes');
    const fishToDelete = currentFishes[field];

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa loại cá này? Bạn sẽ cần thêm loại cá khác để đảm bảo đủ capacity.',
      onOk: async () => {
        try {
          await deleteFishFromPackage(fishPackage.fishPackageId, fishToDelete.categoryId);

          const newFishes = currentFishes.filter((_, index) => index !== field);
          form.setFieldsValue({fishes: newFishes});

          const newTotal = newFishes.reduce((sum, fish) => sum + fish.quantity, 0);
          setCurrentTotal(newTotal);

          if (newTotal < currentCapacity) {
            setIsAddingNewFish(true);
            message.warning(
              `Cần thêm ${currentCapacity - newTotal} cá để đạt đủ capacity`,
              3
            );
          }

          message.success('Xóa loại cá thành công');
        } catch (error) {
          message.error('Lỗi khi xóa loại cá');
        }
      }
    });
  };

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      let hasUpdates = false;

      // Cập nhật thông tin cơ bản (trừ productStatus)
      const basicInfoChanged = checkBasicInfoChanges(values, fishPackage);
      if (basicInfoChanged || fileList[0]?.originFileObj) {
        const formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Age", values.age);
        formData.append("MinSize", values.minSize);
        formData.append("MaxSize", values.maxSize);
        formData.append("Description", values.description);
        formData.append("TotalPrice", values.totalPrice);
        formData.append("DailyFood", values.dailyFood);
        formData.append("Capacity", values.capacity);
        formData.append("QuantityInStock", values.quantityInStock);

        if (fileList[0]?.originFileObj) {
          formData.append("ImageUrl", fileList[0].originFileObj);
        }

        await updateFishPackage(fishPackage.fishPackageId, formData);
        hasUpdates = true;
      }

      // Cập nhật số lượng cá tuần tự
      const quantityChangeEntries = Object.entries(quantityChanges);
      if (quantityChangeEntries.length > 0) {
        for (const [categoryId, newQuantity] of quantityChangeEntries) {
          const updateData = new FormData();
          updateData.append("FishPackageId", fishPackage.fishPackageId);
          updateData.append("CategoryId", categoryId);
          updateData.append("QuantityOfEach", newQuantity);

          try {
            await updateFishQuantities(updateData);
            hasUpdates = true;
          } catch (error) {
            message.error(`Lỗi khi cập nhật số lượng cho loại cá ${categoryId}`);
            // Có thể thêm logic xử lý lỗi cụ thể ở đây
          }
        }
      }

      if (hasUpdates) {
        message.success("Cập nhật thành công!");
        setQuantityChanges({}); // Reset các thay đổi
        onSuccess();
        onCancel();
      } else {
        onSuccess();
        onCancel();
      }
    } catch (error) {
      message.error("Có lỗi xảy ra: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const checkBasicInfoChanges = (newValues, originalValues) => {
    const fieldsToCheck = [
      'name',
      'age',
      'minSize',
      'maxSize',
      'description',
      'totalPrice',
      'dailyFood',
      'capacity',
      'quantityInStock',
      'productStatus'
    ];

    return fieldsToCheck.some(field => {
      if (typeof newValues[field] === 'number') {
        return newValues[field] !== Number(originalValues[field]);
      }
      return newValues[field] !== originalValues[field];
    });
  };

  return (
    <Modal
      title="Cập nhật thông tin lô cá"
      open={visible}
      onCancel={onCancel}
      width={1000}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Thông tin cơ bản" bordered={false}>
              <Form.Item
                label="Tên lô cá"
                name="name"
                rules={[{required: true, message: 'Vui lòng nhập tên lô cá'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="Giá"
                name="totalPrice"
                rules={[{required: true, message: 'Vui lòng nhập giá'}]}
              >
                <InputNumber
                  style={{width: '100%'}}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Kích thước tối thiểu (cm)"
                    name="minSize"
                    rules={[{required: true}]}
                  >
                    <InputNumber style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Kích thước tối đa (cm)"
                    name="maxSize"
                    rules={[{required: true}]}
                  >
                    <InputNumber style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Tuổi (tháng)"
                name="age"
                rules={[{required: true}]}
              >
                <InputNumber style={{width: '100%'}}/>
              </Form.Item>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Thông tin bổ sung" bordered={false}>
              <Form.Item
                label="Thức ăn/ngày (gram)"
                name="dailyFood"
                rules={[{required: true}]}
              >
                <InputNumber style={{width: '100%'}}/>
              </Form.Item>

              <Form.Item
                label="Sức chứa"
                name="capacity"
                rules={[{required: true}]}
              >
                <InputNumber style={{width: '100%'}}/>
              </Form.Item>

              <Form.Item
                label="Số lượng trong kho"
                name="quantityInStock"
                rules={[{required: true}]}
              >
                <InputNumber style={{width: '100%'}}/>
              </Form.Item>

              <Form.Item
                label="Trạng thái"
                name="productStatus"
              >
                <Select disabled>
                  <Select.Option value="AVAILABLE">Có sẵn</Select.Option>
                  <Select.Option value="UNAVAILABLE">Không có sẵn</Select.Option>
                  <Select.Option value="SOLDOUT">Đã bán hết</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Card title="Hình ảnh" style={{marginTop: 16}}>
          <Form.Item name="imageUrl">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={beforeUpload}
              maxCount={1}
            >
              {fileList.length === 0 && (
                <div>
                  <PlusOutlined/>
                  <div style={{marginTop: 8}}>Tải ảnh lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Card>

        <Card title="Thông tin các loại cá" style={{marginTop: 16}}>
          <Alert
            message={
              <Space direction="vertical">
                <div>{`Capacity: ${currentCapacity} | Đã sử dụng: ${currentTotal} | Còn lại: ${currentCapacity - currentTotal}`}</div>
                {currentTotal < currentCapacity && (
                  <div style={{color: '#ff4d4f'}}>
                    Cần thêm {currentCapacity - currentTotal} con để đạt đủ capacity
                  </div>
                )}
              </Space>
            }
            type={currentTotal === currentCapacity ? "success" : "warning"}
            style={{marginBottom: 16}}
          />

          <Form.List name="fishes">
            {(fields, {remove}) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      label="Loại cá"
                      name={[field.name, 'categoryId']}
                    >
                      <Select
                        style={{width: 200}}
                        disabled={true}
                      >
                        {categories.map(cat => (
                          <Select.Option key={cat.categoryId} value={cat.categoryId}>
                            {cat.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Số lượng"
                      name={[field.name, 'quantity']}
                    >
                      <InputNumber
                        min={1}
                        max={currentCapacity}
                        onChange={(value) => handleFishQuantityChange(value, index)}
                      />
                    </Form.Item>

                    <Button
                      type="link"
                      danger
                      onClick={() => handleDeleteFish(index)}
                    >
                      Xóa
                    </Button>
                  </Space>
                ))}
              </>
            )}
          </Form.List>
          {currentTotal < currentCapacity && (
            <Alert
              message="Cảnh báo"
              description={`Lô cá chưa đủ số lượng. Vui lòng thêm ${currentCapacity - currentTotal} con nữa để đạt đủ capacity.`}
              type="warning"
              showIcon
              style={{marginTop: 16, marginBottom: 16}}
            />
          )}
          {currentTotal < currentCapacity && (
            <Card
              title={
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span>Thêm loại cá mới</span>
                  <span style={{color: '#ff4d4f'}}>
                        (Cần thêm: {currentCapacity - currentTotal} con)
                  </span>
                </div>
              }
              size="small"
              style={{marginTop: 16}}
            >
              <AddFishForm
                onAdd={async (formData) => {
                  try {
                    const response = await addFishToPackage(formData);
                    if (response.success) {
                      const newFish = {
                        categoryId: Number(formData.get('CategoryId')),
                        quantity: Number(formData.get('QuantityOfEach')),
                        originalQuantity: Number(formData.get('QuantityOfEach'))
                      };

                      const currentFishes = form.getFieldValue('fishes') || [];
                      const newFishes = [...currentFishes, newFish];

                      form.setFieldsValue({ fishes: newFishes });
                      setCurrentTotal(currentTotal + newFish.quantity);
                      setOriginalFishes([...originalFishes, newFish]);
                      updateRemainingCapacity(newFishes);

                      message.success('Thêm loại cá mới thành công');
                    }
                  } catch (error) {
                    message.error('Lỗi khi thêm loại cá mới: ' + error.message);
                  }
                }}
                categories={categories}
                currentFishes={form.getFieldValue('fishes') || []}
                maxQuantity={currentCapacity - currentTotal}
                disabled={currentTotal >= currentCapacity}
                fishPackageId={fishPackage.fishPackageId}
              />
            </Card>
          )}
        </Card>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{required: true}]}
        >
          <Input.TextArea rows={4}/>
        </Form.Item>

        <Form.Item style={{textAlign: 'right', marginTop: 16}}>
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Cập nhật
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFishPackageForm;