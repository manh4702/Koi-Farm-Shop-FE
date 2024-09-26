import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Collapse } from "antd";

const { Panel } = Collapse;

const BlogManagement = () => {
    // State để quản lý dữ liệu bài viết blog
    const [blogPosts, setBlogPosts] = useState([
        {
            key: "1",
            title: "Giới thiệu về việc nuôi cá Koi",
            content: "Nuôi cá Koi là một sở thích thú vị kết hợp giữa vẻ đẹp của thiên nhiên và nghệ thuật nuôi trồng thủy sản. Bài viết này sẽ đề cập đến những kiến thức cơ bản về việc thiết lập hồ cá Koi, chọn cá Koi khỏe mạnh và duy trì điều kiện nước tối ưu.",
            author: "Nguyễn Văn A",
        },
        {
            key: "2",
            title: "Chăm sóc cá Koi theo mùa",
            content: "Khi các mùa thay đổi, nhu cầu của cá Koi cũng thay đổi theo. Tìm hiểu về các yêu cầu chăm sóc cụ thể cho cá Koi trong mùa xuân, hè, thu và đông để đảm bảo cá của bạn luôn khỏe mạnh và tươi sáng quanh năm.",
            author: "Nguyễn Văn B",
        },
        {
            key: "3",
            title: "Các loại cá Koi và đặc điểm của chúng",
            content: "Khám phá thế giới đa dạng của các loại cá Koi. Từ loại Kohaku cổ điển đến loại Showa thanh lịch, bài viết này khám phá các mẫu, màu sắc và đặc điểm riêng biệt của các giống cá Koi phổ biến.",
            author: "Nguyễn Văn C",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBlogPosts, setFilteredBlogPosts] = useState(blogPosts);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBlogPost, setSelectedBlogPost] = useState(null);

    useEffect(() => {
        const results = blogPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogPosts(results);
    }, [searchTerm, blogPosts]);

    const handleEdit = (post) => {
        setSelectedBlogPost(post);
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setBlogPosts(blogPosts.filter((post) => post.key !== key));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedBlogPost(null);
    };

    const onFinish = (values) => {
        if (selectedBlogPost) {
            // Cập nhật bài viết blog hiện có
            setBlogPosts((prev) =>
                prev.map((post) =>
                    post.key === selectedBlogPost.key ? { ...post, ...values } : post
                )
            );
        } else {
            // Thêm bài viết blog mới
            setBlogPosts((prev) => [
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
            title: "Nội dung",
            dataIndex: "content",
            ellipsis: true,
        },
        {
            title: "Tác giả",
            dataIndex: "author",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Sửa</Button>
                    <Button onClick={() => handleDelete(record.key)} danger>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "24px", background: "#fff" }}>
            <h1>Quản lý Blog</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Input.Search
                    placeholder="Tìm kiếm bài viết"
                    enterButton="Tìm kiếm"
                    size="large"
                    style={{ width: "300px" }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedBlogPost(null);
                        setIsModalVisible(true);
                    }}
                >
                    Thêm bài viết
                </Button>
            </div>
            <Table columns={columns} dataSource={filteredBlogPosts} />

            <h2 style={{ marginTop: "40px" }}>Xem trước bài viết</h2>
            <Collapse>
                {filteredBlogPosts.map((post) => (
                    <Panel header={post.title} key={post.key}>
                        <p>{post.content}</p>
                        <p>Tác giả: {post.author}</p>
                    </Panel>
                ))}
            </Collapse>

            <Modal
                title={selectedBlogPost ? "Sửa bài viết" : "Thêm bài viết"}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        title: selectedBlogPost ? selectedBlogPost.title : "",
                        content: selectedBlogPost ? selectedBlogPost.content : "",
                        author: selectedBlogPost ? selectedBlogPost.author : "",
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết" }]}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedBlogPost ? "Cập nhật bài viết" : "Thêm bài viết"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BlogManagement;
