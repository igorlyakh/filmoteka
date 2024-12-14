import getMovies from '@/api/getMovies';
import useAuthStore from '@/store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const MovieList = () => {
  const { roomId } = useParams();
  const [movies, setMovies] = useState([]);
  const { token } = useAuthStore();

  useEffect(() => {
    const getData = async () => {
      const movies = await getMovies(roomId);
      setMovies(movies);
    };

    getData();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on('addMovie', movie => {
      setMovies(prev => [...prev, movie]);
    });

    socket.on('deleteMovie', movieId => {
      setMovies(prev => prev.filter(movie => movie.id !== movieId));
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return <>MovieList</>;
};

export default MovieList;
