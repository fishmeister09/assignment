import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { UserAuthContextProvider } from './context/UserAuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              // <ProtectedRoute>
              <Login />
              /* </ProtectedRoute> */
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
