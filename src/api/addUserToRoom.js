import toast from 'react-hot-toast';
import axiosInstance from './axios';

const addUserToRoom = async (roomId, data) => {
  try {
    const res = await axiosInstance.patch(`/room/${roomId}`, data);
    toast.success('Пользователь успешно добавлен в комнату!');
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error.response?.data?.message;
  }
};

export default addUserToRoom;
