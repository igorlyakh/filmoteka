import toast from 'react-hot-toast';
import axiosInstance from './axios';

const getMovies = async roomId => {
  try {
    const res = await axiosInstance.get(`/${roomId}/movie`);
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error.response?.data?.message;
  }
};

export default getMovies;
