import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBH9-Qk9lEwFwL3WqyiaW2Mrhi0S8i4OOc",
  authDomain: "tab-list.firebaseapp.com",
  databaseURL: "https://tab-list.firebaseio.com",
  projectId: "tab-list",
  storageBucket: "tab-list.appspot.com",
  messagingSenderId: "440792895965"
};
firebase.initializeApp(config);

// export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();
export default(firebase);
