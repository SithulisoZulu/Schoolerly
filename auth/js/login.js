import { redirectToOfflinePage } from '../../routers/router.js';
import { login, signInWithGoogle } from '../../libraries/Api/user/userApi.js';
import { ErrorMessage } from '../../libraries/errors/messages.js';
import { closeCard } from '../../libraries/errors/errorCardCloser.js';
import { loader } from '../../components/loading.js'

const loaderHolder = document.getElementById("loaderHolder")

document.getElementById('submit').addEventListener("click",  (e) =>
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
      
      loaderHolder.innerHTML += loader
      login(email, password)
      if(login)
      {
        handleLoginError()
      }

    } else {
      redirectToOfflinePage()
    }
  }
);

document.getElementById('signInWithGoogle').addEventListener("click", async (e)=>{
  loaderHolder.innerHTML += loader
  await signInWithGoogle();
});

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