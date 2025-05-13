import axiosInstance from './axios';

const getMovies = async roomId => {
  try {
    const res = await axiosInstance.get(`/${roomId}/movie`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export default getMovies;
