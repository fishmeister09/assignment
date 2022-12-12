// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyACndwWY9QxNC1MBLiWhZlyVlNb9dy27Zw',
  authDomain: 'stickman-29849.firebaseapp.com',
  projectId: 'stickman-29849',
  storageBucket: 'stickman-29849.appspot.com',
  messagingSenderId: '270367316643',
  appId: '1:270367316643:web:de4e4a2334bc53e3d5bd16',
  measurementId: 'G-NX8PV336YE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
