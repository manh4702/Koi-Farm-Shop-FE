// src/components/user/pages/FishConsignment.jsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import moment from "moment";
import ZaloIcon from "../Shared/ZaloIcon";
import YTIconts from "../Shared/YoutubeIcon";
import FBIconts from "../Shared/FacebookIcon";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Dragger } = Upload;

const FishConsignment = () => {
  const [form] = Form.useForm();
  const [purpose, setPurpose] = useState(null);
  const [price, setPrice] = useState(0);

  const handlePurposeChange = (value) => {
    setPurpose(value);
    form.resetFields(); // Reset form fields when a new purpose is selected
  };

  const calculatePrice = (dateRange) => {
    if (dateRange) {
      const days = dateRange[1].diff(dateRange[0], "days");
      const pricePerDay = days > 30 ? 20000 : 30000; // Price per day
      setPrice(days * pricePerDay);
    } else {
      setPrice(0);
    }
  };

   // Hàm để vô hiệu hóa các ngày trước ngày hôm nay
   const disabledDate = (current) => {
    // Không cho phép chọn ngày hôm nay và các ngày trước
    return current && current < moment().startOf('day');
  };

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
    // Add additional logic to send data to admin, e.g., API request, email, DB storage
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main
        style={{
          flexGrow: 1,
          padding: "32px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "24px" }}>
          Tạo Đơn Ký Gửi Cá Koi
        </h1>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="purpose" label="Mục đích ký gửi">
            <Select
              placeholder="Chọn mục đích ký gửi"
              onChange={handlePurposeChange}
              allowClear
            >
              <Option value="care">Ký gửi chăm sóc</Option>
              <Option value="sell">Ký gửi để bán</Option>
            </Select>
          </Form.Item>

          {purpose && (
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>
              {purpose === "care" ? "Ký gửi chăm sóc" : "Ký gửi để bán"}
            </h2>
          )}

          {purpose === "care" && (
            <>
              <Form.Item
               name="dateRange"
               label="Ngày gửi và ngày nhận lại cá"
               rules={[
             {
               required: true,
               message: "Vui lòng chọn ngày gửi và ngày nhận lại cá",
               },
            ]}
             >
              <RangePicker 
               format="DD/MM/YYYY" 
               onChange={calculatePrice} 
               disabledDate={disabledDate}
             />
              </Form.Item>

              <Form.Item
                name="fishStatus"
                label="Tình trạng cá hiện tại"
                rules={[
                  { required: true, message: "Vui lòng nhập tình trạng cá hiện tại" },
                ]}
              >
                <Input.TextArea placeholder="Mô tả tình trạng cá hiện tại" />
              </Form.Item>

              <Form.Item
                name="images"
                label="Hình ảnh về cá hiện tại"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng tải lên ít nhất một hình ảnh cá của bạn",
                  },
                ]}
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
              >
                <Input placeholder="Liên kết video (YouTube, v.v.)" />
              </Form.Item>

              <Form.Item label="Giá tiền ký gửi cá (VND)">
                <Input value={price} disabled />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo đơn ký gửi
                </Button>
                <p style={{ marginTop: "16px", color: "red", fontWeight: "bold" }}>
                 *Bạn cam kết việc ký gửi cá, cửa hàng không chịu trách nhiệm gì thêm.<br />
                 *Cá sẽ được đảm bảo chăm sóc đúng cách của shop.<br />
                 *Mọi thắc mắc có thể liên hệ với shop để được giải đáp.<br />
                 *Cảm ơn bạn đã sử dụng dịch vụ ký gửi của shop :3.
                </p>

              </Form.Item>
            </>
          )}

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
                rules={[{ required: true, message: "Vui lòng nhập xuất xứ của cá" }]}
              >
                <Input placeholder="Nhập xuất xứ" />
              </Form.Item>

              <Form.Item
                name="length"
                label="Chiều dài (cm)"
                rules={[{ required: true, message: "Vui lòng nhập chiều dài của cá" }]}
              >
                <Input placeholder="Nhập chiều dài của cá (cm)" type="number" />
              </Form.Item>

              <Form.Item
                name="certification"
                label="Giấy chứng nhận (nếu có)"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e.fileList}
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
                getValueFromEvent={(e) => Array.isArray(e) ? e : e.fileList}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng tải lên ít nhất một hình ảnh",
                  },
                ]}
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
              >
                <Input placeholder="Liên kết video (YouTube, v.v.)" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá muốn bán (VND)"
                rules={[{ required: true, message: "Vui lòng nhập giá muốn bán" }]}
              >
                <Input placeholder="Nhập giá muốn bán (VND)" type="number" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo đơn ký gửi
                </Button>
                <p style={{ marginTop: "16px", color: "red", fontWeight: "bold" }}>
                 *Bạn cam kết việc ký gửi cá, cửa hàng không chịu trách nhiệm gì thêm.<br />
                 *Cá sẽ được đảm bảo chăm sóc đúng cách của shop.<br />
                 *Mọi thắc mắc có thể liên hệ với shop để được giải đáp.<br />
                 *Cảm ơn bạn đã sử dụng dịch vụ ký gửi của shop :3.
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
