import { IoIosRemoveCircleOutline } from 'react-icons/io';
import style from './UsersList.module.scss';

const UserList = ({ users }) => {
  return (
    <>
      <h2 className={style.title}>Пользователи в комнате:</h2>
      <ul className={style.list}>
        {users.map(user => (
          <li
            className={style.listItem}
            key={user.id}
          >
            <span>Имя: </span>
            <span>{user.name}</span>
            <button
              type="button"
              className={style.btn}
            >
              <IoIosRemoveCircleOutline />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
