import getMovies from '@/api/getMovies';
import useAuthStore from '@/store';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import EmptyHeader from '../EmptyHeader';
import styles from './MovieList.module.scss';

const MovieList = () => {
  const location = useLocation();
  console.log(location);
  const backLick = useRef(location.state?.from ?? '/rooms');

  const { roomId } = useParams();

  const [movies, setMovies] = useState([{ id: 1, title: 'First movie' }]);

  // const [movies, setMovies] = useState([]);
  const { token } = useAuthStore();

  useEffect(() => {
    const getData = async () => {
      const movie = await getMovies(roomId);
      setMovies(prev => [...prev, ...movie]);
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
  return (
    <>
      <Link
        to={backLick.current}
        className={styles.backLink}
      >
        Назад
      </Link>
      {movies.length < 1 ? (
        <EmptyHeader text="В комнате нет фильмов." />
      ) : (
        <>
          <ul className={styles.list}></ul>
          <button>Случайный фильм</button>
        </>
      )}
    </>
  );
};

export default MovieList;
