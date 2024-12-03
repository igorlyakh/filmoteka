import { Link } from 'react-router-dom';
import style from './RoomsList.module.scss';

const RoomsList = ({ children }) => {
  return (
    <ul className={style.wrapper}>
      <li>
        <p>Название комнаты: Комната 1</p>
        <Link>To room</Link>
      </li>
      <li>
        <p>Название комнаты: Комната 2</p>
        <Link>To room</Link>
      </li>
    </ul>
  );
};

export default RoomsList;
