import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import PrivateRoute from '@/routes/PrivateRoute';
import RestrictedRoutes from '@/routes/RestrictedRoutes';
import useAuthStore from '@/store';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));
const RoomsPage = lazy(() => import('@/pages/RoomsPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));

const App = () => {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<HomePage />}
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
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
