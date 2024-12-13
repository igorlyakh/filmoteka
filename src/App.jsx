import Layout from '@/components/Layout';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage';
import RoomPage from '@/pages/RoomPage';
import RoomsPage from '@/pages/RoomsPage';
import PrivateRoute from '@/routes/PrivateRoute';
import RestrictedRoutes from '@/routes/RestrictedRoutes';
import useAuthStore from '@/store';
import { Route, Routes } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

const App = () => {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <PuffLoader
        color="#ffffff"
        size={100}
        cssOverride={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<div>Home Page</div>}
        />
        <Route
          path="login"
          element={
            <RestrictedRoutes
              component={LoginPage}
              redirectTo="/rooms"
            />
          }
        />
        <Route
          path="registration"
          element={
            <RestrictedRoutes
              component={RegistrationPage}
              redirectTo="/rooms"
            />
          }
        />
        <Route
          path="rooms"
          element={
            <PrivateRoute
              component={RoomsPage}
              redirectTo="/login"
            />
          }
        />
        <Route
          path="rooms/:roomId"
          element={
            <PrivateRoute
              component={RoomPage}
              redirectTo="/login"
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
