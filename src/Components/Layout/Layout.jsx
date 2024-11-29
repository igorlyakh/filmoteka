import Container from '@/components/Container';
import styled from './Layout.module.scss';

import useAuthStore from '@/store/store';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const { token } = useAuthStore();

  return (
    <>
      <header className={styled.header}>
        <Link to="/">LOGO</Link>
        <menu className={styled.menu}>
          {token ? (
            <button>Выйти</button>
          ) : (
            <>
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
