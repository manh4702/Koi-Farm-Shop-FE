// pages/CategoryInfo.jsx
import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Form, Input, Upload, message, Image, Card} from 'antd';
import {PlusOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import useCategoryStore from '../../../store/categoryStore';
import {FiUpload} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import FishInfo from "./FishInfo.jsx";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [hasImage, setHasImage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {categories = [], fetchCategories, addCategory, updateCategory, removeCategory, loading} = useCategoryStore();

  useEffect(() => {
    fetchCategories(1, 10);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    setIsEdit(false);
  };

  const handleEdit = (record) => {

    form.setFieldsValue({
      id: record.categoryId,
      name: record.name,
      description: record.description,
      originCountry: record.originCountry,
    });
    setIsModalVisible(true);
    setIsEdit(true);
  };

  const handleOk = async () => {
    try {
      // setConfirmLoading(true);
      const values = await form.validateFields();
      const {name, description, originCountry, imageUrl} = values;

      const categoryData = {
        name,
        description,
        originCountry,
      };

      if (isEdit) {
        await updateCategory(form.getFieldValue('id'), categoryData);
        message.success('Cập nhật danh mục thành công');
      } else {
        await addCategory(categoryData);
        message.success('Tạo danh mục thành công');
      }

      await fetchCategories(1, 10);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
      message.error(error.response?.data?.message || 'Đã xảy ra lỗi');
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeCategory(id); 
      message.success('Xóa danh mục thành công');
    } catch (error) {
      message.error('Xóa danh mục thất bại');
    }

    await fetchCategories(1, 10);
  };
  const columns = [
    {title: 'Tên', dataIndex: 'name', key: 'name', width: 150},
    {title: 'Mô tả', dataIndex: 'description', key: 'description', width: 800},
    {title: 'Quốc gia xuất xứ', dataIndex: 'originCountry', key: 'originCountry', width: 150},
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined/>} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined/>} danger onClick={() => handleDelete(record.categoryId)}>
            Xoá
          </Button>
        </div>
      ),
    },
  ];

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: categories.length * pageSize,
    onChange: (page, pageSize) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Loại cá</h1>
        <Button type="primary" icon={<PlusOutlined/>} onClick={showModal}>
          Thêm Danh Mục
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories || []}
        rowKey="categoryId"
        loading={loading}
        pagination={paginationConfig}
      />

      <Modal
        title={isEdit ? 'Chỉnh sửa Danh Mục' : 'Thêm Danh Mục'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={isEdit ? 'Cập nhật' : 'Thêm'}
        cancelText={"Hủy"}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input/>
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{required: true, message: 'Please input the category name!'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{required: true, message: 'Please input the description!'}]}
          >
            <Input.TextArea rows={3}/>
          </Form.Item>
          <Form.Item
            name="originCountry"
            label="Quốc gia xuất xứ"
            rules={[{required: true, message: 'Please input the origin country!'}]}
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
      {selectedCategory && (
        <Card title={`Chi tiết danh mục: ${selectedCategory.name}`} style={{ marginTop: '16px' }}>
          <FishInfo categoryId={selectedCategory.categoryId} />
        </Card>
      )}
    </div>
  );
};

export default CategoryPage;
