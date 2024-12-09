import { IoIosArrowForward } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import style from './RoomItem.module.scss';

const RoomItem = ({ name, roomId }) => {
  return (
    <li className={style.item}>
      <button className={style.deleteButton}>
        <TiDelete />
      </button>
      <p>{name}</p>
      <Link
        className={style.link}
        to={`${roomId}`}
      >
        Войти в комнату <IoIosArrowForward />
      </Link>
    </li>
  );
};

export default RoomItem;
