// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.110:8800/api/',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 501) {
      // Token expired or user unauthorized
      window.location.href = 'createUser';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
