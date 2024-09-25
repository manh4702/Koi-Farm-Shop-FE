import React, { useState, useEffect } from "react";
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
        {
            key: "3",
            title: "Third Blog Post",
            author: "Charlie Brown",
            date: "2021-09-03",
            content: "This is the content of the third blog post.",
        },
        {
            key: "4",
            title: "Fourth Blog Post",
            author: "Diana Prince",
            date: "2021-09-04",
            content: "This is the content of the fourth blog post.",
        },
        {
            key: "5",
            title: "Fifth Blog Post",
            author: "Ethan Hunt",
            date: "2021-09-05",
            content: "This is the content of the fifth blog post.",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const results = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(results);
    }, [searchTerm, blogs]);

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
            title: "Tiêu đề",
            dataIndex: "title",
        },
        {
            title: "Tác giả",
            dataIndex: "author",
        },
        {
            title: "Thời điểm",
            dataIndex: "date",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
        },
        {
            title: "Action",
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
            <h1>Blog Management</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Input.Search
                    placeholder="Tìm blog theo tên"
                    enterButton="Tìm kiếm"
                    size="large"
                    style={{ width: "300px" }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedBlog(null);
                        setIsModalVisible(true);
                    }}
                >
                    Thêm blog
                </Button>
            </div>
            <Table columns={columns} dataSource={filteredBlogs} />

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
