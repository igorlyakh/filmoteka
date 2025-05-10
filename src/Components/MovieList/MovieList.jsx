import getMovies from '@/api/getMovies';
import AddBtn from '@/components/AddBtn';
import AddForm from '@/components/AddForm';
import useAuthStore from '@/store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import EmptyHeader from '../EmptyHeader';
import MovieItem from '../MovieItem/MovieItem';
import styles from './MovieList.module.scss';

const MovieList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const { roomId } = useParams();

  const [movies, setMovies] = useState([]);

  const { token } = useAuthStore();

  useEffect(() => {
    const getData = async () => {
      const movie = await getMovies(roomId);
      setMovies(movie);
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
      toast('В комнату добавлен фильм', {
        icon: '🍿',
      });
      setMovies(prev => [...prev, movie]);
    });

    socket.on('deleteMovie', movieId => {
      toast('Из команты удален фильм', {
        icon: '🍿',
      });
      setMovies(prev => prev.filter(movie => movie.id !== movieId));
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);
  return (
    <>
      {movies.length < 1 ? (
        <EmptyHeader text="В комнате нет фильмов." />
      ) : (
        <>
          <ul className={styles.list}>
            {movies.map(movie => (
              <MovieItem
                key={movie.id}
                title={movie.title}
                poster={movie.poster}
                movieId={movie.id}
                roomId={roomId}
              />
            ))}
          </ul>
          <button>Случайный фильм</button>
        </>
      )}
      <AddForm
        isOpen={isOpen}
        toggleModal={toggleModal}
        setData={setMovies}
        type="movie"
        roomId={roomId}
      />
      <AddBtn
        text="Добавить фильм"
        handler={toggleModal}
      />
    </>
  );
};

export default MovieList;
