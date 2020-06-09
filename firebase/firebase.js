import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAOQpiztbQUg0PE4iSR10a_Aa_OtYgRk_k",
    authDomain: "demotest-129ef.firebaseapp.com",
    databaseURL: "https://demotest-129ef.firebaseio.com",
    projectId: "demotest-129ef",
    storageBucket: "demotest-129ef.appspot.com",
    messagingSenderId: "112058356240",
    appId: "1:112058356240:web:f9383f8f565872d1c7f095",
    measurementId: "G-K4WDBSB3PY"
  };
  export default firebaseConfig = firebase.initializeApp(config);