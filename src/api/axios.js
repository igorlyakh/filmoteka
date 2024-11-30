import useAuthStore from '@/store/store';
import axios from 'axios';

const baseURL = 'http://localhost:3001/api';
//! Prod server
//! const baseURL = ''https://filmoteka-server.onrender.com/api''

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const res = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = res.data;
        localStorage.setItem('token', accessToken);
        useAuthStore.setState({ token: accessToken });
        config.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.error(error.response?.data?.message);
        return error.response?.data?.message;
      }
    }
  }
);

export default axiosInstance;
