import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
        const res = await axios.post(
          'https://filmoteka-server.onrender.com/api/auth/login',
          data
        );
        const { accessToken, name, email } = await res.data;
        localStorage.setItem('token', JSON.stringify(accessToken));
        localStorage.setItem('name', JSON.stringify(name));
        localStorage.setItem('email', JSON.stringify(email));
        set({ token: accessToken, name, email });
      } catch (error) {
        console.log(error.response?.data?.message || 'Нет такого');
        set({ error: error.response?.data?.message });
      }
    },
  }))
);

export default useAuthStore;
