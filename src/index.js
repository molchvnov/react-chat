import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { createContext } from 'react';

firebase.initializeApp({
  apiKey: 'AIzaSyDV3LFQQrw1kaVQe0HKNziANCXpAXC5kxk',
  authDomain: 'react-chat-6ed9c.firebaseapp.com',
  projectId: 'react-chat-6ed9c',
  storageBucket: 'react-chat-6ed9c.appspot.com',
  messagingSenderId: '265953453196',
  appId: '1:265953453196:web:3f9b72715f29909af107a9',
  measurementId: 'G-3T47D1G20D',
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ firebase, auth, firestore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
