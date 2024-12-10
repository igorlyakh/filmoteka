import useAuthStore from '@/store/store';
import { Link, NavLink } from 'react-router-dom';
import styled from './Header.module.scss';

const Header = () => {
  const { token, logout } = useAuthStore();
  return (
    <header className={styled.header}>
      <Link to="/">LOGO</Link>
      <nav className={styled.menu}>
        {token ? (
          <>
            <NavLink
              to="rooms"
              className={styled.navLink}
            >
              Комнаты
            </NavLink>
            <button
              className={styled.button}
              onClick={logout}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <NavLink
              className={styled.link}
              to="login"
            >
              Войти
            </NavLink>
            <NavLink
              className={styled.link}
              to="registration"
            >
              Регистрация
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
