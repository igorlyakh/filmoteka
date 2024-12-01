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

    if (
      error.response?.status === 401 &&
      error.config &&
      !originalRequest._isRetry &&
      error.response?.data?.message !== 'Неверный логин или пароль!'
    ) {
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
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
