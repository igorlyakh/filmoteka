import useAuthStor from '@/store/store';
import { NavLink } from 'react-router-dom';
import styled from './Menu.module.scss';

const Menu = () => {
  const { isLogin, logout } = useAuthStor();
  return (
    <nav className={styled.menu}>
      {isLogin ? (
        <>
          <NavLink
            to="rooms"
            className={styled.navLink}
            end
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
  );
};

export default Menu;
