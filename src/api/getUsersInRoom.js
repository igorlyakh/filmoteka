import axiosInstance from './axios';

const getUsersInRoom = async roomId => {
  try {
    const res = await axiosInstance.get(`/room/${roomId}/users`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export default getUsersInRoom;
