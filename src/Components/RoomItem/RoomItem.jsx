import { Link } from 'react-router-dom';
import style from './RoomItem.module.scss';

const RoomItem = ({ name }) => {
  return (
    <li className={style.item}>
      <p>{name}</p>
      <Link>To Room</Link>
    </li>
  );
};

export default RoomItem;
