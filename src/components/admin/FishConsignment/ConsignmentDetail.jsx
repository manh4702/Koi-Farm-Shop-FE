import React, {useEffect, useState} from "react";
import {Modal, Descriptions, Tag, Divider, Button, Spin, InputNumber, Row, Col, Image} from "antd";
import fishConsignmentStore from "@/store/fishConsignmentStore.jsx";

const statusColors = {
  PendingApproval: "blue",
  Approved: "green",
  OnProcessing: "orange",
  Rejected: "red",
  Completed: "purple",
  Cancelled: "gray",
};

const ConsignmentDetail = ({consignment, visible, onClose}) => {
  const {approveFishConsignment, loading, fetchFishConsignments} = fishConsignmentStore();
  const [approving, setApproving] = useState(false);

  const [agreedPrice, setAgreedPrice] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [commissionFee, setCommissionFee] = useState("");
  const [consignmentDurationMonths, setConsignmentDurationMonths] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [commissionFeePercent, setCommissionFeePercent] = useState("");

  useEffect(() => {
    // Khi giá thỏa thuận thay đổi hoặc phí hoa hồng thay đổi, tính toán lại giá cuối cùng
    if (agreedPrice > 0 && commissionFeePercent >= 0) {
      const commissionFee = (agreedPrice * commissionFeePercent) / 100; // Tính phí hoa hồng từ % và giá thỏa thuận
      const totalPrice = agreedPrice + commissionFee;
      setFinalPrice(totalPrice); // Cập nhật giá cuối cùng
    }
  }, [agreedPrice, commissionFeePercent]);

  // useEffect(() => {
  //   if (approving === false) return;
  //
  //   // Sau khi phê duyệt thành công, gọi lại fetchData
  //   const fetchData = async () => {
  //     try {
  //       await fetchFishConsignments();
  //     } catch (err) {
  //       console.error('Có lỗi xảy ra khi tải lại danh sách ký gửi:', err);
  //     }
  //   };
  //
  //   fetchData();
  // }, [approving, fetchFishConsignments]);

  if (!consignment) return null;

  const renderStatusTag = (status) => (
    <Tag color={statusColors[status] || "default"}>
      {status === "PendingApproval"
        ? "Đang chờ duyệt"
        : status === "Approved"
          ? "Đã duyệt"
          : status === "OnProcessing"
            ? "Đang xử lý"
            : status === "Rejected"
              ? "Bị từ chối"
              : status === "Completed"
                ? "Hoàn thành"
                : status === "Cancelled"
                  ? "Đã hủy"
                  : "Không xác định"}
    </Tag>
  );

  const handleApprove = async () => {
    setApproving(true);
    const approvalData = {
      agreedPrice: agreedPrice,
      serviceFee: serviceFee,
      commissionFee: (agreedPrice * commissionFeePercent) / 100,
      consignmentDurationMonths: consignmentDurationMonths,
    };

    try {
      await approveFishConsignment(consignment.fishConsignmentId, approvalData);
      await fetchFishConsignments();
      setApproving(false);
    } catch (error) {
      console.error("Phê duyệt thất bại:", error);
    } finally {
      setApproving(false);
    }
  };

  const formatCurrency = (value) => {
    // Loại bỏ "VND" từ chuỗi nếu có
    const numericValue = typeof value === 'string'
      ? parseInt(value.replace(/[^\d]/g, ''))
      : value;

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numericValue);
  };

  return (
    <Modal
      title={`Chi tiết đơn ký gửi: ${consignment?.fishInfo?.name || "Không rõ"}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Divider orientation="left">Thông tin cơ bản</Divider>
      <Row gutter={16}>
        <Col span={6}>
          <Image
            width="100%"
            src={consignment.fishInfo?.imageUrl || "https://via.placeholder.com/150"}
            alt={consignment.fishInfo?.name || "Hình ảnh không có sẵn"}
            preview={false}
            style={{borderRadius: "8px"}}
          />

        </Col>
        <Col span={18}>
          <Descriptions bordered>
            <Descriptions.Item label="Tên cá Koi" span={3}>
              {consignment.fishInfo?.name || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Chủ sở hữu" span={3}>
              {consignment.owner || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại" span={3}>
              {consignment.phone || "Không rõ"}
            </Descriptions.Item>

          </Descriptions>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Descriptions bordered>
            <Descriptions.Item label="Giá ban đầu" span={3}>
              {`${parseFloat(consignment.initialPrice || 0).toLocaleString()} VND`}
            </Descriptions.Item>
            <Descriptions.Item label="Phí dịch vụ" span={3}>
              {formatCurrency(consignment.serviceFee || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Giá chốt" span={3}>
              {formatCurrency(consignment.finalPrice || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Phí hoa hồng" span={3}>
              {formatCurrency(consignment.commissionFee || 0)}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={8}>
          <Descriptions bordered>
            <Descriptions.Item label="Hình thức ký gửi" span={3}>
              {consignment.type || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo" span={3}>
              {consignment.createDate
                ? new Date(consignment.createDate).toLocaleDateString()
                : "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Danh mục" span={3}>
              {consignment.fishInfo?.categoryName || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính" span={3}>
              {consignment.fishInfo?.gender || "Không rõ"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={8}>
          <Descriptions bordered>
            
            <Descriptions.Item label="Tuổi" span={3}>
              {consignment.fishInfo?.age || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Kích thước (cm)" span={3}>
              {consignment.fishInfo?.size || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={3}>
              {consignment.fishInfo?.status || "Không rõ"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={3}>
              {renderStatusTag(consignment.consignmentStatus)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Divider orientation="left">Mô tả</Divider>
      <div
        style={{
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "8px",
          minHeight: "80px",
          whiteSpace: "pre-wrap",
        }}
      >
        {consignment.conditionDescription || "Không có mô tả"}
      </div>
      {/* Thêm phần thực hiện API phê duyệt */}
      {consignment.consignmentStatus === "PendingApproval" && (
        <Divider orientation="left">Hành động</Divider>
      )}
      {consignment.consignmentStatus === "PendingApproval" && (
        <>
          <div style={{marginBottom: "12px"}}>
            <span>Giá thỏa thuận: </span>
            <InputNumber
              value={agreedPrice}
              // onChange={setAgreedPrice}
              onChange={(value) => setAgreedPrice(value)}
              min={0}
              style={{width: "100%"}}
              placeholder="Nhập giá thỏa thuận"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(value) => value.replace(/\./g, '')}
            />
          </div>
          <div style={{marginBottom: "12px"}}>
            <span>Phí hoa hồng (Nhập % phí hoa hồng): </span>
            <InputNumber
              value={commissionFeePercent}
              onChange={setCommissionFeePercent}
              min={0}
              style={{width: "100%"}}
              placeholder="Nhập phí hoa hồng"
            />
          </div>
          <div style={{marginBottom: "12px"}}>
            <span>Giá chốt (Sau khi tính phí hoa hồng): <span style={{color: "red"}}>{formatCurrency(finalPrice)}</span></span>
          </div>
          <div style={{marginBottom: "12px"}}>
            <span>Phí dịch vụ: </span>
            <InputNumber
              value={serviceFee}
              onChange={setServiceFee}
              min={0}
              style={{width: "100%"}}
              placeholder="Nhập phí dịch vụ"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(value) => value.replace(/\./g, '')}
            />
          </div>

          <div style={{marginBottom: "12px"}}>
            <span>Thời gian ký gửi (tháng): </span>
            <InputNumber
              value={consignmentDurationMonths}
              onChange={setConsignmentDurationMonths}
              min={1}
              style={{width: "100%"}}
              placeholder="Nhập thời gian ký gửi (tháng)"
            />
          </div>

          {/* Thêm phần thực hiện API phê duyệt */}
          <Button
            type="primary"
            onClick={handleApprove}
            loading={approving || loading}
            disabled={approving || loading}
          >
            {approving || loading ? <Spin/> : "Phê duyệt ký gửi"}
          </Button>
        </>
      )}
    </Modal>
  );
};

export default ConsignmentDetail;
