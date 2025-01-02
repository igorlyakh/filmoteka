import getUsersInRoom from '@/api/getUsersInRoom';
import MovieList from '@/components/MovieList';
import UserList from '@/components/UsersList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
  const [users, setUsers] = useState([]);

  const { roomId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const { users } = await getUsersInRoom(roomId);
      setUsers(users);
    };
    getData();
  }, []);

  return (
    <>
      <UserList users={users} />
      <MovieList />
    </>
  );
};

export default RoomPage;
