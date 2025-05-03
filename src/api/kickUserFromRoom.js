import toast from 'react-hot-toast';
import axiosInstance from './axios';

const kickUserFromRoom = async (roomId, userId) => {
  try {
    const res = await axiosInstance.patch(`/room/kick/${roomId}`, { id: Number(userId) });
    toast.success('Пользователь успешно исключен из комнаты!');
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message);
  }
};

export default kickUserFromRoom;
