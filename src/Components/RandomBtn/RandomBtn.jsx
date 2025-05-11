import styles from './RandomBtn.module.scss';

const RandomBtn = () => {
  return (
    <button
      className={styles.btn}
      type="button"
    >
      Случайный фильм
    </button>
  );
};

export default RandomBtn;
