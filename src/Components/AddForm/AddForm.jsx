import addMovie from '@/api/addMovie';
import addUserToRoom from '@/api/addUserToRoom';
import createRoom from '@/api/createRoom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import styles from './AddForm.module.scss';

const formType = {
  room: 'Создание комнаты',
  user: 'Добавление пользователя',
  movie: 'Добавление фильма',
};

const formPlaceholder = {
  room: 'Введите название комнаты',
  user: 'Введите email пользователя',
  movie: 'Введите название фильма',
};

const inputNames = {
  room: 'name',
  user: 'email',
  movie: 'title',
};

const validationRules = {
  room: {
    required: 'Введите название комнаты',
    minLength: {
      value: 3,
      message: 'Минимум 3 символа',
    },
  },
  user: {
    required: 'Введите email пользователя',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Введите корректный email',
    },
  },
  movie: {
    required: 'Введите название фильма',
    minLength: {
      value: 2,
      message: 'Минимум 2 символа',
    },
  },
};

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

const AddForm = ({ isOpen, toggleModal, setData, type, roomId = 0 }) => {
  const { register, handleSubmit, reset } = useForm();

  const onError = errors => {
    Object.values(errors).forEach(errors => {
      toast.error(errors.message);
    });
  };

  const handler = async data => {
    let res;
    if (type === 'room') {
      res = await createRoom(data);
    }
    if (type === 'user') {
      try {
        res = await addUserToRoom(Number(roomId), data);
      } catch {
        return;
      }
    }
    if (type === 'movie') {
      res = await addMovie(data, roomId);
      reset();
      toggleModal();
      return;
    }
    setData(prevData => {
      if (Array.isArray(prevData)) {
        return [...prevData, res];
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
      <button
        className={styles.close}
        onClick={toggleModal}
      >
        <MdClose />
      </button>
      <h2 className={styles.header}>{formType[type]}</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(data => {
          handler(data);
          reset();
        }, onError)}
      >
        <input
          className={styles.input}
          type="text"
          placeholder={formPlaceholder[type]}
          required
          {...register(inputNames[type], validationRules[type])}
        />
        <button
          className={styles.button}
          type="submit"
        >
          Отправить
        </button>
      </form>
    </Modal>
  );
};

export default AddForm;
