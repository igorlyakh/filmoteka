import axiosInstance from './axios';

const deleteRoom = async roomId => {
  try {
    const res = await axiosInstance.delete('/room', { data: { roomId } });
    return res.data;
  } catch (error) {
    return error.response?.data?.message;
  }
};

export default deleteRoom;
