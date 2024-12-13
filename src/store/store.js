import axiosInstance from '@/api/axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const setData = (token, name, email, isLogin) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('name', JSON.stringify(name));
  localStorage.setItem('email', JSON.stringify(email));
  localStorage.setItem('isLogin', JSON.stringify(isLogin));
};

const useAuthStore = create(
  devtools(set => ({
    token: localStorage.getItem('token') || null,
    name: JSON.parse(localStorage.getItem('name')) || null,
    email: JSON.parse(localStorage.getItem('email')) || null,
    isLogin: Boolean(JSON.parse(localStorage.getItem('isLogin'))) || false,
    isLoading: false,
    error: null,
    login: async data => {
      set({ isLoading: true, error: null, isLogin: false });
      try {
        const res = await axiosInstance.post('/auth/login', data);
        const { accessToken, name, email } = res.data;
        setData(accessToken, name, email, true);
        set({ token: accessToken, name, email, isLogin: true });
        toast.success(`Добро пожаловать, ${name}!`);
      } catch (error) {
        set({
          error: error.response?.data?.message || 'Ошибка сервера! Попробуйте позже.',
        });
        toast.error(error.response?.data?.message || 'Ошибка сервера! Попробуйте позже.');
      } finally {
        set({ isLoading: false });
      }
    },
    registration: async data => {
      set({ isLoading: true, error: null, isLogin: false });
      try {
        const res = await axiosInstance.post('/auth/registration', data);
        const { accessToken, name, email } = res.data;
        setData(accessToken, name, email, true);
        set({ token: accessToken, name, email, isLogin: true });
        toast.success(`Добро пожаловать, ${name}!`);
      } catch (error) {
        set({
          error: error.response?.data?.message || 'Ошибка сервера! Попробуйте позже.',
        });
        toast.error(error.response?.data?.message || 'Ошибка сервера! Попробуйте позже.');
      } finally {
        set({ isLoading: false });
      }
    },
    logout: async () => {
      set({ isLoading: true, error: null });
      try {
        await axiosInstance.post('/auth/logout');
        setData(null, null, null, false);
        set({ token: null, name: null, email: null, isLogin: false });
      } catch (error) {
        set({
          error: error.response?.data?.message || 'Ошибка сервера! Попробуйте позже.',
        });
        toast.error(error.response?.data?.message || 'Ошибка сервера! Попробуйте позже.');
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useAuthStore;
