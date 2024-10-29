// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5260/api', // Đường dẫn tương đối để proxy chuyển tiếp yêu cầu
  baseURL: '/',
  timeout: 1000, // Thời gian chờ
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;


