// FishPackageDetail.js
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Tabs } from "antd";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { getFishPackages } from "../../../services/fishPackageStore";

// const BASE_CLOUDINARY_URL = "https://res.cloudinary.com/dmefon9dj/image/upload/v1729605123/";

const FishPackageDetail = ({ fishPackage }) => {
  if (!fishPackage) return null; // Không hiển thị gì nếu không có dữ liệu
  console.log(fishPackage);
  // const imageUrl = `${BASE_CLOUDINARY_URL}${fishPackage.imageUrl}`;
  // const imageUrl = `https://res.cloudinary.com/dmefon9dj/image/upload/v1729605123/${fishPackage.imageUrl}`;

  const tabItems = [
    {
      key: "1",
      label: "Thông tin Lô Cá",
      children: (
        <Row
          gutter={[16, 16]}
          style={{
            marginTop: "10px",
          }}
        >
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={fishPackage.imageUrl}
              alt="batch"
              style={{
                width: "20%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            
          </Col>

          <Col span={12}>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Tên:
              </Col>
              <Col span={16}>{fishPackage.name}</Col>
            </Row>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Giá:
              </Col>
              <Col span={16}>{fishPackage.price}</Col>
            </Row>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Tuổi (năm):
              </Col>
              <Col span={16}>{fishPackage.age}</Col>
            </Row>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Kích thước (cm):
              </Col>
              <Col span={16}>{fishPackage.size}</Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Giới tính:
              </Col>
              <Col span={16}>{fishPackage.gender}</Col>
            </Row>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Thức ăn/ngày (gram):
              </Col>
              <Col span={16}>{fishPackage.dailyFood}</Col>
            </Row>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Số lượng:
              </Col>
              <Col span={16}>{fishPackage.numberOfFish}</Col>
            </Row>
            <Row>
              <Col span={8} style={{ fontWeight: "bold" }}>
                Trạng thái:
              </Col>
              <Col span={16}>{fishPackage.status}</Col>
            </Row>
          </Col>

          {/* Mô tả với giới hạn dòng */}
          <Col span={24} style={{ marginTop: "20px" }}>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Mô tả:
            </div>
            <div
              style={{
                maxHeight: "5em", // Giới hạn tối đa 5 dòng
                minHeight: "3em", // Giới hạn tối thiểu 3 dòng
                overflowY: "auto",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                border: "1px solid #d9d9d9",
                lineHeight: "1.5em",
              }}
            >
              {fishPackage.description}
            </div>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Card title={`Chi tiết của ${fishPackage.name}`}>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </Card>
  );
};

export default FishPackageDetail;
