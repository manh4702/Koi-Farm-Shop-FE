import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";

const FAQManagement = () => {
    // State to manage FAQ data
    const [faqs, setFaqs] = useState([
        {
            key: "1",
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items.",
        },
        {
            key: "2",
            question: "How long does shipping take?",
            answer: "Shipping typically takes 3-5 business days within the continental US.",
        },
        {
            key: "3",
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping to select countries. Please check our shipping page for more details.",
        },
        {
            key: "4",
            question: "What payment methods do you accept?",
            answer: "We accept major credit cards, PayPal, and Apple Pay.",
        },
        {
            key: "5",
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking number via email to monitor your package's progress.",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFAQs, setFilteredFAQs] = useState(faqs);

    useEffect(() => {
        const filtered = faqs.filter(
            (faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFAQs(filtered);
    }, [searchTerm, faqs]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState(null);

    const handleEdit = (faq) => {
        setSelectedFAQ(faq);
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setFaqs(faqs.filter((faq) => faq.key !== key));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedFAQ(null);
    };

    const onFinish = (values) => {
        if (selectedFAQ) {
            // Update existing FAQ
            setFaqs((prev) =>
                prev.map((faq) =>
                    faq.key === selectedFAQ.key ? { ...faq, ...values } : faq
                )
            );
        } else {
            // Add new FAQ
            setFaqs((prev) => [
                ...prev,
                { key: (prev.length + 1).toString(), ...values },
            ]);
        }
        handleCancel();
    };

    const columns = [
        {
            title: "Câu hỏi",
            dataIndex: "question",
        },
        {
            title: "Trả lời",
            dataIndex: "answer",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
                    <Button onClick={() => handleDelete(record.key)} danger>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px", background: "#fff" }}>
            <h1>Quản lý Câu hỏi thường gặp</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Input.Search
                    placeholder="Tìm câu hỏi"
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
                        setSelectedFAQ(null);
                        setIsModalVisible(true);
                    }}
                >
                    Thêm câu hỏi
                </Button>
            </div>
            <Table columns={columns} dataSource={filteredFAQs} />

            <Modal
                title={selectedFAQ ? "Cập nhật câu hỏi" : "Thêm câu hỏi mới"}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        question: selectedFAQ ? selectedFAQ.question : "",
                        answer: selectedFAQ ? selectedFAQ.answer : "",
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Câu hỏi"
                        name="question"
                        rules={[{ required: true, message: "Vui lòng nhập câu hỏi" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Trả lời"
                        name="answer"
                        rules={[{ required: true, message: "Vui lòng nhập câu trả lời" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedFAQ ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FAQManagement;
