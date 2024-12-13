import useAuthStore from '@/store';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLogin } = useAuthStore();

  const shouldRedirect = !isLogin;

  console.log({ isLogin });

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

export default PrivateRoute;
