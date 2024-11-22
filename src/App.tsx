import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<div>Home</div>}
      />
      <Route
        path="login"
        element={<div>Login</div>}
      />
      <Route
        path="registration"
        element={<div>Registration</div>}
      />
      <Route
        path="*"
        element={<div>Not found</div>}
      />
    </Routes>
  );
};

export default App;
