import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../Firebase';
import { db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({ email: null });

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  function logOut() {
    return signOut(auth);
  }
  const getData = async () => {
    const docRef = doc(db, 'users', auth.currentUser.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      getData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, setUser, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
