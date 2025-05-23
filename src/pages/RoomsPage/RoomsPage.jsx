import getRooms from '@/api/getRooms';
import AddBtn from '@/components/AddBtn';
import AddForm from '@/components/AddForm';
import EmptyHeader from '@/components/EmptyHeader';
import RoomsList from '@/components/RoomsList';
import useAuthStore from '@/store';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const RoomsPage = () => {
  const socketRef = useRef(null);

  const [rooms, setRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useAuthStore();

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const createSocket = () => {
      socketRef.current = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true,
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    };
    createSocket();
    socketRef.current.on('addToRoom', data => {
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

    socketRef.current.on('kickFromRoom', data => {
      setRooms(prevRooms => {
        return prevRooms.filter(room => room.id !== data);
      });
      toast('Вас исключили из комнаты', {
        icon: 'ℹ️',
      });
    });

    const handlerVisibilityChange = () => {
      if (document.hidden) {
        socketRef.current.disconnect();
      } else {
        createSocket();
      }
    };

    document.addEventListener('visibilitychange', handlerVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handlerVisibilityChange);
      socketRef.current.disconnect();
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
