import React from "react";
import { SiFacebook } from "react-icons/si";
import { Tooltip } from "antd";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedFBButton = styled.div`
  animation: ${pulse} 2s infinite;

  &:hover {
    animation: ${bounce} 1s ease infinite;
  }
`;

const AnimatedFBIcon = styled(SiFacebook)`
  animation: ${rotate} 3s linear infinite;
`;

const FBIconts = () => {
  const openFB = () => {
    window.open("http://localhost:3000/admin", "_blank");
  };

  return (
    <Tooltip title="Liên hệ qua FaceBook" placement="left">
      <AnimatedFBButton
        className="fixed bottom-4 right-4 bg-blue-500 rounded-full p-3 cursor-pointer shadow-lg hover:bg-blue-600 transition-colors duration-300"
        onClick={openFB}
        style={{ marginBottom: "180px" }}
      >
        <AnimatedFBIcon className="text-white text-3xl" />
      </AnimatedFBButton>
    </Tooltip>
  );
};

export default FBIconts;
