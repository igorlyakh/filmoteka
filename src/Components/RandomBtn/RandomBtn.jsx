import { useState } from 'react';
import styles from './RandomBtn.module.scss';

const RandomBtn = ({ movies, onSelect }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating || movies.length < 2) return;

    setIsAnimating(true);

    const animationDuration = 3000;
    const stepTime = 100;
    let currentIndex = 0;

    const interval = setInterval(() => {
      const movie = movies[currentIndex % movies.length];
      onSelect(movie.id);
      currentIndex++;
    }, stepTime);

    setTimeout(() => {
      clearInterval(interval);
      const finalMovie = movies[Math.floor(Math.random() * movies.length)];
      onSelect(finalMovie.id);
      setIsAnimating(false);
    }, animationDuration);
  };

  return (
    <button
      className={styles.btn}
      type="button"
      onClick={handleClick}
      disabled={isAnimating}
    >
      {isAnimating ? 'Выбираем...' : 'Случайный фильм'}
    </button>
  );
};

export default RandomBtn;
