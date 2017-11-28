import firebase from 'firebase';

const db = firebase.initializeApp({
  databaseURL: 'https://xteam-realtime-polling-app.firebaseio.com',
}).database();

export default db;
