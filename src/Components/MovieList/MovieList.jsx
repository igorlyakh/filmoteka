import getMovies from '@/api/getMovies';
import AddBtn from '@/components/AddBtn';
import AddForm from '@/components/AddForm';
import EmptyHeader from '@/components/EmptyHeader';
import MovieItem from '@/components/MovieItem';
import RandomBtn from '@/components/RandomBtn';
import useAuthStore from '@/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './MovieList.module.scss';

const MovieList = () => {
  const socketRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const { roomId } = useParams();

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleRandomSelect = useCallback(id => {
    setSelectedMovieId(id);
  }, []);

  const { token } = useAuthStore();

  useEffect(() => {
    const getData = async () => {
      try {
        const movie = await getMovies(roomId);
        setMovies(movie);
      } catch {
        navigate('/404');
        return;
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const createSocket = () => {
      socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true,
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    };
    createSocket();
    socketRef.current.on('kickFromRoom', data => {
      toast('Вас исключили из комнаты', {
        icon: '❗',
      });
      if (location.pathname === `/rooms/${data}`) {
        console.log('test');
        navigate('/rooms', {
          replace: true,
        });
      }
    });

    socketRef.current.on('addMovie', movie => {
      toast('В комнату добавлен фильм', {
        icon: '🍿',
      });
      setMovies(prev => [...prev, movie]);
    });

    socketRef.current.on('deleteMovie', movieId => {
      toast('Из команты удален фильм', {
        icon: '🍿',
      });
      setMovies(prev => prev.filter(movie => movie.id !== movieId));
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        socketRef.current?.disconnect();
      } else {
        createSocket();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      socketRef.current?.disconnect();
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
                isSelected={selectedMovieId === movie.id}
              />
            ))}
          </ul>
          <RandomBtn
            movies={movies}
            onSelect={handleRandomSelect}
          />
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
