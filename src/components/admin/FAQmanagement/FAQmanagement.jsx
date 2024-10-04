import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Collapse } from "antd";

const { Panel } = Collapse;

const FAQManagement = () => {
    // State to manage FAQ data
    const [faqs, setFaqs] = useState([
        {
            key: "1",
            title: "Tiêu đề 1",
            name: "Họ và Tên 1",
            email: "email1@example.com",
            phone: "0123456789",
        },
        {
            key: "2",
            title: "Tiêu đề 2",
            name: "Họ và Tên 2",
            email: "email2@example.com",
            phone: "0987654321",
        },
        {
            key: "3",
            title: "Tiêu đề 3",
            name: "Họ và Tên 3",
            email: "email3@example.com",
            phone: "0123456789",
        },
        {
            key: "4",
            title: "Tiêu đề 4",
            name: "Họ và Tên 4",
            email: "email4@example.com",
            phone: "0987654321",
        },
        {
            key: "5",
            title: "Tiêu đề 5",
            name: "Họ và Tên 5",
            email: "email5@example.com",
            phone: "0123456789",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFAQs, setFilteredFAQs] = useState(faqs);

    useEffect(() => {
        const filtered = faqs.filter(
            (faq) =>
                faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faq.phone.includes(searchTerm)
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
            title: "Tiêu đề",
            dataIndex: "title",
        },
        {
            title: "Họ và Tên",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Điện thoại",
            dataIndex: "phone",
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

            <h2 style={{ marginTop: "40px" }}>Xem trước FAQ</h2>
            <Collapse>
                {filteredFAQs.map((faq) => (
                    <Panel header={faq.title} key={faq.key}>
                        <p>{faq.name}</p>
                        <p>{faq.email}</p>
                        <p>{faq.phone}</p>
                    </Panel>
                ))}
            </Collapse>

            <Modal
                title={selectedFAQ ? "Cập nhật câu hỏi" : "Thêm câu hỏi mới"}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        title: selectedFAQ ? selectedFAQ.title : "",
                        name: selectedFAQ ? selectedFAQ.name : "",
                        email: selectedFAQ ? selectedFAQ.email : "",
                        phone: selectedFAQ ? selectedFAQ.phone : "",
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Họ và Tên"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="phone"
                        rules={[{ required: true, message: "Vui lòng nhập điện thoại" }]}
                    >
                        <Input />
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
