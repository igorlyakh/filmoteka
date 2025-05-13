import deleteMovie from '@/api/deleteMovie';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import styles from './MovieItem.module.scss';

const MovieItem = ({ title, poster, movieId, roomId, isSelected }) => {
  return (
    <li className={`${styles.movieItem}  ${isSelected ? styles.selected : ''}`}>
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
        src={poster}
        alt={title}
        width={200}
      />
      <p>{title}</p>
    </li>
  );
};

export default MovieItem;
