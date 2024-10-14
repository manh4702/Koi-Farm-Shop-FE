// src/components/user/pages/FishConsignment.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import moment from "moment";
import ZaloIcon from "./ZaloIcon";
import YTIconts from "./YoutubeIcon";
import FBIconts from "./FacebookIcon";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Dragger } = Upload;

const FishConsignment = () => {
  const [form] = Form.useForm();
  const [purpose, setPurpose] = useState(null);
  const [price, setPrice] = useState(0);

  // Hàm xử lý khi thay đổi mục đích ký gửi
  const handlePurposeChange = (value) => {
    setPurpose(value);
    form.resetFields(); // Đặt lại các trường của form khi chọn loại ký gửi mới
  };

  // Hàm tính giá tiền ký gửi chăm sóc
  const calculatePrice = (dateRange) => {
    if (dateRange) {
      const days = dateRange[1].diff(dateRange[0], "days");
      const pricePerDay = days > 30 ? 20000 : 30000; // Giá cho 1 ngày ký gửi
      setPrice(days * pricePerDay);
    } else {
      setPrice(0);
    }
  };

  // Hàm xử lý khi nhấn vào nút tạo đơn ký gửi
  const onFinish = (values) => {
    const formPayload = {
      ...values,
      sendDate: values.dateRange
        ? moment(values.dateRange[0]).format("DD/MM/YYYY")
        : undefined,
      receiveDate: values.dateRange
        ? moment(values.dateRange[1]).format("DD/MM/YYYY")
        : undefined,
      price: purpose === "care" ? price : values.price,
    };

    message.success("Đơn ký gửi đã được tạo và gửi tới admin!");
    console.log("Form Data: ", formPayload);
    // Thực hiện thêm logic để gửi tới admin, ví dụ: API request, gửi qua email, lưu trữ DB
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main
        style={{
          flexGrow: 1,
          padding: "32px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "24px" }}
        >
          Tạo Đơn Ký Gửi Cá Koi
        </h1>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="purpose"
            label="Mục đích ký gửi"
            rules={[
              { required: true, message: "Vui lòng chọn mục đích ký gửi" },
            ]}
          >
            <Select
              placeholder="Chọn mục đích ký gửi"
              onChange={handlePurposeChange}
            >
              <Option value="care">Ký gửi chăm sóc</Option>
              <Option value="sell">Ký gửi để bán</Option>
            </Select>
          </Form.Item>

          {/* Hiển thị tiêu đề xác nhận loại ký gửi */}
          {purpose && (
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              {purpose === "care" ? "Ký gửi chăm sóc" : "Ký gửi để bán"}
            </h2>
          )}

          {/* Form ký gửi chăm sóc */}
          {purpose === "care" && (
            <>
              <Form.Item
                name="dateRange"
                label="Ngày gửi và ngày nhận"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày gửi và ngày nhận",
                  },
                ]}
              >
                <RangePicker format="DD/MM/YYYY" onChange={calculatePrice} />
              </Form.Item>

              <Form.Item
                name="fishStatus"
                label="Tình trạng cá"
                rules={[
                  { required: true, message: "Vui lòng nhập tình trạng cá" },
                ]}
              >
                <Input.TextArea placeholder="Mô tả tình trạng cá" />
              </Form.Item>

              <Form.Item
                name="images"
                label="Hình ảnh về cá"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                extra="Tải lên hình ảnh về cá của bạn"
              >
                <Dragger
                  name="images"
                  multiple
                  listType="picture"
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấn hoặc kéo thả để tải lên hình ảnh
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item
                name="videoLink"
                label="Liên kết video về cá"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp liên kết video",
                  },
                ]}
              >
                <Input placeholder="Liên kết video (YouTube, v.v.)" />
              </Form.Item>

              <Form.Item label="Giá tiền ký gửi (VND)">
                <Input value={price} disabled />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo đơn ký gửi
                </Button>
                <p
                  style={{
                    marginTop: "16px",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Bạn cam kết việc ký gửi cá. Cửa hàng không chịu trách nhiệm gì
                  thêm.
                </p>
              </Form.Item>
            </>
          )}

          {/* Form ký gửi để bán */}
          {purpose === "sell" && (
            <>
              <Form.Item
                name="fishName"
                label="Tên cá"
                rules={[{ required: true, message: "Vui lòng nhập tên cá" }]}
              >
                <Input placeholder="Nhập tên cá" />
              </Form.Item>

              <Form.Item
                name="breed"
                label="Giống cá"
                rules={[{ required: true, message: "Vui lòng nhập giống cá" }]}
              >
                <Input placeholder="Nhập giống cá" />
              </Form.Item>

              <Form.Item
                name="origin"
                label="Xuất xứ"
                rules={[
                  { required: true, message: "Vui lòng nhập xuất xứ của cá" },
                ]}
              >
                <Input placeholder="Nhập xuất xứ" />
              </Form.Item>

              <Form.Item
                name="length"
                label="Chiều dài (cm)"
                rules={[
                  { required: true, message: "Vui lòng nhập chiều dài của cá" },
                ]}
              >
                <Input placeholder="Nhập chiều dài của cá (cm)" type="number" />
              </Form.Item>

              <Form.Item
                name="certification"
                label="Giấy chứng nhận (nếu có)"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Dragger
                  name="certification"
                  listType="picture"
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấn hoặc kéo thả để tải lên giấy chứng nhận
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item
                name="images"
                label="Hình ảnh về cá"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e.fileList)}
              >
                <Dragger
                  name="images"
                  multiple
                  listType="picture"
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Nhấn hoặc kéo thả để tải lên hình ảnh
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item
                name="videoLink"
                label="Liên kết video về cá"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp liên kết video",
                  },
                ]}
              >
                <Input placeholder="Liên kết video (YouTube, v.v.)" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá muốn bán (VND)"
                rules={[
                  { required: true, message: "Vui lòng nhập giá muốn bán" },
                ]}
              >
                <Input placeholder="Nhập giá muốn bán (VND)" type="number" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo đơn ký gửi
                </Button>
                <p
                  style={{
                    marginTop: "16px",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Bạn cam kết việc ký gửi cá. Cửa hàng không chịu trách nhiệm gì
                  thêm.
                </p>
              </Form.Item>
            </>
          )}
        </Form>
      </main>
      <ZaloIcon />
      <YTIconts />
      <FBIconts />
      <Footer />
    </div>
  );
};

export default FishConsignment;
