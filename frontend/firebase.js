import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDRPR6ecCr1_wZu6K6psoZnU49UFj_ZYQs",
    authDomain: "sem4-faculty-reg.firebaseapp.com",
    projectId: "sem4-faculty-reg",
    storageBucket: "sem4-faculty-reg.appspot.com",
    messagingSenderId: "1056781353841",
    appId: "1:1056781353841:web:8766d635537c31b1d3acd0",
    measurementId: "G-V54S2B9PNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth, app };
