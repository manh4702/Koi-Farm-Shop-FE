// src/components/user/pages/FishConsignment.jsx
import React, {useEffect, useState} from "react";
import {Form, Input, Button, DatePicker, Select, Upload, message, InputNumber} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import moment from "moment";
import ZaloIcon from "../Shared/ZaloIcon";
import YTIconts from "../Shared/YoutubeIcon";
import FBIconts from "../Shared/FacebookIcon";
import useCategoryStore from "@/store/categoryStore.js";
import fishConsignmentStore from "@/store/fishConsignmentStore.jsx";

const {RangePicker} = DatePicker;
const {Option} = Select;
const {Dragger} = Upload;

const FishConsignment = () => {
  const [form] = Form.useForm();
  const [purpose, setPurpose] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [price, setPrice] = useState(0);
  const {categories, fetchCategories} = useCategoryStore();
  const {createFishConsignmentSell, createFishConsignmentCare, getOrderHistory} = fishConsignmentStore();

  useEffect(() => {
    fetchCategories();
    // getOrderHistory()
  }, []);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const data = await getOrderHistory();
        setOrderHistory(data);
      } catch (error) {
        message.error(error.message);
      }
    };

    fetchOrderHistory();
  }, [getOrderHistory]);
  
  console.log(orderHistory);
  

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

  const handleFishChange = (value) => {
    setSelectedFish(orderHistory.find(order => order.orderId === value)?.items[0]);

    form.setFieldsValue({
      images: selectedFish ? [{ url: selectedFish.fishImage, uid: selectedFish.fishId }] : [],
    });
  };

  const onFinish = async (values) => {
    const userId = sessionStorage.getItem("userId");
    const formData = new FormData();

    // Common fields for both care and sell consignment
    formData.append("UserId", userId);
    formData.append("FishId", values.fishId);
    formData.append("ConditionDescription", values.conditionDescription);
    formData.append("Phone", values.phone);
    formData.append("Video", values.video);

    // Fields based on purpose
    if (purpose === "care") {
      formData.append("TransferDate", values.transferDate.format()); // Added TransferDate field
      formData.append("ReceiveDate", values.receiveDate.format());
      formData.append("DateRange", values.dateRange);
      formData.append("FishStatus", values.fishStatus);
    } else if (purpose === "sell") {
      formData.append("FishInfo.Name", values.fishName);
      formData.append("FishInfo.CategoryId", values.categoryId);
      formData.append("FishInfo.Age", values.age);
      formData.append("FishInfo.Gender", values.gender);
      formData.append("FishInfo.Status", values.status);
      formData.append("FishInfo.Size", values.size);
      formData.append("Price", values.price);
    }

    // Handle image uploads
    values.images.forEach((file) => {
      formData.append("FishInfo.ImageUrl", file.originFileObj);
    });

    try {
      if (purpose === "care") {
        await createFishConsignmentCare(formData);  // Submit care consignment data
      } else {
        await createFishConsignmentSell(formData);  // Submit sell consignment data
      }
      form.resetFields();
      message.success("Tạo yêu cầu ký gửi thành công!");
    } catch (err) {
      console.error("Error creating consignment:", err);
      message.error("Có lỗi xảy ra khi tạo đơn ký gửi.");
    }
  };


  // const onFinish = async (values) => {
  //   const userId = sessionStorage.getItem("userId");
  //   try {
  //     const formData = new FormData();
  //
  //     // Fish info
  //     formData.append("FishInfo.Name", values.fishName);
  //     formData.append("FishInfo.CategoryId", values.categoryId);
  //     formData.append("FishInfo.Age", values.age);
  //     formData.append("FishInfo.Gender", values.gender);
  //     formData.append("FishInfo.Status", values.status);
  //     formData.append("FishInfo.Size", values.size);
  //
  //     // Image handling
  //     values.images.forEach((file) => {
  //       formData.append("FishInfo.ImageUrl", file.originFileObj);
  //     });
  //
  //     // Additional fields
  //     formData.append("UserId", userId);
  //     formData.append("ConditionDescription", values.conditionDescription);
  //     formData.append("Phone", values.phone);
  //     formData.append("Price", values.price);
  //     formData.append("Video", values.video);
  //
  //     await createFishConsignmentSell(formData); // Call the API
  //     form.resetFields(); // Reset the form on success
  //     message.success("Tạo yêu cầu bán cá thành công!");
  //   } catch (err) {
  //     console.error("Error creating consignment:", err);
  //   }
  // };

  return (
    <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <Header/>
      <main
        style={{
          flexGrow: 1,
          padding: "32px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: "24px"}}>
          Tạo Đơn Ký Gửi Cá Koi
        </h1>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="purpose" label="Mục đích ký gửi">
            <Select
              placeholder="Chọn mục đích ký gửi"
              onChange={handlePurposeChange}
              allowClear
            >
              {/*<Option value="care">Ký gửi chăm sóc</Option>*/}
              <Option value="sell">Ký gửi để bán</Option>
            </Select>
          </Form.Item>
          {purpose && (
            <h2 style={{fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px"}}>
              {purpose === "care" ? "Ký gửi chăm sóc" : "Ký gửi để bán"}
            </h2>
          )}

          {purpose === "care" && (
            <>
              <Form.Item
                name="fishId"
                label="Chọn Cá Của Bạn"
                rules={[{ required: true, message: 'Vui lòng chọn cá' }]}
              >
                <Select placeholder="Chọn cá" onChange={handleFishChange}>
                  {orderHistory?.map((order) => (
                    <Option key={order.orderId} value={order.orderId}>
                      {order.items[0].fishName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
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
                  {required: true, message: "Vui lòng nhập tình trạng cá hiện tại"},
                ]}
              >
                <Input.TextArea placeholder="Mô tả tình trạng cá hiện tại"/>
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
                    <InboxOutlined/>
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
                <Input placeholder="Liên kết video (YouTube, v.v.)"/>
              </Form.Item>

              <Form.Item label="Giá tiền ký gửi cá (VND)">
                <Input value={price} disabled/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo đơn ký gửi
                </Button>
                <p style={{marginTop: "16px", color: "red", fontWeight: "bold"}}>
                  *Bạn cam kết việc ký gửi cá, cửa hàng không chịu trách nhiệm gì thêm.<br/>
                  *Cá sẽ được đảm bảo chăm sóc đúng cách của shop.<br/>
                  *Mọi thắc mắc có thể liên hệ với shop để được giải đáp.<br/>
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
                rules={[{required: true, message: "Vui lòng nhập tên cá"}]}
              >
                <Input placeholder="Nhập tên cá"/>
              </Form.Item>

              <Form.Item
                name="categoryId"
                label="Giống cá"
                rules={[{ required: true, message: "Vui lòng chọn giống cá" }]}
              >
                <Select placeholder="Chọn giống cá">
                  {categories.map((cat) => (
                    <Select.Option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="age"
                label="Tuổi (tháng)"
                rules={[{ required: true, message: "Vui lòng nhập tuổi của cá" }]}
              >
                <Input placeholder="Nhập tuổi của cá (tháng)" type="number" />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="MALE">Đực</Select.Option>
                  <Select.Option value="FEMALE">Cái</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="status"
                label="Tình trạng"
                rules={[{ required: true, message: "Vui lòng chọn tình trạng" }]}
              >
                <Select placeholder="Chọn tình trạng">
                  <Select.Option value="GOOD">Tốt</Select.Option>
                  <Select.Option value="MEDIUM">Trung bình</Select.Option>
                  <Select.Option value="BAD">Xấu</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="size"
                label="Chiều dài (cm)"
                rules={[{required: true, message: "Vui lòng nhập chiều dài của cá"}]}
              >
                <Input placeholder="Nhập chiều dài của cá (cm)" type="number"/>
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
                    <InboxOutlined/>
                  </p>
                  <p className="ant-upload-text">
                    Nhấn hoặc kéo thả để tải lên hình ảnh
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item
                name="conditionDescription"
                label="Mô tả tình trạng"
                rules={[{ required: true, message: "Vui lòng nhập mô tả tình trạng" }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập mô tả tình trạng" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Giá muốn bán (VND)"
                rules={[{required: true, message: "Vui lòng nhập giá muốn bán"}]}
              >
                <Input
                  placeholder="Nhập giá muốn bán (VND)" 
                  // style={{width: "100%"}}
                  type="number"
                  min={1}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  parser={(value) => value.replace(/\./g, '')}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item
                name="video"
                label="Liên kết video về cá"
              >
                <Input placeholder="Liên kết video (YouTube, v.v.)"/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo đơn ký gửi
                </Button>
                <p style={{marginTop: "16px", color: "red", fontWeight: "bold"}}>
                  *Bạn cam kết việc ký gửi cá, cửa hàng không chịu trách nhiệm gì thêm.<br/>
                  *Cá sẽ được đảm bảo chăm sóc đúng cách của shop.<br/>
                  *Mọi thắc mắc có thể liên hệ với shop để được giải đáp.<br/>
                  *Cảm ơn bạn đã sử dụng dịch vụ ký gửi của shop :3.
                </p>
              </Form.Item>
            </>
          )}
        </Form>
      </main>
      <ZaloIcon/>
      <YTIconts/>
      <FBIconts/>
      <Footer/>
    </div>
  )
    ;
};

export default FishConsignment;
