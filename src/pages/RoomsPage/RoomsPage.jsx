import getRooms from '@/api/getRooms';
import AddRoom from '@/components/AddRoom';
import AddRoomBtn from '@/components/AddRoomBtn';
import EmptyHeader from '@/components/EmptyHeader';
import RoomsList from '@/components/RoomsList';
import useAuthStore from '@/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UsersList from '../../components/UsersList';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useAuthStore();

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
        <>
          <UsersList />
          <RoomsList
            rooms={rooms}
            setRooms={setRooms}
          />
        </>
      ) : (
        <EmptyHeader text="У вас нет комнат!" />
      )}
      <AddRoomBtn handler={toggleModal} />
    </>
  );
  <></>;
};

export default RoomsPage;
