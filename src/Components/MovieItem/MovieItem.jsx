import deleteMovie from '@/api/deleteMovie';
import { useEffect, useRef } from 'react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import styles from './MovieItem.module.scss';

const MovieItem = ({ title, poster, movieId, roomId, isSelected }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isSelected]);

  const img =
    poster === 'https://www.themoviedb.org/t/p/original/7rhzEufov6yV81d7Zwv8ZsFZl8J.jpg';

  return (
    <li
      className={`${styles.movieItem}  ${isSelected ? styles.selected : ''}`}
      ref={itemRef}
    >
      <button
        className={styles.btn}
        type="button"
        onClick={() => {
          deleteMovie(movieId, roomId);
        }}
      >
        <IoIosRemoveCircleOutline />
      </button>
      <img
        src={
          img
            ? 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
            : poster
        }
        alt={title}
        width={200}
      />
      <p>{title}</p>
    </li>
  );
};

export default MovieItem;
