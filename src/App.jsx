import Layout from '@/components/Layout';
import RegistrationPage from '@/pages/RegistrationPage';
import RestrictedRoutes from '@/routes/RestrictedRoutes';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
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
          element={<RestrictedRoutes component={LoginPage} />}
        />
        <Route
          path="registration"
          element={<RestrictedRoutes component={RegistrationPage} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
