import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Collapse, Select, Tag, message } from "antd";

const { Panel } = Collapse;

const FAQManagement = () => {
    // State để quản lý dữ liệu FAQ
    const [faqs, setFaqs] = useState([
        {
            key: "1",
            title: "Cách chăm sóc cá koi?",
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "0123456789",
          
            status: "Hoàn thành",
        },
        {
            key: "2",
            title: "Cách chọn cá koi khỏe mạnh?",
            name: "Jane Doe",
            email: "janedoe@example.com",
            phone: "0987654321",
            
            status: "Chưa trả lời",
        },
        {
            key: "3",
            title: "Giá của cá koi là bao nhiêu?",
            name: "James Smith",
            email: "jamessmith@example.com",
            phone: "0123456789",
            
            status: "Hoàn thành",
        },
        {
            key: "4",
            title: "Cách nuôi cá koi trong bể?",
            name: "Emily Johnson",
            email: "emilyjohnson@example.com",
            phone: "0987654321",
            
            status: "Chưa trả lời",
        },
        {
            key: "5",
            title: "Các bệnh thường gặp của cá koi?",
            name: "Michael Williams",
            email: "michaelwilliams@example.com",
            phone: "0123456789",
            
            status: "Hoàn thành",
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
                faq.phone.includes(searchTerm) ||
                faq.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFAQs(filtered);
    }, [searchTerm, faqs]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState(null);

    const handleFAQModal = (faq) => {
        setSelectedFAQ({ ...faq });
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedFAQ(null);
    };

    const onFinish = (values) => {
        if (selectedFAQ) {
            // Cập nhật FAQ hiện có và thay đổi trạng thái thành "Hoàn thành"
            setFaqs((prev) =>
                prev.map((faq) =>
                    faq.key === selectedFAQ.key ? { ...faq, ...values, status: "Hoàn thành" } : faq
                )
            );
            // Hiển thị thông báo đã gửi câu trả lời về email người hỏi
            message.success(`Đã gửi câu trả lời về email ${selectedFAQ.email}.`);
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
            title: "Trạng thái",
            dataIndex: "status",
            render: (status) => (
                <Tag color={status === 'Hoàn thành' ? 'green' : 'volcano'}>{status}</Tag>
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleFAQModal(record)}>Trả lời</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px", background: "#fff" }}>
            <h1>Quản lý Câu hỏi thường gặp về buôn bán cá koi</h1>
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
            </div>
            <Table columns={columns} dataSource={filteredFAQs} />

            <h2 style={{ marginTop: "40px" }}>Xem trước FAQ</h2>
            <Collapse>
                {filteredFAQs.map((faq) => (
                    <Panel header={faq.title} key={faq.key}>
                        <p>{faq.name}</p>
                        <p>{faq.email}</p>
                        <p>{faq.phone}</p>
                        <p>{faq.content}</p>
                        <p>Trạng thái: {faq.status}</p>
                    </Panel>
                ))}
            </Collapse>

            <Modal
                title="Trả lời câu hỏi"
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        email: selectedFAQ ? selectedFAQ.email : "",
                        phone: selectedFAQ ? selectedFAQ.phone : "",
                        // Không tự động fill dữ liệu vào nội dung trả lời  
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email" }]}
                    >
                        <Input disabled={selectedFAQ ? true : false} />
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="phone"
                        rules={[{ required: true, message: "Vui lòng nhập điện thoại" }]}
                    >
                        <Input disabled={selectedFAQ ? true : false} />
                    </Form.Item>
                    <Form.Item
                        label="Nội dung trả lời"
                        name="content"
                        rules={[{ required: true, message: "Vui lòng nhập nội dung trả lời" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FAQManagement;
