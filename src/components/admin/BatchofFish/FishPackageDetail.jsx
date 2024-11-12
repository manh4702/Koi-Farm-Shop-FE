// FishPackageDetail.js
import React, { useEffect, useState } from "react";
import {Card, Col, Descriptions, Divider, Image, Modal, Row, Tabs, Tag} from "antd";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { getFishPackages } from "../../../services/fishPackageService.js";


const FishPackageDetail = ({ fishPackage }) => {
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
    return status === "AVAILABLE" ? (
      <Tag color="green">Có sẵn</Tag>
    ) : (
      <Tag color="red">Đã bán</Tag>
    );
  };


  const tabItems = [
    {
      key: "1",
      label: "Thông tin Lô Cá",
      children: (
        <div style={{ padding: "20px" }}>
          {/* Phần hình ảnh */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
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
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Tên lô cá" span={2}>
              <strong>{fishPackage.name}</strong>
            </Descriptions.Item>

            <Descriptions.Item label="Giá">
              <span style={{ color: "#f50" }}>
                {formatCurrency(fishPackage.price)}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Trạng thái">
              {getStatusTag(fishPackage.status)}
            </Descriptions.Item>

            <Descriptions.Item label="Số lượng">
              {fishPackage.numberOfFish} con
            </Descriptions.Item>

            <Descriptions.Item label="Thức ăn/ngày">
              {fishPackage.dailyFood} gram
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Thông số chi tiết</Divider>

          <Descriptions
            bordered
            column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Tuổi">
              {fishPackage.age} năm
            </Descriptions.Item>

            <Descriptions.Item label="Kích thước">
              {fishPackage.size} cm
            </Descriptions.Item>

            {/*<Descriptions.Item label="Giới tính">*/}
            {/*  {fishPackage.gender}*/}
            {/*</Descriptions.Item>*/}
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
  
  return <Tabs defaultActiveKey="1" items={tabItems} />;
};

export default FishPackageDetail;
