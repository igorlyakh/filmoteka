import BackLink from '@/components/BackLink';
import MovieList from '@/components/MovieList';
import UserList from '@/components/UsersList';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const RoomPage = () => {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/rooms');

  return (
    <>
      <BackLink path={backLink.current} />
      <UserList />
      <MovieList />
    </>
  );
};

export default RoomPage;
