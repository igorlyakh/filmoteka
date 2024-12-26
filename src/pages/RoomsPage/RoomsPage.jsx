import getRooms from '@/api/getRooms';
import RoomsList from '@/components/RoomsList';
import useAuthStore from '@/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const RoomsPage = () => {
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
    <RoomsList
      rooms={rooms}
      setRooms={setRooms}
    />
  );
};

export default RoomsPage;
