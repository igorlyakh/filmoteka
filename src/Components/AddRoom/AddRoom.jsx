import createRoom from '@/api/createRoom';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const AddRoom = ({ isOpen, toggleModal, setRooms }) => {
  const { register, handleSubmit, reset } = useForm();

  const onError = errors => {
    Object.values(errors).forEach(errors => {
      toast.error(errors.message);
    });
  };

  const handler = async data => {
    const res = await createRoom(data);
    setRooms(prevRooms => {
      if (Array.isArray(prevRooms)) {
        return [...prevRooms, res];
      } else {
        return [data];
      }
    });
    console.log(res);
    reset();
    toggleModal();
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={toggleModal}
    >
      <form
        onSubmit={handleSubmit(data => {
          handler(data);
          reset();
        }, onError)}
      >
        <input
          type="text"
          placeholder="Enter room name"
          required
          {...register('name', {
            required: 'Room name is required!',
          })}
        />
        <button type="submit">Create room</button>
      </form>
    </Modal>
  );
};

export default AddRoom;
