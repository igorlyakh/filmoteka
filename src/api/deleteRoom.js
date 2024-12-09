import toast from 'react-hot-toast';
import axiosInstance from './axios';

const deleteRoom = async roomId => {
  try {
    const res = await axiosInstance.delete('/room', { data: { roomId } });
    toast.success('Комната успешно удалена!');
    return res.data;
  } catch (error) {
    return error.response?.data?.message;
  }
};

export default deleteRoom;
