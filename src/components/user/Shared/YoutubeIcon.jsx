import React from "react";
import { SiYoutube } from "react-icons/si";
import { Tooltip } from "antd";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
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

const AnimatedYTButton = styled.div`
  animation: ${pulse} 2s infinite;

  &:hover {
    animation: ${bounce} 1s ease infinite;
  }
`;

const AnimatedYTIcon = styled(SiYoutube)`
  animation: ${rotate} 3s linear infinite;
`;

const YTIconts = () => {
  const openYT = () => {
    window.open("https://www.youtube.com/@OnkoiQuangMinh", "_blank");
  };

  return (
    <Tooltip title="Xem qua YouTube" placement="left">
      <AnimatedYTButton
        className="fixed bottom-4 right-4 bg-red-600 rounded-full p-3 cursor-pointer shadow-lg hover:bg-red-700 transition-colors duration-300"
        onClick={openYT}
        style={{ marginBottom: "20px" }}
      >
        <AnimatedYTIcon className="text-white text-3xl" />
      </AnimatedYTButton>
    </Tooltip>
  );
};

export default YTIconts;
