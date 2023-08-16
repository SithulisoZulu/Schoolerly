import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, getRedirectResult } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { collection, addDoc, getDocs, where, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { app, databaseURL as db } from "../../../libraries/firebaseApi.js";
import { route } from '../../../routers/router.js';
import userRoles from '../../../libraries/roles.js';

const auth = await getAuth(app);
const FaceBook = new FacebookAuthProvider();
const provider = new GoogleAuthProvider();

const submit = document.getElementById('submit').addEventListener("click", (e) =>
  {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user.email;
      sessionStorage.setItem("userEmail", user);
      location.replace(route.loadingPageUrl);
    })
    .catch((error) => {
      location.replace(route.userErrorPageUrl);
    });
  }
);


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
        users.push(doc.data())   
      });
      
      if(users.length <=  0)
      {
        addUserData();
        sessionStorage.setItem("userEmail", userEmail);
        const myTimeout = setTimeout(Redirect, 1000);
      }

      function Redirect()
      {
        location.replace(route.CompleteProfilePageUrl)
      }
    }

    async function addUserData()
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
    }
    sessionStorage.setItem("userEmail", userEmail);
    location.replace(route.adminHomePageUrl)
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

  var signInWithFaceBook =  document.getElementById('signInWithFaceBook').addEventListener("click", (e)=>{
    signUpWithFacebook();
  });



function signUpWithFacebook()
{
  signInWithPopup(auth, FaceBook)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
}