import Layout from '@/components/Layout';
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
          element={<LoginPage />}
        />
        <Route
          path="registration"
          element={<div>Registration Page</div>}
        />
      </Route>
    </Routes>
  );
};

export default App;
