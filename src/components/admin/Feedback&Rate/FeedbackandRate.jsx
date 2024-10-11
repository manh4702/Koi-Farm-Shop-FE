import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Collapse } from "antd";
import { CiStar } from "react-icons/ci";
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
            rating: 1,
        },
        {
            key: "2",
            name: "Jane Doe",
            email: "janedoe@example.com",
            phone: "0987654321",
            feedback: "I need to rate the service.",
            rating: 2,
        },
        // Add more feedback and rating data here
        {
            key: "3",
            name: "Alex Smith",
            email: "alexsmith@example.com",
            phone: "5556667777",
            feedback: "The product exceeded my expectations.",
            rating: 3,
        },
        {
            key: "4",
            name: "Emily Johnson",
            email: "emilyjohnson@example.com",
            phone: "3334445555",
            feedback: "The customer service was very helpful.",
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
        render: (text) => `${text} ⭐️`,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
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
