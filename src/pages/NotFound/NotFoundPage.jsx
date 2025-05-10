import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Страница не найдена</p>
      <p className={styles.description}>
        Возможно, вы ввели неправильный адрес или страница была удалена.
      </p>
      <Link
        to="/"
        className={styles.button}
      >
        На главную
      </Link>
    </div>
  );
}
