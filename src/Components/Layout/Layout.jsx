import Container from '@/components/Container';
import styled from './Layout.module.scss';

import useAuthStore from '@/store/store';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  const { token, logout } = useAuthStore();

  return (
    <>
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
      <main>
        <section>
          <Container>
            <Outlet />
          </Container>
        </section>
      </main>
    </>
  );
};

export default Layout;
