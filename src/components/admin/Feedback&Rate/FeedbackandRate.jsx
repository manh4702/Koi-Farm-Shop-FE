// components/FeedbackAndRate.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";

const FeedbackAndRate = () => {
    const [feedbacks, setFeedbacks] = useState([
        {
            key: "1",
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "0123456789",
            feedback: "Tôi muốn gửi phản hồi về sản phẩm.",
            rating: 1,
        },
        {
            key: "2",
            name: "Jane Doe",
            email: "janedoe@example.com",
            phone: "0987654321",
            feedback: "Tôi cần đánh giá dịch vụ.",
            rating: 2,
        },
        {
            key: "3",
            name: "Alex Smith",
            email: "alexsmith@example.com",
            phone: "5556667777",
            feedback: "Sản phẩm vượt qua mong đợi của tôi.",
            rating: 3,
        },
        {
            key: "4",
            name: "Emily Johnson",
            email: "emilyjohnson@example.com",
            phone: "3334445555",
            feedback: "Dịch vụ chăm sóc khách hàng rất hữu ích.",
            rating: 5,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks);

    useEffect(() => {
        const filtered = feedbacks.filter(
            (feedback) =>
                feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.phone.includes(searchTerm) ||
                feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFeedbacks(filtered);
    }, [searchTerm, feedbacks]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const handleDelete = (key) => {
        setFeedbacks(feedbacks.filter((feedback) => feedback.key !== key));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedFeedback(null);
    };

    const onFinish = (values) => {
        if (selectedFeedback) {
            setFeedbacks((prev) =>
                prev.map((feedback) =>
                    feedback.key === selectedFeedback.key ? { ...feedback, ...values } : feedback
                )
            );
        } else {
            setFeedbacks((prev) => [
                ...prev,
                { key: (prev.length + 1).toString(), ...values },
            ]);
        }
        handleCancel();
    };

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
        },
        {
            title: "Phản hồi",
            dataIndex: "feedback",
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            render: (text) => `${text} ⭐️`,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleDelete(record.key)} danger>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px", background: "#fff" }}>
            <h1>Quản lý phản hồi và đánh giá</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Input.Search
                    placeholder="Tìm kiếm phản hồi"
                    enterButton="Tìm kiếm"
                    size="large"
                    style={{ width: "300px" }}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    allowClear
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedFeedback(null);
                        setIsModalVisible(true);
                    }}
                >
                    Thêm phản hồi
                </Button>
            </div>
            <Table columns={columns} dataSource={filteredFeedbacks} />

            <Modal
                title={selectedFeedback ? "Cập nhật phản hồi" : "Thêm phản hồi mới"}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        name: selectedFeedback ? selectedFeedback.name : "",
                        email: selectedFeedback ? selectedFeedback.email : "",
                        phone: selectedFeedback ? selectedFeedback.phone : "",
                        feedback: selectedFeedback ? selectedFeedback.feedback : "",
                        rating: selectedFeedback ? selectedFeedback.rating : 0,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phản hồi"
                        name="feedback"
                        rules={[{ required: true, message: "Vui lòng nhập phản hồi" }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Đánh giá"
                        name="rating"
                        rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}>
                        <Input type="number" min={0} max={5} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedFeedback ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FeedbackAndRate;
