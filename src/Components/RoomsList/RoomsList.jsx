import { useState } from 'react';
import AddRoom from '../AddRoom';
import EmptyHeader from '../EmptyHeader';
import RoomItem from '../RoomItem';
import style from './RoomsList.module.scss';

const RoomsList = ({ rooms, setRooms }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteRoom = roomId => {
    setRooms(prevRooms => {
      return prevRooms.filter(room => room.id !== roomId);
    });
  };

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

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
          <EmptyHeader text="У вас нет комнат!" />
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
