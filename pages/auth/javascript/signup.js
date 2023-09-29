import CreateUser from '../../../libraries/Api/user/userApi.js';
import { signUpWithGoogle } from '../../../libraries/Api/user/userApi.js';
import { redirectToOfflinePage } from '../../../routers/router.js';
import { ErrorMessage } from '../../../libraries/errors/messages.js';
import { successMessages } from '../../../libraries/success/messages.js';
import { loader } from '../../../components/loading.js'

const loaderHolder = document.getElementById("loaderHolder");

document.getElementById('submit').addEventListener("click", async (e) =>
  {  
    loaderHolder.innerHTML += loader
    if(navigator.onLine)
    {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if(!email || !password)
      {
        handleLoginError();
        return
      };
      await CreateUser(email, password);
    }
    else
    {
      redirectToOfflinePage();
    }
  }
);

document.getElementById('signInWithGoogle').addEventListener("click", async (e) => 
  {
    loaderHolder.innerHTML += loader;
    await signUpWithGoogle();
  }
);

//#region close
const closeError = document.getElementById('closeError').addEventListener("click", (e) => 
  {
    document.getElementById('alert-Error').classList.add('visually-hidden');
  }
);

const closeEmailSent = document.getElementById('closeEmailSent').addEventListener("click", (e) => 
  {
    document.getElementById('alert-Div').classList.add('visually-hidden');
  }
);
//#endregion

function handleLoginError()
{
  loaderHolder.innerHTML = " "
  const errorMessage = document.getElementById('error-message');
  const alertError = document.getElementById('alert-Error');

  if(errorMessage && alertError)
  {
    errorMessage.innerText = ErrorMessage.LoginError;
    alertError.classList.remove('visually-hidden');
  };
};