import style from './AddBtn.module.scss';

const AddBtn = ({ handler, text = 'Создать комнату' }) => {
  return (
    <button
      className={style.addBtn}
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default AddBtn;
