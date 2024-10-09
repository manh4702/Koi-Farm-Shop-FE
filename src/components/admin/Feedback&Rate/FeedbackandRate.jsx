import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Collapse } from "antd";

const { Panel } = Collapse;

const FeedbackAndRate = () => {
    // State to manage feedback and rating data
    const [feedbacks, setFeedbacks] = useState([
        {
            key: "1",
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "0123456789",
            feedback: "I want to give feedback about the product.",
            rating: 4,
        },
        {
            key: "2",
            name: "Jane Doe",
            email: "janedoe@example.com",
            phone: "0987654321",
            feedback: "I need to rate the service.",
            rating: 5,
        },
        // Add more feedback and rating data here
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

    const handleEdit = (feedback) => {
        setSelectedFeedback(feedback);
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setFeedbacks(feedbacks.filter((feedback) => feedback.key !== key));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedFeedback(null);
    };

    const onFinish = (values) => {
        if (selectedFeedback) {
            // Update existing feedback
            setFeedbacks((prev) =>
                prev.map((feedback) =>
                    feedback.key === selectedFeedback.key ? { ...feedback, ...values } : feedback
                )
            );
        } else {
            // Add new feedback
            setFeedbacks((prev) => [
                ...prev,
                { key: (prev.length + 1).toString(), ...values },
            ]);
        }
        handleCancel();
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Feedback",
            dataIndex: "feedback",
        },
        {
            title: "Rating",
            dataIndex: "rating",
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
            <h1>Feedback and Rating Management</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Input.Search
                    placeholder="Search feedback"
                    enterButton="Search"
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
                    Add feedback
                </Button>
            </div>
            <Table columns={columns} dataSource={filteredFeedbacks} />

            <h2 style={{ marginTop: "40px" }}>Preview Feedback</h2>
            <Collapse>
                {filteredFeedbacks.map((feedback) => (
                    <Panel header={feedback.name} key={feedback.key}>
                        <p>{feedback.email}</p>
                        <p>{feedback.phone}</p>
                        <p>{feedback.feedback}</p>
                        <p>{feedback.rating}</p>
                    </Panel>
                ))}
            </Collapse>

            <Modal
                title={selectedFeedback ? "Update feedback" : "Add new feedback"}
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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter name" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: "Please enter phone" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Feedback"
                        name="feedback"
                        rules={[{ required: true, message: "Please enter feedback" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: "Please enter rating" }]}
                    >
                        <Input type="number" min={0} max={5} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedFeedback ? "Update" : "Add new"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FeedbackAndRate;
