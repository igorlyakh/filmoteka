import { IoIosRemoveCircleOutline } from 'react-icons/io';
import style from './UsersList.module.scss';

const UserList = () => {
  return (
    <ul className={style.list}>
      <li className={style.listItem}>
        <span>Имя: </span>
        <span>user.name</span>
        <button
          type="button"
          className={style.btn}
        >
          <IoIosRemoveCircleOutline />
        </button>
      </li>
    </ul>
  );
};

export default UserList;
