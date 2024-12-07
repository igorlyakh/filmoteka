import axiosInstance from './axios';

const getRooms = async () => {
  try {
    const res = await axiosInstance.get('/room');
    return res.data;
  } catch (error) {
    return error.response?.data?.message;
  }
};

export default getRooms;
