import { Link } from 'react-router-dom';
import Menu from '../Menu';
import styled from './Header.module.scss';

const Header = () => {
  return (
    <header className={styled.header}>
      <Link
        className={styled.logo}
        to="/"
      >
        Filmoteka
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
