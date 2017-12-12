import firebase from 'firebase';

const db = firebase.initializeApp({
  databaseURL: 'https://realtime-poll-40c84.firebaseio.com/',
}).database();

export default db;
