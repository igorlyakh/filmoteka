import toast from 'react-hot-toast';
import axiosInstance from './axios';

const createRoom = async data => {
  try {
    const res = await axiosInstance.post('/room', data);
    toast.success('Комната успешно создана!');
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error.response?.data?.message;
  }
};

export default createRoom;
