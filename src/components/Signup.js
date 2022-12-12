import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';

export const Signup = () => {
  const { signUp } = useUserAuth();
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
      await signUp(email, password);
      await setDoc(doc(db, 'users', email), {
        email: email,
      })
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {
          console.log(`Unsuccessful returned error ${error}`);
          setLoading(false);
        });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            sign up
            <br />
            {error}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="border"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <button type="submit">{loading ? 'loading...' : 'signup'}</button>
            </form>
            <div>
              <Link to="/"> go to login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
