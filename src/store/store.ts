import axios from 'axios';
import { create } from 'zustand';

interface userData {
  token: string | null;
  loading: boolean;
  error: string | null;
  name: string | null;
  email: string | null;
}

const useStore = create(set => ({
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  login: async (data: { email: string; password: string }) => {
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', data);
      set({ token: res.data.accessToken, name: res.data.name, email: res.data.email });
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('email', res.data.email);
    } catch (error) {
      console.log('error');
    }
  },
}));

export default useStore;
