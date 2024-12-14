import getRooms from '@/api/getRooms';
import useAuthStore from '@/store/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import AddRoom from '../AddRoom';
import NoRoomsHeader from '../NoRoomsHeader';
import RoomItem from '../RoomItem';
import style from './RoomsList.module.scss';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const { token } = useAuthStore();

  const onDeleteRoom = roomId => {
    setRooms(prevRooms => {
      return prevRooms.filter(room => room.id !== roomId);
    });
  };

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

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

    socket.on('kickFromRoom', data => {
      setRooms(prevRooms => {
        return prevRooms.filter(room => room.id !== data.id);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      const data = await getRooms();
      setRooms(data);
    };

    getData();
  }, []);
  return (
    <>
      <AddRoom
        isOpen={isOpen}
        toggleModal={toggleModal}
        setRooms={setRooms}
      />
      {rooms.length > 0 ? (
        <ul className={style.wrapper}>
          {rooms.map(room => {
            return (
              <RoomItem
                key={room.id}
                name={room.name}
                roomId={room.id}
                onDeleteRoom={onDeleteRoom}
              />
            );
          })}
        </ul>
      ) : (
        <>
          <NoRoomsHeader />
        </>
      )}
      <button
        className={style.addBtn}
        onClick={toggleModal}
      >
        Создать комнату
      </button>
    </>
  );
};

export default RoomsList;
