import axiosInstance from './axios';

const createRoom = async data => {
  try {
    const res = await axiosInstance.post('/room', data);
    return res.data;
  } catch (error) {
    return error.response?.data?.message;
  }
};

export default createRoom;
