import toast from 'react-hot-toast';
import axiosInstance from './axios';

const addMovie = async (data, roomId) => {
  try {
    const res = await axiosInstance.post(`${roomId}/movie`, data);
    toast.success('Фильм добавлен в комнату!');
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error.response?.data;
  }
};

export default addMovie;
