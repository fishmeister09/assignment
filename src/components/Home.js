import { useNavigate } from 'react-router';
import { useUserAuth } from '../context/UserAuthContext';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  getDocs,
} from 'firebase/firestore';
import { db } from '../Firebase';
import { useState, useEffect } from 'react';

export const Home = () => {
  const { logOut, user } = useUserAuth();
  const [name, setName] = useState('rahul');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [chooseName, setChooseName] = useState([]);

  const q = query(collection(db, 'choosenames'));

  const readFunction = async () => {
    const querySnapshot = await getDocs(q);
    let feed = [];
    querySnapshot.forEach((doc) => {
      feed.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    setChooseName(feed);
  };

  useEffect(() => {
    readFunction();
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(db, 'currentSerial', 'serial');
    const docSnap = await getDoc(docRef);
    const data = {
      token: docSnap.data().token + 1,
      name: name,
      number: number,
      date: new Date().toISOString(),
    };
    console.log(data);
    await addDoc(collection(db, 'posts'), data).then((docRef) => {
      console.log(docRef);
      setName('');
      setNumber('');
      setLoading(false);
    });
    await updateDoc(docRef, {
      token: docSnap.data().token + 1,
    });
    console.log('posted');
  };

  return (
    <div>
      {user.email === 'admin@stickman.com' ? (
        <button onClick={() => navigate('/showData')}>Show Data</button>
      ) : null}
      <button
        style={
          Object.keys(user).length !== 0
            ? { backgroundColor: '#fa5057' }
            : { backgroundColor: '#007acc' }
        }
        onClick={() => handleLogout()}
      >
        {Object.keys(user).length !== 0 ? 'LogOut' : 'LogIn'}
      </button>
      <br />
      <span>Fill Form</span>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Choose Name</span>
          <select onChange={(e) => setName(e.target.value)}>
            {chooseName.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span>Number</span>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number"
          />
        </div>
        <button type="submit">{loading ? 'loading...' : 'Submit'}</button>
      </form>
    </div>
  );
};
