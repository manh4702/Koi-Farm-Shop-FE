// config/ant-design-config.js
import {message} from "antd";

// Function to configure Ant Design settings
export const configureAntDesign = () => {
  // Configure the message component
  message.config({
    top: 50, // Distance from the top of the viewport
    duration: 3, // Auto close duration in seconds
    maxCount: 1, // Maximum number of messages to show
  });

  // Dynamically inject custom styles for messages
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
  
    @keyframes slide-in-right {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .ant-message {
      text-align: right;
    }
    .ant-message-notice {
      display: flex;
      justify-content: flex-end;
      animation: slide-in-right 0.5s ease-out;
    }
    
    /* Customize checkbox color */
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: red;
      border-color: red;
    }
    
    .ant-checkbox-checked::after {
      border-color: red;
    }
    
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
      border-color: red;
    }
    
    /* Change button color to red */
    // .ant-btn-primary {
    //   background-color: red !important; /* Button background color */
    //   border-color: red !important; /* Button border color */
    // }

    // .ant-btn-primary:hover,
    // .ant-btn-primary:focus {
    //   background-color: darkred !important; /* Darker shade on hover */
    //   border-color: darkred !important; /* Darker border on hover */
    // }
  `;
  document.head.appendChild(styleElement);
};