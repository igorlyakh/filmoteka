import styled from './Layout.module.scss';

import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className={styled.header}>
        <Link to="/">LOGO</Link>
        <menu className={styled.menu}>
          <Link
            className={styled.link}
            to="login"
          >
            Войти
          </Link>
          <Link
            className={styled.link}
            to="registration"
          >
            Регистрация
          </Link>
        </menu>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
