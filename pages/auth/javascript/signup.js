import CreateUser from '../../../libraries/Api/user/userApi.js';
import { signUpWithGoogle } from '../../../libraries/Api/user/userApi.js';
import { redirectToOfflinePage } from '../../../routers/router.js';


const submit = document.getElementById('submit').addEventListener("click", (e) =>
{  

  if(navigator.onLine)
  {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    CreateUser(email, password);
  }
  else
  {
    sessionStorage.setItem('page', "Signup");
    redirectToOfflinePage();
  }
  }
);

var Google =  document.getElementById('signInWithGoogle').addEventListener("click", (e)=>{
  signUpWithGoogle();
});

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