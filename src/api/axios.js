import useAuthStore from '@/store/store';
import axios from 'axios';
import toast from 'react-hot-toast';

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
      !originalRequest._isRetry &&
      error.response?.data?.message !== 'Неверный логин или пароль!'
    ) {
      useAuthStore.setState({
        isLoading: true,
      });
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
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance.request(originalRequest);
      } catch (refreshError) {
        localStorage.setItem('token', null);
        localStorage.setItem('isLogin', false);
        localStorage.setItem('name', null);
        localStorage.setItem('email', null);
        useAuthStore.setState({
          token: null,
          name: null,
          email: null,
          isLogin: false,
        });
        toast.error('Пожалуйста, войдите в систему снова!');
        return Promise.reject(refreshError);
      } finally {
        useAuthStore.setState({
          isLoading: false,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
