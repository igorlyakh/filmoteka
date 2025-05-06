import { IoIosRemoveCircleOutline } from 'react-icons/io';
import styles from './MovieItem.module.scss';

const MovieItem = ({ title, poster }) => {
  return (
    <li className={styles.movieItem}>
      <button
        className={styles.btn}
        type="button"
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
