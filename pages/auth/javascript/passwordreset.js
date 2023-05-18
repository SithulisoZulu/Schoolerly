import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4TJ6cXs0i0viuY-2Y_LZznJA9Evh6-jY",
    authDomain: "schoolerly-4eaaf.firebaseapp.com",
    databaseURL: "https://enoway-solutions-default-rtdb.firebaseio.com",
    projectId: "schoolerly-4eaaf",
    storageBucket: "schoolerly-4eaaf.appspot.com",
    messagingSenderId: "702702557352",
    appId: "1:609348476417:web:71a15e3f1b5a40434e6a00",
    measurementId: "G-XZ4RHV4T3K"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const password =document.getElementById('submit').addEventListener("click", (e) =>{
    sendResetPassword();  
  });
  function sendResetPassword()
  {
    const email= document.getElementById('email').value;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
    })
    .catch((error) => {;
    });
  }