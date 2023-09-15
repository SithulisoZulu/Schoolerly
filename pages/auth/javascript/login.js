import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, getRedirectResult } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { app } from "../../../libraries/firebaseApi.js";
import { redirectToOfflinePage, redirectToUserErrorPage } from '../../../routers/router.js';
import { sanitizeInput } from '../../../libraries/sanitizer.js';
import { checkCurrentUser } from '../../../libraries/Api/user/userApi.js';
import { ErrorMessage } from '../../../libraries/errors/messages.js';
import { closeCard } from '../../../libraries/errors/errorCardCloser.js';

const auth = await getAuth(app);
const provider = new GoogleAuthProvider();

const submit = document.getElementById('submit').addEventListener("click",  (e) =>
  {

   if(navigator.onLine)
    {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if(!email || !password)
      {
        handleLoginError()
        return
      }

      signInWithEmailAndPassword(auth, sanitizeInput(email), sanitizeInput(password))
      .then(async (userCredential) => {
        const user =  await userCredential.user;
        const userId= user.uid
        const userEmail = user.email
       try{
        redirectToLoadingPage(userId, userEmail)
       }catch(error) {
        console.log(error)
       }
      })
      .catch((error) => {
        redirectToUserErrorPage()
      });
    } else {
      sessionStorage.setItem("page", "login")
      redirectToOfflinePage()
    }
  }
);

var Google =  document.getElementById('signInWithGoogle').addEventListener("click", (e)=>{
  signInWithGoogle();
});

async function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = await result.user;
      const userEmail = user.email

      const userData = await checkCurrentUser(userEmail)
      const userId = userData.id
      
      redirectToLoadingPage(userId, userEmail)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      throw new Error("Login failed: " + errorCode + " " + errorMessage)
  });
}

function redirectToLoadingPage(userId, userEmail) {
  try {
    var url = `/pages/auth/Authenticating.html?id=${encodeURIComponent(userId)}&AccessKey=${encodeURIComponent(userEmail)}`;
    window.location.replace(url);
  } 
  catch (error) {
    console.log(error);
    throw error
  }
}


function handleLoginError()
{
  const errorMessage = document.getElementById('error-message');
  const alertError = document.getElementById('alert-Error');
  if(errorMessage && alertError)
  {
    errorMessage.innerText = ErrorMessage.LoginError;
    alertError.classList.remove('visually-hidden');
  };
}

const closeEmailSent = document.getElementById('alert-Error').addEventListener("click", async (e) =>{
  await closeCard();
});
