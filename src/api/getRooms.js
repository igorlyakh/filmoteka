import axiosInstance from './axios';

const getRooms = async () => {
  const res = await axiosInstance.get('/room');
  return res.data;
};

export default getRooms;
