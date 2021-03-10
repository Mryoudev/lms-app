  import firebase from 'firebase/app'
  import 'firebase/auth';

  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA4ssJJghKkg1s_AD8ENGJb18BuSKbJvyM",
    authDomain: "lms-project-a8cc1.firebaseapp.com",
    projectId: "lms-project-a8cc1",
    storageBucket: "lms-project-a8cc1.appspot.com",
    messagingSenderId: "670123672038",
    appId: "1:670123672038:web:c826ba91ac87088bd5d627"
  };


  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  //exporter notre base de données
  export default fireDB;

  //export the auth app
  export const auth = app.auth();