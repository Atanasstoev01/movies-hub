import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBRDAQWnossjzD9wfEK5-c2AYFlFf5jsYY",
  authDomain: "movie-hunter-e759e.firebaseapp.com",
  databaseURL: "https://movie-hunter-e759e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movie-hunter-e759e",
  storageBucket: "movie-hunter-e759e.appspot.com",
  messagingSenderId: "602106793187",
  appId: "1:602106793187:web:02fbf7d3448892eae249d6",
  measurementId: "G-992PV10RD3"
};

export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler

export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);

export const storage = getStorage(app);
