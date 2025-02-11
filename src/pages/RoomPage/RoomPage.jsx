import getUsersInRoom from '@/api/getUsersInRoom';
import BackLink from '@/components/BackLink';
import MovieList from '@/components/MovieList';
import UserList from '@/components/UsersList';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const RoomPage = () => {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/rooms');

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
      <BackLink path={backLink.current} />
      <UserList users={users} />
      <MovieList />
    </>
  );
};

export default RoomPage;
