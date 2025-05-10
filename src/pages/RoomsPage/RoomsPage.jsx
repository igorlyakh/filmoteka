import getRooms from '@/api/getRooms';
import AddBtn from '@/components/AddBtn';
import AddForm from '@/components/AddForm';
import EmptyHeader from '@/components/EmptyHeader';
import RoomsList from '@/components/RoomsList';
import useAuthStore from '@/store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

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
      toast('Вас добавили в комнату', {
        icon: 'ℹ️',
      });
    });

    socket.on('kickFromRoom', data => {
      setRooms(prevRooms => {
        return prevRooms.filter(room => room.id !== data);
      });
      toast('Вас исключили из комнаты', {
        icon: 'ℹ️',
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
      <AddForm
        isOpen={isOpen}
        toggleModal={toggleModal}
        setData={setRooms}
        type="room"
      />
      {rooms.length > 0 ? (
        <RoomsList
          rooms={rooms}
          setRooms={setRooms}
        />
      ) : (
        <EmptyHeader text="У вас нет комнат!" />
      )}
      <AddBtn handler={toggleModal} />
    </>
  );
};

export default RoomsPage;
