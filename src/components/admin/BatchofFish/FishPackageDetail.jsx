// FishPackageDetail.js
import React, { useEffect, useState } from "react";
import {Card, Col, Descriptions, Divider, Image, Modal, Row, Tabs, Tag} from "antd";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { getFishPackages } from "../../../services/fishPackageService.js";


const FishPackageDetail = ({ fishPackage, getCategoryName  }) => {
  if (!fishPackage) return null; // Không hiển thị gì nếu không có dữ liệu

  const statusText = fishPackage.status === "AVAILABLE" ? "Có sẵn" : "Đã bán";

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

  const getStatusTag = (status) => {
    const statusConfig = {
      NOTFULL: {color: "orange", text: "Chưa đủ số lượng"},
      AVAILABLE: {color: "green", text: "Có sẵn"},
      SOLDOUT: {color: "red", text: "Đã bán hết"}
    };
    const config = statusConfig[status] || {color: "default", text: "Không xác định"};
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const renderCategory = (category) => {
    return (
      <div key={category.categoryId} style={{ marginBottom: "8px" }}>
        <strong>Loại cá:</strong> {getCategoryName(category.categoryId)} - {category.quantityOfEach} con
      </div>
    );
  };




  const tabItems = [
    {
      key: "1",
      label: "Thông tin Lô Cá",
      children: (
        <div style={{padding: "20px"}}>
          {/* Phần hình ảnh */}
          <div style={{textAlign: "center", marginBottom: "24px"}}>
            <Image
              src={fishPackage.imageUrl}
              alt={fishPackage.name}
              style={{
                maxWidth: "300px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <Divider orientation="left">Thông tin cơ bản</Divider>

          <Descriptions
            bordered
            column={{xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1}}
          >
            {/*<Descriptions.Item label="Mã lô cá" span={2}>*/}
            {/*  {fishPackage.fishPackageId}*/}
            {/*</Descriptions.Item>*/}

            <Descriptions.Item label="Tên lô cá" span={2}>
              <strong>{fishPackage.name}</strong>
            </Descriptions.Item>

            <Descriptions.Item label="Giá">
              <span style={{color: "#f50"}}>
                {formatCurrency(fishPackage.totalPrice)}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Trạng thái">
              {getStatusTag(fishPackage.productStatus)}
            </Descriptions.Item>

            <Descriptions.Item label="Sức chứa">
              {fishPackage.capacity} con
            </Descriptions.Item>

            <Descriptions.Item label="Số lượng cá">
              {fishPackage.numberOfFish} con
            </Descriptions.Item>

            <Descriptions.Item label="Số lượng trong kho">
              {fishPackage.quantityInStock} lô
            </Descriptions.Item>

            <Descriptions.Item label="Kích thước">
              {fishPackage.minSize} - {fishPackage.maxSize} cm
            </Descriptions.Item>

            <Descriptions.Item label="Thức ăn/ngày">
              {fishPackage.dailyFood} gram
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Thông tin loại cá</Divider>
         
          <Descriptions bordered>
            <Descriptions.Item label="Danh sách loại cá" span={3}>
              <div>
                {fishPackage.categories.map((category) => renderCategory(category))}
              </div>
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Mô tả chi tiết</Divider>

          <div
            style={{
              padding: "16px",
              background: "#f5f5f5",
              borderRadius: "8px",
              marginBottom: "24px",
              minHeight: "100px",
              whiteSpace: "pre-wrap",
            }}
          >
            {fishPackage.description || "Không có mô tả"}
          </div>
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems}/>;
};

export default FishPackageDetail;
