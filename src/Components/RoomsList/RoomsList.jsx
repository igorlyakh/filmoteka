import useAuthStore from '@/store/store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import getRooms from '../../api/getRooms';
import style from './RoomsList.module.scss';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const { token } = useAuthStore();

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on('addToRoom', data => {
      console.log(data);
      setRooms(prevRooms => {
        if (Array.isArray(prevRooms)) {
          return [...prevRooms, data];
        } else {
          return [data];
        }
      });
    });

    const getData = async () => {
      const data = await getRooms();
      setRooms(data);
    };

    getData();

    return () => {
      socket.disconnect();
    };
  }, [token]);
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
