import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";

const BlogManagement = () => {
    // State to manage blog data
    const [blogs, setBlogs] = useState([
        {
            key: "1",
            title: "First Blog Post",
            author: "Alice Smith",
            date: "2021-09-01",
            content: "This is the content of the first blog post.",
        },
        {
            key: "2",
            title: "Second Blog Post",
            author: "Bob Johnson",
            date: "2021-09-02",
            content: "This is the content of the second blog post.",
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setBlogs(blogs.filter((blog) => blog.key !== key));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedBlog(null);
    };

    const onFinish = (values) => {
        if (selectedBlog) {
            // Update existing blog
            setBlogs((prev) =>
                prev.map((blog) =>
                    blog.key === selectedBlog.key ? { ...blog, ...values } : blog
                )
            );
        } else {
            // Add new blog
            setBlogs((prev) => [
                ...prev,
                { key: (prev.length + 1).toString(), ...values },
            ]);
        }
        handleCancel();
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Author",
            dataIndex: "author",
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Content",
            dataIndex: "content",
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
            <h1>Blog Management</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <div></div> {/* Empty div for alignment */}
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedBlog(null);
                        setIsModalVisible(true);
                    }}
                >
                    Add Blog
                </Button>
            </div>
            <Table columns={columns} dataSource={blogs} />

            <Modal
                title={selectedBlog ? "Edit Blog" : "Add Blog"}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        title: selectedBlog ? selectedBlog.title : "",
                        author: selectedBlog ? selectedBlog.author : "",
                        date: selectedBlog ? selectedBlog.date : "",
                        content: selectedBlog ? selectedBlog.content : "",
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please enter the title" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: "Please enter the author" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: "Please enter the date" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: "Please enter the content" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedBlog ? "Update Blog" : "Add Blog"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BlogManagement;