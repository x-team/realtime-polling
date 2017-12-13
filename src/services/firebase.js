import firebase from 'firebase';

const db = firebase.initializeApp({
  databaseURL: process.env.FIREBASE_URL,
}).database();

export default db;
