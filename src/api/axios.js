import useAuthStore from '@/store/store';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://filmoteka-server.onrender.com/api',
});

axiosInstance.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
