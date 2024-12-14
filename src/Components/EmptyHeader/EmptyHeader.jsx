import style from './EmptyHeader.module.scss';

const EmptyHeader = ({ text }) => {
  return <h2 className={style.title}>{text}</h2>;
};

export default EmptyHeader;
