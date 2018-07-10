import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBQjHte99tHebgT_PhGHToyQqzJQJ9JmTQ",
  authDomain: "microdata-asistencias.firebaseapp.com",
  databaseURL: "https://microdata-asistencias.firebaseio.com",
  projectId: "microdata-asistencias",
  storageBucket: "",
  messagingSenderId: "949212686602"
};
  firebase.initializeApp(config);

  export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();