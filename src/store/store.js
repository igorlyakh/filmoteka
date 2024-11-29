import axiosInstance from '@/api/axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const setData = (token, name, email) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('name', JSON.stringify(name));
  localStorage.setItem('email', JSON.stringify(email));
};

const useAuthStore = create(
  devtools(set => ({
    token: JSON.parse(localStorage.getItem('token')) || null,
    name: JSON.parse(localStorage.getItem('name')) || null,
    email: JSON.parse(localStorage.getItem('email')) || null,
    isLoading: false,
    error: null,
    login: async data => {
      set({ isLoading: true, error: null });
      try {
        const res = await axiosInstance.post('/auth/login', data);
        const { accessToken, name, email } = await res.data;
        setData(accessToken, name, email);
        set({ token: accessToken, name, email });
      } catch (error) {
        console.log(error.response?.data?.message);
        set({ error: error.response?.data?.message });
      } finally {
        set({ isLoading: false });
      }
    },
    registration: async data => {
      set({ isLoading: true, error: null });
      try {
        const res = await axiosInstance.post('/auth/registration', data);
        const { accessToken, name, email } = res.data;
        setData(accessToken, name, email);
        set({ token: accessToken, name, email });
      } catch (error) {
        set({ error: error.response?.data?.message });
      } finally {
        set({ isLoading: false });
      }
    },
    logout: async () => {
      set({ isLoading: true, error: null });
      try {
        await axiosInstance.post('/auth/logout');
        setData(null, null, null);
        set({ token: null, name: null, email: null });
      } catch (error) {
        set({ error: error.response?.data?.message });
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useAuthStore;
