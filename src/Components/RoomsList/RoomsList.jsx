import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getRooms from '../../api/getRooms';
import style from './RoomsList.module.scss';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getRooms();
      setRooms(data);
    };

    getData();
  }, []);
  return (
    <>
      {rooms.length > 0 ? (
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
      ) : (
        <p>No rooms.</p>
      )}
    </>
  );
};

export default RoomsList;
