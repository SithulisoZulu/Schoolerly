import CreateUser from '../../../libraries/Api/user/userApi.js';
import { signUpWithGoogle, signUpWithMicrosoft } from '../../../libraries/Api/user/userApi.js';
import { redirectToOfflinePage } from '../../../routers/router.js';
import { ErrorMessage } from '../../../libraries/errors/messages.js';
// import { isParam } from 'router_js/dist/modules/utils.js';
import * as loading  from '../../../libraries/loading.js'


const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  

  loading.loading()

  if(navigator.onLine)
  {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!email || !password)
    {
      handleLoginError()
      return
    }
    CreateUser(email, password);
  }
  else
  {
    sessionStorage.setItem('page', "Signup");
    redirectToOfflinePage();
  }
  }
);

var Google =  document.getElementById('signInWithGoogle').addEventListener("click", async (e)=>{
  loading.loading()
  await signUpWithGoogle();
  loading.isNotLoading()
});

// var Microsoft =  document.getElementById('signUpWithMicrosoft').addEventListener("click", async (e)=>{
//   loading.isLoadingEmailUpdate()
//   await signUpWithMicrosoft();
//     loading.isNotLoadingEmailUpdate()
// });

//#region close

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
//#endregion

function handleLoginError()
{
  const errorMessage = document.getElementById('error-message');
  const alertError = document.getElementById('alert-Error');
  if(errorMessage && alertError)
  {
    errorMessage.innerText = ErrorMessage.LoginError;
    alertError.classList.remove('visually-hidden');
    loading.isNotLoading()
  };
}


const closeCard = document.getElementById('alert-Error').addEventListener("click", async (e) =>{
  await closeCard();
});


