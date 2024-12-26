import style from './AddRoomBtn.module.scss';

const AddRoomBtn = ({ handler }) => {
  return (
    <button
      className={style.addBtn}
      onClick={handler}
    >
      Создать комнату
    </button>
  );
};

export default AddRoomBtn;
