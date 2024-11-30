import Container from '@/components/Container';
import styled from './Layout.module.scss';

import useAuthStore from '@/store/store';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  const { token, logout, name } = useAuthStore();

  return (
    <>
      <header className={styled.header}>
        <Link to="/">LOGO</Link>
        <menu className={styled.menu}>
          {token ? (
            <div className={styled.wrapper}>
              <p>Привет, {name}!</p>
              <button
                className={styled.button}
                onClick={logout}
              >
                Выйти
              </button>
            </div>
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
        </menu>
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
