import getUsersInRoom from '@/api/getUsersInRoom';
import kickUserFromRoom from '@/api/kickUserFromRoom';
import { useEffect, useState } from 'react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import style from './UsersList.module.scss';

const UserList = () => {
  const { roomId } = useParams();

  const [users, setUsers] = useState([]);

  const handlerKickUser = async userId => {
    try {
      await kickUserFromRoom(roomId, userId);
      setUsers(prevState => prevState.filter(user => user.id !== userId));
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { users } = await getUsersInRoom(roomId);
      setUsers(users);
    };
    getData();
  }, []);

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
              onClick={() => {
                handlerKickUser(user.id);
              }}
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
