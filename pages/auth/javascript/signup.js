import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { collection, addDoc, getDocs, query, where} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { app, databaseURL as db } from "../../../libraries/firebaseApi.js";
import { successMessages as success} from '../../../libraries/success/messages.js';
import { ErrorMessage as Error } from "../../../libraries/errors/messages.js";
import userRoles from '../../../libraries/roles.js';
import { route } from '../../../routers/router.js';

const auth = getAuth(app); 
const provider = new GoogleAuthProvider();

const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Create a new user with the specified email and password
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementById('alert-success').classList.remove('visually-hidden')
    document.getElementById('message').innerHTML = success.UserCreated;
    addUserData();


    const myTimeout = setTimeout(Redirect, 2000);
  })
  .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  document.getElementById('error-message').innerHTML = Error.SignupErrorMessage + " " + errorCode + " " + Error.try;
  document.getElementById('alert-Error').classList.remove('visually-hidden')
  });
}
);
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let creationDate = `${day}-${month}-${year}`;

async function addUserData()
{
  let id = crypto.randomUUID();
  const email = document.getElementById('email').value;

  const docRef = await addDoc(collection(db, "users"), {
    Name: "",
    email: email,
    Role: await userRoles.Unverified,
    Surname: "",
    id: id,
    creationDate: creationDate,
    emailVerified: "false",
    photo: "",
    DisplayName: "",
    Contact: "",
    Address: "",
  });
}


function Redirect()
{
  const email = document.getElementById('email').value;
  sessionStorage.setItem("userEmail", email);
  location.replace(route.loginPageUrl)
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



  
var Google =  document.getElementById('signInWithGoogle').addEventListener("click", (e)=>{
  signInWithGoogle();
});

function signInWithGoogle()
{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
   var userEmail = user.email
   var userId = user.uid
    checkCurrentUser();

    async function checkCurrentUser(){
      var users = []
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => 
      {
        users.push(doc.data());
      });
        if(users.length == 0)
        {
          const docRef = await addDoc(collection(db, "users"), {
            DisplayName: user.displayName,
            email: user.email,
            Contact: user.phoneNumber,
            Role: await userRoles.Unverified,
            id: user.uid,
            photo: user.photoURL,
            creationTime: user.metadata.creationTime,
            emailVerified: user.emailVerified, 
          });
          sessionStorage.setItem("userEmail", userEmail);
          const myTimeout = setTimeout(Redirect, 1000);
        }  
        if (users.length >= 1)
        {     
          sessionStorage.setItem("userEmail", userEmail);
          location.replace(route.adminHomePageUrl)
        }

        function Redirect()
        {
          location.replace(route.CompleteProfilePageUrl)
        }
        console.log(users.length)
    }
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

} 