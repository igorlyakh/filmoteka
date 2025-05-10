import toast from 'react-hot-toast';
import axiosInstance from './axios';

const deleteMovie = async (movieId, roomId) => {
  try {
    await axiosInstance.delete(`/${roomId}/movie`, {
      data: { movieId },
    });
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Что-то пошло не так!');
    }
    return Promise.reject(error);
  }
};

export default deleteMovie;
