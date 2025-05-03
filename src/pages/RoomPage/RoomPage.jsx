import AddBtn from '@/components/AddBtn';
import BackLink from '@/components/BackLink';
import MovieList from '@/components/MovieList';
import UserList from '@/components/UsersList';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RoomPage = () => {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/rooms');
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <BackLink path={backLink.current} />
      <UserList />
      <MovieList />
      <AddBtn
        handler={toggleModal}
        text="Добавить фильм"
      />
    </>
  );
};

export default RoomPage;
