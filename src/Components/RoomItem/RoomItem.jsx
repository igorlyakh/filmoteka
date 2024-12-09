import { Link } from 'react-router-dom';
import style from './RoomItem.module.scss';

const RoomItem = ({ name, roomId }) => {
  return (
    <li className={style.item}>
      <p>{name}</p>
      <Link to={`${roomId}`}>To Room</Link>
    </li>
  );
};

export default RoomItem;
