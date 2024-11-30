import useAuthStore from '@/store/store';
import { Navigate } from 'react-router-dom';

const RestrictedRoutes = ({ component: Component, redirectTo = '/' }) => {
  const { token } = useAuthStore();
  return token ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoutes;
