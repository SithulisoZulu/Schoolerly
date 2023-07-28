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

var messages = [
  'Please provide an Email address',
  'Please enter a valid Email address',
  'An account associated to this does exists.',
];


const password =document.getElementById('submit').addEventListener("click", (e) =>{
    sendResetPassword();  
  });

  function sendResetPassword()
  {
    const email= document.getElementById('email').value;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      document.getElementById('alert-Error').classList.add('visually-hidden');
      var alert =  document.getElementById('alert-Div').classList.remove('visually-hidden');
      const e = document.getElementById('email-span').innerHTML = email;
    })
    .catch((error) => {
      var alert =  document.getElementById('alert-Error').classList.remove('visually-hidden');
      if(!email)
      {
        document.getElementById('error-message').innerHTML = messages[0];
      }
      else
      {
        document.getElementById('error-message').innerHTML = messages[1];
      }
    });
  }


  const closeError = document.getElementById('closeError').addEventListener("click", (e) =>{
    closeErrorCard()   
  });
  
  function closeErrorCard()
  {
    document.getElementById('alert-Error').classList.add('visually-hidden');
  }
  
  
  const closeEmailSent = document.getElementById('closeEmailSent').addEventListener("click", (e) =>{
    closeEmailSentCard()   
  });
  
  function closeEmailSentCard()
  {
    document.getElementById('alert-Div').classList.add('visually-hidden');
  }