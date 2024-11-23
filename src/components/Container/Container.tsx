import { FC, PropsWithChildren } from 'react';
import style from './Container.module.scss';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
