import Container from '@/components/Container';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
  return (
    <>
      <Header />
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
