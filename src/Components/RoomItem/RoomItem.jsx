import deleteRoom from '@/api/deleteRoom';
import { IoIosArrowForward } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import { Link, useLocation } from 'react-router-dom';
import style from './RoomItem.module.scss';

const RoomItem = ({ name, roomId, onDeleteRoom }) => {
  const location = useLocation();

  const removeRoom = async roomId => {
    await deleteRoom(roomId);
  };

  return (
    <li className={style.item}>
      <button
        onClick={() => {
          removeRoom(Number(roomId));
          onDeleteRoom(roomId);
        }}
        className={style.deleteButton}
      >
        <TiDelete />
      </button>
      <p>{name}</p>
      <Link
        className={style.link}
        to={`${roomId}`}
        state={{ from: location }}
      >
        Войти в комнату <IoIosArrowForward />
      </Link>
    </li>
  );
};

export default RoomItem;
