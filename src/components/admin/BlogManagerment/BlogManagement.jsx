import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Collapse } from "antd";

const { Panel } = Collapse;

const FishSellingFAQManagement = () => {
    // State to manage FAQ data
    const [faqs, setFaqs] = useState([
        {
            key: "1",
            question: "What types of fish do you sell?",
            answer: "We sell a variety of fresh and saltwater fish, including salmon, tuna, cod, trout, and many more.",
        },
        {
            key: "2",
            question: "How do you ensure the freshness of your fish?",
            answer: "We source our fish daily from local fishermen and use advanced refrigeration techniques to maintain freshness.",
        },
        {
            key: "3",
            question: "Do you offer delivery services?",
            answer: "Yes, we offer local delivery within a 20-mile radius. For larger orders, we can arrange shipping.",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFaqs, setFilteredFaqs] = useState(faqs);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);

    useEffect(() => {
        const results = faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFaqs(results);
    }, [searchTerm, faqs]);

    const handleEdit = (faq) => {
        setSelectedFaq(faq);
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setFaqs(faqs.filter((faq) => faq.key !== key));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedFaq(null);
    };

    const onFinish = (values) => {
        if (selectedFaq) {
            // Update existing FAQ
            setFaqs((prev) =>
                prev.map((faq) =>
                    faq.key === selectedFaq.key ? { ...faq, ...values } : faq
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
            title: "Question",
            dataIndex: "question",
        },
        {
            title: "Answer",
            dataIndex: "answer",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.key)} danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px", background: "#fff" }}>
            <h1>Fish Selling FAQ Management</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Input.Search
                    placeholder="Search Fish Selling FAQs"
                    enterButton="Search"
                    size="large"
                    style={{ width: "300px" }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedFaq(null);
                        setIsModalVisible(true);
                    }}
                >
                    Add Fish Selling FAQ
                </Button>
            </div>
            <Table columns={columns} dataSource={filteredFaqs} />

            <h2 style={{ marginTop: "40px" }}>Fish Selling FAQ Preview</h2>
            <Collapse>
                {filteredFaqs.map((faq) => (
                    <Panel header={faq.question} key={faq.key}>
                        <p>{faq.answer}</p>
                    </Panel>
                ))}
            </Collapse>

            <Modal
                title={selectedFaq ? "Edit Fish Selling FAQ" : "Add Fish Selling FAQ"}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        question: selectedFaq ? selectedFaq.question : "",
                        answer: selectedFaq ? selectedFaq.answer : "",
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Question"
                        name="question"
                        rules={[{ required: true, message: "Please enter the question about fish selling" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Answer"
                        name="answer"
                        rules={[{ required: true, message: "Please enter the answer about fish selling" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedFaq ? "Update Fish Selling FAQ" : "Add Fish Selling FAQ"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FishSellingFAQManagement;
