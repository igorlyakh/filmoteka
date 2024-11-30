import useAuthStore from '@/store/store';
import axios from 'axios';

const baseURL = 'http://localhost:3001/api';
//! Prod server
//! const baseURL = ''https://filmoteka-server.onrender.com/api''

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
