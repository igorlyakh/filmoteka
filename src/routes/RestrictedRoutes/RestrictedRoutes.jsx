import useAuthStore from '@/store/store';
import { Navigate } from 'react-router-dom';

const RestrictedRoutes = ({ component: Component, redirectTo = '/' }) => {
  const { isLogin } = useAuthStore();
  return isLogin ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoutes;
