import useAuthStore from '@/store';
import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLogin } = useAuthStore();

  const shouldRedirect = useMemo(() => !isLogin, [isLogin]);

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

export default PrivateRoute;
