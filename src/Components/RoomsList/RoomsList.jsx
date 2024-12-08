import useAuthStore from '@/store/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import getRooms from '../../api/getRooms';
import RoomItem from '../RoomItem';
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
          {rooms.map(room => {
            return (
              <RoomItem
                key={room.id}
                name={room.name}
              />
            );
          })}
        </ul>
      ) : (
        <p>No rooms.</p>
      )}
    </>
  );
};

export default RoomsList;
