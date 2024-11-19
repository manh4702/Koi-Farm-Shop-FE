// AddFishForm.jsx
import React from 'react';
import { Form, Select, InputNumber, Button, Space, message } from 'antd';
import PropTypes from 'prop-types';

const AddFishForm = ({
                       onAdd,
                       categories,
                       currentFishes,
                       maxQuantity,
                       disabled,
                       fishPackageId
                     }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();

      // Kiểm tra số lượng
      if (values.quantity > maxQuantity) {
        message.error(`Số lượng không được vượt quá ${maxQuantity}`);
        return;
      }

      // Kiểm tra loại cá đã tồn tại
      if (currentFishes.some(fish => fish.categoryId === values.categoryId)) {
        message.error('Loại cá này đã tồn tại trong lô');
        return;
      }

      // Tạo FormData để gửi lên server
      const formData = new FormData();
      formData.append("FishPackageId", fishPackageId);
      formData.append("CategoryId", values.categoryId);
      formData.append("QuantityOfEach", values.quantity);

      // Gọi callback để thêm cá
      await onAdd(formData);

      // Reset form sau khi thêm thành công
      form.resetFields();
    } catch (error) {
      if (error.errorFields) {
        // Validation error
        return;
      }
      message.error('Có lỗi xảy ra khi thêm loại cá mới');
    }
  };

  const styles = {
    formContainer: {
      backgroundColor: '#f8f8f8',
      padding: '16px',
      borderRadius: '8px',
    },
    selectField: {
      width: '200px',
    },
    numberField: {
      width: '150px',
    },
    addButton: {
      marginLeft: '8px',
    },
    warningText: {
      color: '#ff4d4f',
      fontSize: '12px',
      marginTop: '4px',
    },
  };

  return (
    <div style={styles.formContainer}>
      <Form
        form={form}
        layout="inline"
        onSubmit={handleSubmit}
      >
        <Space align="baseline">
          <Form.Item
            name="categoryId"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn loại cá'
              }
            ]}
          >
            <Select
              style={styles.selectField}
              placeholder="Chọn loại cá"
              showSearch
              optionFilterProp="children"
            >
              {categories
              .filter(cat => !currentFishes.some(f => f.categoryId === cat.categoryId))
              .map(cat => (
                <Select.Option
                  key={cat.categoryId}
                  value={cat.categoryId}
                >
                  {cat.name}
                </Select.Option>
              ))
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số lượng'
              },
              {
                type: 'number',
                min: 1,
                max: maxQuantity,
                message: `Số lượng phải từ 1 đến ${maxQuantity}`
              }
            ]}
          >
            <InputNumber
              style={styles.numberField}
              min={1}
              max={maxQuantity}
              placeholder={`Tối đa ${maxQuantity} con`}
            />
          </Form.Item>

          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={disabled}
            style={styles.addButton}
          >
            Thêm
          </Button>
        </Space>
      </Form>

      {maxQuantity > 0 && (
        <div style={styles.warningText}>
          * Còn cần thêm {maxQuantity} con để đạt đủ capacity
        </div>
      )}
    </div>
  );
};

AddFishForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentFishes: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  maxQuantity: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  fishPackageId: PropTypes.number.isRequired,
};

AddFishForm.defaultProps = {
  disabled: false,
  currentFishes: [],
};

export default AddFishForm;