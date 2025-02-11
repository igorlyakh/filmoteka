import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import style from './BackLink.module.scss';

const BackLink = ({ path }) => {
  return (
    <Link
      className={style.backLink}
      to={path}
    >
      <IoMdArrowBack />
      <span>Назад</span>
    </Link>
  );
};

export default BackLink;
