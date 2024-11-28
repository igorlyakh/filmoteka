import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://filmoteka-server.onrender.com/api',
});

export default axiosInstance;
