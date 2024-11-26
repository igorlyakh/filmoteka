import Layout from '@/Components/Layout';
import { Route, Routes } from 'react-router-dom';

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
          element={<div>Login Page</div>}
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
