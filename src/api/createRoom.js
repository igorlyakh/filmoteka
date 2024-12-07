import axiosInstance from './axios';

const createRoom = async data => {
  const res = await axiosInstance.post('/room', data);
  return res.data;
};

export default createRoom;
