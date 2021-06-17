import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBkSoQN6O4DREKrYIQ3a-z8ZjXE2S3LNR4",
    authDomain: "webstore-e0a9c.firebaseapp.com",
    projectId: "webstore-e0a9c",
    storageBucket: "webstore-e0a9c.appspot.com",
    messagingSenderId: "948898173466",
    appId: "1:948898173466:web:257324c49364d9b53b37a3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  export {auth}

  

