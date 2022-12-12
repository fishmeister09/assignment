import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

export const Login = () => {
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <span>login</span>
        <span> {error}</span>

        <form onSubmit={handleSubmit}>
          <div>
            <span>login</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div>
            <span>password</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit">{loading ? 'loading...' : 'Login'}</button>
        </form>
        <div>
          <Link to="/signup">go to singup</Link>
        </div>
      </div>
    </div>
  );
};
