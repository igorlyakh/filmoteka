// import styled from './Layout.module.scss'

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      Layout
      <Outlet />
    </div>
  );
};

export default Layout;
