import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, getRedirectResult } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'
import { app } from "../../../libraries/firebaseApi.js";
import { redirectToOfflinePage, redirectToUserErrorPage } from '../../../routers/router.js';
import { sanitizeInput } from '../../../libraries/sanitizer.js';
import { checkCurrentUser, login, signInWithGoogle } from '../../../libraries/Api/user/userApi.js';
import { ErrorMessage } from '../../../libraries/errors/messages.js';
import { closeCard } from '../../../libraries/errors/errorCardCloser.js';
import * as loading  from '../../../libraries/loading.js'

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
      
      loading.loading()
      login(email, password)

    } else {
      redirectToOfflinePage()
    }
  }
);

var Google =  document.getElementById('signInWithGoogle').addEventListener("click", async (e)=>{
  loading.loading()
  await signInWithGoogle();
});


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
