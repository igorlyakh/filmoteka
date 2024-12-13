import createRoom from '@/api/createRoom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import style from './AddRoom.module.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#242020',
    border: '1px solid #7c7c7c',
    padding: '30px',
  },
  overlay: {
    backgroundColor: '#383838ae',
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
    reset();
    toggleModal();
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={toggleModal}
    >
      <h2 className={style.header}>Добавить комнату</h2>
      <form
        className={style.form}
        onSubmit={handleSubmit(data => {
          handler(data);
          reset();
        }, onError)}
      >
        <input
          className={style.input}
          type="text"
          placeholder="Enter room name"
          required
          {...register('name', {
            required: 'Укажите название комнаты!',
            maxLength: {
              value: 20,
              message: 'Слишком длинное название!',
            },
          })}
        />
        <button
          className={style.button}
          type="submit"
        >
          Создать комнату
        </button>
      </form>
    </Modal>
  );
};

export default AddRoom;
