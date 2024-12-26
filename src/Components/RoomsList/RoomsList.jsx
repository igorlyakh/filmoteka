import RoomItem from '../RoomItem';
import style from './RoomsList.module.scss';

const RoomsList = ({ rooms, setRooms }) => {
  const onDeleteRoom = roomId => {
    setRooms(prevRooms => {
      return prevRooms.filter(room => room.id !== roomId);
    });
  };
  return (
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
  );
};

export default RoomsList;
